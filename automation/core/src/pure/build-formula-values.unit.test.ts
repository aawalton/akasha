import { describe, expect, test } from "bun:test"
import type { ReadonlyJSONValue } from "@shared/pages-core/schema/pages"
import { buildFormulaValues } from "./build-formula-values"
import type { EvaluationContext, RelationCache } from "./types"

const ctx = (
  source: Record<string, ReadonlyJSONValue>,
  previous: Record<string, ReadonlyJSONValue> = {}
): EvaluationContext => ({ source: { ...source, previous } })

describe("buildFormulaValues", () => {
  test("substitutes relation property id-string with the cached related-page properties", () => {
    const c = ctx({ id: "src-1", rel: "related-page-id" })
    const cache: RelationCache = {
      rel: { title: "Related title", count: 7 },
    }
    const result = buildFormulaValues(c, cache)
    expect(result.source.rel).toEqual({ title: "Related title", count: 7 })
  })

  test("leaves non-relation properties unchanged", () => {
    const c = ctx({ id: "src-1", title: "Plain", rel: "related-page-id" })
    const cache: RelationCache = {
      rel: { title: "Related title" },
    }
    const result = buildFormulaValues(c, cache)
    expect(result.source.id).toBe("src-1")
    expect(result.source.title).toBe("Plain")
  })

  test("leaves source.previous unchanged (it's the namespace name, not a relation)", () => {
    const c = ctx({ id: "src-1", rel: "related-page-id" }, { completedAt: null })
    const cache: RelationCache = {
      rel: { title: "Related title" },
    }
    const result = buildFormulaValues(c, cache)
    expect(result.source.previous).toEqual({ completedAt: null })
  })

  test("substitutes null when the cache entry is null (relation missing or page not found)", () => {
    const c = ctx({ id: "src-1", rel: "related-page-id" })
    const cache: RelationCache = { rel: null }
    const result = buildFormulaValues(c, cache)
    expect(result.source.rel).toBeNull()
  })

  test("empty relation cache returns ctx.source structurally unchanged", () => {
    const c = ctx({ id: "src-1", title: "Plain", rel: "related-page-id" })
    const cache: RelationCache = {}
    const result = buildFormulaValues(c, cache)
    expect(result.source).toEqual(c.source)
  })

  test("handles multiple substitutions in one call", () => {
    const c = ctx({
      id: "src-1",
      owner: "owner-page-id",
      assignee: "assignee-page-id",
      title: "Plain",
    })
    const cache: RelationCache = {
      owner: { name: "Alice", email: "a@example.com" },
      assignee: { name: "Bob", email: "b@example.com" },
    }
    const result = buildFormulaValues(c, cache)
    expect(result.source.owner).toEqual({ name: "Alice", email: "a@example.com" })
    expect(result.source.assignee).toEqual({ name: "Bob", email: "b@example.com" })
    expect(result.source.title).toBe("Plain")
  })

  test("does not mutate the input ctx.source", () => {
    const c = ctx({ id: "src-1", rel: "related-page-id" })
    const before = { ...c.source }
    const cache: RelationCache = { rel: { title: "Related title" } }
    buildFormulaValues(c, cache)
    expect(c.source).toEqual(before)
    expect(c.source.rel).toBe("related-page-id")
  })
})
