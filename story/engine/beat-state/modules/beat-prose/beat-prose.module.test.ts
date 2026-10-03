import { expect, test } from "bun:test"
import {
  type BeatProse,
  proseIn,
  proseRefused,
  proseWritten,
} from "akasha/story/engine/beat-state/modules/beat-prose/beat-prose.module.code.ts"

const HELD: readonly BeatProse[] = [
  { beat: 1, prose: "Mara wakes in the attic." },
  { beat: 2, prose: "She goes down to the hall." },
]

function linesOf(prose: readonly BeatProse[]): readonly string[] {
  return prose.map((one) => JSON.stringify(one))
}

test("a line is one beat's prose, and the lines read back in order", () => {
  expect(proseIn(linesOf(HELD), 2)).toEqual(HELD)
})

test("a beat given no prose, or prose given twice, refuses the file", () => {
  expect(proseRefused([HELD[0] as BeatProse], 2)).toBe(
    "2 beats and prose for 1 of them, and every beat takes its own prose"
  )
  const twice = [HELD[0] as BeatProse, { beat: 1, prose: "Again." }]
  expect(proseRefused(twice, 2)).toBe("beat 1 carries prose where beat 2 is due")
})

test("a line naming no beat, or stating no prose, is refused", () => {
  expect(proseIn([JSON.stringify({ beat: 3, prose: "Late." })], 2)).toEqual({
    refused: "prose 1 names no beat from 1 to 2",
  })
  expect(proseIn([JSON.stringify({ beat: 1, prose: "  " })], 2)).toEqual({
    refused: "prose 1 states no prose",
  })
  expect(proseIn([JSON.stringify({ beat: 1, prose: "One.", mood: "glad" })], 2)).toEqual({
    refused: "prose 1 states `mood`, and a beat's prose states beat, prose",
  })
})

test("the prose written out is each beat's paragraph, one after another", () => {
  expect(proseWritten(HELD)).toBe("Mara wakes in the attic.\n\nShe goes down to the hall.\n")
})
