import { expect, test } from "bun:test"
import { refuseStatedName } from "akasha/agents/seats/modules/stated-name-refusal/seat-stated-name-refusal.module.code.ts"

function refusalOf(said: string): string {
  return `\`${said}\` is no argument \`akasha seat start\` takes — it takes \`--persona\``
}

test("one refusal naming a word is a typed name, and it says what to state instead", () => {
  const said = refuseStatedName([refusalOf("scribe")])
  expect(said).not.toBeNull()
  expect(said).toContain("--persona")
  expect(said).toContain("--domain")
})

test("a call refused nothing types no name", () => {
  expect(refuseStatedName([])).toBeNull()
})

test("a refusal naming a flag is no typed name", () => {
  expect(refuseStatedName([refusalOf("--domain")])).toBeNull()
  expect(refuseStatedName([refusalOf("-d")])).toBeNull()
})

test("a refusal naming an empty word is no typed name", () => {
  expect(refuseStatedName([refusalOf("")])).toBeNull()
})

test("a call refused more than once is a mistyped flag rather than a name", () => {
  const said = [refusalOf("--presona"), refusalOf("athena")]
  expect(refuseStatedName(said)).toBeNull()
})
