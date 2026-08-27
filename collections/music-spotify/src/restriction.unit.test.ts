import { describe, expect, test } from "bun:test"
import { attemptOrRecordRestriction } from "./restriction"

describe("attemptOrRecordRestriction", () => {
  test("returns the data on success", async () => {
    const outcome = await attemptOrRecordRestriction(() => Promise.resolve({ ok: 1 }))
    expect(outcome).toEqual({ available: true, data: { ok: 1 } })
  })

  test("records a 403 restriction from the client error message", async () => {
    const outcome = await attemptOrRecordRestriction(() =>
      Promise.reject(new Error("spotify API 403 Forbidden\nURL: x"))
    )
    expect(outcome).toEqual({ available: false, status: 403 })
  })

  test("records a 404 restriction from the client error message", async () => {
    const outcome = await attemptOrRecordRestriction(() =>
      Promise.reject(new Error("spotify API 404 Not Found\nURL: x"))
    )
    expect(outcome).toEqual({ available: false, status: 404 })
  })

  test("propagates a non-restriction error (500)", async () => {
    await expect(
      attemptOrRecordRestriction(() => Promise.reject(new Error("spotify API 500 Server Error")))
    ).rejects.toThrow(/spotify API 500/)
  })

  test("propagates a non-Error rejection that carries no restriction marker", async () => {
    await expect(
      attemptOrRecordRestriction(() => Promise.reject("plain string failure"))
    ).rejects.toBe("plain string failure")
  })
})
