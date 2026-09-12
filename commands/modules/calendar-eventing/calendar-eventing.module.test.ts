import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  answeredAsJsonBy,
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
} from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"

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

const TAKEN = readIn(["abc123"], GETTING)

const TOOK_IT = "work@example.com took the change to event abc123"

test("a call the calendar took is answered as the value it gave, laid out as JSON", async () => {
  const held = await answeredAsJsonBy(TAKEN, async () => ({ id: "abc123" }))

  expect(held.code).toBe(0)
  expect(held.report.join("")).toContain("abc123")
})

test("a call that threw after the calendar took the write names that write in its refusal", async () => {
  const held = await answeredAsJsonBy(TAKEN, async (_taken, done) => {
    done.push(TOOK_IT)
    throw new OperationalError("the reply would not read")
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([TOOK_IT])
  expect(held.refusals[0]).toContain("the reply would not read")
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("stopped part way")
  expect(last).toContain(TOOK_IT)
})

test("a call that threw before the calendar took anything names no write", async () => {
  const held = await answeredAsJsonBy(TAKEN, async () => {
    throw new OperationalError("the calendar would not answer")
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a call that threw a fault of no known kind is operational rather than seventy", async () => {
  const held = await answeredAsJsonBy(TAKEN, async () => {
    throw new Error("the reply was not the shape asked for")
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.refusals.join(" ")).toContain("the reply was not the shape asked for")
})
