import { expect, test } from "bun:test"
import { refuseStatedParent } from "./seat-stated-parent-refusal.module.code.ts"

test("a stated parent is refused, and the refusal names the environment instead", () => {
  const said = refuseStatedParent(["--agent-id", "0199a1b2-c3d4-7e5f-8091-a2b3c4d5e6f7"])
  expect(said).not.toBeNull()
  expect(said).toContain("AGENT_ID")
})

test("a parent stated with an equals sign is refused too", () => {
  expect(refuseStatedParent(["--agent-id=0199a1b2-c3d4-7e5f-8091-a2b3c4d5e6f7"])).not.toBeNull()
})

test("a call stating no parent is refused nothing", () => {
  expect(refuseStatedParent([])).toBeNull()
  expect(refuseStatedParent(["--domain", "akasha"])).toBeNull()
})

test("a flag that merely starts with the same letters is not a stated parent", () => {
  expect(refuseStatedParent(["--agent-idle"])).toBeNull()
})

test("a stated parent anywhere in the call is found", () => {
  expect(refuseStatedParent(["--domain", "akasha", "--agent-id", "x"])).not.toBeNull()
})
