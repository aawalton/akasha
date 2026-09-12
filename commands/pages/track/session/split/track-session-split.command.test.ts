import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { at } from "akasha/commands/arguments/pages/at.argument.ts"
import { day } from "akasha/commands/arguments/pages/day.argument.ts"
import { difficulty } from "akasha/commands/arguments/pages/difficulty.argument.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import { id } from "akasha/commands/arguments/pages/id.argument.ts"
import { last } from "akasha/commands/arguments/pages/last.argument.ts"
import { open } from "akasha/commands/arguments/pages/open.argument.ts"
import { relationship } from "akasha/commands/arguments/pages/relationship.argument.ts"
import { safety } from "akasha/commands/arguments/pages/safety.argument.ts"
import { title } from "akasha/commands/arguments/pages/title.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { trackSessionSplit } from "akasha/commands/pages/track/session/split/track-session-split.command.code.ts"
import { trackSessionSplit as page } from "akasha/commands/pages/track/session/split/track-session-split.command.ts"

const CALLED_AS = "akasha track session split"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES: readonly Argument[] = [
  dryRun,
  day,
  at,
  id,
  open,
  last,
  title,
  safety,
  difficulty,
  relationship,
]

type Declared = {
  readonly said: string
  readonly required: boolean
  readonly repeats: boolean
  readonly carries: boolean
}

const DECLARED: readonly Declared[] = page.arguments.map((one) => {
  const said = saidForPart(PAGES, one.argument)
  const held = PAGES.find((each) => each.said === said)
  return {
    said,
    required: "required" in one && one.required === true,
    repeats: "repeats" in one && one.repeats === true,
    carries: held?.value !== "none",
  }
})

const REQUIRED = DECLARED.filter((one) => one.required)

const WHEN = [at.said, "10:00"]

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await trackSessionSplit(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(DECLARED.length).toBe(page.arguments.length)
  expect(REQUIRED.map((one) => one.said)).toEqual([at.said])
})

test("a flag this takes nothing of is refused, naming every argument in the order declared", async () => {
  const said = (await refusalsOf(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(DECLARED.map((one) => one.said).join("`, `"))
})

test("a call saying nothing asks by name for the one argument the page requires", async () => {
  const said = await refusalsOf([])
  expect(said.length).toBe(REQUIRED.length)
  expect(said[0]).toContain(`\`${at.said}\``)
})

test("no argument the page leaves optional is asked for", async () => {
  const said = (await refusalsOf([])).join("\n")
  for (const one of DECLARED.filter((each) => !each.required)) {
    expect(said).not.toContain(one.said)
  }
})

test("an argument the page does not mark repeating is refused where it is said twice", async () => {
  const said = await refusalsOf([...WHEN, title.said, "one", title.said, "two"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${title.said}\``)
  expect(said[0]).toContain("twice")
})

test("the time the stretch is parted at is refused where it is said twice", async () => {
  const said = await refusalsOf([...WHEN, at.said, "11:00"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${at.said}\``)
  expect(said[0]).toContain("twice")
})

test("every argument the page marks repeating is taken more than once without refusal", async () => {
  const repeated = DECLARED.filter((one) => one.repeats).flatMap((one) => [
    one.said,
    "one",
    one.said,
    "two",
  ])
  const said = await refusalsOf([...WHEN, ...repeated, "--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
})

test("an argument carrying a value is refused where no value follows it", async () => {
  const said = await refusalsOf([at.said])
  expect(said[0]).toBe(`\`${at.said}\` takes a value, and none follows it`)
})

test("an argument carrying no value is refused where a value is joined to it", async () => {
  for (const one of DECLARED.filter((each) => !each.carries)) {
    const said = await refusalsOf([`${one.said}=x`])
    expect(said[0]).toContain(`\`${one.said}\``)
    expect(said[0]).toContain("carries no value")
  }
})
