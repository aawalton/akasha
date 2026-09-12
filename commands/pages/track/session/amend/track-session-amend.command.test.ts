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
import { trackSessionAmend } from "akasha/commands/pages/track/session/amend/track-session-amend.command.code.ts"
import { trackSessionAmend as page } from "akasha/commands/pages/track/session/amend/track-session-amend.command.ts"

const CALLED_AS = "akasha track session amend"

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

const BY_SAID = new Map(PAGES.map((one) => [one.said, one]))

const SPELLED: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const REPEATING: readonly string[] = page.arguments
  .filter((one) => "repeats" in one && one.repeats === true)
  .map((one) => saidForPart(PAGES, one.argument))

const VALUELESS: readonly string[] = SPELLED.filter((one) => BY_SAID.get(one)?.value === "none")

const GROUPING = page.arguments.find((one) => "oneOf" in one)

const IN_GROUP = new Set<string>(
  GROUPING === undefined ? [] : [GROUPING.argument, ...GROUPING.oneOf]
)

const MEMBERS: readonly string[] = page.arguments
  .filter((one) => IN_GROUP.has(one.argument))
  .map((one) => saidForPart(PAGES, one.argument))

const SAID_GROUP = `\`${MEMBERS.slice(0, -1).join("`, `")}\` or \`${MEMBERS.at(-1)}\``

const WHEN = [at.said, "10:00"]

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await trackSessionAmend(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(SPELLED.length).toBe(page.arguments.length)
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("the page needs no argument on its own and one group of four instead", () => {
  expect(MEMBERS.length).toBe(4)
  expect(MEMBERS).toEqual([at.said, id.said, open.said, last.said])
})

test("a flag this takes nothing of is refused, naming every argument in the order declared", async () => {
  const said = (await refusalsOf(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(SPELLED.join("`, `"))
})

test("a call addressing no stretch names every way of addressing one, on one line", async () => {
  const said = await refusalsOf([])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(SAID_GROUP)
})

test("a group of more than two is refused saying none of them was said", async () => {
  const said = await refusalsOf([])
  expect(said[0]).toContain("any of them")
})

test("each way of addressing a stretch satisfies the group on its own", async () => {
  for (const one of MEMBERS) {
    const carries = BY_SAID.get(one)?.value !== "none"
    const said = await refusalsOf([one, ...(carries ? ["a-value"] : []), "--nope"])
    expect(said.length).toBe(1)
    expect(said[0]).toContain("--nope")
  }
})

test("an argument the page does not mark repeating is refused where it is said twice", async () => {
  const said = await refusalsOf([...WHEN, title.said, "one", title.said, "two"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${title.said}\``)
  expect(said[0]).toContain("twice")
})

test("every argument the page marks repeating is taken more than once without refusal", async () => {
  const twice = REPEATING.flatMap((one) => [one, "one", one, "two"])
  const said = await refusalsOf([...WHEN, ...twice, "--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
})

test("an argument carrying a value is refused where no value follows it", async () => {
  const said = await refusalsOf([at.said])
  expect(said).toContain(`\`${at.said}\` takes a value, and none follows it`)
})

test("an argument carrying no value is refused where a value is joined to it", async () => {
  for (const one of VALUELESS) {
    const said = await refusalsOf([`${one}=x`, open.said])
    expect(said[0]).toContain(`\`${one}\``)
    expect(said[0]).toContain("carries no value")
  }
})
