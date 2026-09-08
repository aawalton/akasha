import { expect, test } from "bun:test"
import {
  countedOver,
  greetedIn,
  heldBy,
  keepMined,
  namedIn,
  saidOf,
  seatPagesIn,
  type Transcript,
  transcriptIn,
  transcriptsIn,
  wroteIn,
} from "./day-messages-mining.module.code.ts"

const KNOWN = new Set(["aura", "amy", "thea"])

const TYPED =
  '{"type":"user","promptSource":"typed","timestamp":"2026-09-08T11:00:00.000Z",' +
  '"message":{"role":"user","content":"Hi Aura! lets go"}}'

const QUEUED =
  '{"type":"user","promptSource":"queued","timestamp":"2026-09-08T05:00:00.000Z",' +
  '"message":{"role":"user","content":"Go ahead"}}'

const SENT =
  '{"type":"user","promptSource":"system","timestamp":"2026-09-08T11:30:00.000Z",' +
  '"message":{"role":"user","content":"<task-notification>"}}'

const RESULT =
  '{"type":"user","message":{"role":"user","content":' +
  '[{"type":"tool_result","content":"You are persona `amy`, domain `x`, role `handler`."}]}}'

const EMPTY: Transcript = { named: [], seatPages: [], greeted: [], wrote: [] }

test("a line naming the persona an agent is reads that persona", () => {
  expect(namedIn(RESULT)).toEqual(["amy"])
})

test("a line naming no persona reads nobody", () => {
  expect(namedIn(TYPED)).toEqual([])
})

test("a line naming a seat page reads that seat", () => {
  expect(seatPagesIn("read seat-system/seats/pages/thea.seat.ts here")).toEqual(["thea"])
})

test("the name Alan greeted is read off what he wrote", () => {
  expect(greetedIn("Hi Aura! lets go")).toBe("aura")
})

test("what Alan wrote without a greeting greets nobody", () => {
  expect(greetedIn("go ahead")).toBeNull()
})

test("a message Alan typed is read with the moment he sent it", () => {
  expect(wroteIn(TYPED)).toEqual({ at: "2026-09-08T11:00:00.000Z", text: "Hi Aura! lets go" })
})

test("a message the harness sent is no message Alan wrote", () => {
  expect(wroteIn(SENT)).toBeNull()
})

test("a tool result is no message Alan wrote", () => {
  expect(wroteIn(RESULT)).toBeNull()
})

test("a transcript is read as who it names and when Alan wrote in it", () => {
  expect(transcriptIn([RESULT, TYPED, SENT, QUEUED].join("\n"))).toEqual({
    named: ["amy"],
    seatPages: [],
    greeted: ["aura"],
    wrote: ["2026-09-08T11:00:00.000Z", "2026-09-08T05:00:00.000Z"],
  })
})

test("the persona a transcript names beats the name Alan greeted", () => {
  expect(heldBy({ ...EMPTY, named: ["amy"], greeted: ["aura"] }, KNOWN)).toBe("amy")
})

test("the seat a transcript names beats the name Alan greeted", () => {
  expect(heldBy({ ...EMPTY, seatPages: ["thea"], greeted: ["aura"] }, KNOWN)).toBe("thea")
})

test("a name no persona is filed under is passed over", () => {
  expect(heldBy({ ...EMPTY, named: ["nobody"], greeted: ["aura"] }, KNOWN)).toBe("aura")
})

test("a transcript answering to nobody is held by nobody", () => {
  expect(heldBy(EMPTY, KNOWN)).toBeNull()
})

test("a message before six in the morning in New York falls on the day before", () => {
  const one: Transcript = { ...EMPTY, named: ["aura"], wrote: ["2026-09-08T05:00:00.000Z"] }
  expect(countedOver([one], KNOWN)).toEqual([
    { day: "2026-09-07", counted: [{ personaSlug: "aura", sent: 1 }] },
  ])
})

test("the personas on a day sit in the order of their names", () => {
  const one: Transcript = { ...EMPTY, named: ["thea"], wrote: ["2026-09-08T11:00:00.000Z"] }
  const two: Transcript = {
    ...EMPTY,
    named: ["amy"],
    wrote: ["2026-09-08T11:00:00.000Z", "2026-09-08T12:00:00.000Z"],
  }
  expect(countedOver([one, two], KNOWN)).toEqual([
    {
      day: "2026-09-08",
      counted: [
        { personaSlug: "amy", sent: 2 },
        { personaSlug: "thea", sent: 1 },
      ],
    },
  ])
})

test("a transcript held by nobody is counted against no day", () => {
  const one: Transcript = { ...EMPTY, wrote: ["2026-09-08T11:00:00.000Z"] }
  expect(countedOver([one], KNOWN)).toEqual([])
})

test("a store that is not there holds no transcript", () => {
  expect(transcriptsIn("/var/tmp/day-messages-mining-nowhere")).toEqual([])
})

test("nothing mined keeps nothing", () => {
  expect(keepMined("/var/tmp", [])).toEqual({ days: 0, rows: 0, unfiled: [] })
})

test("one row over one day is said in the singular", () => {
  expect(saidOf({ days: 1, rows: 1, unfiled: [] })).toBe("1 row was counted over 1 day")
})

test("many rows over many days are said in the plural", () => {
  expect(saidOf({ days: 32, rows: 317, unfiled: [] })).toBe("317 rows were counted over 32 days")
})
