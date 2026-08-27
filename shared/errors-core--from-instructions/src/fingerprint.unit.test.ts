import { describe, expect, test } from "bun:test"
import { computeFingerprint } from "./fingerprint"
import type { ErrorReport } from "./schema"

function report(overrides: Partial<ErrorReport> = {}): ErrorReport {
  return {
    message: "boom",
    stack: "Error\n  at f (app.js:10:5)",
    kind: "error",
    app: "alanwalton",
    url: "https://alanwalton.com/",
    userAgent: "Mozilla/5.0",
    errorUserId: null,
    ...overrides,
  }
}

describe("computeFingerprint", () => {
  test("returns a 16-char lowercase hex string", () => {
    expect(computeFingerprint(report())).toMatch(/^[0-9a-f]{16}$/)
  })

  test("is deterministic for identical input", () => {
    expect(computeFingerprint(report())).toBe(computeFingerprint(report()))
  })

  test("is stable across fields that do not feed the hash (url, userAgent, kind, releaseSha, errorUserId)", () => {
    const base = computeFingerprint(report())
    const varied = computeFingerprint(
      report({
        url: "https://alanwalton.com/other",
        userAgent: "different",
        kind: "unhandledrejection",
        releaseSha: "deadbeef",
        errorUserId: "user-1",
      })
    )
    expect(varied).toBe(base)
  })

  test("groups logically equal errors whose stacks differ only in line numbers", () => {
    const a = computeFingerprint(report({ stack: "Error\n  at f (app.js:10:5)" }))
    const b = computeFingerprint(report({ stack: "Error\n  at f (app.js:88:1)" }))
    expect(a).toBe(b)
  })

  test("differs for a different message", () => {
    expect(computeFingerprint(report({ message: "boom" }))).not.toBe(
      computeFingerprint(report({ message: "kaboom" }))
    )
  })

  test("differs for a different app", () => {
    expect(computeFingerprint(report({ app: "alanwalton" }))).not.toBe(
      computeFingerprint(report({ app: "temper" }))
    )
  })

  test("differs for a structurally different stack", () => {
    expect(computeFingerprint(report({ stack: "Error\n  at f (app.js:1:1)" }))).not.toBe(
      computeFingerprint(report({ stack: "Error\n  at g (other.js:1:1)" }))
    )
  })

  const nativeCrash = (stack: string): ErrorReport =>
    report({
      kind: "native-crash",
      app: "alanwalton-native",
      message: "EXC_BAD_ACCESS (exceptionType=1 signal=11)",
      stack,
    })

  test("groups native crashes with the same call-stack signature", () => {
    const sig = "AlanWalton+0x1a2b\nAlanWalton+0x3c4d\nUIKitCore+0x5e6f"
    expect(computeFingerprint(nativeCrash(sig))).toBe(computeFingerprint(nativeCrash(sig)))
  })

  test("differs for a different native call-stack signature", () => {
    expect(computeFingerprint(nativeCrash("AlanWalton+0x1a2b\nUIKitCore+0x5e6f"))).not.toBe(
      computeFingerprint(nativeCrash("AlanWalton+0x9999\nUIKitCore+0x5e6f"))
    )
  })

  test("separates a native report from the web app with an identical stack/message", () => {
    const stack = "AlanWalton+0x1a2b\nUIKitCore+0x5e6f"
    const message = "EXC_BAD_ACCESS (exceptionType=1 signal=11)"
    const native = computeFingerprint(
      report({ kind: "native-crash", app: "alanwalton-native", message, stack })
    )
    const web = computeFingerprint(report({ kind: "error", app: "alanwalton", message, stack }))
    expect(native).not.toBe(web)
  })
})
