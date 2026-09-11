import type { Catalog } from "akasha/alan/web/idle-catalog/idle-catalog.module.code.ts"
import { listenerSet } from "akasha/design/interfaces/primitives/listener-set/listener-set.module.code.ts"
import { z } from "zod"

const catalogSchema = z.looseObject({
  roster: z.array(
    z.looseObject({
      slug: z.string(),
      name: z.string(),
      level: z.number().nullable(),
      stage: z.string(),
      cover: z.string(),
    })
  ),
  pools: z.record(z.string(), z.array(z.string())),
})

let catalog: Catalog | null = null
let loadStarted = false
const listeners = listenerSet()

export function subscribeCatalog(listener: () => void): () => void {
  return listeners.subscribe(listener)
}

export function getCatalogSnapshot(): Catalog | null {
  return catalog
}

type CatalogFetch = (input: string, init?: RequestInit) => Promise<Response>

export function ensureCatalogLoaded(fetchImpl: CatalogFetch = fetch): undefined {
  if (loadStarted) return
  loadStarted = true
  void (async (): Promise<void> => {
    try {
      const res = await fetchImpl("/api/catalog", { headers: { accept: "application/json" } })
      if (!res.ok) {
        loadStarted = false
        return
      }
      catalog = catalogSchema.parse(await res.json())
      listeners.tell()
    } catch {
      loadStarted = false
    }
  })()
}
