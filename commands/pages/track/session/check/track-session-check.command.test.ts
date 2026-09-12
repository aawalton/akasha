import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { day } from "akasha/commands/arguments/pages/day.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { trackSessionCheck } from "akasha/commands/pages/track/session/check/track-session-check.command.code.ts"
import { trackSessionCheck as page } from "akasha/commands/pages/track/session/check/track-session-check.command.ts"

const CALLED_AS = "akasha track session check"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [day]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const A_DAY = "2026-09-12"

const checkRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = trackSessionCheck(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the day is the one argument the page names, and this test carries its page", () => {
  expect(SAYS).toEqual([day.said])
  expect(page.arguments.length).toBe(1)
  expect(page.arguments[0]).not.toHaveProperty("required")
})

test("a flag this takes no argument at is refused, naming the day it does take", () => {
  const said = checkRefusing(["--nope"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(`\`${day.said}\``)
})

test("a day said at a flag this takes nothing at is refused, and its date besides", () => {
  const said = checkRefusing(["--date", A_DAY])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("`--date`")
  expect(said[0]).toContain(`\`${day.said}\``)
  expect(said[1]).toContain(`\`${A_DAY}\``)
})

test("a word is refused here, where the day is said at its flag alone", () => {
  const said = checkRefusing([A_DAY])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${A_DAY}\``)
  expect(said[0]).toContain(`\`${day.said}\``)
})

test("a word after a bare dash pair is refused too, nothing here being said as a word", () => {
  const said = checkRefusing(["--", A_DAY])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${A_DAY}\``)
})

test("the day at its flag with nothing after it is refused", () => {
  const said = checkRefusing([day.said])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${day.said}\``)
  expect(said[0]).toContain("takes a value")
})

test("the day joined to an empty value is refused as the call wrote it", () => {
  const said = checkRefusing([`${day.said}=`])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${day.said}=\``)
})

test("the day said twice is refused rather than the later one winning", () => {
  const said = checkRefusing([day.said, "2026-09-11", day.said, A_DAY])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${day.said}\``)
  expect(said[0]).toContain("twice")
})
