import { describe, expect, test } from "bun:test"
import { z } from "zod"
import { createView, deleteView, renameView, reorderViews, updateViewConfig } from "./reducers"
import type { ReducerCtx, ViewRow } from "./types"

const SNAPSHOT_SCHEMA = z.unknown()

const ctx: ReducerCtx = {
  newPageId: "new-page-id",
  ownerNavItemId: "target-pt",
}

function row(
  id: string,
  overrides: Partial<{
    name: string
    config: unknown
    sort_order: number
  }> = {}
): ViewRow {
  return {
    _id: id,
    properties: {
      title: overrides.name ?? id,
      config: overrides.config ?? { version: 1 },
      sort_order: overrides.sort_order ?? 0,
    },
  }
}

function buildState(...ids: readonly string[]): readonly ViewRow[] {
  return ids.map((id, i) => row(id, { sort_order: i }))
}

describe("createView happy path", () => {
  test("emits a single atomic createPage carrying initial properties", () => {
    const effects = createView([], { name: "All", data: { version: 1 } }, ctx)
    expect(effects).toHaveLength(1)
    expect(effects[0]?.kind).toBe("createPage")
  })

  test("createPage seeds title, owner, config, sort_order (never pageTypeId — derived server-side from the slug; never name — title is authoritative)", () => {
    const data = { version: 1 as const, layout: "board" as const }
    const [create] = createView([], { name: "Kanban", data }, ctx)
    if (create?.kind !== "createPage") throw new Error("expected createPage")
    expect(create.pageId).toBe("new-page-id")
    const props = create.properties ?? []
    const byId = new Map(props.map((p) => [p.propertyId, p.value]))
    expect(byId.has("pageTypeId")).toBe(false)
    expect(byId.has("name")).toBe(false)
    expect(byId.get("title")).toBe("Kanban")
    expect(byId.get("owner")).toBe("target-pt")
    expect(byId.get("config")).toEqual(data)
    expect(byId.get("sort_order")).toBe(0)
  })

  test("sort_order follows state length for non-empty state", () => {
    const state = buildState("a", "b", "c")
    const effects = createView(state, { name: "D", data: { version: 1 } }, ctx)
    const create = effects[0]
    if (create?.kind !== "createPage") throw new Error("expected createPage")
    expect(create.properties?.find((p) => p.propertyId === "sort_order")?.value).toBe(3)
  })
})

describe("createView empty state", () => {
  test("empty state yields sort_order=0", () => {
    const effects = createView([], { name: "First", data: { version: 1 } }, ctx)
    const create = effects[0]
    if (create?.kind !== "createPage") throw new Error("expected createPage")
    expect(create.properties?.find((p) => p.propertyId === "sort_order")?.value).toBe(0)
  })

  test("empty state still emits exactly one effect", () => {
    const effects = createView([], { name: "First", data: { version: 1 } }, ctx)
    expect(effects).toHaveLength(1)
  })

  test("empty state createPage uses the injected new page id", () => {
    const effects = createView(
      [],
      { name: "First", data: { version: 1 } },
      { ...ctx, newPageId: "custom-id" }
    )
    expect(effects[0]).toMatchObject({ kind: "createPage", pageId: "custom-id" })
  })
})

describe("renameView happy path", () => {
  test("emits one bulkSetProperties effect", () => {
    const effects = renameView([row("a")], { id: "a", name: "Renamed" }, ctx)
    expect(effects).toHaveLength(1)
    expect(effects[0]?.kind).toBe("bulkSetProperties")
  })

  test("bulkSetProperties targets the provided id", () => {
    const [effect] = renameView([row("a")], { id: "a", name: "Renamed" }, ctx)
    if (effect?.kind !== "bulkSetProperties") throw new Error("unreachable")
    expect(effect.pageId).toBe("a")
  })
})

