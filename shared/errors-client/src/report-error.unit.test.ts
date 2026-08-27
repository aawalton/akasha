import { describe, expect, test } from "bun:test"
import { reportError, resolveReportReleaseSha } from "./report-error"

describe("reportError", () => {
  test("is a no-op and does not throw when window is undefined (SSR)", () => {
    expect(typeof window).toBe("undefined")
    expect(() =>
      reportError({
        message: "boom",
        stack: "Error\n  at f (app.js:10:5)",
        kind: "error",
        app: "alanwalton",
        errorUserId: null,
      })
    ).not.toThrow()
  })

  test("returns undefined", () => {
    const result = reportError({
      message: "boom",
      stack: "",
      kind: "react-render",
      app: "temper",
      errorUserId: "user-1",
      releaseSha: "deadbeef",
    })
    expect(result).toBeUndefined()
  })
})

describe("resolveReportReleaseSha", () => {
  test("caller-supplied releaseSha always wins over the boot default", () => {
    expect(resolveReportReleaseSha("caller-sha", "boot-sha")).toBe("caller-sha")
  })

  test("falls back to the boot default when the caller omits it", () => {
    expect(resolveReportReleaseSha(undefined, "boot-sha")).toBe("boot-sha")
  })

  test("omits the key (undefined) when neither is set", () => {
    expect(resolveReportReleaseSha(undefined, "")).toBeUndefined()
  })

  test("an empty caller value is honored (not treated as absent)", () => {
    expect(resolveReportReleaseSha("", "boot-sha")).toBe("")
  })
})
