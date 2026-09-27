import { expect, test } from "bun:test"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  liftedFrom,
  withoutRows,
} from "akasha/command/pages/story/turn/modules/turn-keeping/turn-keeping.module.code.ts"

const AT = "stories/the-saga/turns/the-saga-00-003.story-turn-played.ts"

const TEXT = `export const theSaga00003 = {
  slug: "the-saga-00-003",
  recordedBy: ["story-recorder/cast"],
} as const
`

const HALL: FileChange = { kind: "add", path: "lore/a-hall.lore.ts", content: "cast\n" }

const GATE: FileChange = { kind: "add", path: "lore/the-gate.lore.ts", content: "memory\n" }

const ENDED: FileChange = {
  kind: "replace",
  path: AT,
  contentFrom: `  recordedBy: ["story-recorder/cast"],\n`,
  contentTo: `  recordedBy: ["story-recorder/cast"],\n  endsAt: "2026-09-26T09:05:00.000Z",\n`,
}

test("rows taken away leave the rest in their order, one copy for each row taken", () => {
  const copy = { ...GATE }
  expect(withoutRows([HALL, GATE, copy], [GATE])).toEqual([HALL, GATE])
  expect(withoutRows([HALL, GATE], [ENDED])).toEqual([HALL, GATE])
})

test("a kept edit to the turn's own page is lifted into values and leaves the rest kept", () => {
  const turn = { at: AT, value: { recordedBy: ["story-recorder/cast"] } }
  const lifted = liftedFrom(turn, [HALL, ENDED, GATE], () => TEXT)
  expect(lifted).toEqual({ values: { endsAt: "2026-09-26T09:05:00.000Z" }, rest: [HALL, GATE] })
})

test("a kept edit to the turn's own page that no longer fits it is refused", () => {
  const turn = { at: AT, value: {} }
  const stale = { ...ENDED, contentFrom: `  lore: ["world-place/the-hall"],\n` }
  const lifted = liftedFrom(turn, [stale], () => TEXT)
  expect("refused" in lifted ? lifted.refused : "").toContain("no longer fits")
})
