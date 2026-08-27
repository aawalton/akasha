import { describe, expect, it } from "bun:test"
import { createPagesStore, type PagesStore } from "./store"

const OPAQUE_TOKEN = "opaque-session-token"

const emptyAnswer = (): Promise<Response> =>
  Promise.resolve(
    new Response(JSON.stringify({ rows: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  )

function storeNaming(...slugs: readonly string[]): PagesStore {
  return createPagesStore(null, 250, undefined, {
    roster: () => Promise.resolve(new Set(slugs)),
    fetchImpl: emptyAnswer,
  })
}

describe("createPagesStore — setAuth replays deferred shapes (#15907)", () => {
  it("a slug acquired while signed out attaches nothing and stays unready", () => {
    const store = storeNaming("temper-task")
    store.setAuth({ jwt: null })
    store.acquireSlug("temper-task")
    expect(store.isSlugReady("temper-task")).toBe(false)
  })

  it("the null -> non-null token transition attaches the deferred slug", async () => {
    const store = storeNaming("temper-task")
    store.setAuth({ jwt: null })
    store.acquireSlug("temper-task")
    expect(store.isSlugReady("temper-task")).toBe(false)

    store.setAuth({ jwt: OPAQUE_TOKEN })

    await store.whenSlugReady("temper-task")
    expect(store.isSlugReady("temper-task")).toBe(true)
  })

  it("unblocks a readiness barrier that was already waiting on the dead slug", async () => {
    const store = storeNaming("page-type")
    store.setAuth({ jwt: null })
    store.acquireSlug("page-type")
    const barrier = store.whenSlugReady("page-type")

    store.setAuth({ jwt: OPAQUE_TOKEN })

    await expect(barrier).resolves.toBeUndefined()
  })

  it("a slug acquired with a token already present attaches once the roster answers", async () => {
    const store = storeNaming("temper-task")
    store.setAuth({ jwt: OPAQUE_TOKEN })
    store.acquireSlug("temper-task")
    await store.whenSlugReady("temper-task")
    expect(store.isSlugReady("temper-task")).toBe(true)
  })

  it("a non-null -> non-null token rotation does not disturb ready shapes", async () => {
    const store = storeNaming("temper-task")
    store.setAuth({ jwt: OPAQUE_TOKEN })
    store.acquireSlug("temper-task")
    await store.whenSlugReady("temper-task")
    expect(store.isSlugReady("temper-task")).toBe(true)

    store.setAuth({ jwt: `${OPAQUE_TOKEN}-rotated` })

    expect(store.isSlugReady("temper-task")).toBe(true)
  })

  it("replays a cross-type shape too, not just per-slug shapes", () => {
    const store = storeNaming()
    store.setAuth({ jwt: null })
    store.acquireFilteredStream({
      shapeKey: "cross:favorites",
    })
    expect(store.isFilteredReady("cross:favorites")).toBe(false)

    store.setAuth({ jwt: OPAQUE_TOKEN })

    expect(store.isFilteredReady("cross:favorites")).toBe(true)
  })
})

describe("createPagesStore — a cross-type shape names no page type, so nothing backs it", () => {
  it("resolves it ready and empty rather than leaving the barrier pending", async () => {
    const store = storeNaming("temper-task")
    store.setAuth({ jwt: OPAQUE_TOKEN })
    store.acquireFilteredStream({
      shapeKey: "cross:favorites",
    })

    await expect(store.whenFilteredReady("cross:favorites")).resolves.toBeUndefined()
    expect(store.isFilteredReady("cross:favorites")).toBe(true)
    expect(store.collection.toArray.length).toBe(0)
  })

  it("carries no rows in for it, whatever the roster names", async () => {
    const store = storeNaming("temper-task")
    store.setAuth({ jwt: OPAQUE_TOKEN })
    store.acquireFilteredStream({
      shapeKey: "cross:recently-viewed",
    })

    await store.whenFilteredReady("cross:recently-viewed")
    expect(store.collection.toArray.length).toBe(0)
  })

  it("releasing it is inert and never throws", async () => {
    const store = storeNaming()
    store.setAuth({ jwt: OPAQUE_TOKEN })
    store.acquireFilteredStream({
      shapeKey: "cross:favorites",
    })
    await store.whenFilteredReady("cross:favorites")

    expect(() => {
      store.releaseFilteredStream("cross:favorites")
    }).not.toThrow()
  })
})
