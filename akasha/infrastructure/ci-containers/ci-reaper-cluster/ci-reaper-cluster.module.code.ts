import { shape } from "@akasha/utils-narrow/shape"
import type { StepTerminated } from "../ci-reap-decision/ci-reap-decision.module.code.ts"
import { withCeiling } from "../ci-reaper-ceiling/ci-reaper-ceiling.module.code.ts"

export const CI_NAMESPACE = "ci"

export const STEP_PROCESS = "step"

export const CLUSTER_CEILING_MS = 30_000

export const LOG_CEILING_MS = 10_000

const TOKEN_ENV = "PIPELINE_SA_TOKEN"

const API_BASE_ENV = "K8S_API_BASE"

const CA_CERT_ENV = "K8S_CA_CERT_B64"

interface ClusterConfig {
  readonly token: string
  readonly apiBase: string
  readonly caCert: string | undefined
}

let held: ClusterConfig | null = null

function required(name: string): string {
  const value = process.env[name]
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${name} is not set, and the cluster is not reachable without it`)
  }
  return value
}

function clusterConfig(): ClusterConfig {
  if (held !== null) return held
  const caCertB64 = process.env[CA_CERT_ENV]
  held = {
    token: required(TOKEN_ENV),
    apiBase: required(API_BASE_ENV).replace(/\/+$/, ""),
    caCert:
      typeof caCertB64 === "string" && caCertB64.length > 0
        ? Buffer.from(caCertB64, "base64").toString("utf8")
        : undefined,
  }
  return held
}

export async function clusterFetch(
  path: string,
  waitingFor: string,
  ms: number,
  method = "GET"
): Promise<Response> {
  const config = clusterConfig()
  return withCeiling(waitingFor, ms, () =>
    fetch(`${config.apiBase}${path}`, {
      method,
      headers: { Authorization: `Bearer ${config.token}`, Accept: "application/json" },
      ...(config.caCert === undefined ? {} : { tls: { ca: config.caCert } }),
    } as RequestInit)
  )
}

export function proxyPath(namespace: string, service: string, port: number, path: string): string {
  return `/api/v1/namespaces/${namespace}/services/${service}:${port}/proxy${path}`
}

const TerminatedShape = shape.looseObject({
  exitCode: shape.number().nullable().optional(),
  finishedAt: shape.string().nullable().optional(),
  reason: shape.string().nullable().optional(),
  signal: shape.number().nullable().optional(),
})

const ProcessStatusShape = shape.looseObject({
  name: shape.string(),
  state: shape
    .looseObject({ terminated: TerminatedShape.nullable().optional() })
    .nullable()
    .optional(),
})

const ContainerShape = shape.looseObject({
  metadata: shape
    .looseObject({
      name: shape.string().nullable().optional(),
      deletionTimestamp: shape.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  status: shape
    .looseObject({
      phase: shape.string().nullable().optional(),
      reason: shape.string().nullable().optional(),
      containerStatuses: shape.array(ProcessStatusShape).nullable().optional(),
    })
    .nullable()
    .optional(),
})

const ContainerListShape = shape.looseObject({ items: shape.array(ContainerShape) })

type ProcessStatus = ReturnType<typeof ProcessStatusShape.parse>

export interface CiContainer {
  readonly name: string
  readonly phase: string
  readonly reason: string | null
  readonly deleted: boolean
  readonly stepTerminated: StepTerminated | null
}

export function terminatedStepIn(
  statuses: readonly ProcessStatus[] | null | undefined
): StepTerminated | null {
  if (statuses === null || statuses === undefined) return null
  for (const one of statuses) {
    if (one.name !== STEP_PROCESS) continue
    const term = one.state?.terminated
    if (term === null || term === undefined) return null
    const exitCode = term.exitCode
    if (typeof exitCode !== "number") return null
    return {
      exitCode,
      finishedAt: typeof term.finishedAt === "string" ? term.finishedAt : null,
      reason: typeof term.reason === "string" && term.reason.length > 0 ? term.reason : null,
      signal: typeof term.signal === "number" ? term.signal : null,
    }
  }
  return null
}

function nonEmpty(value: string | null | undefined): string | null {
  return typeof value === "string" && value.length > 0 ? value : null
}

function containerPath(name: string): string {
  return `/api/v1/namespaces/${CI_NAMESPACE}/pods/${encodeURIComponent(name)}`
}

export async function listCiContainers(): Promise<readonly CiContainer[]> {
  const waitingFor = `listing the containers in namespace ${CI_NAMESPACE}`
  const res = await clusterFetch(
    `/api/v1/namespaces/${CI_NAMESPACE}/pods`,
    waitingFor,
    CLUSTER_CEILING_MS
  )
  if (!res.ok) throw new Error(`${waitingFor} answered HTTP ${res.status}`)
  const listed = ContainerListShape.parse(await res.json())
  const out: CiContainer[] = []
  for (const one of listed.items) {
    const name = nonEmpty(one.metadata?.name)
    if (name === null) continue
    out.push({
      name,
      phase: nonEmpty(one.status?.phase) ?? "Unknown",
      reason: nonEmpty(one.status?.reason),
      deleted: nonEmpty(one.metadata?.deletionTimestamp) !== null,
      stepTerminated: terminatedStepIn(one.status?.containerStatuses),
    })
  }
  return out
}

export async function deleteCiContainer(name: string): Promise<boolean> {
  const waitingFor = `deleting container ${name}`
  const res = await clusterFetch(containerPath(name), waitingFor, CLUSTER_CEILING_MS, "DELETE")
  if (res.status === 404) return false
  if (!res.ok) throw new Error(`${waitingFor} answered HTTP ${res.status}`)
  return true
}

async function readStepLog(
  name: string,
  params: Readonly<Record<string, string>>
): Promise<string> {
  const query = new URLSearchParams({ container: STEP_PROCESS, ...params })
  const waitingFor = `reading the log of container ${name}`
  const res = await clusterFetch(
    `${containerPath(name)}/log?${query.toString()}`,
    waitingFor,
    LOG_CEILING_MS
  )
  if (!res.ok) throw new Error(`${waitingFor} answered HTTP ${res.status}`)
  return res.text()
}

export async function readStepLogTail(name: string, tailLines: number): Promise<string | null> {
  const raw = await readStepLog(name, { tailLines: String(tailLines) })
  return raw.length > 0 ? raw : null
}

export function lastLogMomentIn(raw: string): number | null {
  const lines = raw.split("\n")
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const line = lines[i]
    if (line === undefined) continue
    const trimmed = line.trimStart()
    if (trimmed.length === 0) continue
    const token = trimmed.split(" ", 1)[0]
    if (token === undefined || token.length === 0) return null
    const ms = Date.parse(token)
    return Number.isNaN(ms) ? null : ms
  }
  return null
}

export async function lastLogMoment(name: string): Promise<number | null> {
  return lastLogMomentIn(await readStepLog(name, { timestamps: "true", tailLines: "1" }))
}
