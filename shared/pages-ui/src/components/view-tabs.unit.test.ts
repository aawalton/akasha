import { describe, expect, it } from "bun:test"
import { classifyViewTabs } from "./view-tabs"

describe("classifyViewTabs", () => {
  it("with no active id, fills full then icon then overflow in order", () => {
    const result = classifyViewTabs(["a", "b", "c", "d", "e"], undefined, 2, 2)
    expect(result.get("a")).toBe("full")
    expect(result.get("b")).toBe("full")
    expect(result.get("c")).toBe("icon")
    expect(result.get("d")).toBe("icon")
    expect(result.get("e")).toBe("overflow")
  })

  it("when active is already in the default full set, leaves classification unchanged", () => {
    const result = classifyViewTabs(["a", "b", "c", "d", "e"], "a", 2, 2)
    expect(result.get("a")).toBe("full")
    expect(result.get("b")).toBe("full")
    expect(result.get("c")).toBe("icon")
    expect(result.get("d")).toBe("icon")
    expect(result.get("e")).toBe("overflow")
  })

  it("promotes the active tab to full when it would otherwise be icon, demoting the last default-full to icon", () => {
    const result = classifyViewTabs(["a", "b", "c", "d", "e"], "c", 2, 2)
    expect(result.get("a")).toBe("full")
    expect(result.get("b")).toBe("icon")
    expect(result.get("c")).toBe("full")
    expect(result.get("d")).toBe("icon")
    expect(result.get("e")).toBe("overflow")
  })

  it("promotes the active tab to full when it would otherwise be in overflow, cascading demotions", () => {
    const result = classifyViewTabs(["a", "b", "c", "d", "e"], "e", 2, 2)
    expect(result.get("a")).toBe("full")
    expect(result.get("b")).toBe("icon")
    expect(result.get("c")).toBe("icon")
    expect(result.get("d")).toBe("overflow")
    expect(result.get("e")).toBe("full")
  })

  it("treats an unknown active id as no active id", () => {
    const result = classifyViewTabs(["a", "b", "c"], "missing", 1, 1)
    expect(result.get("a")).toBe("full")
    expect(result.get("b")).toBe("icon")
    expect(result.get("c")).toBe("overflow")
  })

  it("when fullCount is 0, the active tab cannot be promoted to full", () => {
    const result = classifyViewTabs(["a", "b", "c"], "a", 0, 2)
    expect(result.get("a")).toBe("icon")
    expect(result.get("b")).toBe("icon")
    expect(result.get("c")).toBe("overflow")
  })

  it("when iconCount is 0, demoted full tabs go straight to overflow", () => {
    const result = classifyViewTabs(["a", "b", "c"], "b", 1, 0)
    expect(result.get("a")).toBe("overflow")
    expect(result.get("b")).toBe("full")
    expect(result.get("c")).toBe("overflow")
  })

  it("returns an empty map for an empty list", () => {
    expect(classifyViewTabs([], undefined, 2, 2).size).toBe(0)
  })
})
