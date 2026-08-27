import { describe, expect, test } from "bun:test"
import { PageWriteError, rpcErrorSchema } from "./write-error"

describe("PageWriteError", () => {
  test("message is byte-identical to the string this boundary has always thrown", () => {
    const err = new PageWriteError("upsertPage(task)", { message: "boom" })
    expect(err.message).toBe("upsertPage(task): boom")
  })

  test.each([
    ["P0001", "one of our own procs deliberately refused"],
    ["23505", "unique violation"],
    ["57014", "statement timeout"],
  ])("preserves SQLSTATE %s", (code) => {
    const err = new PageWriteError("upsertPage(task)", { message: "boom", code })
    expect(err.code).toBe(code)
  })

  test("a transport failure carries no code rather than a misleading one", () => {
    const err = new PageWriteError("upsertPage(task)", { message: "fetch failed" })
    expect(err.code).toBeUndefined()
  })

  test("preserves details and hint", () => {
    const err = new PageWriteError("upsertPage(task)", {
      message: "boom",
      details: "Key (unique_key)=(k1) already exists.",
      hint: "try another key",
    })
    expect(err.details).toBe("Key (unique_key)=(k1) already exists.")
    expect(err.hint).toBe("try another key")
  })

  test("is an Error, so the 57 callers that only propagate are unaffected", () => {
    const err = new PageWriteError("upsertPage(task)", { message: "boom" })
    expect(err).toBeInstanceOf(Error)
    expect(err.name).toBe("PageWriteError")
  })

  test("schema accepts a null-populated envelope and normalizes to undefined", () => {
    const parsed = rpcErrorSchema.parse({
      message: "boom",
      code: null,
      details: null,
      hint: null,
    })
    const err = new PageWriteError("upsertPage(task)", parsed)
    expect(err.code).toBeUndefined()
    expect(err.details).toBeUndefined()
  })
})
