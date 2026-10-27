import { expect, test } from "bun:test"
import {
  anchoredOf,
  chapterBeatsOf,
  chapterOutcomesOf,
  chapterSlugOf,
  endsAtOf,
  lastOpeningOf,
  lastTurnOf,
  openThrough,
  proseOf,
  taken,
  turnCoversOf,
  turnStartsOf,
} from "akasha/command/pages/story/chapter-close/story-chapter-close.command.code.ts"
import {
  lineBefore,
  lineChained,
} from "akasha/command/pages/story/modules/settle-seeding/settle-seeding.module.code.ts"
import { outcomesAt } from "akasha/command/pages/story/settle/story-settle.command.code.ts"

const CALLED = "akasha story chapter-close"

test("a call names the story, the last turn and the title", () => {
  const read = taken(["--story", "the-tower", "--through", "69", "--title", "The Dark"], CALLED)
  expect(read).toEqual({ story: "the-tower", through: 69, title: "The Dark" })
})

test("a call naming no title is refused", () => {
  const read = taken(["--story", "the-tower", "--through", "69", "--title", " "], CALLED)
  expect("refused" in read).toBe(true)
})

test("a chapter's slug says its place in its story and its title", () => {
  expect(chapterSlugOf("the-tower", 4, "The Ascending Dark")).toBe(
    "the-tower-0004-the-ascending-dark"
  )
})

test("a chapter's prose is its turns in order, with no title, and keeps each window block", () => {
  const block = ":::level-up\nlevel: 5\n:::"
  expect(proseOf(["One.\n", `${block}\n\nTwo.\n`])).toBe(`One.\n\n${block}\n\nTwo.\n`)
})

test("a chapter's beats are each turn's beats in order, numbered on from the turn before", () => {
  const xp = { page: "metric-character/mara-xp", key: "value", from: 1, to: 2, note: "+1 XP" }
  const first = {
    beats: ["Mara rises in the attic."],
    scenes: [{ beat: 1, place: "place/attic" }],
    changes: [],
    memory: [],
  }
  const plain = { beats: [], scenes: [], changes: [], memory: [] }
  const second = {
    beats: ["Mara walks to the hall.", "She lights the lamp."],
    scenes: [{ beat: 1, place: "place/hall" }],
    changes: [{ beat: 2, ...xp }],
    memory: [],
  }
  const lines = (chapterBeatsOf([first, plain, second]) ?? "").trim().split("\n")
  expect(lines.map((one) => JSON.parse(one))).toEqual([
    { beat: 1, event: "Mara rises in the attic.", place: "place/attic" },
    { beat: 2, event: "Mara walks to the hall.", place: "place/hall" },
    { beat: 3, event: "She lights the lamp.", changes: [xp] },
  ])
})

test("a chapter whose turns have no beats has no beats file", () => {
  expect(chapterBeatsOf([{ beats: [], scenes: [], changes: [], memory: [] }])).toBeNull()
  expect(chapterBeatsOf([])).toBeNull()
})

const CLOSED = [1, 2, 3].map((position) => ({
  at: `turns/t-00-00${position}.story-turn-played.ts`,
  slug: `t-00-00${position}`,
  position,
}))

function outcomesOf(position: number): string {
  return outcomesAt(CLOSED[position - 1]?.at ?? "") ?? "no outcomes"
}

const SETTLED: Record<string, string> = {
  [outcomesOf(1)]: '{"check":"world-check/a","seed":"one"}\n{"check":"world-check/b"}\n',
  [outcomesOf(2)]: "",
  [outcomesOf(3)]: '{"check":"world-check/c","seed":"three"}\n',
}

function settledAt(path: string): string | null {
  return SETTLED[path] ?? null
}

test("a chapter keeps every outcome line of the turns it takes, in turn order, with its turn", () => {
  expect(chapterOutcomesOf(settledAt, CLOSED)).toBe(
    [
      '{"check":"world-check/a","seed":"one","turn":1}',
      '{"check":"world-check/b","turn":1}',
      '{"check":"world-check/c","seed":"three","turn":3}',
      "",
    ].join("\n")
  )
})

test("the next roll chains from the same line whether or not the chapter closed", () => {
  const chained = CLOSED.map((one) => ({ position: one.position, outcomes: outcomesAt(one.at) }))
  const kept = chapterOutcomesOf(settledAt, CLOSED) ?? ""
  const chapter = (path: string) => (path === "chapter" ? kept : null)
  expect(lineChained(chapter, [], [{ position: 1, outcomes: "chapter" }])).toBe(
    lineBefore(settledAt, chained) ?? "no line"
  )
})

