import { describe, expect, test } from "bun:test"
import type { ShapeResumeState } from "../realtime/shape-meta"
import type { PageRow } from "./page-row"
import { createPagesCollection } from "./pages-collection"
import {
  buildPagesSnapshot,
  type PagesPersistencePort,
  type PersistedPagesSnapshot,
} from "./persistence"
import { createPagesStore } from "./store"

function mkRow(id: string, overrides: Partial<PageRow> = {}): PageRow {
  return {
    id,
    page_type_id: "0190f3a0-1234-7abc-9def-aaaaaaaaaaaa",
    user_id: "user-1",
    seq: 1,
    title: "page",
    icon: null,
    created_at: "2026-05-24T00:00:00.000Z",
    updated_at: "2026-05-24T00:00:00.000Z",
    attributes: {},
    page_type_slug: "temper-task",
    unique_key: null,
    status: null,
    completed_at: null,
    slug: null,
    parent_key: null,
    favorited_at: null,
    last_viewed_at: null,
    ...overrides,
  }
}

function jwtWithSub(sub: string): string {
  return `x.${btoa(JSON.stringify({ sub }))}.y`
}

interface FakePort {
  readonly port: PagesPersistencePort
  readonly saves: readonly PersistedPagesSnapshot[]
  clears: number
}
function makeFakePort(loadResult: PersistedPagesSnapshot | null): FakePort {
  const saves: PersistedPagesSnapshot[] = []
  const state = { clears: 0 }
  return {
    port: {
      load: () => Promise.resolve(loadResult),
      save: (snapshot) => {
        saves.push(snapshot)
      },
      clear: () => {
        state.clears += 1
      },
    },
    saves,
    get clears() {
      return state.clears
    },
    set clears(v: number) {
      state.clears = v
    },
  }
}

const delay = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

describe("buildPagesSnapshot", () => {
  test("captures rows and resume together as a versioned snapshot", () => {
    const rows: readonly PageRow[] = [mkRow("0190f3a0-1234-7abc-9def-000000000001")]
    const resume: readonly (readonly [string, ShapeResumeState])[] = [
      ["slug:temper-task", { offset: "42_0", handle: "h-1" }],
    ]
    expect(buildPagesSnapshot(rows, resume)).toEqual({ version: 1, rows, resume })
  })
})

describe("sync-controller onMutation tee (Seam A)", () => {
  test("fires once per committed mutation, never on an empty batch", () => {
    let calls = 0
    const handle = createPagesCollection(() => {
      calls += 1
    })
    handle.collection.startSyncImmediate()
    handle.controller.seed([mkRow("0190f3a0-1234-7abc-9def-000000000001")])
    expect(calls).toBe(1)
    handle.controller.applyUpserts([mkRow("0190f3a0-1234-7abc-9def-000000000001", { title: "b" })])
    expect(calls).toBe(2)
    handle.controller.applyDeletes(["0190f3a0-1234-7abc-9def-000000000001"])
    expect(calls).toBe(3)
    handle.controller.applyUpserts([])
    handle.controller.applyDeletes([])
    expect(calls).toBe(3)
    handle.controller.resetAll()
    expect(calls).toBe(4)
    handle.cleanup()
  })
})

describe("createPagesStore boot hydration", () => {
  test("seeds the collection from a persisted snapshot and resolves whenHydrated", async () => {
    const snapshot = buildPagesSnapshot(
      [
        mkRow("0190f3a0-1234-7abc-9def-000000000001"),
        mkRow("0190f3a0-1234-7abc-9def-000000000002"),
      ],
      [["slug:temper-task", { offset: "7_0", handle: "h-1" }]]
    )
    const fake = makeFakePort(snapshot)
    const store = createPagesStore(fake.port, 0)
    await store.whenHydrated
    expect(store.collection.toArray.length).toBe(2)
  })

  test("degrades to an empty collection when the port loads null (first run / malformed)", async () => {
    const fake = makeFakePort(null)
    const store = createPagesStore(fake.port, 0)
    await store.whenHydrated
    expect(store.collection.toArray.length).toBe(0)
  })

  test("no persistence port → whenHydrated resolves immediately, collection empty (browser path)", async () => {
    const store = createPagesStore(null)
    await store.whenHydrated
    expect(store.collection.toArray.length).toBe(0)
  })
})

