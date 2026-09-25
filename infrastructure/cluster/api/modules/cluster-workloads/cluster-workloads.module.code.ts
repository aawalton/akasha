import {
  getConfig,
  k8sFetch,
  refuse,
} from "akasha/infrastructure/cluster/api/modules/cluster-fetch/cluster-fetch.module.code.ts"
import { z } from "zod"

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

interface NamedResource {
  readonly name: string
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
