import { expect, test } from "bun:test"
import {
  type Beats,
  beatsIn,
  beatsJoined,
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

test("a beat's prose rides on the line of the beat it tells", () => {
  const told: Beats = {
    ...HELD,
    prose: [
      { beat: 1, prose: "Mara wakes in the attic." },
      { beat: 2, prose: "She goes down to the hall." },
    ],
  }
  const line = JSON.parse(beatsWritten(told).split("\n")[0] ?? "")
  expect(line.prose).toBe("Mara wakes in the attic.")
  expect(beatsIn(beatsWritten(told))).toEqual(told)
})

test("a beat continuing the paragraph before it keeps `continues` on its line", () => {
  const told: Beats = {
    ...HELD,
    prose: [
      { beat: 1, prose: "Mara wakes in the attic.\n\nThe floor is cold." },
      { beat: 2, prose: "She goes down to the hall.", continues: true },
    ],
  }
  const lines = beatsWritten(told).split("\n")
  expect(JSON.parse(lines[0] ?? "").continues).toBeUndefined()
  expect(JSON.parse(lines[1] ?? "").continues).toBe(true)
  expect(beatsIn(beatsWritten(told))).toEqual(told)
})

test("`continues` shaped wrong, on beat 1, or with no prose refuses the whole file", () => {
  const one = { beat: 1, event: "One.", prose: "One told." }
  const two = { beat: 2, event: "Two.", prose: "Two told." }
  const fileOf = (first: object, second: object) =>
    `${JSON.stringify(first)}\n${JSON.stringify(second)}\n`
  expect(beatsIn(fileOf(one, { ...two, continues: "yes" }))).toEqual({
    refused: "beat 2 states `continues` as neither true nor false",
  })
  expect(beatsIn(fileOf({ ...one, continues: true }, two))).toEqual({
    refused: "beat 1 continues, and has no paragraph before it to continue",
  })
  expect(beatsIn(fileOf(one, { beat: 2, event: "Two.", continues: true }))).toEqual({
    refused: "beat 2 states `continues` and no `prose`",
  })
})

test("prose on the first beats reads, and prose after a beat with none refuses the file", () => {
  const first = JSON.stringify({ beat: 1, event: "One.", prose: "One told." })
  const second = JSON.stringify({ beat: 2, event: "Two." })
  expect(beatsIn(`${first}\n${second}\n`)).toEqual({
    beats: ["One.", "Two."],
    scenes: [],
    changes: [],
    memory: [],
    prose: [{ beat: 1, prose: "One told." }],
  })
  const gap = JSON.stringify({ beat: 2, event: "Two.", prose: "Two told." })
  expect(beatsIn(`${JSON.stringify({ beat: 1, event: "One." })}\n${gap}\n`)).toEqual({
    refused: "beat 2 carries prose where beat 1 is due",
  })
})

test("a part stated as an empty list stays on its line, apart from a part never stated", () => {
  const file = [
    JSON.stringify({ beat: 1, event: "One.", changes: [], memory: [] }),
    JSON.stringify({ beat: 2, event: "Two.", pictured: [] }),
    JSON.stringify({ beat: 3, event: "Three." }),
  ].join("\n")
  const read = beatsIn(file)
  expect(read).toEqual({
    beats: ["One.", "Two.", "Three."],
    scenes: [],
    changes: [],
    memory: [],
    none: [
      { beat: 1, part: "changes" },
      { beat: 1, part: "memory" },
      { beat: 2, part: "pictured" },
    ],
  })
  if ("refused" in read) return
  expect(beatsWritten(read)).toBe(`${file}\n`)
  expect(beatsJoined([read, read]).none?.map((one) => one.beat)).toEqual([1, 1, 2, 4, 4, 5])
})

test("a refused beat's issues sit on its line and read back, and an empty list is refused", () => {
  const file = `${JSON.stringify({ beat: 1, event: "One.", issues: ["beat 1: no coin"] })}\n`
  const read = beatsIn(file)
  expect(read).toMatchObject({ issues: [{ beat: 1, issue: "beat 1: no coin" }] })
  if ("refused" in read) return
  expect(beatsWritten(read)).toBe(file)
  const empty = `${JSON.stringify({ beat: 1, event: "One.", issues: [] })}\n`
  expect(beatsIn(empty)).toEqual({ refused: "beat 1 states `issues` as no list of issues" })
})

test("beats joined end to end are numbered on from the beats before them", () => {
  const picture = { beat: 1, cover: "image/image-a", coverAfter: "Mara", setting: "the attic" }
  const later: Beats = { ...HELD, pictured: [picture] }
  const joined = beatsJoined([HELD, later])
  expect(joined.beats).toEqual([...HELD.beats, ...HELD.beats])
  expect(joined.scenes.map((one) => one.beat)).toEqual([1, 2, 3, 4])
  expect(joined.changes.map((one) => one.beat)).toEqual([2, 4])
  expect(joined.memory.map((one) => one.beat)).toEqual([1, 3])
  expect(joined.pictured).toEqual([{ ...picture, beat: 3 }])
  expect(beatsIn(beatsWritten(joined))).toEqual(joined)
  expect(beatsJoined([HELD])).toEqual(HELD)
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
