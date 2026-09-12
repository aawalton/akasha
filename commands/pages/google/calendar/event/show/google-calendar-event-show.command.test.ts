import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { calendar } from "akasha/commands/arguments/pages/calendar.argument.ts"
import { event } from "akasha/commands/arguments/pages/event.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { googleCalendarEventShow } from "akasha/commands/pages/google/calendar/event/show/google-calendar-event-show.command.code.ts"
import { googleCalendarEventShow as page } from "akasha/commands/pages/google/calendar/event/show/google-calendar-event-show.command.ts"

const CALLED_AS = "akasha google calendar event show"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: CALLED_AS,
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const PAGES = [event, calendar]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const IN_PLACE = `<${event.placeholder}>`

const EVERY = `\`${IN_PLACE}\`, \`${event.said}\`, \`${calendar.said}\``

const ASKED = `\`${IN_PLACE}\` or \`${event.said}\``

const AN_EVENT = "an-event-the-calendar-gave-an-id"

const showRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await googleCalendarEventShow(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page names the event and the calendar, and only the event must be said", () => {
  expect(SAYS).toEqual([event.said, calendar.said])
  expect(page.arguments[0]?.required).toBe(true)
  expect(page.arguments[0]?.saidAs).toBe("flag-or-word")
  expect(page.arguments[1]).not.toHaveProperty("required")
})

test("a call naming no event asks for it as a word or at its flag", async () => {
  const said = await showRefusing([])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(ASKED)
})

test("a flag this takes no argument at is refused, naming the placeholder among the flags", async () => {
  const said = await showRefusing(["--nope"])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(EVERY)
  expect(said[1]).toContain(ASKED)
})

test("the event said as a word and at its flag in one call is refused", async () => {
  const said = await showRefusing([AN_EVENT, event.said, AN_EVENT])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${IN_PLACE}\``)
  expect(said[0]).toContain(`\`${event.said}\``)
})

test("one spare word is refused, and the refusal names the word nothing takes", async () => {
  const said = await showRefusing([AN_EVENT, "a-spare-word"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("2 words")
  expect(said[0]).toContain("`a-spare-word`")
})

test("two spare words are both named, drawn one beside the other", async () => {
  const said = await showRefusing([AN_EVENT, "one-spare", "two-spare"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("3 words")
  expect(said[0]).toContain("`one-spare` or `two-spare`")
})

test("a word after a bare dash pair fills the event rather than being read as a flag", async () => {
  const said = await showRefusing(["--", event.said, "a-spare-word"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("2 words")
  expect(said[0]).toContain("`a-spare-word`")
  expect(said[0]).not.toContain(ASKED)
})

test("the calendar carries what follows its first equals rather than being refused", async () => {
  const said = await showRefusing([`${calendar.said}=one=two`])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(ASKED)
  expect(said[0]).not.toContain(calendar.said)
})

test("the calendar at its flag with nothing after it is refused, and the event asked for", async () => {
  const said = await showRefusing([calendar.said])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${calendar.said}\``)
  expect(said[0]).toContain("takes a value")
  expect(said[1]).toContain(ASKED)
})