describe("renameView atomicity", () => {
  test("exactly one effect (no second setProperty call)", () => {
    const effects = renameView([row("a")], { id: "a", name: "X" }, ctx)
    expect(effects.length).toBe(1)
  })

  test("single bulkSetProperties writes the authoritative title", () => {
    const [effect] = renameView([row("a")], { id: "a", name: "Renamed" }, ctx)
    if (effect?.kind !== "bulkSetProperties") throw new Error("unreachable")
    const byId = new Map(effect.properties.map((p) => [p.propertyId, p.value]))
    expect(byId.get("title")).toBe("Renamed")
    expect(byId.has("name")).toBe(false)
  })

  test("bulkSetProperties has exactly title, no extras", () => {
    const [effect] = renameView([row("a")], { id: "a", name: "Renamed" }, ctx)
    if (effect?.kind !== "bulkSetProperties") throw new Error("unreachable")
    const ids = effect.properties.map((p) => p.propertyId).sort()
    expect(ids).toEqual(["title"])
  })

  test("empty string name is still atomic (title set to empty string)", () => {
    const [effect] = renameView([row("a")], { id: "a", name: "" }, ctx)
    if (effect?.kind !== "bulkSetProperties") throw new Error("unreachable")
    const byId = new Map(effect.properties.map((p) => [p.propertyId, p.value]))
    expect(byId.get("title")).toBe("")
    expect(byId.has("name")).toBe(false)
  })
})

describe("deleteView happy path", () => {
  test("emits single deletePage effect for known id", () => {
    const effects = deleteView(buildState("a", "b"), { id: "a" }, ctx)
    expect(effects).toEqual([{ kind: "deletePage", pageId: "a" }])
  })

  test("targets only the specified id", () => {
    const effects = deleteView(buildState("a", "b", "c"), { id: "b" }, ctx)
    expect(effects).toHaveLength(1)
    const [effect] = effects
    if (effect?.kind !== "deletePage") throw new Error("expected deletePage effect")
    expect(effect.pageId).toBe("b")
  })
})

describe("deleteView not-found", () => {
  test("returns empty when id absent from state", () => {
    const effects = deleteView(buildState("a", "b"), { id: "missing" }, ctx)
    expect(effects).toEqual([])
  })

  test("empty state returns empty", () => {
    expect(deleteView([], { id: "anything" }, ctx)).toEqual([])
  })
})

describe("reducer purity", () => {
  test("createView does not mutate state", () => {
    const state = buildState("a", "b")
    const snapshot = SNAPSHOT_SCHEMA.parse(JSON.parse(JSON.stringify(state)))
    createView(state, { name: "c", data: { version: 1 } }, ctx)
    expect(state).toEqual(snapshot)
  })

  test("updateViewConfig does not mutate state or existing config object", () => {
    const cfg = { version: 1 as const, layout: "table" as const }
    const state = [row("a", { config: cfg })]
    updateViewConfig(state, { id: "a", updates: { layout: "grid" } }, ctx)
    expect(cfg.layout).toBe("table")
    expect(state[0]?.properties.config).toEqual({ version: 1, layout: "table" })
  })

  test("reorderViews does not mutate state", () => {
    const state = buildState("a", "b", "c")
    const snapshot = SNAPSHOT_SCHEMA.parse(JSON.parse(JSON.stringify(state)))
    reorderViews(state, { viewIds: ["c", "b", "a"] }, ctx)
    expect(state).toEqual(snapshot)
  })

  test("deleteView does not mutate state", () => {
    const state = buildState("a", "b")
    const snapshot = SNAPSHOT_SCHEMA.parse(JSON.parse(JSON.stringify(state)))
    deleteView(state, { id: "a" }, ctx)
    expect(state).toEqual(snapshot)
  })

  test("reducers are deterministic — same input yields structurally equal output", () => {
    const state = buildState("a", "b")
    const a = createView(state, { name: "c", data: { version: 1 } }, ctx)
    const b = createView(state, { name: "c", data: { version: 1 } }, ctx)
    expect(a).toEqual(b)
  })
})
