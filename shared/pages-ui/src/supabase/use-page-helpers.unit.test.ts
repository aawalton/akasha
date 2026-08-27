import { describe, expect, it } from "bun:test"
import type { PageWithProperties } from "./types"
import { composeContentTierPage } from "./use-page-helpers"

describe("composeContentTierPage", () => {
  const makePage = (properties: Record<string, unknown>): PageWithProperties => ({
    _id: "page-1",
    properties,
  })

  it("merges: mirror wins shared keys, on-demand supplies the content-tier prose", () => {
    const onDemand = makePage({ id: "page-1", title: "Stale Title", text: "The prose body" })
    const mirror = makePage({ id: "page-1", title: "Fresh Title", progress: 42 })
    const merged = composeContentTierPage(onDemand, mirror)
    expect(merged?.properties).toEqual({
      id: "page-1",
      title: "Fresh Title",
      text: "The prose body",
      progress: 42,
    })
  })

  it("passes the on-demand copy through when no mirror row has landed", () => {
    const onDemand = makePage({ id: "page-1", text: "The prose body" })
    expect(composeContentTierPage(onDemand, null)).toBe(onDemand)
  })

  it("passes the mirror copy through while the content fetch is outstanding", () => {
    const mirror = makePage({ id: "page-1", title: "Fresh Title" })
    expect(composeContentTierPage(null, mirror)).toBe(mirror)
  })

  it("returns null when neither copy exists", () => {
    expect(composeContentTierPage(null, null)).toBeNull()
  })
})
