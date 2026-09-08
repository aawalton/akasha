import { expect, test } from "bun:test"
import { refusalIn } from "./change-list.command.code.ts"

test("a list naming nothing is let through", () => {
  expect(refusalIn([])).toBeNull()
})

test("a list naming one subagent is let through", () => {
  expect(refusalIn(["aine-ababa9eca727720c2"])).toBeNull()
})

test("a list naming two words is refused", () => {
  expect(refusalIn(["one", "two"])).toContain("one subagent or none")
})

test("a flag where the subagent would be is refused", () => {
  expect(refusalIn(["--all"])).toContain("takes no flag")
})

test("a short flag where the subagent would be is refused", () => {
  expect(refusalIn(["-a"])).toContain("takes no flag")
})
