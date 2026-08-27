import { describe, expect, it } from "bun:test"
import {
  type ActionPresentation,
  type ActionVerbContext,
  type ActionVerbHandler,
  getActionVerb,
  getActionVerbPresentation,
  type ResolveActionPresentation,
  registerActionVerb,
  unregisterActionVerb,
} from "./action-verb-registry"

const ctx: ActionVerbContext = {
  pageId: "p1",
  pageTypeSlug: "things",
  data: {},
  verbId: "v1",
  config: { verbId: "v1" },
}

describe("action-verb registry", () => {
  it("register then get returns the registered handler", () => {
    const handler: ActionVerbHandler = () => {}
    registerActionVerb("verb-a", handler)
    expect(getActionVerb("verb-a")).toBe(handler)
    unregisterActionVerb("verb-a")
  })

  it("get of an unknown verbId returns undefined", () => {
    expect(getActionVerb("never-registered")).toBeUndefined()
  })

  it("re-registering the same verbId replaces the handler (last wins)", () => {
    const first: ActionVerbHandler = () => {}
    const second: ActionVerbHandler = () => {}
    registerActionVerb("verb-b", first)
    registerActionVerb("verb-b", second)
    expect(getActionVerb("verb-b")).toBe(second)
    unregisterActionVerb("verb-b")
  })

  it("unregister removes a registered handler", () => {
    const handler: ActionVerbHandler = () => {}
    registerActionVerb("verb-c", handler)
    unregisterActionVerb("verb-c")
    expect(getActionVerb("verb-c")).toBeUndefined()
  })

  it("unregister of an unknown verbId is a no-op (does not throw)", () => {
    expect(() => unregisterActionVerb("ghost")).not.toThrow()
  })

  it("a registered handler receives the full ActionVerbContext when invoked", () => {
    let received: ActionVerbContext | undefined
    const handler: ActionVerbHandler = (c) => {
      received = c
    }
    registerActionVerb("verb-d", handler)
    getActionVerb("verb-d")?.(ctx)
    expect(received).toEqual(ctx)
    unregisterActionVerb("verb-d")
  })
})

describe("action-verb registry — resolvePresentation overlay (#14285)", () => {
  const noop: ActionVerbHandler = () => {}

  it("registering with a 3rd arg exposes it via getActionVerbPresentation", () => {
    const resolve: ResolveActionPresentation = () => ({ label: "X" })
    registerActionVerb("pres-a", noop, resolve)
    expect(getActionVerbPresentation("pres-a")).toBe(resolve)
    unregisterActionVerb("pres-a")
  })

  it("getActionVerb still returns the handler when registered 3-arg (back-compat)", () => {
    const resolve: ResolveActionPresentation = () => ({})
    registerActionVerb("pres-b", noop, resolve)
    expect(getActionVerb("pres-b")).toBe(noop)
    unregisterActionVerb("pres-b")
  })

  it("registering with only a handler leaves the presentation undefined", () => {
    registerActionVerb("pres-c", noop)
    expect(getActionVerbPresentation("pres-c")).toBeUndefined()
    unregisterActionVerb("pres-c")
  })

  it("getActionVerbPresentation of an unknown verbId returns undefined", () => {
    expect(getActionVerbPresentation("never-registered")).toBeUndefined()
  })

  it("re-registering replaces both handler and presentation (last wins)", () => {
    const firstResolve: ResolveActionPresentation = () => ({ label: "first" })
    const secondResolve: ResolveActionPresentation = () => ({ label: "second" })
    registerActionVerb("pres-d", noop, firstResolve)
    registerActionVerb("pres-d", noop, secondResolve)
    expect(getActionVerbPresentation("pres-d")).toBe(secondResolve)
    unregisterActionVerb("pres-d")
  })

  it("re-registering 2-arg over a 3-arg entry clears the presentation", () => {
    const resolve: ResolveActionPresentation = () => ({ label: "gone" })
    registerActionVerb("pres-e", noop, resolve)
    registerActionVerb("pres-e", noop)
    expect(getActionVerbPresentation("pres-e")).toBeUndefined()
    unregisterActionVerb("pres-e")
  })

  it("the resolved presentation is a pure derivation from ctx", () => {
    const resolve: ResolveActionPresentation = (c): ActionPresentation =>
      c.data["locked"] === true ? { label: "Unlock", disabled: false } : { label: "Lock" }
    registerActionVerb("pres-f", noop, resolve)
    const got = getActionVerbPresentation("pres-f")
    expect(got?.({ ...ctx, data: { locked: true } })).toEqual({ label: "Unlock", disabled: false })
    expect(got?.({ ...ctx, data: {} })).toEqual({ label: "Lock" })
    unregisterActionVerb("pres-f")
  })
})
