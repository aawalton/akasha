import { assertNever } from "@akasha/utils-narrow/assert-never"
import { z } from "zod"
import { getConfig, k8sFetch, refuse } from "../cluster-api-fetch/cluster-api-fetch.module.code.ts"

const NamedItemListSchema = z
  .object({
    items: z.array(
      z
        .object({
          metadata: z
            .object({
              name: z.string(),
            })
            .passthrough(),
        })
        .passthrough()
    ),
  })
  .passthrough()

const LabeledItemListSchema = z
  .object({
    items: z.array(
      z
        .object({
          metadata: z
            .object({
              name: z.string(),
              labels: z.record(z.string(), z.string()).optional(),
            })
            .passthrough(),
        })
        .passthrough()
    ),
  })
  .passthrough()

export interface NamedResource {
  readonly name: string
}

export type ClusterResourceKind = "Deployment" | "Service" | "StatefulSet"

export interface LabeledResource {
  readonly name: string
  readonly managedBy: string | null
}

const MANAGED_BY_LABEL = "app.kubernetes.io/managed-by"

function listPathFor(namespace: string, kind: ClusterResourceKind): string {
  switch (kind) {
    case "Deployment":
      return `/apis/apps/v1/namespaces/${namespace}/deployments`
    case "StatefulSet":
      return `/apis/apps/v1/namespaces/${namespace}/statefulsets`
    case "Service":
      return `/api/v1/namespaces/${namespace}/services`
    default:
      return assertNever(kind)
  }
}

export async function listNamespacedResources(
  namespace: string,
  kind: ClusterResourceKind
): Promise<readonly LabeledResource[]> {
  const response = await k8sFetch(listPathFor(namespace, kind), { method: "GET" }, getConfig())
  if (!response.ok) await refuse(`listNamespacedResources(${kind}, ${namespace})`, response)
  const body = LabeledItemListSchema.parse(await response.json())
  return body.items.map((item) => ({
    name: item.metadata.name,
    managedBy: item.metadata.labels?.[MANAGED_BY_LABEL] ?? null,
  }))
}

export async function listDeployments(
  namespace: string,
  labelSelector: string
): Promise<readonly NamedResource[]> {
  const path = `/apis/apps/v1/namespaces/${namespace}/deployments?labelSelector=${encodeURIComponent(labelSelector)}`
  const response = await k8sFetch(path, { method: "GET" }, getConfig())
  if (!response.ok) await refuse("listDeployments", response)
  const body = NamedItemListSchema.parse(await response.json())
  return body.items.map((item) => ({ name: item.metadata.name }))
}

export interface DeleteResult {
  readonly deleted: boolean
}

export async function deleteDeployment(namespace: string, name: string): Promise<DeleteResult> {
  const response = await k8sFetch(
    `/apis/apps/v1/namespaces/${namespace}/deployments/${name}`,
    { method: "DELETE" },
    getConfig()
  )
  if (response.status === 200 || response.status === 202) return { deleted: true }
  if (response.status === 404) return { deleted: false }
  return await refuse("deleteDeployment", response)
}

export async function listPods(
  namespace: string,
  labelSelector: string
): Promise<readonly NamedResource[]> {
  const path = `/api/v1/namespaces/${namespace}/pods?labelSelector=${encodeURIComponent(labelSelector)}`
  const response = await k8sFetch(path, { method: "GET" }, getConfig())
  if (!response.ok) await refuse("listPods", response)
  const body = NamedItemListSchema.parse(await response.json())
  return body.items.map((item) => ({ name: item.metadata.name }))
}

export async function deletePod(namespace: string, name: string): Promise<DeleteResult> {
  const response = await k8sFetch(
    `/api/v1/namespaces/${namespace}/pods/${name}`,
    { method: "DELETE" },
    getConfig()
  )
  if (response.status === 200 || response.status === 202) return { deleted: true }
  if (response.status === 404) return { deleted: false }
  return await refuse("deletePod", response)
}

export interface CreatePodResult {
  readonly created: boolean
  readonly alreadyExists: boolean
}

export async function createPod(namespace: string, manifest: object): Promise<CreatePodResult> {
  const response = await k8sFetch(
    `/api/v1/namespaces/${namespace}/pods`,
    { method: "POST", body: JSON.stringify(manifest) },
    getConfig()
  )
  if (response.status === 200 || response.status === 201) {
    return { created: true, alreadyExists: false }
  }
  if (response.status === 409) return { created: false, alreadyExists: true }
  return await refuse("createPod", response)
}

export interface RestartResult {
  readonly restarted: true
}

export async function restartDeployment(namespace: string, name: string): Promise<RestartResult> {
  const body = JSON.stringify({
    spec: {
      template: {
        metadata: {
          annotations: {
            "kubectl.kubernetes.io/restartedAt": new Date().toISOString(),
          },
        },
      },
    },
  })
  const response = await k8sFetch(
    `/apis/apps/v1/namespaces/${namespace}/deployments/${name}`,
    {
      method: "PATCH",
      body,
      contentType: "application/strategic-merge-patch+json",
    },
    getConfig()
  )
  if (response.status === 200) return { restarted: true }
  return await refuse("restartDeployment", response)
}

const DeploymentStatusSchema = z
  .object({
    status: z
      .object({
        readyReplicas: z.number().optional(),
        availableReplicas: z.number().optional(),
        replicas: z.number().optional(),
      })
      .passthrough(),
  })
  .passthrough()

export const ROLLOUT_CEILING_MS = 180_000

const ROLLOUT_POLL_MS = 2_000

export async function waitForRollout(
  namespace: string,
  name: string,
  opts: { readonly timeoutMs: number; readonly pollIntervalMs?: number } = {
    timeoutMs: ROLLOUT_CEILING_MS,
  }
): Promise<undefined> {
  const pollIntervalMs = opts.pollIntervalMs ?? ROLLOUT_POLL_MS
  const deadline = Date.now() + opts.timeoutMs
  while (Date.now() < deadline) {
    const response = await k8sFetch(
      `/apis/apps/v1/namespaces/${namespace}/deployments/${name}`,
      { method: "GET" },
      getConfig()
    )
    if (response.ok) {
      const body = DeploymentStatusSchema.parse(await response.json())
      if ((body.status.availableReplicas ?? 0) >= 1) return
    }
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs))
  }
  throw new Error(
    `waitForRollout: deployment/${name} in ${namespace} not ready within ${opts.timeoutMs}ms`
  )
}