describe("createPagesStore seed readiness (#14948, offline mirror)", () => {
  test("a hydrated non-null snapshot makes any slug ready from the seed (offline resolves, no spin)", async () => {
    const snapshot = buildPagesSnapshot(
      [mkRow("0190f3a0-1234-7abc-9def-000000000001", { page_type_slug: "story-chapter" })],
      []
    )
    const store = createPagesStore(makeFakePort(snapshot).port, 0)
    await store.whenHydrated
    expect(store.isSlugReady("story-chapter")).toBe(true)
    expect(store.isSlugReady("story")).toBe(true)
    await expect(store.whenSlugReady("story-chapter")).resolves.toBeUndefined()
  })

  test("a null-loading port (native cold-first-launch) does NOT seed-resolve — waits for the fetch", async () => {
    const store = createPagesStore(makeFakePort(null).port, 0)
    await store.whenHydrated
    expect(store.isSlugReady("story-chapter")).toBe(false)
  })

  test("no persistence port (browser) never seed-resolves — online path byte-identical", async () => {
    const store = createPagesStore(null)
    await store.whenHydrated
    expect(store.isSlugReady("story-chapter")).toBe(false)
  })
})

describe("createPagesStore write-through", () => {
  test("a post-hydration canonical mutation (identity-change wipe) fires a save", async () => {
    const snapshot = buildPagesSnapshot(
      [mkRow("0190f3a0-1234-7abc-9def-000000000001")],
      [["slug:temper-task", { offset: "7_0", handle: "h-1" }]]
    )
    const fake = makeFakePort(snapshot)
    const store = createPagesStore(fake.port, 0)
    await store.whenHydrated
    expect(fake.saves.length).toBe(0)

    store.setAuth({ jwt: jwtWithSub("user-a") })
    store.setAuth({ jwt: jwtWithSub("user-b") })
    await delay(5)

    expect(fake.saves.length).toBeGreaterThanOrEqual(1)
    const last = fake.saves[fake.saves.length - 1]
    expect(last?.rows.length).toBe(0)
    expect(store.collection.toArray.length).toBe(0)
  })
})

describe("createPagesStore on-disk identity wipe (#14801)", () => {
  test("a genuine identity change clears the collection port AND fires onIdentityWipe", () => {
    const fake = makeFakePort(null)
    let contentWipes = 0
    const store = createPagesStore(fake.port, 0, () => {
      contentWipes += 1
    })

    store.setAuth({ jwt: jwtWithSub("user-a") })
    expect(fake.clears).toBe(0)
    expect(contentWipes).toBe(0)

    store.setAuth({ jwt: jwtWithSub("user-b") })
    expect(fake.clears).toBe(1)
    expect(contentWipes).toBe(1)
  })

  test("same sub, sign-out, and re-adopt do NOT wipe on-disk caches", () => {
    const fake = makeFakePort(null)
    let contentWipes = 0
    const store = createPagesStore(fake.port, 0, () => {
      contentWipes += 1
    })

    store.setAuth({ jwt: jwtWithSub("user-a") })
    store.setAuth({ jwt: jwtWithSub("user-a") })
    store.setAuth({ jwt: null })
    expect(fake.clears).toBe(0)
    expect(contentWipes).toBe(0)

    store.setAuth({ jwt: jwtWithSub("user-a") })
    expect(fake.clears).toBe(0)
    expect(contentWipes).toBe(0)
  })

  test("a different identity after sign-out DOES wipe (sticky owner detects the change)", () => {
    const fake = makeFakePort(null)
    let contentWipes = 0
    const store = createPagesStore(fake.port, 0, () => {
      contentWipes += 1
    })

    store.setAuth({ jwt: jwtWithSub("user-a") })
    store.setAuth({ jwt: null })
    store.setAuth({ jwt: jwtWithSub("user-b") })
    expect(fake.clears).toBe(1)
    expect(contentWipes).toBe(1)
  })

  test("no onIdentityWipe callback (browser) → the collection port still clears", () => {
    const fake = makeFakePort(null)
    const store = createPagesStore(fake.port, 0)
    store.setAuth({ jwt: jwtWithSub("user-a") })
    store.setAuth({ jwt: jwtWithSub("user-b") })
    expect(fake.clears).toBe(1)
  })
})

describe("browser store captures sync handles at construction (#15894)", () => {
  test("createPagesStore(null) starts base-collection sync at construction (browser)", () => {
    const store = createPagesStore(null)
    expect(store.collection.status).toBe("ready")
  })

  test("control: a pre-subscriber seed with no captured handles throws — construction-time capture is load-bearing", () => {
    const handle = createPagesCollection()
    expect(() =>
      handle.controller.seed([
        mkRow("0190f3a0-1234-7abc-9def-00000000e001", { page_type_slug: "page-type" }),
      ])
    ).toThrow(/sync handles not captured/)
    handle.cleanup()
  })
})
