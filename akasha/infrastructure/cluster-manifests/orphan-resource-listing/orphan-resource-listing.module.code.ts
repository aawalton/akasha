import { shape } from "@tools/lib/shape"

const TOKEN_ENV = "PIPELINE_SA_TOKEN"

const API_BASE_ENV = "K8S_API_BASE"

const CA_CERT_ENV = "K8S_CA_CERT_B64"

const MANAGED_BY_LABEL = "app.kubernetes.io/managed-by"

export type AuditedKind = "Deployment" | "Service" | "StatefulSet"

export const AUDITED_KINDS: readonly AuditedKind[] = ["Deployment", "Service", "StatefulSet"]

export interface LiveResource {
  readonly kind: AuditedKind
  readonly namespace: string
  readonly name: string
  readonly managedBy: string | null
}

interface ClusterConfig {
  readonly token: string
  readonly apiBase: string
  readonly caCert: string | undefined
}

let held: ClusterConfig | null = null

function required(name: string): string {
  const value = process.env[name]
  if (typeof value !== "string" || value === "") {
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
      typeof caCertB64 === "string" && caCertB64 !== ""
        ? Buffer.from(caCertB64, "base64").toString("utf8")
        : undefined,
  }
  return held
}

function listPath(namespace: string, kind: AuditedKind): string {
  if (kind === "Deployment") return `/apis/apps/v1/namespaces/${namespace}/deployments`
  if (kind === "StatefulSet") return `/apis/apps/v1/namespaces/${namespace}/statefulsets`
  return `/api/v1/namespaces/${namespace}/services`
}

const ListShape = shape.looseObject({
  items: shape.array(
    shape.looseObject({
      metadata: shape.looseObject({
        name: shape.string(),
        labels: shape.record(shape.string(), shape.string()).optional(),
      }),
    })
  ),
})

export async function listLive(
  namespace: string,
  kind: AuditedKind,
  deadlineMs: number
): Promise<readonly LiveResource[]> {
  const config = clusterConfig()
  const left = deadlineMs - Date.now()
  if (left <= 0) {
    throw new Error(
      `the sweep's whole cluster read ran out of time before ${kind} in ${namespace} was asked for`
    )
  }
  let answer: Response
  try {
    answer = await fetch(`${config.apiBase}${listPath(namespace, kind)}`, {
      headers: { Authorization: `Bearer ${config.token}`, Accept: "application/json" },
      signal: AbortSignal.timeout(left),
      ...(config.caCert === undefined ? {} : { tls: { ca: config.caCert } }),
    } as RequestInit)
  } catch (err) {
    throw new Error(
      `the cluster did not answer for ${kind} in ${namespace} inside the sweep's whole read: ` +
        `${err instanceof Error ? err.message : String(err)}`
    )
  }
  if (!answer.ok) {
    throw new Error(
      `the cluster answered ${answer.status} ${answer.statusText} for ${kind} in ${namespace}`
    )
  }
  const body = ListShape.parse(await answer.json())
  return body.items.map((item) => ({
    kind,
    namespace,
    name: item.metadata.name,
    managedBy: item.metadata.labels?.[MANAGED_BY_LABEL] ?? null,
  }))
}
