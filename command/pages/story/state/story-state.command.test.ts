import { expect, test } from "bun:test"
import type { Paged } from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import {
  type Story,
  stateLines,
} from "akasha/command/pages/story/state/story-state.command.code.ts"
import { GAME_MASTER } from "akasha/command/pages/story/tell/story-tell.command.code.ts"
import type { BeatChange } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import type { Memory } from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import {
  PLAYER,
  statusOf,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const MARA = "character-player/mara"

const HALL = "place/a-hall"

const GATE = "place/the-gate"

const XP = "metric-character/mara-xp"

const FACT = "The mere has no bottom."

const FIRST: Paged = {
  slug: "saga-00-001",
  value: { position: 1, stepStatus: statusOf(PLAYER), beats: "jsonl" },
  beats: {
    beats: ["a"],
    scenes: [{ beat: 1, at: "2026-01-01T09:00:00.000Z", place: HALL, present: [MARA] }],
    changes: [],
    memory: [],
  },
}

const SECOND: Paged = {
  slug: "saga-00-002",
  value: { position: 2, stepStatus: statusOf(PLAYER), beats: "jsonl" },
  beats: { beats: ["b"], scenes: [], changes: [], memory: [] },
}

const CHANGES: Readonly<Record<string, readonly BeatChange[]>> = {
  "saga-00-001": [{ beat: 1, page: XP, key: "value", from: 0, to: 10, note: "+10" }],
  "saga-00-002": [{ beat: 1, page: XP, key: "value", from: 10, to: 30, note: "+20" }],
}

const MEMORY: Readonly<Record<string, readonly Memory[]>> = {
  "saga-00-002": [
    { beat: 1, page: "lore/the-mere", fact: FACT, learns: MARA },
    { beat: 1, page: "lore/the-mere", fact: FACT, shown: true },
  ],
}

const PAGES: Readonly<Record<string, Readonly<Record<string, unknown>>>> = {
  [MARA]: { place: HALL },
  [XP]: { value: 30 },
  "lore/the-mere": { facts: [{ fact: FACT, knowers: [GAME_MASTER, MARA] }] },
}

function storyOver(pages: typeof PAGES): Story {
  return {
    turns: [SECOND, FIRST],
    changesOf: (one) => CHANGES[one.slug] ?? [],
    memoryOf: (one) => MEMORY[one.slug] ?? [],
    reading: {
      exists: (page) => page in pages,
      valueOf: (page, key) => pages[page]?.[key],
      filed: () => null,
    },
  }
}

test("the beats replayed name the clock, each place, each value and what the reader was shown", () => {
  expect(stateLines(storyOver(PAGES))).toEqual([
    "clock\t2026-01-01T09:00:00.000Z",
    `place\t${MARA}\t${HALL}`,
    `shown\tsaga-00-002\tlore/the-mere\t${FACT}`,
    `value\t${XP}\tvalue\t30`,
    "drift\tnone: the pages hold every value the beats reach",
  ])
})

test("a played chapter replays before the turns and counts though it states no step status", () => {
  const chapter: Paged = { ...FIRST, value: { position: 5, beats: "jsonl" }, closed: true }
  const later = { beat: 1, at: "2026-01-01T10:00:00.000Z", place: GATE }
  const turn: Paged = {
    ...SECOND,
    beats: { beats: ["b"], scenes: [later], changes: [], memory: [] },
  }
  const story: Story = {
    ...storyOver({ ...PAGES, [MARA]: { place: GATE }, [XP]: { value: 10 } }),
    turns: [turn, chapter],
    changesOf: (one) => (one.closed === true ? (CHANGES[one.slug] ?? []) : []),
  }
  expect(stateLines(story)).toEqual([
    "clock\t2026-01-01T10:00:00.000Z",
    `place\t${MARA}\t${GATE}`,
    `shown\tsaga-00-002\tlore/the-mere\t${FACT}`,
    `value\t${XP}\tvalue\t10`,
    "drift\tnone: the pages hold every value the beats reach",
  ])
})

test("a page holding a value the beats do not leave is named, as is a learner who is no knower", () => {
  const drifted = { ...PAGES, [XP]: { value: 25 }, "lore/the-mere": { facts: [] } }
  const lines = stateLines(storyOver(drifted))
  expect(lines).toContain(`drift\t${XP}\tvalue\t30\t25`)
  expect(lines.some((one) => one.includes("learned it in saga-00-002 and is no knower"))).toBe(true)
})

test("a turn whose beats file does not read is named rather than replayed as nothing", () => {
  const broken: Paged = { ...FIRST, beats: { refused: "the beats file beside `x` is broken" } }
  const story = { ...storyOver(PAGES), turns: [broken, SECOND] }
  expect(stateLines(story)[0]).toBe("refused\tscenes\tthe beats file beside `x` is broken")
})

test("a value changed between two turns by no beat is named as changed outside the beats", () => {
  const gapped: BeatChange = { beat: 1, page: XP, key: "value", from: 12, to: 30, note: "+18" }
  const gap: Readonly<Record<string, readonly BeatChange[]>> = {
    ...CHANGES,
    "saga-00-002": [gapped],
  }
  const story = { ...storyOver(PAGES), changesOf: (one: Paged) => gap[one.slug] ?? [] }
  expect(stateLines(story)).toContain(
    `drift\t${XP}\tvalue\tchanged outside the beats before saga-00-002`
  )
})
