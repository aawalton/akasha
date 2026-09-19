import { expect, test } from "bun:test"
import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"
import { saidForPart } from "akasha/command/argument/modules/taking/argument-taking.module.test-fixtures.ts"
import { at } from "akasha/command/argument/pages/at.argument.ts"
import { day } from "akasha/command/argument/pages/day.argument.ts"
import { difficulty } from "akasha/command/argument/pages/difficulty.argument.ts"

import { relationship } from "akasha/command/argument/pages/relationship.argument.ts"
import { safety } from "akasha/command/argument/pages/safety.argument.ts"
import { title } from "akasha/command/argument/pages/title.argument.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { trackSessionSwitch } from "akasha/command/pages/track/session/switch/track-session-switch.command.code.ts"
import { trackSessionSwitch as page } from "akasha/command/pages/track/session/switch/track-session-switch.command.ts"

const CALLED_AS = "akasha track session switch"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES: readonly Argument[] = [day, safety, difficulty, title, at, relationship]

const BY_SAID = new Map(PAGES.map((one) => [one.said, one]))

const SPELLED: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const NEEDED: readonly string[] = page.arguments
  .filter((one) => "required" in one && one.required === true)
  .map((one) => saidForPart(PAGES, one.argument))

const REPEATING: readonly string[] = page.arguments
  .filter((one) => "repeats" in one && one.repeats === true)
  .map((one) => saidForPart(PAGES, one.argument))

const VALUELESS: readonly string[] = SPELLED.filter((one) => BY_SAID.get(one)?.value === "none")

const CALLED = [title.said, "what the next stretch is"]

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await trackSessionSwitch(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(SPELLED.length).toBe(page.arguments.length)
  expect(NEEDED).toEqual([title.said])
})

test("a flag this takes nothing of is refused, naming every argument in the order declared", async () => {
  const said = (await refusalsOf(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(SPELLED.join("`, `"))
})

test("a call saying nothing asks by name for each argument the page requires", async () => {
  const said = await refusalsOf([])
  expect(said.length).toBe(NEEDED.length)
  for (const one of NEEDED) {
    expect(said.some((each) => each.includes(`\`${one}\``))).toBe(true)
  }
})

test("no argument the page leaves optional is asked for", async () => {
  const said = (await refusalsOf([])).join("\n")
  for (const one of SPELLED.filter((each) => !NEEDED.includes(each))) {
    expect(said).not.toContain(one)
  }
})

test("the time a switch is made at is not required, so nothing asks for it", async () => {
  const said = (await refusalsOf([])).join("\n")
  expect(said).not.toContain(at.said)
})

test("an argument the page does not mark repeating is refused where it is said twice", async () => {
  const said = await refusalsOf([...CALLED, title.said, "something else"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${title.said}\``)
  expect(said[0]).toContain("twice")
})

test("every argument the page marks repeating is taken more than once without refusal", async () => {
  const twice = REPEATING.flatMap((one) => [one, "one", one, "two"])
  const said = await refusalsOf([...CALLED, ...twice, "--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
})

test("an argument carrying a value is refused where no value follows it", async () => {
  const said = await refusalsOf([title.said])
  expect(said).toContain(`\`${title.said}\` takes a value, and none follows it`)
})

test("an argument carrying no value is refused where a value is joined to it", async () => {
  for (const one of VALUELESS) {
    const said = await refusalsOf([`${one}=x`])
    expect(said[0]).toContain(`\`${one}\``)
    expect(said[0]).toContain("carries no value")
  }
})
