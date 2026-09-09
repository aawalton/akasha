import { expect, test } from "bun:test"
import {
  countedOver,
  greetedIn,
  heldBy,
  keepMined,
  namedIn,
  saidOf,
  seatPageIn,
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

const TOLD =
  '{"type":"user","message":{"role":"user","content":' +
  '[{"type":"tool_result","content":"You are persona `amy`, domain `x`, role `handler`."}]}}'

const QUOTED =
  '{"type":"user","message":{"role":"user","content":' +
  '[{"type":"tool_result","content":"a report said \\"You are persona `ryn`\\" once"}]}}'

const ANSWERED =
  '{"type":"user","message":{"role":"user","content":[{"type":"tool_result","content":' +
  '"seat-system/seats/pages/thea.seat.ts — the whole file follows, 15 lines"}]}}'

const EMPTY: Transcript = { named: null, seatPage: null, greeted: null, wrote: [] }

test("a transcript is told which persona it is", () => {
  expect(namedIn(TOLD)).toBe("amy")
})

test("a name quoted inside another message tells a transcript nothing", () => {
  expect(namedIn(QUOTED)).toBeNull()
})

test("the seat page a read answered with names the seat", () => {
  expect(seatPageIn(ANSWERED)).toBe("thea")
})

test("a seat page no read answered with names no seat", () => {
  expect(seatPageIn("open seat-system/seats/pages/thea.seat.ts and look")).toBeNull()
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
  expect(wroteIn(TOLD)).toBeNull()
})

test("a transcript keeps the first name of each sort and every moment Alan wrote", () => {
  expect(transcriptIn([QUOTED, ANSWERED, TOLD, TYPED, SENT, QUEUED].join("\n"))).toEqual({
    named: "amy",
    seatPage: "thea",
    greeted: "aura",
    wrote: ["2026-09-08T11:00:00.000Z", "2026-09-08T05:00:00.000Z"],
  })
})

test("the seat page a read answered with beats the persona a transcript is told it is", () => {
  expect(heldBy({ ...EMPTY, seatPage: "thea", named: "amy", greeted: "aura" }, KNOWN)).toBe("thea")
})

test("the persona a transcript is told it is beats the name Alan greeted", () => {
  expect(heldBy({ ...EMPTY, named: "amy", greeted: "aura" }, KNOWN)).toBe("amy")
})

test("a name no persona is filed under is passed over", () => {
  expect(heldBy({ ...EMPTY, named: "nobody", greeted: "aura" }, KNOWN)).toBe("aura")
})

test("a transcript answering to nobody is held by nobody", () => {
  expect(heldBy(EMPTY, KNOWN)).toBeNull()
})

test("a message before six in the morning in New York falls on the day before", () => {
  const one: Transcript = { ...EMPTY, named: "aura", wrote: ["2026-09-08T05:00:00.000Z"] }
  expect(countedOver([one], KNOWN)).toEqual([
    { day: "2026-09-07", counted: [{ persona: "aura", sent: 1 }] },
  ])
})

test("the personas on a day sit in the order of their names", () => {
  const one: Transcript = { ...EMPTY, named: "thea", wrote: ["2026-09-08T11:00:00.000Z"] }
  const two: Transcript = {
    ...EMPTY,
    named: "amy",
    wrote: ["2026-09-08T11:00:00.000Z", "2026-09-08T12:00:00.000Z"],
  }
  expect(countedOver([one, two], KNOWN)).toEqual([
    {
      day: "2026-09-08",
      counted: [
        { persona: "amy", sent: 2 },
        { persona: "thea", sent: 1 },
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
  expect(saidOf({ days: 32, rows: 319, unfiled: [] })).toBe("319 rows were counted over 32 days")
})
