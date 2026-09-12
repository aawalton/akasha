import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { at } from "akasha/commands/arguments/pages/at.argument.ts"
import { day } from "akasha/commands/arguments/pages/day.argument.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { trackSessionClose } from "akasha/commands/pages/track/session/close/track-session-close.command.code.ts"
import { trackSessionClose as page } from "akasha/commands/pages/track/session/close/track-session-close.command.ts"

const CALLED_AS = "akasha track session close"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [dryRun, day, at]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const EVERY = `\`${SAYS.join("`, `")}\``

const A_DAY = "2026-09-12"

const closeRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await trackSessionClose(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page names the dry run, the day and the time, and a call may say none of them", () => {
  expect(SAYS).toEqual([dryRun.said, day.said, at.said])
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("a flag this takes no argument at is refused, naming all three arguments it takes", async () => {
  const said = await closeRefusing(["--nope"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(EVERY)
})

test("a day said at a flag this takes nothing at is refused, and its date besides", async () => {
  const said = await closeRefusing(["--date", A_DAY])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("`--date`")
  expect(said[0]).toContain(EVERY)
  expect(said[1]).toContain(`\`${A_DAY}\``)
})

test("the time at its flag with nothing after it is refused", async () => {
  const said = await closeRefusing([at.said])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${at.said}\``)
  expect(said[0]).toContain("takes a value")
})

test("the time whose value is another flag is an argument no value follows", async () => {
  const said = await closeRefusing([at.said, day.said, A_DAY])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${at.said}\``)
  expect(said[0]).toContain("none follows it")
})

test("the time joined to an empty value is refused as the call wrote it", async () => {
  const said = await closeRefusing([`${at.said}=`])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${at.said}=\``)
})

test("the dry run written with an equals is refused, carrying no value of its own", async () => {
  const said = await closeRefusing([`${dryRun.said}=true`])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${dryRun.said}\``)
  expect(said[0]).toContain("carries no value")
})

test("the dry run said twice is refused, though it carries nothing to choose between", async () => {
  const said = await closeRefusing([dryRun.said, dryRun.said])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${dryRun.said}\``)
  expect(said[0]).toContain("twice")
})
