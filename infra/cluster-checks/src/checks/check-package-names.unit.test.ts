import { describe, expect, test } from "bun:test"
import { expectedPackageName } from "./check-package-names.ts"

describe("expectedPackageName", () => {
  test("scope and single name segment", () => {
    expect(expectedPackageName("temper/web")).toBe("@temper/web")
  })

  test("multi-level path joined with dashes", () => {
    expect(expectedPackageName("lua-compiler/vendor/tstl")).toBe("@lua-compiler/vendor-tstl")
  })

  test("kebab-case segment is preserved as-is", () => {
    expect(expectedPackageName("temper/game-champion-points")).toBe("@temper/game-champion-points")
  })

  test("flattened two-word name under a scope", () => {
    expect(expectedPackageName("shared/pages-access")).toBe("@shared/pages-access")
  })

  test("scope-only path (no remaining segments) throws", () => {
    expect(() => expectedPackageName("temper")).toThrow(/at least scope \+ one segment/)
  })
})
