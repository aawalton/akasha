import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { calendar } from "akasha/commands/arguments/pages/calendar.argument.ts"
import { eventQuery } from "akasha/commands/arguments/pages/event-query.argument.ts"
import { max } from "akasha/commands/arguments/pages/max.argument.ts"
import { windowFrom } from "akasha/commands/arguments/pages/window-from.argument.ts"
import { windowTo } from "akasha/commands/arguments/pages/window-to.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { googleCalendarEventList } from "akasha/commands/pages/google/calendar/event/list/google-calendar-event-list.command.code.ts"
import { googleCalendarEventList as page } from "akasha/commands/pages/google/calendar/event/list/google-calendar-event-list.command.ts"

const CALLED_AS = "akasha google calendar event list"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const KNOWN: readonly Argument[] = [calendar, windowFrom, windowTo, eventQuery, max]

const SPELLED: readonly string[] = page.arguments.map((one) => saidForPart(KNOWN, one.argument))

const COUNTING: readonly Argument[] = KNOWN.filter((one) => one.value === "whole-number")

const CARRYING: readonly Argument[] = KNOWN.filter((one) => one.value !== "none")

const listRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await googleCalendarEventList(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(SPELLED.length).toBe(page.arguments.length)
  expect(SPELLED).toEqual([
    calendar.said,
    windowFrom.said,
    windowTo.said,
    eventQuery.said,
    max.said,
  ])
})

test("the window is said at two flags shorter than the argument pages are slugged", () => {
  expect(windowFrom.slug).toBe("window-from")
  expect(windowFrom.said).toBe("--from")
  expect(windowTo.slug).toBe("window-to")
  expect(windowTo.said).toBe("--to")
  expect(eventQuery.slug).toBe("event-query")
  expect(eventQuery.said).toBe("--query")
})

test("this command needs no argument, so a bare call is refused for nothing missing", () => {
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("a flag this takes nothing of is refused, naming every argument in the order declared", async () => {
  const said = (await listRefusing(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(SPELLED.join("`, `"))
})

test("each argument counting in whole numbers refuses a word that is no whole number", async () => {
  expect(COUNTING.length).toBeGreaterThan(0)
  for (const one of COUNTING) {
    const said = await listRefusing([one.said, "lots"])
    expect(said.length).toBe(1)
    expect(said[0]).toContain(`${one.said} lots`)
    expect(said[0]).toContain("whole number")
  }
})

test("every argument carrying a value is refused where no value follows it", async () => {
  for (const one of CARRYING) {
    const said = await listRefusing([one.said])
    expect(said).toContain(`\`${one.said}\` takes a value, and none follows it`)
  }
})

test("no argument the page declares repeats, so each said twice is refused", async () => {
  for (const one of CARRYING) {
    const said = await listRefusing([one.said, "1", one.said, "2"])
    expect(said.length).toBe(1)
    expect(said[0]).toContain(`\`${one.said}\``)
    expect(said[0]).toContain("twice")
  }
})
