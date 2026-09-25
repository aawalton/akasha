import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"
import { clusterCredentials } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/cluster-api-reaching/cluster-api-reaching.module.code.ts"

const MANAGED_BY_LABEL = "app.kubernetes.io/managed-by"

type AuditedKind = "Deployment" | "Service" | "StatefulSet"

export const AUDITED_KINDS: readonly AuditedKind[] = ["Deployment", "Service", "StatefulSet"]

export interface LiveResource {
  readonly kind: AuditedKind
  readonly namespace: string
  readonly name: string
  readonly managedBy: string | null
}

function listPath(namespace: string, kind: AuditedKind): string {
  if (kind === "Deployment") return `/apis/apps/v1/namespaces/${namespace}/deployments`
  if (kind === "StatefulSet") return `/apis/apps/v1/namespaces/${namespace}/statefulsets`
  return `/api/v1/namespaces/${namespace}/services`
}

const ListShape = SHAPE.looseObject({
  items: SHAPE.array(
    SHAPE.looseObject({
      metadata: SHAPE.looseObject({
        name: SHAPE.string(),
        labels: SHAPE.record(SHAPE.string(), SHAPE.string()).optional(),
      }),
    })
  ),
})

export async function listLive(
  namespace: string,
  kind: AuditedKind,
  deadlineMs: number
): Promise<readonly LiveResource[]> {
  const credentials = clusterCredentials()
  const left = deadlineMs - Date.now()
  if (left <= 0) {
    throw new Error(
      `the sweep's whole cluster read ran out of time before ${kind} in ${namespace} was asked for`
    )
  }
  let answer: Response
  try {
    answer = await fetch(`${credentials.apiBase}${listPath(namespace, kind)}`, {
      headers: { Authorization: `Bearer ${credentials.saToken}`, Accept: "application/json" },
      signal: AbortSignal.timeout(left),
      ...(credentials.caCert === undefined ? {} : { tls: { ca: credentials.caCert } }),
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
