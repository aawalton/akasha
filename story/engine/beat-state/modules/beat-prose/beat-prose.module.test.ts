import { expect, test } from "bun:test"
import {
  type BeatProse,
  proseIn,
  proseLeadingRefused,
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

test("prose on the first beats in order holds, and prose after a gap is refused", () => {
  expect(proseLeadingRefused([HELD[0] as BeatProse])).toBeNull()
  expect(proseLeadingRefused([])).toBeNull()
  expect(proseLeadingRefused([HELD[1] as BeatProse])).toBe(
    "beat 2 carries prose where beat 1 is due"
  )
})

test("a line naming no beat, or stating no prose, is refused", () => {
  expect(proseIn([JSON.stringify({ beat: 3, prose: "Late." })], 2)).toEqual({
    refused: "prose 1 names no beat from 1 to 2",
  })
  expect(proseIn([JSON.stringify({ beat: 1, prose: "  " })], 2)).toEqual({
    refused: "prose 1 states no prose",
  })
  expect(proseIn([JSON.stringify({ beat: 1, prose: "One.", mood: "glad" })], 2)).toEqual({
    refused: "prose 1 states `mood`, and a beat's prose states beat, prose, continues",
  })
})

test("a line may state `continues`, kept where true and left off where false", () => {
  const lines = [
    JSON.stringify({ beat: 1, prose: "Mara wakes.\n\nThe attic is cold." }),
    JSON.stringify({ beat: 2, prose: "She yawns.", continues: true }),
    JSON.stringify({ beat: 3, prose: "She goes down.", continues: false }),
  ]
  expect(proseIn(lines, 3)).toEqual([
    { beat: 1, prose: "Mara wakes.\n\nThe attic is cold." },
    { beat: 2, prose: "She yawns.", continues: true },
    { beat: 3, prose: "She goes down." },
  ])
})

test("`continues` on beat 1, or as anything but true or false, is refused", () => {
  expect(proseIn([JSON.stringify({ beat: 1, prose: "One.", continues: true })], 2)).toEqual({
    refused: "prose 1 states `continues` on beat 1, which has no paragraph before it to continue",
  })
  const lines = [
    JSON.stringify({ beat: 1, prose: "One." }),
    JSON.stringify({ beat: 2, prose: "Two.", continues: "yes" }),
  ]
  expect(proseIn(lines, 2)).toEqual({
    refused: "prose 2 states `continues` as neither true nor false",
  })
})

test("the prose written out is each beat's paragraph, one after another", () => {
  expect(proseWritten(HELD)).toBe("Mara wakes in the attic.\n\nShe goes down to the hall.\n")
})

test("a beat that continues joins the paragraph before it with a space", () => {
  const joined = [HELD[0] as BeatProse, { beat: 2, prose: "She yawns.", continues: true }]
  expect(proseWritten(joined)).toBe("Mara wakes in the attic. She yawns.\n")
  const apart = [HELD[0] as BeatProse, { beat: 2, prose: "She yawns.", continues: false }]
  expect(proseWritten(apart)).toBe("Mara wakes in the attic.\n\nShe yawns.\n")
})

test("a beat's prose may hold paragraphs of its own, written out as they are", () => {
  const held = [{ beat: 1, prose: "Mara wakes.\n\nThe attic is cold." }, HELD[1] as BeatProse]
  expect(proseWritten(held)).toBe(
    "Mara wakes.\n\nThe attic is cold.\n\nShe goes down to the hall.\n"
  )
})

test("beat 1 continuing is refused, since no paragraph comes before it", () => {
  const first = [{ ...(HELD[0] as BeatProse), continues: true }, HELD[1] as BeatProse]
  expect(proseRefused(first, 2)).toBe(
    "beat 1 continues, and has no paragraph before it to continue"
  )
})
