import { describe, expect, test } from "bun:test"
import { parseViewDataJSON, type ViewDataJSON } from "../schema/view-data"
import { duplicateView, updateViewConfig } from "./reducers"
import type { JsonPatchOp, ReducerCtx, ViewRow } from "./types"

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
      name: overrides.name ?? id,
      config: "config" in overrides ? overrides.config : { version: 1 },
      sort_order: overrides.sort_order ?? 0,
    },
  }
}

function expectApplyPagePatch(
  effects: ReturnType<typeof updateViewConfig>,
  pageId: string
): readonly JsonPatchOp[] {
  expect(effects).toHaveLength(1)
  const effect = effects[0]
  if (effect?.kind !== "applyPagePatch") {
    throw new Error(`expected applyPagePatch effect, got ${effect?.kind}`)
  }
  expect(effect.pageId).toBe(pageId)
  return effect.patch
}

function asViewData(value: unknown): ViewDataJSON {
  const result = parseViewDataJSON(value)
  if (!result.ok) throw new Error(`expected ViewDataJSON, got: ${result.error.message}`)
  return result.data
}

describe("updateViewConfig happy path", () => {
  test("emits one applyPagePatch effect", () => {
    const state = [row("a", { config: { version: 1, layout: "table" } })]
    const effects = updateViewConfig(state, { id: "a", updates: { layout: "grid" } }, ctx)
    expect(effects).toHaveLength(1)
    expect(effects[0]?.kind).toBe("applyPagePatch")
  })

  test("returns empty array when id not in state", () => {
    const state = [row("a")]
    const effects = updateViewConfig(state, { id: "missing", updates: { layout: "grid" } }, ctx)
    expect(effects).toEqual([])
  })
})

describe("updateViewConfig — per-field ops on existing config", () => {
  test("single-field update emits add at /config/<key> plus version", () => {
    const state = [row("a", { config: { version: 1, layout: "table" } })]
    const ops = expectApplyPagePatch(
      updateViewConfig(state, { id: "a", updates: { layout: "grid" } }, ctx),
      "a"
    )
    expect(ops).toEqual([
      { op: "add", path: "/config/layout", value: "grid" },
      { op: "add", path: "/config/version", value: 1 },
    ])
  })

  test("multi-field update emits one add per field plus version", () => {
    const state = [row("a", { config: { version: 1, layout: "table" } })]
    const ops = expectApplyPagePatch(
      updateViewConfig(
        state,
        {
          id: "a",
          updates: {
            layout: "board",
            visible_properties: ["x"],
            sorts: [{ field: "n", direction: "asc" }],
          },
        },
        ctx
      ),
      "a"
    )
    expect(ops).toContainEqual({ op: "add", path: "/config/layout", value: "board" })
    expect(ops).toContainEqual({ op: "add", path: "/config/visible_properties", value: ["x"] })
    expect(ops).toContainEqual({
      op: "add",
      path: "/config/sorts",
      value: [{ field: "n", direction: "asc" }],
    })
    expect(ops).toContainEqual({ op: "add", path: "/config/version", value: 1 })
    expect(ops).toHaveLength(4)
  })

  test("undefined values are skipped (still emits version)", () => {
    const state = [row("a", { config: { version: 1, layout: "table" } })]
    const ops = expectApplyPagePatch(
      updateViewConfig(state, { id: "a", updates: { layout: undefined } }, ctx),
      "a"
    )
    expect(ops).toEqual([{ op: "add", path: "/config/version", value: 1 }])
  })

  test("paths target sub-keys disjointly so concurrent writers cannot clobber", () => {
    const state = [row("a", { config: { version: 1 } })]
    const opsA = expectApplyPagePatch(
      updateViewConfig(state, { id: "a", updates: { sorts: [] } }, ctx),
      "a"
    )
    const opsB = expectApplyPagePatch(
      updateViewConfig(state, { id: "a", updates: { filters: [] } }, ctx),
      "a"
    )
    const pathsA = opsA.map((o) => o.path)
    const pathsB = opsB.map((o) => o.path)
    expect(pathsA).toContain("/config/sorts")
    expect(pathsB).toContain("/config/filters")
    const overlap = pathsA.filter((p) => pathsB.includes(p) && p !== "/config/version")
    expect(overlap).toEqual([])
  })
})

describe("updateViewConfig — JSON Pointer escaping", () => {
  test("escapes ~ to ~0 and / to ~1 in the key segment", () => {
    const state = [row("a", { config: { version: 1 } })]
    const ops = expectApplyPagePatch(
      updateViewConfig(
        state,
        // @ts-expect-error - test passes intentionally-malformed key to exercise JSON-Pointer escaping; reducer iterates Object.entries and does not depend on the key being a known field
        { id: "a", updates: { "weird/key~name": 1 } },
        ctx
      ),
      "a"
    )
    expect(ops).toContainEqual({
      op: "add",
      path: "/config/weird~1key~0name",
      value: 1,
    })
  })
})

describe("updateViewConfig — fresh-config seed branch", () => {
  test("missing config seeds with single /config add", () => {
    const state = [row("a", { config: undefined })]
    const ops = expectApplyPagePatch(
      updateViewConfig(state, { id: "a", updates: { layout: "grid" } }, ctx),
      "a"
    )
    expect(ops).toEqual([{ op: "add", path: "/config", value: { layout: "grid", version: 1 } }])
  })

  test("null config seeds with single /config add", () => {
    const state = [row("a", { config: null })]
    const ops = expectApplyPagePatch(
      updateViewConfig(state, { id: "a", updates: { layout: "grid" } }, ctx),
      "a"
    )
    expect(ops).toEqual([{ op: "add", path: "/config", value: { layout: "grid", version: 1 } }])
  })

  test("array config (legacy / corrupted) seeds with single /config add", () => {
    const state = [row("a", { config: [] })]
    const ops = expectApplyPagePatch(
      updateViewConfig(state, { id: "a", updates: { layout: "board" } }, ctx),
      "a"
    )
    expect(ops).toEqual([{ op: "add", path: "/config", value: { layout: "board", version: 1 } }])
  })

  test("string config (legacy JSON string) seeds with single /config add", () => {
    const state = [row("a", { config: '{"layout":"table"}' })]
    const ops = expectApplyPagePatch(
      updateViewConfig(state, { id: "a", updates: { layout: "grid" } }, ctx),
      "a"
    )
    expect(ops).toEqual([{ op: "add", path: "/config", value: { layout: "grid", version: 1 } }])
  })
})

describe("duplicateView (unchanged contract)", () => {
  test("absent version on source still coerces to 1 in the duplicated config blob", () => {
    const state = [row("a", { config: { layout: "board" }, name: "Source" })]
    const effects = duplicateView(state, { sourceId: "a" }, ctx)
    const create = effects[0]
    if (create?.kind !== "createPage") throw new Error("expected createPage")
    const cfg = asViewData(create.properties?.find((p) => p.propertyId === "config")?.value)
    expect(cfg.version).toBe(1)
    expect(cfg.layout).toBe("board")
  })
})
