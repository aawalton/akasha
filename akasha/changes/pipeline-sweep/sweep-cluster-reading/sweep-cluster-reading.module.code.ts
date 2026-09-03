import { withCeiling } from "@akasha/ci-containers/ci-reaper-ceiling"
import { shape } from "@tools/lib/shape"

export const CI_NAMESPACE = "ci"

export const STEP_PROCESS = "step"

export const CLUSTER_CEILING_MS = 30_000

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

async function clusterFetch(path: string, waitingFor: string, ms: number): Promise<Response> {
  const config = clusterConfig()
  return withCeiling(waitingFor, ms, () =>
    fetch(`${config.apiBase}${path}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${config.token}`, Accept: "application/json" },
      ...(config.caCert === undefined ? {} : { tls: { ca: config.caCert } }),
    } as RequestInit)
  )
}

const TerminatedShape = shape.looseObject({
  exitCode: shape.number().nullable().optional(),
  startedAt: shape.string().nullable().optional(),
  finishedAt: shape.string().nullable().optional(),
  reason: shape.string().nullable().optional(),
  signal: shape.number().nullable().optional(),
})

const RunningShape = shape.looseObject({
  startedAt: shape.string().nullable().optional(),
})

const ProcessStatusShape = shape.looseObject({
  name: shape.string(),
  state: shape
    .looseObject({
      running: RunningShape.nullable().optional(),
      terminated: TerminatedShape.nullable().optional(),
    })
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

export interface StepTerminated {
  readonly exitCode: number
  readonly reason: string | null
  readonly signal: number | null
}

export interface ContainerReading {
  readonly name: string
  readonly phase: string
  readonly reason: string | null
  readonly deleted: boolean
  readonly stepStartedAt: string | null
  readonly stepTerminated: StepTerminated | null
}

function nonEmpty(value: string | null | undefined): string | null {
  return typeof value === "string" && value.length > 0 ? value : null
}

function stepProcessIn(
  statuses: readonly ProcessStatus[] | null | undefined
): ProcessStatus | null {
  if (statuses === null || statuses === undefined) return null
  for (const one of statuses) if (one.name === STEP_PROCESS) return one
  return null
}

export function startedAtIn(one: ProcessStatus | null): string | null {
  if (one === null) return null
  const running = nonEmpty(one.state?.running?.startedAt)
  if (running !== null) return running
  return nonEmpty(one.state?.terminated?.startedAt)
}

export function terminatedIn(one: ProcessStatus | null): StepTerminated | null {
  const term = one?.state?.terminated
  if (term === null || term === undefined) return null
  const exitCode = term.exitCode
  if (typeof exitCode !== "number") return null
  return {
    exitCode,
    reason: nonEmpty(term.reason),
    signal: typeof term.signal === "number" ? term.signal : null,
  }
}

export async function readCiContainers(): Promise<ReadonlyMap<string, ContainerReading>> {
  const waitingFor = `listing the containers in namespace ${CI_NAMESPACE}`
  const res = await clusterFetch(
    `/api/v1/namespaces/${CI_NAMESPACE}/pods`,
    waitingFor,
    CLUSTER_CEILING_MS
  )
  if (!res.ok) throw new Error(`${waitingFor} answered HTTP ${res.status}`)
  const listed = ContainerListShape.parse(await res.json())
  const out = new Map<string, ContainerReading>()
  for (const one of listed.items) {
    const name = nonEmpty(one.metadata?.name)
    if (name === null || out.has(name)) continue
    const process = stepProcessIn(one.status?.containerStatuses)
    out.set(name, {
      name,
      phase: nonEmpty(one.status?.phase) ?? "Unknown",
      reason: nonEmpty(one.status?.reason),
      deleted: nonEmpty(one.metadata?.deletionTimestamp) !== null,
      stepStartedAt: startedAtIn(process),
      stepTerminated: terminatedIn(process),
    })
  }
  return out
}
