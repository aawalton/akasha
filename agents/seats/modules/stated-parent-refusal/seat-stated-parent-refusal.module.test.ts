import { expect, test } from "bun:test"
import {
  refuseStatedParent,
  STATED_PARENT,
} from "akasha/agents/seats/modules/stated-parent-refusal/seat-stated-parent-refusal.module.code.ts"

const ID = "0199a1b2-c3d4-7e5f-8091-a2b3c4d5e6f7"

function refusalOf(said: string): string {
  return `\`${said}\` is no argument \`akasha seat start\` takes — it takes \`--persona\``
}

test("a refusal naming the stated parent says the environment instead", () => {
  const said = refuseStatedParent([refusalOf(STATED_PARENT)])
  expect(said).not.toBeNull()
  expect(said).toContain("AGENT_ID")
})

test("a parent stated with an equals sign is refused too", () => {
  expect(refuseStatedParent([refusalOf(`${STATED_PARENT}=${ID}`)])).not.toBeNull()
})

test("a call refused nothing states no parent", () => {
  expect(refuseStatedParent([])).toBeNull()
})

test("a refusal naming another flag is no stated parent", () => {
  expect(refuseStatedParent([refusalOf("--domain")])).toBeNull()
})

test("a flag that merely starts with the same letters is not a stated parent", () => {
  expect(refuseStatedParent([refusalOf(`${STATED_PARENT}le`)])).toBeNull()
})

test("a stated parent among other refusals is found", () => {
  const said = [refusalOf("--nope"), refusalOf(STATED_PARENT)]
  expect(refuseStatedParent(said)).not.toBeNull()
})
