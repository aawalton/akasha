import { expect, test } from "bun:test"
import { subagentIn } from "./change-arguing.module.code.ts"

test("a call naming no word names no subagent", () => {
  expect(subagentIn([], "list")).toEqual({ named: null })
})

test("a call naming one bare word names that subagent", () => {
  expect(subagentIn(["aine-ababa9eca727720c2"], "take")).toEqual({
    named: "aine-ababa9eca727720c2",
  })
})

test("a call naming two words is refused", () => {
  expect(subagentIn(["one", "two"], "drop")).toEqual({
    why: "a drop names one subagent or none, and this call named more",
  })
})

test("a long flag where the subagent would be is refused", () => {
  expect(subagentIn(["--all"], "take")).toEqual({
    why: "a take names a subagent as a bare word, and takes no flag",
  })
})

test("a short flag where the subagent would be is refused", () => {
  expect(subagentIn(["-a"], "list")).toEqual({
    why: "a list names a subagent as a bare word, and takes no flag",
  })
})
