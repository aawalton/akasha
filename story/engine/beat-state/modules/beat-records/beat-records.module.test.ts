import { expect, test } from "bun:test"
import {
  type Beats,
  beatsIn,
  beatsWritten,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"

const HELD: Beats = {
  beats: ["Mara rises in the attic.", "She walks to the hall."],
  scenes: [
    { beat: 1, at: "2026-06-01T04:00:00.000Z", place: "place/attic", present: ["character/mara"] },
    { beat: 2, place: "place/hall" },
  ],
  changes: [
    { beat: 2, page: "metric-character/mara-xp", key: "value", from: 1, to: 2, note: "+1 XP" },
  ],
  memory: [{ beat: 1, page: "lore/mara", fact: "Mara is the heir", learns: "character/mara" }],
}

test("one line is one beat, holding its event and each step's part of it", () => {
  const lines = beatsWritten(HELD).split("\n")
  expect(JSON.parse(lines[0] ?? "")).toEqual({
    beat: 1,
    event: "Mara rises in the attic.",
    at: "2026-06-01T04:00:00.000Z",
    place: "place/attic",
    present: ["character/mara"],
    memory: [{ page: "lore/mara", fact: "Mara is the heir", learns: "character/mara" }],
  })
  expect(JSON.parse(lines[1] ?? "")).toEqual({
    beat: 2,
    event: "She walks to the hall.",
    place: "place/hall",
    changes: [{ page: "metric-character/mara-xp", key: "value", from: 1, to: 2, note: "+1 XP" }],
  })
})

test("writing a file back and reading it again gives the same beats", () => {
  expect(beatsIn(beatsWritten(HELD))).toEqual(HELD)
})

test("a picture sits on the line of the beat it shows, and reads back", () => {
  const picture = { beat: 2, cover: "image/image-a", coverAfter: "She walks", setting: "the hall" }
  const pictured = { ...HELD, pictured: [picture] }
  const line = JSON.parse(beatsWritten(pictured).split("\n")[1] ?? "")
  expect(line.pictured).toEqual([
    { cover: "image/image-a", coverAfter: "She walks", setting: "the hall" },
  ])
  expect(beatsIn(beatsWritten(pictured))).toEqual(pictured)
})

test("a part a beat has none of is left off its line", () => {
  const plain = { beats: ["A plain beat."], scenes: [], changes: [], memory: [] }
  expect(beatsWritten(plain)).toBe(`${JSON.stringify({ beat: 1, event: "A plain beat." })}\n`)
})

test("a line out of order, or a part shaped wrong, refuses the whole file", () => {
  const swapped = `${JSON.stringify({ beat: 2, event: "Two." })}\n`
  expect(beatsIn(swapped)).toEqual({ refused: "line 1 names beat 2, out of order" })
  const stray = `${JSON.stringify({ beat: 1, event: "One.", mood: "glad" })}\n`
  expect("refused" in beatsIn(stray)).toBe(true)
  const named = `${JSON.stringify({ beat: 1, event: "One.", changes: [{ beat: 1 }] })}\n`
  expect(beatsIn(named)).toEqual({
    refused: "beat 1 lists an entry naming a beat, and its line names it",
  })
})
