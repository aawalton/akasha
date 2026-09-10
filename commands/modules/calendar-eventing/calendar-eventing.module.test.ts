import { expect, test } from "bun:test"
import {
  CALENDAR,
  END,
  EVENT,
  FROM,
  MAX,
  QUERY,
  RECURRENCE,
  readIn,
  SENDING,
  SHAPING,
  START,
  STATUS,
  SUMMARY,
  TO,
  type Wanted,
} from "./calendar-eventing.module.code.ts"

const LISTING: Wanted = {
  takes: [CALENDAR, FROM, TO, QUERY, MAX],
  needs: [],
  inPlace: false,
}

const GETTING: Wanted = { takes: [CALENDAR, EVENT], needs: [EVENT], inPlace: true }

const CREATING: Wanted = {
  takes: [CALENDAR, ...SHAPING, SENDING],
  needs: [SUMMARY, START, END],
  inPlace: false,
}

const RSVPING: Wanted = {
  takes: [CALENDAR, EVENT, STATUS, SENDING],
  needs: [EVENT, STATUS],
  inPlace: true,
}

function refused(argv: readonly string[], wanted: Wanted): readonly string[] {
  const read = readIn(argv, wanted)
  if (!("refused" in read)) throw new Error("this was not refused")
  return read.refused
}

test("a flag no act takes at all is refused", () => {
  expect(refused(["--tint", "red"], LISTING)[0]).toContain("--tint")
})

test("a flag another act takes is refused under this one", () => {
  expect(refused([STATUS, "accepted"], LISTING)[0]).toContain(STATUS)
})

test("a flag with no value after it is refused", () => {
  expect(refused([EVENT], GETTING)[0]).toContain("takes a value")
})

test("a flag said twice over is refused", () => {
  expect(refused([EVENT, "a", EVENT, "b"], GETTING)[0]).toContain("twice")
})

test("an act naming no event where one is needed is refused", () => {
  expect(refused([], GETTING)[0]).toContain(EVENT)
})

test("the event is read from the word said in place", () => {
  const read = readIn(["abc123"], GETTING)

  if ("refused" in read) throw new Error("this was refused")
  expect(read.said.get(EVENT)).toBe("abc123")
})

test("an event named in place and as a flag is refused", () => {
  expect(refused(["abc123", EVENT, "abc123"], GETTING)[0]).toContain("in place")
})

test("a second word after the event is refused", () => {
  expect(refused(["abc123", "def456"], GETTING)[0]).toContain("one event")
})

test("a word said to an act that names nothing in place is refused", () => {
  expect(refused(["abc123"], LISTING)[0]).toContain("names nothing in place")
})

test("a create missing a field it needs is refused", () => {
  expect(refused([SUMMARY, "Lunch"], CREATING)[0]).toContain(START)
})

test("a max that is no whole number is refused", () => {
  expect(refused([MAX, "ten"], LISTING)[0]).toContain(MAX)
})

test("a status outside the three is refused", () => {
  expect(refused(["abc", STATUS, "maybe"], RSVPING)[0]).toContain(STATUS)
})

test("a send-updates outside the three is refused", () => {
  expect(refused(["abc", STATUS, "accepted", SENDING, "some"], RSVPING)[0]).toContain(SENDING)
})

test("a recurrence is kept once over for each rule rather than parted by commas", () => {
  const read = readIn(
    [
      SUMMARY,
      "Sunday",
      START,
      "2026-06-21T10:30:00",
      END,
      "2026-06-21T11:30:00",
      RECURRENCE,
      "FREQ=WEEKLY;BYDAY=SU",
      RECURRENCE,
      "FREQ=YEARLY",
    ],
    CREATING
  )

  if ("refused" in read) throw new Error("this was refused")
  expect(read.recurrence).toEqual(["FREQ=WEEKLY;BYDAY=SU", "FREQ=YEARLY"])
})

test("a recurrence said to an act that takes none is refused", () => {
  expect(refused([RECURRENCE, "FREQ=YEARLY"], LISTING)[0]).toContain(RECURRENCE)
})

test("a whole call reads to what it was said", () => {
  const read = readIn([CALENDAR, "work", FROM, "2026-06-01", MAX, "5"], LISTING)

  if ("refused" in read) throw new Error("this was refused")
  expect(read.said.get(CALENDAR)).toBe("work")
  expect(read.said.get(MAX)).toBe("5")
})
