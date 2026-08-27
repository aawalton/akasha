import { describe, expect, it } from "bun:test"
import { RosterUnreachable } from "@shared/pages-access/file-read"
import type { PageRow } from "./page-row"
import type { PagesPersistencePort, PersistedPagesSnapshot } from "./persistence"
import { createPagesStore } from "./store"

const TOKEN = "opaque-session-token"
const STAMP = "2026-01-01T00:00:00.000Z"

function pageTypeRow(slug: string, attributes: Record<string, unknown>): PageRow {
  return {
    id: `019db533-1111-7000-8000-${slug.slice(0, 12).padEnd(12, "0")}`,
    page_type_id: "019db533-f381-738c-ba1f-8088bf231d28",
    user_id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
    seq: 5,
    title: slug,
    icon: null,
    slug,
    created_at: STAMP,
    updated_at: STAMP,
    attributes,
    page_type_slug: "page-type",
    unique_key: null,
    status: null,
    completed_at: null,
    parent_key: null,
    favorited_at: null,
    last_viewed_at: null,
  }
}

function snapshot(rows: readonly PageRow[]): PersistedPagesSnapshot {
  return { version: 1, rows, resume: [] }
}

function port(load: () => Promise<PersistedPagesSnapshot | null>): PagesPersistencePort {
  return { load, save: () => undefined, clear: () => undefined }
}

