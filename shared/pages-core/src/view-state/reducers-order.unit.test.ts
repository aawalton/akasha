import { describe, expect, test } from "bun:test"
import { z } from "zod"
import { parseViewDataJSON, type ViewDataJSON } from "../schema/view-data"
import { duplicateView, reorderViews } from "./reducers"
import type { ReducerCtx, ViewEffect, ViewRow } from "./types"

function asViewData(value: unknown): ViewDataJSON {
  const result = parseViewDataJSON(value)
  if (!result.ok) throw new Error(`expected ViewDataJSON, got: ${result.error.message}`)
  return result.data
}

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

function findSetProperty(
  effects: readonly ViewEffect[],
  pageId: string,
  propertyId: string
): Extract<ViewEffect, { kind: "setProperty" }> | undefined {
  return effects.find(
    (e): e is Extract<ViewEffect, { kind: "setProperty" }> =>
      e.kind === "setProperty" && e.pageId === pageId && e.propertyId === propertyId
  )
}

describe("duplicateView happy path", () => {
  test("returns empty when source not in state", () => {
    const effects = duplicateView(buildState("a", "b"), { sourceId: "missing" }, ctx)
    expect(effects).toEqual([])
  })

  test("emits createPage as first effect", () => {
    const state = buildState("a", "b", "c")
    const effects = duplicateView(state, { sourceId: "a" }, ctx)
    expect(effects[0]?.kind).toBe("createPage")
  })

  test("createPage seeds the new row's initial properties atomically (no follow-up bulkSetProperties)", () => {
    const state = buildState("a", "b", "c")
    const effects = duplicateView(state, { sourceId: "a" }, ctx)
    const bulk = effects.find((e) => e.kind === "bulkSetProperties")
    expect(bulk).toBeUndefined()
  })

  test("new row name is `${source} (Copy)`", () => {
    const state = [row("a", { name: "My View" })]
    const effects = duplicateView(state, { sourceId: "a" }, ctx)
    const create = effects[0]
    if (create?.kind !== "createPage") throw new Error("unreachable")
    expect(create.properties?.find((p) => p.propertyId === "title")?.value).toBe("My View (Copy)")
    expect(create.properties?.find((p) => p.propertyId === "name")).toBeUndefined()
  })

  test("new row copies source config", () => {
    const cfg: ViewDataJSON = { version: 1, layout: "board", group_by: "status" }
    const state = [row("a", { config: cfg })]
    const effects = duplicateView(state, { sourceId: "a" }, ctx)
    const create = effects[0]
    if (create?.kind !== "createPage") throw new Error("unreachable")
    const copied = asViewData(create.properties?.find((p) => p.propertyId === "config")?.value)
    expect(copied.layout).toBe("board")
    expect(copied.group_by).toBe("status")
  })

  test("source with non-string title becomes ' (Copy)'", () => {
    const state: ViewRow[] = [
      { _id: "a", properties: { title: undefined, config: { version: 1 }, sort_order: 0 } },
    ]
    const effects = duplicateView(state, { sourceId: "a" }, ctx)
    const create = effects[0]
    if (create?.kind !== "createPage") throw new Error("unreachable")
    expect(create.properties?.find((p) => p.propertyId === "title")?.value).toBe(" (Copy)")
    expect(create.properties?.find((p) => p.propertyId === "name")).toBeUndefined()
  })
})

