import { expect, test } from "bun:test"
import type { Given } from "../../calling/calling.module.code.ts"
import { calendar, readIn } from "./calendar.command.code.ts"

function given(): Given {
  return {
    root: "/nowhere",
    calledAs: "akasha calendar",
    from: "/nowhere",
    writer: null,
    agentId: null,
  }
}

function refusedBy(argv: readonly string[]): readonly string[] {
  const read = readIn(argv)
  if (!("refused" in read)) throw new Error(`${argv.join(" ")} was read rather than refused`)
  return read.refused
}

test("nothing said is refused, naming what it acts on", async () => {
  const said = await calendar([], given())
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("auth")
  expect(said.refusals[0]).toContain("events")
})

test("a subject it does not act on is refused", () => {
  expect(refusedBy(["mailbox"])[0]).toContain("mailbox")
})

test("a subject named with no act is refused, naming the acts", () => {
  expect(refusedBy(["events"])[0]).toContain("create")
})

test("an act the subject does not carry is refused", () => {
  expect(refusedBy(["events", "archive"])[0]).toContain("archive")
})

test("a flag it does not take at all is refused", () => {
  expect(refusedBy(["events", "list", "--colour", "red"])[0]).toContain("--colour")
})

test("a flag another act takes is refused under this one", () => {
  expect(refusedBy(["events", "list", "--status", "accepted"])[0]).toContain("--status")
})

test("a flag with no value after it is refused", () => {
  expect(refusedBy(["events", "get", "--event"])[0]).toContain("takes a value")
})

test("a flag said twice over is refused", () => {
  expect(refusedBy(["events", "get", "--event", "a", "--event", "b"])[0]).toContain("twice")
})

test("an act naming no event where one is needed is refused", () => {
  expect(refusedBy(["events", "get"])[0]).toContain("--event")
})

test("the event is read from the word standing after the act", () => {
  const read = readIn(["events", "get", "abc123"])
  if ("refused" in read) throw new Error("this was refused")
  expect(read.said.get("--event")).toBe("abc123")
})

test("an event named in place and as a flag is refused", () => {
  expect(refusedBy(["events", "get", "abc123", "--event", "abc123"])[0]).toContain("in place")
})

test("a second word after the event is refused", () => {
  expect(refusedBy(["events", "get", "abc123", "def456"])[0]).toContain("one event")
})

test("a word standing after an act that names nothing in place is refused", () => {
  expect(refusedBy(["events", "list", "abc123"])[0]).toContain("names nothing in place")
})

test("a create missing a field it takes is refused", () => {
  expect(refusedBy(["events", "create", "--summary", "Lunch"])[0]).toContain("--start")
})

test("a max that is no whole number is refused", () => {
  expect(refusedBy(["events", "list", "--max", "ten"])[0]).toContain("--max")
})

test("a status outside the three is refused", () => {
  expect(refusedBy(["events", "rsvp", "abc", "--status", "maybe"])[0]).toContain("--status")
})

test("a send-updates outside the three is refused", () => {
  expect(
    refusedBy(["events", "rsvp", "abc", "--status", "accepted", "--send-updates", "some"])[0]
  ).toContain("--send-updates")
})

test("a recurrence is kept once over for each rule rather than parted by commas", () => {
  const read = readIn([
    "events",
    "create",
    "--summary",
    "Sunday",
    "--start",
    "2026-06-21T10:30:00",
    "--end",
    "2026-06-21T11:30:00",
    "--recurrence",
    "FREQ=WEEKLY;BYDAY=SU",
    "--recurrence",
    "FREQ=YEARLY",
  ])
  if ("refused" in read) throw new Error("this was refused")
  expect(read.recurrence).toEqual(["FREQ=WEEKLY;BYDAY=SU", "FREQ=YEARLY"])
})

test("a whole call reads to the act it named", () => {
  const read = readIn(["auth", "login", "--callback-url", "http://127.0.0.1:1/cb?code=x"])
  if ("refused" in read) throw new Error("this was refused")
  expect(read.act).toBe("auth login")
})