function tracker() {
  const paths: string[] = []
  const fetchImpl = async (input: string): Promise<Response> => {
    paths.push(input)
    return new Response(JSON.stringify({ rows: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  }
  return { paths, fetchImpl }
}

async function until(pred: () => boolean, label: string): Promise<void> {
  for (let i = 0; i < 400; i += 1) {
    if (pred()) return
    await new Promise((resolve) => setTimeout(resolve, 5))
  }
  throw new Error(`timed out waiting for ${label}`)
}

async function settle(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 30))
}

function unread(): RosterUnreachable {
  return new RosterUnreachable("/api/page-types answered 503")
}

describe("createPagesStore — what routing never fetches for (#19430)", () => {
  it("fetches for the definition tier, which the roster names like any other", async () => {
    const t = tracker()
    const store = createPagesStore(
      port(async () => null),
      250,
      undefined,
      {
        fetchImpl: t.fetchImpl,
        pollMs: 60_000,
        roster: async () => new Set(["page-type", "page-property-definition"]),
      }
    )
    await store.whenHydrated
    store.setAuth({ jwt: TOKEN })
    store.acquireSlug("page-type")
    store.acquireSlug("page-property-definition")

    await until(() => t.paths.length >= 2, "both definition-tier fetches")
    expect([...t.paths].sort()).toEqual([
      "/api/pages/page-property-definition",
      "/api/pages/page-type",
    ])
  })

  it("never fetches for a cross-type shape, which names no page type", async () => {
    const t = tracker()
    const store = createPagesStore(
      port(async () => null),
      250,
      undefined,
      {
        fetchImpl: t.fetchImpl,
        pollMs: 60_000,
        roster: async () => new Set(["animal"]),
      }
    )
    await store.whenHydrated
    store.setAuth({ jwt: TOKEN })
    store.acquireFilteredStream({
      shapeKey: "cross:favorites",
    })

    await settle()
    expect(t.paths).toEqual([])
  })

  it("opens nothing for a slug whose backing is not readable yet, and leaves it pending", async () => {
    const t = tracker()
    const store = createPagesStore(
      port(async () => null),
      250,
      undefined,
      {
        fetchImpl: t.fetchImpl,
        pollMs: 60_000,
        roster: async () => unread(),
      }
    )
    await store.whenHydrated
    store.setAuth({ jwt: TOKEN })
    store.acquireSlug("temper-task")

    expect(store.isSlugReady("temper-task")).toBe(false)
    await settle()
    expect(t.paths).toEqual([])
  })

  it("releasing the slug stops the polling", async () => {
    const t = tracker()
    const store = createPagesStore(
      port(async () => snapshot([pageTypeRow("animal", {})])),
      250,
      undefined,
      { fetchImpl: t.fetchImpl, pollMs: 1, roster: async () => new Set(["animal"]) }
    )
    await store.whenHydrated
    store.setAuth({ jwt: TOKEN })
    store.acquireSlug("animal")

    await until(() => t.paths.length >= 2, "polling to be under way")
    store.releaseSlug("animal")
    const settled = t.paths.length
    await settle()
    expect(t.paths.length).toBe(settled)
  })

  it("defers a file-backed slug acquired while signed out, as it does every other", async () => {
    const t = tracker()
    const store = createPagesStore(
      port(async () => snapshot([pageTypeRow("animal", {})])),
      250,
      undefined,
      { fetchImpl: t.fetchImpl, pollMs: 60_000, roster: async () => new Set(["animal"]) }
    )
    await store.whenHydrated
    store.setAuth({ jwt: null })
    store.acquireSlug("animal")

    await settle()
    expect(t.paths).toEqual([])

    store.setAuth({ jwt: TOKEN })
    await until(() => t.paths.length > 0, "the fetch once a token arrived")
    expect(t.paths[0]).toBe("/api/pages/animal")
  })
})

describe("createPagesStore — routing a slug by the file-backed roster", () => {
  it("fetches a page type the roster names, whatever its row says", async () => {
    const t = tracker()
    const store = createPagesStore(
      port(async () => snapshot([pageTypeRow("book", {})])),
      250,
      undefined,
      { fetchImpl: t.fetchImpl, pollMs: 60_000, roster: async () => new Set(["book"]) }
    )
    await store.whenHydrated
    store.setAuth({ jwt: TOKEN })
    store.acquireSlug("book")

    await until(() => t.paths.length > 0, "the fetch")
    expect(t.paths[0]).toBe("/api/pages/book")
  })

  it("fetches nothing for a page type the roster does not name", async () => {
    const t = tracker()
    const store = createPagesStore(
      port(async () => snapshot([pageTypeRow("task", {})])),
      250,
      undefined,
      { fetchImpl: t.fetchImpl, pollMs: 60_000, roster: async () => new Set(["book"]) }
    )
    await store.whenHydrated
    store.setAuth({ jwt: TOKEN })
    store.acquireSlug("task")

    await settle()
    expect(t.paths).toEqual([])
  })

  it("swaps a pending slug onto the fetch once a slow roster names it", async () => {
    const t = tracker()
    let release: ((slugs: ReadonlySet<string>) => void) | null = null
    const held = new Promise<ReadonlySet<string>>((resolve) => {
      release = resolve
    })
    const store = createPagesStore(
      port(async () => snapshot([pageTypeRow("book", {})])),
      250,
      undefined,
      { fetchImpl: t.fetchImpl, pollMs: 60_000, roster: () => held }
    )
    await store.whenHydrated
    store.setAuth({ jwt: TOKEN })
    store.acquireSlug("book")

    await settle()
    expect(t.paths).toEqual([])

    release?.(new Set(["book"]))
    await until(() => t.paths.length > 0, "the fetch once the roster landed")
    expect(t.paths[0]).toBe("/api/pages/book")
  })

  it("never lets the row's own attributes decide, whichever they are", async () => {
    const t = tracker()
    const store = createPagesStore(
      port(async () => snapshot([pageTypeRow("task", { backing: "file" })])),
      250,
      undefined,
      { fetchImpl: t.fetchImpl, pollMs: 60_000, roster: async () => unread() }
    )
    await store.whenHydrated
    store.setAuth({ jwt: TOKEN })
    store.acquireSlug("task")

    await settle()
    expect(t.paths).toEqual([])
  })

  it("resolves a slug the roster does not name empty rather than leaving it pending", async () => {
    const t = tracker()
    const store = createPagesStore(
      port(async () => null),
      250,
      undefined,
      { fetchImpl: t.fetchImpl, pollMs: 60_000, roster: async () => new Set(["book"]) }
    )
    await store.whenHydrated
    store.setAuth({ jwt: TOKEN })
    store.acquireSlug("task")

    await expect(store.whenSlugReady("task")).resolves.toBeUndefined()
    expect(store.isSlugReady("task")).toBe(true)
    await settle()
    expect(t.paths).toEqual([])
  })
})
