import { describe, expect, test } from "bun:test"
import { ensureCatalogLoaded, getCatalogSnapshot, subscribeCatalog } from "./idle-catalog-store"

const CATALOG_BODY = {
  roster: [{ slug: "aura", name: "Aura", level: null, stage: "s", cover: "" }],
  pools: { aura: ["img-1"] },
}

describe("idle-catalog-store (#14601)", () => {
  test("null before any load", () => {
    expect(getCatalogSnapshot()).toBeNull()
  })

  test("ensureCatalogLoaded fetches once, populates + notifies, then is a no-op", async () => {
    let calls = 0
    const mockFetch = async (): Promise<Response> => {
      calls += 1
      return new Response(JSON.stringify(CATALOG_BODY), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    }

    let ticks = 0
    const unsubscribe = subscribeCatalog(() => {
      ticks += 1
    })

    ensureCatalogLoaded(mockFetch)
    ensureCatalogLoaded(mockFetch)
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(calls).toBe(1)
    expect(ticks).toBe(1)
    expect(getCatalogSnapshot()?.roster[0]?.slug).toBe("aura")

    unsubscribe()
  })
})
