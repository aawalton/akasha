import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { day } from "akasha/commands/arguments/pages/day.argument.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import { fromFile } from "akasha/commands/arguments/pages/from-file.argument.ts"
import { relationship } from "akasha/commands/arguments/pages/relationship.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { trackSessionFile } from "akasha/commands/pages/track/session/file/track-session-file.command.code.ts"
import { trackSessionFile as page } from "akasha/commands/pages/track/session/file/track-session-file.command.ts"

const CALLED_AS = "akasha track session file"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [dryRun, day, fromFile, relationship]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const EVERY = `\`${SAYS.join("`, `")}\``

const A_DAY = "2026-09-12"

const fileRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await trackSessionFile(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page names four arguments, the file the lines come from being the one it must have", () => {
  expect(SAYS).toEqual([dryRun.said, day.said, fromFile.said, relationship.said])
  expect(page.arguments[2]?.required).toBe(true)
  expect(page.arguments[3]?.repeats).toBe(true)
})

test("a call naming no file to read the lines from asks for that file", async () => {
  const said = await fileRefusing([])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${fromFile.said}\``)
})

test("a flag this takes no argument at is refused, and the file asked for besides", async () => {
  const said = await fileRefusing(["--nope"])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(EVERY)
  expect(said[1]).toContain(`\`${fromFile.said}\``)
})

test("every refusal a call earns is gathered rather than the first alone", async () => {
  const said = await fileRefusing(["--date", A_DAY])

  expect(said.length).toBe(3)
  expect(said[0]).toContain("`--date`")
  expect(said[1]).toContain(`\`${A_DAY}\``)
  expect(said[2]).toContain(`\`${fromFile.said}\``)
})

test("the file at its flag with nothing after it is refused, and asked for besides", async () => {
  const said = await fileRefusing([fromFile.said])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${fromFile.said}\``)
  expect(said[0]).toContain("takes a value")
  expect(said[1]).toContain(`\`${fromFile.said}\``)
})

test("the file joined to an empty value is refused as the call wrote it", async () => {
  const said = await fileRefusing([`${fromFile.said}=`])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${fromFile.said}=\``)
  expect(said[1]).toContain(`\`${fromFile.said}\``)
})

test("the file said twice is refused rather than the later one winning", async () => {
  const said = await fileRefusing([fromFile.said, "one.txt", fromFile.said, "two.txt"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${fromFile.said}\``)
  expect(said[0]).toContain("twice")
})

test("who the stretch was with is said as many times as a call likes", async () => {
  const said = await fileRefusing([relationship.said, "one", relationship.said, "two"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${fromFile.said}\``)
  expect(said[0]).not.toContain("twice")
})
