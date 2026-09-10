import { expect, test } from "bun:test"
import { bodyOver, type Row, rowsIn } from "./migrate-check-logs.change-agent.code.ts"

const EARLY = '{"runId":"a","ranAt":"2026-09-10T01:00:00.000Z","phase":"patch","ran":"typecheck"}'

const LATE = '{"runId":"b","ranAt":"2026-09-10T02:00:00.000Z","phase":"patch","ran":"typecheck"}'

const AUDITED = '{"runId":"c","ranAt":"2026-09-10T03:00:00.000Z","phase":"audit","ran":"typecheck"}'

const BEFORE = '{"runId":"d","ranAt":"2026-09-09T23:00:00.000Z","phase":"patch","ran":"typecheck"}'

const DAY = "2026-09-10"

function rowsOf(text: string, since: string): readonly Row[] {
  const rows = rowsIn(text, since)
  if (typeof rows === "string") throw new Error(rows)
  return rows
}

test("a run before the day handed in is left where that run was recorded", () => {
  const rows = rowsOf(`${BEFORE}\n${EARLY}\n`, DAY)
  expect(rows.map((one) => one.line)).toEqual([EARLY])
})

test("a run recorded at audit is told apart from every other run", () => {
  const rows = rowsOf(`${EARLY}\n${AUDITED}\n`, DAY)
  expect(rows.map((one) => one.audit)).toEqual([false, true])
})

test("a line that is no run recorded as one object refuses the whole call", () => {
  expect(rowsIn(`${EARLY}\nnot a run\n`, DAY)).toContain("not a run")
})

test("lines are written in the order the runs opened", () => {
  const body = bodyOver(rowsOf(`${LATE}\n${EARLY}\n`, DAY), [])
  expect(body).toBe(`${EARLY}\n${LATE}\n`)
})

test("a log already holding a line takes that line no second time", () => {
  const body = bodyOver(rowsOf(`${EARLY}\n${LATE}\n`, DAY), rowsOf(`${EARLY}\n`, DAY))
  expect(body).toBe(`${EARLY}\n${LATE}\n`)
})
