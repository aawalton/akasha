import { afterEach, describe, expect, test } from "bun:test"
import {
  getPageDisplay,
  isRegisteredDisplay,
  type PageDisplayMeta,
  registerPageDisplay,
  unregisterPageDisplay,
} from "./page-display-registry"

afterEach(() => {
  unregisterPageDisplay("chess")
  unregisterPageDisplay("idle")
  unregisterPageDisplay("awen")
})

describe("page-display registry", () => {
  test("register then get returns the registered metadata", () => {
    const meta: PageDisplayMeta = { offlineCapable: false }
    registerPageDisplay("chess", meta)
    expect(getPageDisplay("chess")).toEqual(meta)
  })

  test("register marks the kind as registered", () => {
    registerPageDisplay("idle", { offlineCapable: true })
    expect(isRegisteredDisplay("idle")).toBe(true)
  })

  test("last registration wins", () => {
    registerPageDisplay("awen", { offlineCapable: false })
    registerPageDisplay("awen", { offlineCapable: true })
    expect(getPageDisplay("awen")).toEqual({ offlineCapable: true })
  })

  test("offlineCapable defaults to absent (the offline gate reads it directly)", () => {
    registerPageDisplay("idle", {})
    expect(getPageDisplay("idle")?.offlineCapable).toBeUndefined()
  })

  test("unknown kind is undefined and not registered", () => {
    expect(getPageDisplay("chess")).toBeUndefined()
    expect(isRegisteredDisplay("chess")).toBe(false)
  })

  test("built-in kinds are not registered here", () => {
    expect(isRegisteredDisplay("default")).toBe(false)
    expect(isRegisteredDisplay("reader")).toBe(false)
    expect(isRegisteredDisplay("collection")).toBe(false)
  })

  test("unregister removes the declaration", () => {
    registerPageDisplay("chess", { offlineCapable: false })
    unregisterPageDisplay("chess")
    expect(getPageDisplay("chess")).toBeUndefined()
    expect(isRegisteredDisplay("chess")).toBe(false)
  })

  test("unregister is a no-op on an unknown kind", () => {
    expect(() => unregisterPageDisplay("never-registered")).not.toThrow()
  })
})
