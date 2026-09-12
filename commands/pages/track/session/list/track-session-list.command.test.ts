import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { day } from "akasha/commands/arguments/pages/day.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { trackSessionList } from "akasha/commands/pages/track/session/list/track-session-list.command.code.ts"
import { trackSessionList as page } from "akasha/commands/pages/track/session/list/track-session-list.command.ts"

const CALLED_AS = "akasha track session list"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [json, day]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const EVERY = `\`${SAYS.join("`, `")}\``

const A_DAY = "2026-09-12"

const listRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = trackSessionList(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page names the JSON flag and the day, and neither is one a call must say", () => {
  expect(SAYS).toEqual([json.said, day.said])
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("a flag this takes no argument at is refused, naming both arguments it takes", () => {
  const said = listRefusing(["--nope"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(EVERY)
})

test("a day said at a flag this takes nothing at is refused, and its date besides", () => {
  const said = listRefusing(["--date", A_DAY])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("`--date`")
  expect(said[0]).toContain(EVERY)
  expect(said[1]).toContain(`\`${A_DAY}\``)
})

test("the JSON flag written with an equals is refused, carrying no value of its own", () => {
  const said = listRefusing([`${json.said}=true`])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${json.said}\``)
  expect(said[0]).toContain("carries no value")
})

test("the day at its flag with nothing after it is refused", () => {
  const said = listRefusing([day.said])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${day.said}\``)
  expect(said[0]).toContain("takes a value")
})

test("the empty word after the day names no value", () => {
  const said = listRefusing([day.said, ""])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${day.said}\``)
  expect(said[0]).toContain("empty word")
})

test("the day said twice is refused rather than the later one winning", () => {
  const said = listRefusing([day.said, "2026-09-11", day.said, A_DAY])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${day.said}\``)
  expect(said[0]).toContain("twice")
})
