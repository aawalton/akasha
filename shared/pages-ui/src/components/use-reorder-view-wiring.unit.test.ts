import { describe, expect, it } from "bun:test"
import {
  type ReorderVerbContext,
  registerReorderVerb,
  unregisterReorderVerb,
} from "../reorder-verbs/reorder-verb-registry"
import { deriveReorderCardsHandler } from "./use-reorder-view-wiring"

describe("deriveReorderCardsHandler", () => {
  it("returns undefined when the reorder facet is absent (no affordance wired)", () => {
    expect(
      deriveReorderCardsHandler({ reorder: undefined, viewId: "v1", pageTypeSlug: "things" })
    ).toBeUndefined()
  })

  it("returns a callback when the reorder facet is present", () => {
    const handler = deriveReorderCardsHandler({
      reorder: { verbId: "idle-lineup" },
      viewId: "v1",
      pageTypeSlug: "things",
    })
    expect(typeof handler).toBe("function")
  })

  it("dispatches the registered verb with the built multi-row context on drop", () => {
    let received: ReorderVerbContext | undefined
    registerReorderVerb("idle-lineup", (c) => {
      received = c
    })
    const handler = deriveReorderCardsHandler({
      reorder: { verbId: "idle-lineup" },
      viewId: "v1",
      pageTypeSlug: "things",
    })
    handler?.({ orderedIds: ["b", "a", "c"], fromIndex: 0, toIndex: 1 })
    expect(received).toEqual({
      orderedIds: ["b", "a", "c"],
      fromIndex: 0,
      toIndex: 1,
      viewId: "v1",
      pageTypeSlug: "things",
    })
    unregisterReorderVerb("idle-lineup")
  })

  it("is a safe no-op when the facet names an unregistered verb (does not throw)", () => {
    const handler = deriveReorderCardsHandler({
      reorder: { verbId: "not-registered" },
      viewId: undefined,
      pageTypeSlug: "things",
    })
    expect(() => handler?.({ orderedIds: ["a"], fromIndex: 0, toIndex: 0 })).not.toThrow()
  })
})
