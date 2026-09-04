import { expect, test } from "bun:test"
import { refuseParentless } from "./seat-parentless-refusal.module.code.ts"

test("a fleet seat naming nobody above it is refused", () => {
  const said = refuseParentless(null, true)
  expect(said).not.toBeNull()
  expect(said).toContain("AGENT_ID")
})

test("a parent stated as an empty string is no parent", () => {
  expect(refuseParentless("", true)).not.toBeNull()
})

test("a fleet seat that names an agent above it is refused nothing", () => {
  expect(refuseParentless("0199a1b2-c3d4-7e5f-8091-a2b3c4d5e6f7", true)).toBeNull()
})

test("a seat a person opened needs no parent", () => {
  expect(refuseParentless(null, false)).toBeNull()
  expect(refuseParentless("", false)).toBeNull()
})
