import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { at } from "akasha/commands/arguments/pages/at.argument.ts"
import { day } from "akasha/commands/arguments/pages/day.argument.ts"
import { difficulty } from "akasha/commands/arguments/pages/difficulty.argument.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import { relationship } from "akasha/commands/arguments/pages/relationship.argument.ts"
import { safety } from "akasha/commands/arguments/pages/safety.argument.ts"
import { title } from "akasha/commands/arguments/pages/title.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { trackSessionOpen } from "akasha/commands/pages/track/session/open/track-session-open.command.code.ts"
import { trackSessionOpen as page } from "akasha/commands/pages/track/session/open/track-session-open.command.ts"

const CALLED_AS = "akasha track session open"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES: readonly Argument[] = [dryRun, day, safety, difficulty, title, at, relationship]

const NAMED = page.arguments.map((one) => ({
  page: PAGES.find((each) => each.said === saidForPart(PAGES, one.argument)),
  entry: one,
}))

const SPELLED: readonly string[] = NAMED.map((one) => one.page?.said ?? "")

const CALLED = [title.said, "what this stretch is"]

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await trackSessionOpen(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(SPELLED.length).toBe(page.arguments.length)
  expect(SPELLED).not.toContain("")
})

test("a flag this takes nothing of is refused, naming every argument in the order declared", async () => {
  const said = (await refusalsOf(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(SPELLED.join("`, `"))
})

test("a title is the one thing a call must say, and nothing else is asked for", async () => {
  const said = await refusalsOf([])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${title.said}\``)
})

test("the day, the time and the levels are all left out without refusal", async () => {
  const said = await refusalsOf([...CALLED, "--nope"])
  expect(said.length).toBe(1)
  for (const one of [day.said, at.said, safety.said, difficulty.said]) {
    expect(said[0]).toContain(one)
  }
})

test("a title said twice is refused rather than the later one winning", async () => {
  const said = await refusalsOf([...CALLED, title.said, "something else"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${title.said}\``)
  expect(said[0]).toContain("twice")
})

test("who the stretch was with is said as many times as a call likes", async () => {
  const twice = NAMED.filter((one) => "repeats" in one.entry).flatMap((one) => [
    one.page?.said ?? "",
    "one",
    one.page?.said ?? "",
    "two",
  ])
  expect(twice.length).toBe(4)
  const said = await refusalsOf([...CALLED, ...twice, "--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
})

test("the time a stretch begins is refused where no value follows it", async () => {
  const said = await refusalsOf([...CALLED, at.said])
  expect(said).toContain(`\`${at.said}\` takes a value, and none follows it`)
})

test("a level joined to an empty value is refused rather than read as nothing", async () => {
  const said = await refusalsOf([...CALLED, `${safety.said}=`])
  expect(said[0]).toContain(`${safety.said}=`)
})

test("an argument carrying no value is refused where a value is joined to it", async () => {
  for (const one of NAMED.filter((each) => each.page?.value === "none")) {
    const said = await refusalsOf([...CALLED, `${one.page?.said}=x`])
    expect(said[0]).toContain(`\`${one.page?.said}\``)
    expect(said[0]).toContain("carries no value")
  }
})
