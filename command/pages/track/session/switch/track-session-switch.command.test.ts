import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { dayAfter } from "akasha/alan/harness/day-boundary/modules/day-string/day-string.module.code.ts"
import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"
import { saidForPart } from "akasha/command/argument/modules/taking/argument-taking.module.test-fixtures.ts"
import { at } from "akasha/command/argument/pages/at.argument.ts"
import { day } from "akasha/command/argument/pages/day.argument.ts"
import { difficulty } from "akasha/command/argument/pages/difficulty.argument.ts"
import { relationship } from "akasha/command/argument/pages/relationship.argument.ts"
import { safety } from "akasha/command/argument/pages/safety.argument.ts"
import { title } from "akasha/command/argument/pages/title.argument.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { scratch } from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import type { Held } from "akasha/command/pages/track/modules/session-rows/session-rows.module.code.ts"
import {
  DAY,
  dayRepo,
  ROWS_AT,
} from "akasha/command/pages/track/modules/session-rows/session-rows.module.test-fixtures.ts"
import { endingIn } from "akasha/command/pages/track/session/modules/session-acting/session-acting.module.code.ts"
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

afterAll(scratch.sweep)

const PAGE_ID = "01a06818-339b-7fc2-8cd9-caea195150b2"

const READ = `{"id":"01a06818-339b-7fc2-8cd9-caea195150b6","title":"Read","startedAt":"2026-09-02T05:05:00.000Z","dailyTracking":"${PAGE_ID}"}\n`

function unmade(named: string): Held {
  return { day: named, path: "", page: "", pageAt: "", pageSaid: "", rows: [] }
}

test("a switch on a day with no stretch open takes the day before's open stretch of any kind", () => {
  const root = dayRepo()
  writeFileSync(join(root, ROWS_AT), READ)
  const next = dayAfter(DAY)
  const found = endingIn(root, next, unmade(next), [], true)
  if (typeof found === "string") throw new Error(found)
  expect(found.stretch.title).toBe("Read")
  expect(found.held.day).toBe(DAY)
})

test("a close on a day with no stretch open takes nothing from the day before", () => {
  const root = dayRepo()
  writeFileSync(join(root, ROWS_AT), READ)
  const next = dayAfter(DAY)
  expect(endingIn(root, next, unmade(next), [], false)).toBe(
    "this day carries no open stretch to end"
  )
})

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
