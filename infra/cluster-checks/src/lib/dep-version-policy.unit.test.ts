import { describe, expect, test } from "bun:test"

import {
  computePinViolations,
  EXACT_PIN_REQUIRED,
  isExactPin,
  type PinDepEntry,
} from "./dep-version-policy.ts"

describe("EXACT_PIN_REQUIRED", () => {
  test("is exactly the deps no other gate refuses a floating range on", () => {
    expect([...EXACT_PIN_REQUIRED].sort()).toEqual(["@typescript/native-preview"])
  })
})

describe("isExactPin", () => {
  test("accepts concrete versions, incl. prerelease and build metadata", () => {
    expect(isExactPin("1.2.3")).toBe(true)
    expect(isExactPin("7.0.0-dev.20260510.1")).toBe(true)
    expect(isExactPin("1.2.3+build.5")).toBe(true)
  })

  test("rejects ranges, wildcards, unions, and protocols", () => {
    expect(isExactPin("^7.0.0-dev.20260404.1")).toBe(false)
    expect(isExactPin("~1.2.3")).toBe(false)
    expect(isExactPin(">=1.0.0")).toBe(false)
    expect(isExactPin("1.2.x")).toBe(false)
    expect(isExactPin("*")).toBe(false)
    expect(isExactPin("1.2.3 || 1.3.0")).toBe(false)
    expect(isExactPin("workspace:*")).toBe(false)
    expect(isExactPin("npm:@scope/pkg@1.2.3")).toBe(false)
  })
})

describe("computePinViolations", () => {
  const required = new Set<string>(["@typescript/native-preview"])
  const entry = (version: string, workspace = "(root)"): PinDepEntry => ({
    workspace,
    version,
    depType: "dependencies",
  })

  test("flags a caret spec on a required dep", () => {
    const map = new Map<string, readonly PinDepEntry[]>([
      ["@typescript/native-preview", [entry("^7.0.0-dev.20260404.1")]],
    ])
    const out = computePinViolations(map, required)
    expect(out).toHaveLength(1)
    expect(out[0]?.package).toBe("@typescript/native-preview")
    expect(out[0]?.version).toBe("^7.0.0-dev.20260404.1")
  })

  test("passes an exact spec on a required dep", () => {
    const map = new Map<string, readonly PinDepEntry[]>([
      ["@typescript/native-preview", [entry("7.0.0-dev.20260510.1")]],
    ])
    expect(computePinViolations(map, required)).toHaveLength(0)
  })

  test("ignores a required dep absent from the map", () => {
    const map = new Map<string, readonly PinDepEntry[]>([["zod", [entry("^3.0.0")]]])
    expect(computePinViolations(map, required)).toHaveLength(0)
  })

  test("never flags a non-required dep with a caret", () => {
    const map = new Map<string, readonly PinDepEntry[]>([["zod", [entry("^3.0.0")]]])
    expect(computePinViolations(map, required)).toHaveLength(0)
  })

  test("emits one violation per offending workspace entry", () => {
    const map = new Map<string, readonly PinDepEntry[]>([
      [
        "@typescript/native-preview",
        [entry("^7.0.0-dev.1", "(root)"), entry("7.0.0-dev.2", "@temper/web")],
      ],
    ])
    const out = computePinViolations(map, required)
    expect(out).toHaveLength(1)
    expect(out[0]?.workspace).toBe("(root)")
  })
})
