import { expect, test } from "bun:test"
import { decideReasonMarkAction } from "akasha/agent/model/gateway/modules/reason-marks/reason-marks.module.code.ts"

test("a reason no account has marked decides mark-rebind", () => {
  const marks = new Map<string, string>()
  expect(decideReasonMarkAction(marks, "model: gone", "acct-a")).toEqual({
    action: "mark-rebind",
  })
})

test("a reason the current account marked first decides mark-rebind", () => {
  const marks = new Map<string, string>([["model: gone", "acct-a"]])
  expect(decideReasonMarkAction(marks, "model: gone", "acct-a")).toEqual({
    action: "mark-rebind",
  })
})

test("a reason another account marked first decides global-unmark naming that account", () => {
  const marks = new Map<string, string>([["model: gone", "acct-a"]])
  expect(decideReasonMarkAction(marks, "model: gone", "acct-b")).toEqual({
    action: "global-unmark",
    firstAccount: "acct-a",
  })
})

test("nothing here writes to the map of marked reasons", () => {
  const marks = new Map<string, string>([["model: gone", "acct-a"]])
  decideReasonMarkAction(marks, "model: gone", "acct-b")
  decideReasonMarkAction(marks, "model: other", "acct-b")
  expect([...marks.entries()]).toEqual([["model: gone", "acct-a"]])
})
