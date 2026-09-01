import { describe, expect, test } from "bun:test"
import { decideKiDispatch } from "./ki-handler-routing.module.code.ts"

describe("decideKiDispatch", () => {
  test("logs a book as the resolved user", () => {
    expect(decideKiDispatch("books")).toEqual({
      kind: "read-context",
      contextDoc: "book-logging",
      writeAsResolvedUser: true,
    })
  })

  test("logs an anime as the resolved user", () => {
    expect(decideKiDispatch("anime")).toEqual({
      kind: "read-context",
      contextDoc: "anime-logging",
      writeAsResolvedUser: true,
    })
  })

  test("writes a feature request down rather than acting on it", () => {
    const dispatch = decideKiDispatch("feature-request")
    expect(dispatch.kind).toBe("read-context")
    if (dispatch.kind !== "read-context") return
    expect(dispatch.contextDoc).toBe("feature-request-capture")
    expect(dispatch.writeAsResolvedUser).toBe(false)
  })

  test("leaves a feature request to Astra", () => {
    const dispatch = decideKiDispatch("feature-request")
    if (dispatch.kind !== "read-context") return
    expect(dispatch).toHaveProperty("evaluator", "astra")
  })

  test("escalates a message read as nothing known to Aine", () => {
    expect(decideKiDispatch("no-match")).toEqual({ kind: "escalate", to: "aine" })
  })
})
