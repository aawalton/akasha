import { describe, expect, test } from "bun:test"
import { isHardcodedSurfaceLiteral } from "./jsx-surface-tokens.ts"

describe("isHardcodedSurfaceLiteral", () => {
  test("flags bare bg-surface-N literals (0..4)", () => {
    for (const n of [0, 1, 2, 3, 4]) {
      expect(isHardcodedSurfaceLiteral(`bg-surface-${n}`)).toBe(true)
    }
  })

  test("flags `!`-prefixed bare literals (important marker)", () => {
    expect(isHardcodedSurfaceLiteral("!bg-surface-2")).toBe(true)
  })

  test("does not flag variant-prefixed forms (hover, data, responsive)", () => {
    expect(isHardcodedSurfaceLiteral("hover:bg-surface-2")).toBe(false)
    expect(isHardcodedSurfaceLiteral("data-[state=open]:bg-surface-1")).toBe(false)
    expect(isHardcodedSurfaceLiteral("md:bg-surface-3")).toBe(false)
    expect(isHardcodedSurfaceLiteral("dark:hover:bg-surface-4")).toBe(false)
  })

  test("does not flag out-of-range surface tokens", () => {
    expect(isHardcodedSurfaceLiteral("bg-surface-5")).toBe(false)
    expect(isHardcodedSurfaceLiteral("bg-surface-")).toBe(false)
    expect(isHardcodedSurfaceLiteral("bg-surface-12")).toBe(false)
  })

  test("does not flag unrelated bg tokens", () => {
    expect(isHardcodedSurfaceLiteral("bg-accent")).toBe(false)
    expect(isHardcodedSurfaceLiteral("bg-green/15")).toBe(false)
    expect(isHardcodedSurfaceLiteral("bg-transparent")).toBe(false)
  })
})
