import { describe, expect, it } from "bun:test"
import {
  getReorderVerb,
  type ReorderVerbContext,
  type ReorderVerbHandler,
  registerReorderVerb,
  unregisterReorderVerb,
} from "./reorder-verb-registry"

const ctx: ReorderVerbContext = {
  orderedIds: ["a", "b", "c"],
  fromIndex: 2,
  toIndex: 0,
  viewId: "view-1",
  pageTypeSlug: "things",
}

describe("reorder-verb registry", () => {
  it("register then get returns the registered handler", () => {
    const handler: ReorderVerbHandler = () => {}
    registerReorderVerb("verb-a", handler)
    expect(getReorderVerb("verb-a")).toBe(handler)
    unregisterReorderVerb("verb-a")
  })

  it("get of an unknown verbId returns undefined", () => {
    expect(getReorderVerb("never-registered")).toBeUndefined()
  })

  it("re-registering the same verbId replaces the handler (last wins)", () => {
    const first: ReorderVerbHandler = () => {}
    const second: ReorderVerbHandler = () => {}
    registerReorderVerb("verb-b", first)
    registerReorderVerb("verb-b", second)
    expect(getReorderVerb("verb-b")).toBe(second)
    unregisterReorderVerb("verb-b")
  })

  it("unregister removes a registered handler", () => {
    const handler: ReorderVerbHandler = () => {}
    registerReorderVerb("verb-c", handler)
    unregisterReorderVerb("verb-c")
    expect(getReorderVerb("verb-c")).toBeUndefined()
  })

  it("unregister of an unknown verbId is a no-op (does not throw)", () => {
    expect(() => unregisterReorderVerb("ghost")).not.toThrow()
  })

  it("a registered handler receives the full ReorderVerbContext when invoked", () => {
    let received: ReorderVerbContext | undefined
    const handler: ReorderVerbHandler = (c) => {
      received = c
    }
    registerReorderVerb("verb-d", handler)
    getReorderVerb("verb-d")?.(ctx)
    expect(received).toEqual(ctx)
    unregisterReorderVerb("verb-d")
  })
})
