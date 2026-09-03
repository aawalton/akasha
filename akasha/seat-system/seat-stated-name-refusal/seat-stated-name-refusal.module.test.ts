import { expect, test } from "bun:test"
import { refuseStatedName } from "./seat-stated-name-refusal.module.code.ts"

test("a typed name is refused, and the refusal says what to state instead", () => {
  const said = refuseStatedName(["scribe"])
  expect(said).not.toBeNull()
  expect(said).toContain("--persona")
  expect(said).toContain("--domain")
})

test("a call stating nothing is refused nothing", () => {
  expect(refuseStatedName([])).toBeNull()
})

test("an empty first argument is no stated name", () => {
  expect(refuseStatedName([""])).toBeNull()
})

test("a first argument that is a flag is no stated name", () => {
  expect(refuseStatedName(["--domain", "akasha"])).toBeNull()
  expect(refuseStatedName(["-d"])).toBeNull()
})

test("a name typed before the flags is still a stated name", () => {
  expect(refuseStatedName(["scribe", "--domain", "akasha"])).not.toBeNull()
})
