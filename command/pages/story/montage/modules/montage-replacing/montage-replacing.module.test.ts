import { expect, test } from "bun:test"
import {
  priorIn,
  startOf,
} from "akasha/command/pages/story/montage/modules/montage-replacing/montage-replacing.module.code.ts"

const SETTLED = JSON.stringify({
  check: "world-check/time",
  answered: { endsAt: "2026-10-27T09:10:00.000Z" },
})

const FIRST = JSON.stringify({ check: "world-check/time", session: 1, answered: { endsAt: "x" } })

const SECOND = JSON.stringify({ check: "world-check/drill", session: 1, answered: { gained: 1 } })

const NOTHING = { kept: [], earlier: [], chapters: [], opens: "2026-10-27T08:00:00.000Z" }

test("a story whose last end is a chapter starts a montage at that chapter's end", () => {
  const chapters = [
    { position: 1, ends: "2026-10-27T08:20:00.000Z" },
    { position: 2, ends: "2026-10-27T08:44:00.000Z" },
  ]
  expect(startOf({ ...NOTHING, chapters })).toBe("2026-10-27T08:44:00.000Z")
})

test("an earlier turn's end comes before any chapter's", () => {
  const chapters = [{ position: 2, ends: "2026-10-27T08:44:00.000Z" }]
  const earlier = [null, "2026-10-27T09:00:00.000Z"]
  expect(startOf({ ...NOTHING, chapters, earlier })).toBe("2026-10-27T09:00:00.000Z")
})

test("a time settled on the turn before the montage comes first", () => {
  const earlier = ["2026-10-27T09:00:00.000Z"]
  expect(startOf({ ...NOTHING, earlier, kept: [SETTLED] })).toBe("2026-10-27T09:10:00.000Z")
})

test("a story with no end anywhere starts at its opening", () => {
  expect(startOf(NOTHING)).toBe("2026-10-27T08:00:00.000Z")
})

test("a turn's montage lines are parted from the lines kept before them", () => {
  const said = priorIn([SETTLED, FIRST, SECOND])
  if ("refused" in said) throw new Error(said.refused)
  expect(said.answered.kept).toEqual([SETTLED])
  expect(said.answered.prior?.text).toBe(`${FIRST}\n${SECOND}\n`)
  expect(said.answered.prior?.lines).toHaveLength(2)
})

test("a turn with no montage lines keeps them all", () => {
  expect(priorIn([SETTLED])).toEqual({ answered: { kept: [SETTLED], prior: null } })
})

test("a montage whose lines are not the turn's last is refused a rerun", () => {
  expect(priorIn([FIRST, SETTLED])).toHaveProperty("refused")
})
