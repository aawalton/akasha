import { describe, expect, test } from "bun:test"
import { expectedPackageName } from "./check-package-names.ts"

describe("expectedPackageName", () => {
  test("single segment after scope", () => {
    expect(expectedPackageName("packages/temper/web")).toBe("@temper/web")
  })

  test("multi-level path joined with dashes", () => {
    expect(expectedPackageName("packages/temper/domain/inventory")).toBe("@temper/domain-inventory")
  })

  test("kebab-case segment is preserved as-is", () => {
    expect(expectedPackageName("packages/temper/domain/champion-points")).toBe(
      "@temper/domain-champion-points"
    )
  })

  test("three-level path under shared scope", () => {
    expect(expectedPackageName("packages/shared/design/primitives")).toBe(
      "@shared/design-primitives"
    )
  })

  test("two-segment shared pages path", () => {
    expect(expectedPackageName("packages/shared/pages/access")).toBe("@shared/pages-access")
  })

  test("path not under packages/ throws", () => {
    expect(() => expectedPackageName("apps/foo/bar")).toThrow(/must start with "packages\/"/)
  })

  test("scope-only path (no remaining segments) throws", () => {
    expect(() => expectedPackageName("packages/temper")).toThrow(/at least scope \+ one segment/)
  })
})
