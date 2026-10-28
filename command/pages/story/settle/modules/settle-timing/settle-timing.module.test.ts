import { expect, test } from "bun:test"
import type { Taken } from "akasha/command/pages/story/settle/modules/settle-taking/settle-taking.module.code.ts"
import {
  firstInstant,
  timedWith,
} from "akasha/command/pages/story/settle/modules/settle-timing/settle-timing.module.code.ts"

const OPENS = "2026-11-13T12:00:00.000Z"

const HELD: Taken = {
  story: "probe",
  check: "probe-time-passing",
  reading: { minutes: 5 },
  dice: null,
  turn: null,
  drafts: false,
}

test("a time reading stating no from is handed the turn's start", () => {
  expect(timedWith(HELD, OPENS)).toEqual({
    held: { ...HELD, reading: { minutes: 5, from: OPENS } },
  })
})

test("a time reading stating the turn's start is kept as it is", () => {
  const held = { ...HELD, reading: { minutes: 5, from: "2026-11-13T12:00:00Z" } }
  expect(timedWith(held, OPENS)).toEqual({ held })
})

test("a time reading stating another start is refused, naming the start", () => {
  const held = { ...HELD, reading: { minutes: 5, from: "2026-10-27T08:00:00.000Z" } }
  const said = timedWith(held, OPENS)
  expect("refused" in said ? said.refused : "").toContain(OPENS)
})

test("a check other than the story's time check is left as it is", () => {
  const held = { ...HELD, check: "probe-action-check" }
  expect(timedWith(held, OPENS)).toEqual({ held })
})

test("a turn starts at the turn before's end, else the latest chapter's, else the opening", () => {
  expect(firstInstant([undefined, "2026-11-13T12:10:00.000Z", OPENS])).toBe(
    "2026-11-13T12:10:00.000Z"
  )
  expect(firstInstant([undefined, null, OPENS])).toBe(OPENS)
  expect(firstInstant([])).toBeNull()
})

test("a story with no start known is left as it is", () => {
  expect(timedWith(HELD, null)).toEqual({ held: HELD })
})
