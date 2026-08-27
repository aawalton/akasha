import { describe, expect, test } from "bun:test"
import { type BrowserAuthMode, resolveBrowserAuthMode } from "./auth-mode"

describe("resolveBrowserAuthMode", () => {
  test("capacitor:// origin selects the local (localStorage) session store", () => {
    expect(resolveBrowserAuthMode("capacitor:")).toBe("capacitor-local")
  })

  test.each([
    ["https:", "cookie-ssr"],
    ["http:", "cookie-ssr"],
    ["file:", "cookie-ssr"],
    [undefined, "cookie-ssr"],
    ["", "cookie-ssr"],
  ] satisfies ReadonlyArray<
    readonly [string | undefined, BrowserAuthMode]
  >)("%p origin keeps the unchanged cookie SSR session", (protocol, expected) => {
    expect(resolveBrowserAuthMode(protocol)).toBe(expected)
  })
})
