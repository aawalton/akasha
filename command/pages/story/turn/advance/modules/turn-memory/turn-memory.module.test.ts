import { expect, test } from "bun:test"
import type { Reading } from "akasha/command/pages/story/tell/story-tell.command.code.ts"
import {
  memorySettled,
  memoryTold,
} from "akasha/command/pages/story/turn/advance/modules/turn-memory/turn-memory.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Memory } from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import type { Held } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const AT = "world/lore/the-mere.lore.ts"

const FACT = "The mere has no bottom."

const BODY = [
  "export const theMere = {",
  '  type: "page-type/lore",',
  '  slug: "the-mere",',
  '  world: "world/w",',
  `  facts: [{ fact: ${JSON.stringify(FACT)}, knowers: ["lore-disclosure/game-master"] }],`,
  "} as const",
  "",
].join("\n")

const READING: Reading = {
  listedAt: (type, slug) => {
    if (type === "lore" && slug === "the-mere") return [{ path: AT }]
    return type.startsWith("character") ? [{ path: `characters/${slug}.ts` }] : []
  },
  valueAt: (path) => (path === AT ? valueIn(BODY) : {}),
  textOf: (path) => (path === AT ? BODY : null),
  shaped: (_path, text) => text,
}

const ELSIE: Memory = {
  beat: 2,
  page: "lore/the-mere",
  fact: FACT,
  learns: "character-player/elsie",
}

const CERI: Memory = { ...ELSIE, learns: "character-other/ceri" }

function askedOf(memory: readonly Memory[]) {
  const told = memoryTold(memory, READING)
  if ("refused" in told) throw new Error(told.refused)
  return told
}

test("a character learning a fact is added to its knowers, and a second learner after the first", () => {
  const told = askedOf([ELSIE, CERI])
  expect(told).toHaveLength(2)
  expect(JSON.stringify(told[0])).toContain("character-player/elsie")
  expect(JSON.stringify(told[1])).toContain("character-other/ceri")
})

test("learning a fact twice tells it once, and a fact the reader is only shown tells nothing", () => {
  expect(askedOf([ELSIE, { ...ELSIE, beat: 3 }])).toHaveLength(1)
  expect(askedOf([{ beat: 1, page: "lore/the-mere", fact: FACT, shown: true }])).toEqual([])
})

test("learning a fact the page holds nowhere is refused, naming the memory and its beat", () => {
  const told = memoryTold([{ ...ELSIE, fact: "The mere is shallow." }], READING)
  expect("refused" in told ? told.refused : "").toContain("memory 1, on beat 2")
})

const HELD: Held = {
  game: "saga",
  status: "recorders",
  lore: [],
  issues: [],
  reviewedBy: [],
  recordedBy: [],
  written: true,
  memory: [ELSIE],
}

test("the memory is told onto the lore only as the turn moves to player", () => {
  const review = { kind: "review", reviewer: "voice", issues: [] } as const
  expect(memorySettled(READING, { ...HELD, status: "reviewers" }, review, "reviewers")).toEqual([])
  expect(memorySettled(READING, { ...HELD, status: "reviewers" }, review, "player")).toHaveLength(1)
})

test("a recorder's memory is checked with the turn's as handed in, and told with it at player", () => {
  const bad = { kind: "record", recorder: "memory", memory: [{ ...CERI, fact: "No." }] } as const
  const refused = memorySettled(READING, HELD, bad, "reviewers")
  expect("refused" in refused ? refused.refused : "").toContain("memory 2")
  const good = { kind: "record", recorder: "memory", memory: [CERI] } as const
  expect(memorySettled(READING, HELD, good, "reviewers")).toEqual([])
  expect(memorySettled(READING, HELD, good, "player")).toHaveLength(2)
})
