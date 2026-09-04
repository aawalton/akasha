import { describe, expect, test } from "bun:test"
import { decideJennyDispatch } from "./jenny-handler-routing.module.code.ts"

describe("decideJennyDispatch", () => {
  test("manages content as the resolved user", () => {
    expect(decideJennyDispatch("manage-content")).toEqual({
      kind: "manage-atlas-content",
      writeAsResolvedUser: true,
    })
  })

  test("writes a feature request down rather than acting on it", () => {
    const dispatch = decideJennyDispatch("feature-request")
    expect(dispatch.kind).toBe("read-context")
    if (dispatch.kind !== "read-context") return
    expect(dispatch.contextDoc).toBe("feature-request-capture")
  })

  test("does not write a feature request as the resolved user", () => {
    const dispatch = decideJennyDispatch("feature-request")
    if (dispatch.kind !== "read-context") return
    expect(dispatch.writeAsResolvedUser).toBe(false)
  })

  test("escalates a message read as nothing known to Atlas", () => {
    expect(decideJennyDispatch("no-match")).toEqual({ kind: "escalate", to: "atlas" })
  })
})
