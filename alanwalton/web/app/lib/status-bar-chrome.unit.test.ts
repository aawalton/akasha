import { describe, expect, it } from "bun:test"
import { classifyStatusBarBridge, decideStatusBarCall } from "./status-bar-chrome"

describe("decideStatusBarCall", () => {
  it("hides when chrome goes hidden", () => {
    expect(decideStatusBarCall(false, true)).toBe("hide")
  })

  it("shows when chrome comes back", () => {
    expect(decideStatusBarCall(true, false)).toBe("show")
  })

  it("dedups unchanged states", () => {
    expect(decideStatusBarCall(true, true)).toBeNull()
    expect(decideStatusBarCall(false, false)).toBeNull()
  })

  it("hides on initial mount when the seam is already set", () => {
    expect(decideStatusBarCall(null, true)).toBe("hide")
  })

  it("skips the gratuitous show() on initial mount with chrome visible", () => {
    expect(decideStatusBarCall(null, false)).toBeNull()
  })
})

describe("classifyStatusBarBridge", () => {
  it("classifies a plain browser as web (the only silent case)", () => {
    expect(classifyStatusBarBridge(false, false)).toBe("web")
    expect(classifyStatusBarBridge(false, true)).toBe("web")
  })

  it("classifies a native shell without the plugin as native-missing-plugin", () => {
    expect(classifyStatusBarBridge(true, false)).toBe("native-missing-plugin")
  })

  it("classifies a native shell with the plugin as ready", () => {
    expect(classifyStatusBarBridge(true, true)).toBe("ready")
  })
})