test("a chapter keeps the paragraph each turn starts at, a window block counting for none", () => {
  const texts = ["One.\n\nTwo.\n", ":::level-up\nlevel: 5\n:::\n\nThree.\n", "Four.\n"]
  const turns = CLOSED.map((one) => ({ position: one.position }))
  expect(turnStartsOf(turns, texts)).toEqual([
    { position: 1, paragraph: 0 },
    { position: 2, paragraph: 2 },
    { position: 3, paragraph: 3 },
  ])
})

test("a chapter whose turns settled nothing has no outcomes", () => {
  expect(chapterOutcomesOf(settledAt, [CLOSED[1] ?? { at: "", position: 0 }])).toBeNull()
  expect(chapterOutcomesOf(() => null, CLOSED)).toBeNull()
})

test("a chapter takes the open turns through the one named, in order", () => {
  const turns = [
    { at: "c", slug: "t-00-058", position: 58 },
    { at: "a", slug: "t-00-056", position: 56 },
    { at: "d", slug: "t-00-070", position: 70 },
    { at: "b", slug: "t-00-057", position: 57 },
  ]
  expect(openThrough(turns, 58).map((one) => one.at)).toEqual(["a", "b", "c"])
})

test("a chapter says the slug and position of the last turn it takes", () => {
  const turns = [
    { at: "b", slug: "otherwhere-00-049", position: 49 },
    { at: "a", slug: "otherwhere-00-048", position: 48 },
  ]
  expect(lastTurnOf(turns)).toEqual({ lastTurn: "otherwhere-00-049", lastTurnPosition: 49 })
  expect(lastTurnOf([])).toBeNull()
})

test("a chapter ends when its last turn ends, and states no end where that turn states none", () => {
  const turns = [
    { at: "b", slug: "t-00-002", position: 2, endsAt: "2026-09-27T21:10:00.000Z" },
    { at: "a", slug: "t-00-001", position: 1, endsAt: "2026-09-27T20:00:00.000Z" },
  ]
  expect(endsAtOf(turns)).toEqual({ endsAt: "2026-09-27T21:10:00.000Z" })
  expect(endsAtOf([{ at: "a", slug: "t-00-001", position: 1 }])).toBeNull()
  expect(endsAtOf([])).toBeNull()
})

test("a chapter keeps the cover of each turn it takes that has one, under the turn's number", () => {
  const turns = [
    { at: "a", slug: "t-00-001", position: 1, cover: "image/image-one" },
    { at: "b", slug: "t-00-002", position: 2 },
    { at: "c", slug: "t-00-003", position: 3, cover: "image/image-three" },
  ]
  expect(turnCoversOf(turns)).toEqual([
    { position: 1, cover: "image/image-one" },
    { position: 3, cover: "image/image-three" },
  ])
})

test("a turn's last paragraph is opened by its first words, passing over window blocks", () => {
  const prose =
    "First.\n\nShe ran for the gate as the bell rang out over the town and kept ringing.\n\n:::level-up\nlevel: 5\n:::\n"
  expect(lastOpeningOf(prose)).toBe("She ran for the gate as the bell rang out over the")
  expect(lastOpeningOf("")).toBeUndefined()
})

test("a cover its turn states no words for is drawn after that turn's last paragraph", () => {
  const turns = [
    { at: "a", slug: "t-00-001", position: 1, cover: "image/one" },
    { at: "b", slug: "t-00-002", position: 2, cover: "image/two", coverAfter: "Rain fell" },
    { at: "c", slug: "t-00-003", position: 3 },
  ]
  expect(anchoredOf(turns, ["One.\n\nTwo ends it.", "Rain fell.", "Three."])).toEqual([
    { at: "a", slug: "t-00-001", position: 1, cover: "image/one", coverAfter: "Two ends it." },
    { at: "b", slug: "t-00-002", position: 2, cover: "image/two", coverAfter: "Rain fell" },
    { at: "c", slug: "t-00-003", position: 3 },
  ])
})

test("a chapter keeps the words each turn's cover is drawn after, where the turn states them", () => {
  const turns = [
    { at: "a", slug: "t-00-001", position: 1, cover: "image/image-one", coverAfter: "She ran" },
    { at: "b", slug: "t-00-002", position: 2, cover: "image/image-two" },
  ]
  expect(turnCoversOf(turns)).toEqual([
    { position: 1, cover: "image/image-one", coverAfter: "She ran" },
    { position: 2, cover: "image/image-two" },
  ])
})
