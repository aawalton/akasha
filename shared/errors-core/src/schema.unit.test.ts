import { describe, expect, test } from "bun:test"
import { type ErrorReport, ErrorReportSchema } from "./schema"

function validReport(overrides: Partial<ErrorReport> = {}): ErrorReport {
  return {
    message: "Cannot read properties of undefined",
    stack: "Error\n  at f (app.js:1:1)",
    kind: "error",
    app: "alanwalton",
    url: "https://alanwalton.com/dashboard",
    userAgent: "Mozilla/5.0",
    releaseSha: "abc123",
    errorUserId: "user-42",
    ...overrides,
  }
}

describe("ErrorReportSchema", () => {
  test("accepts a valid report", () => {
    const result = ErrorReportSchema.safeParse(validReport())
    expect(result.success).toBe(true)
  })

  test("accepts an omitted releaseSha (optional)", () => {
    const { releaseSha, ...rest } = validReport()
    void releaseSha
    expect(ErrorReportSchema.safeParse(rest).success).toBe(true)
  })

  test("accepts a null errorUserId (nullable)", () => {
    expect(ErrorReportSchema.safeParse(validReport({ errorUserId: null })).success).toBe(true)
  })

  test("accepts an empty stack", () => {
    expect(ErrorReportSchema.safeParse(validReport({ stack: "" })).success).toBe(true)
  })

  test("rejects unknown keys (strict)", () => {
    const result = ErrorReportSchema.safeParse({ ...validReport(), extra: "nope" })
    expect(result.success).toBe(false)
  })

  test("rejects an unknown kind", () => {
    const result = ErrorReportSchema.safeParse({ ...validReport(), kind: "warning" })
    expect(result.success).toBe(false)
  })

  test("accepts the native kind webview-process-terminated", () => {
    const result = ErrorReportSchema.safeParse(
      validReport({ kind: "webview-process-terminated", app: "alanwalton-native" })
    )
    expect(result.success).toBe(true)
  })

  test("accepts the native kind native-crash", () => {
    const result = ErrorReportSchema.safeParse(
      validReport({ kind: "native-crash", app: "alanwalton-native" })
    )
    expect(result.success).toBe(true)
  })

  test("rejects an unknown app", () => {
    const result = ErrorReportSchema.safeParse({ ...validReport(), app: "other" })
    expect(result.success).toBe(false)
  })

  test("accepts the native app marker alanwalton-native", () => {
    expect(ErrorReportSchema.safeParse(validReport({ app: "alanwalton-native" })).success).toBe(
      true
    )
  })

  test("still rejects unknown keys on a native report (strict stays)", () => {
    const result = ErrorReportSchema.safeParse({
      ...validReport({ kind: "native-crash", app: "alanwalton-native" }),
      terminationReason: "namespace-signal-9",
    })
    expect(result.success).toBe(false)
  })

  test("rejects an oversized message (> 2048)", () => {
    const result = ErrorReportSchema.safeParse(validReport({ message: "x".repeat(2049) }))
    expect(result.success).toBe(false)
  })

  test("accepts a message at the 2048 cap", () => {
    expect(ErrorReportSchema.safeParse(validReport({ message: "x".repeat(2048) })).success).toBe(
      true
    )
  })

  test("rejects an oversized stack (> 16384)", () => {
    const result = ErrorReportSchema.safeParse(validReport({ stack: "x".repeat(16385) }))
    expect(result.success).toBe(false)
  })

  test("rejects an oversized url (> 2048)", () => {
    const result = ErrorReportSchema.safeParse(validReport({ url: "x".repeat(2049) }))
    expect(result.success).toBe(false)
  })

  test("rejects an oversized userAgent (> 1024)", () => {
    const result = ErrorReportSchema.safeParse(validReport({ userAgent: "x".repeat(1025) }))
    expect(result.success).toBe(false)
  })

  test("rejects an oversized releaseSha (> 64)", () => {
    const result = ErrorReportSchema.safeParse(validReport({ releaseSha: "x".repeat(65) }))
    expect(result.success).toBe(false)
  })

  test("rejects an oversized errorUserId (> 64)", () => {
    const result = ErrorReportSchema.safeParse(validReport({ errorUserId: "x".repeat(65) }))
    expect(result.success).toBe(false)
  })

  test("rejects a missing required field", () => {
    const { message, ...rest } = validReport()
    void message
    expect(ErrorReportSchema.safeParse(rest).success).toBe(false)
  })
})