describe("duplicateView insert-after-source", () => {
  test("source at start — new row sort_order is 1, others shift by 1", () => {
    const state = buildState("a", "b", "c")
    const effects = duplicateView(state, { sourceId: "a" }, ctx)
    const create = effects[0]
    if (create?.kind !== "createPage") throw new Error("unreachable")
    expect(create.properties?.find((p) => p.propertyId === "sort_order")?.value).toBe(1)
    expect(findSetProperty(effects, "b", "sort_order")?.value).toBe(2)
    expect(findSetProperty(effects, "c", "sort_order")?.value).toBe(3)
    expect(findSetProperty(effects, "a", "sort_order")).toBeUndefined()
  })

  test("source in middle — only rows after source shift", () => {
    const state = buildState("a", "b", "c", "d")
    const effects = duplicateView(state, { sourceId: "b" }, ctx)
    const create = effects[0]
    if (create?.kind !== "createPage") throw new Error("unreachable")
    expect(create.properties?.find((p) => p.propertyId === "sort_order")?.value).toBe(2)
    expect(findSetProperty(effects, "a", "sort_order")).toBeUndefined()
    expect(findSetProperty(effects, "b", "sort_order")).toBeUndefined()
    expect(findSetProperty(effects, "c", "sort_order")?.value).toBe(3)
    expect(findSetProperty(effects, "d", "sort_order")?.value).toBe(4)
  })

  test("source at end — no shifts, new row sort_order is length", () => {
    const state = buildState("a", "b", "c")
    const effects = duplicateView(state, { sourceId: "c" }, ctx)
    const create = effects[0]
    if (create?.kind !== "createPage") throw new Error("unreachable")
    expect(create.properties?.find((p) => p.propertyId === "sort_order")?.value).toBe(3)
    const shifts = effects.filter((e) => e.kind === "setProperty" && e.propertyId === "sort_order")
    expect(shifts).toHaveLength(0)
  })

  test("single-row state — no shifts, new row sort_order is 1", () => {
    const state = buildState("only")
    const effects = duplicateView(state, { sourceId: "only" }, ctx)
    const create = effects[0]
    if (create?.kind !== "createPage") throw new Error("unreachable")
    expect(create.properties?.find((p) => p.propertyId === "sort_order")?.value).toBe(1)
    const shifts = effects.filter((e) => e.kind === "setProperty" && e.propertyId === "sort_order")
    expect(shifts).toHaveLength(0)
  })

  test("shift uses row's current sort_order + 1, not its index", () => {
    const state: ViewRow[] = [
      row("a", { sort_order: 0 }),
      row("b", { sort_order: 10 }),
      row("c", { sort_order: 20 }),
    ]
    const effects = duplicateView(state, { sourceId: "a" }, ctx)
    expect(findSetProperty(effects, "b", "sort_order")?.value).toBe(11)
    expect(findSetProperty(effects, "c", "sort_order")?.value).toBe(21)
  })

  test("new row createPage uses ctx.newPageId", () => {
    const state = buildState("a")
    const effects = duplicateView(state, { sourceId: "a" }, { ...ctx, newPageId: "dup-id" })
    expect(effects[0]).toMatchObject({ kind: "createPage", pageId: "dup-id" })
  })
})

describe("reorderViews happy path", () => {
  test("full reorder emits one setProperty per id with i index", () => {
    const state = buildState("a", "b", "c")
    const effects = reorderViews(state, { viewIds: ["c", "a", "b"] }, ctx)
    expect(effects).toHaveLength(3)
    expect(findSetProperty(effects, "c", "sort_order")?.value).toBe(0)
    expect(findSetProperty(effects, "a", "sort_order")?.value).toBe(1)
    expect(findSetProperty(effects, "b", "sort_order")?.value).toBe(2)
  })

  test("all effects target sort_order property", () => {
    const state = buildState("a", "b")
    const effects = reorderViews(state, { viewIds: ["b", "a"] }, ctx)
    expect(effects.every((e) => e.kind === "setProperty" && e.propertyId === "sort_order")).toBe(
      true
    )
  })
})

describe("reorderViews edge cases", () => {
  test("empty viewIds returns empty", () => {
    const state = buildState("a", "b")
    expect(reorderViews(state, { viewIds: [] }, ctx)).toEqual([])
  })

  test("empty state returns empty", () => {
    expect(reorderViews([], { viewIds: ["a", "b"] }, ctx)).toEqual([])
  })

  test("partial list (subset of state) only emits for listed ids", () => {
    const state = buildState("a", "b", "c")
    const effects = reorderViews(state, { viewIds: ["b", "a"] }, ctx)
    expect(effects).toHaveLength(2)
    expect(findSetProperty(effects, "b", "sort_order")?.value).toBe(0)
    expect(findSetProperty(effects, "a", "sort_order")?.value).toBe(1)
    expect(findSetProperty(effects, "c", "sort_order")).toBeUndefined()
  })

  test("unknown ids are skipped but known ones still reindex by their position", () => {
    const state = buildState("a", "b")
    const effects = reorderViews(state, { viewIds: ["a", "ghost", "b"] }, ctx)
    expect(effects).toHaveLength(2)
    expect(findSetProperty(effects, "a", "sort_order")?.value).toBe(0)
    expect(findSetProperty(effects, "b", "sort_order")?.value).toBe(2)
    expect(findSetProperty(effects, "ghost", "sort_order")).toBeUndefined()
  })

  test("all unknown ids returns empty", () => {
    const state = buildState("a", "b")
    expect(reorderViews(state, { viewIds: ["x", "y"] }, ctx)).toEqual([])
  })

  test("duplicate id in list still emits for each occurrence", () => {
    const state = buildState("a", "b")
    const effects = reorderViews(state, { viewIds: ["a", "a", "b"] }, ctx)
    expect(effects).toHaveLength(3)
  })
})

describe("duplicateView purity", () => {
  test("duplicateView does not mutate state", () => {
    const state = buildState("a", "b", "c")
    const snapshot = z.unknown().parse(JSON.parse(JSON.stringify(state)))
    duplicateView(state, { sourceId: "a" }, ctx)
    expect(state).toEqual(snapshot)
  })
})
