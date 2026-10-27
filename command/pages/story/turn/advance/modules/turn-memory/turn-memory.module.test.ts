import { expect, test } from "bun:test"
import { CEILING } from "akasha/check/code/pages/file-length/modules/length-ceiling/length-ceiling.module.code.ts"
import {
  ADD_FILE,
  REPLACE,
} from "akasha/command/pages/story/modules/tell-continuing/tell-continuing.module.code.ts"
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

test("at beats a recorder's memory for its beat is told at once, and no other memory", () => {
  const beat = { kind: "record", recorder: "memory", beat: 2, memory: [CERI] } as const
  const flowing = { ...HELD, status: "beats" } as const
  expect(memorySettled(READING, flowing, beat, "beats")).toHaveLength(1)
  expect(memorySettled(READING, flowing, { ...beat, memory: [] }, "player")).toEqual([])
})

const WORLD_AT = "world/w.world.ts"

const SECOND_AT = "world/lore/the-mere-2.lore.ts"

const LATER = "The mere freezes in winter."

const SECOND = [
  "export const theMere2 = {",
  '  type: "page-type/lore",',
  '  slug: "the-mere-2",',
  '  world: "world/w",',
  '  about: "lore/the-mere",',
  `  facts: [{ fact: ${JSON.stringify(LATER)}, knowers: ["lore-disclosure/game-master"] }],`,
  "} as const",
  "",
].join("\n")

function fullReading(bodies: Readonly<Record<string, string>>): Reading {
  return {
    listedAt: (type, slug) => {
      if (type === "world" && slug === "w") return [{ path: WORLD_AT }]
      const at = Object.keys(bodies).find((path) => path.endsWith(`/${slug}.${type}.ts`))
      if (at !== undefined) return [{ path: at }]
      return type.startsWith("character") ? [{ path: `characters/${slug}.ts` }] : []
    },
    valueAt: (path) => {
      const text = bodies[path]
      return text === undefined ? {} : valueIn(text)
    },
    textOf: (path) => bodies[path] ?? null,
    shaped: (path, text) => (path === AT ? `${text}${"x".repeat(CEILING)}` : text),
  }
}

function addedBody(told: ReturnType<typeof memoryTold>): string {
  if ("refused" in told) throw new Error(told.refused)
  expect(told.map((one) => [one.at, Reflect.get(one.given, "at")])).toEqual([[ADD_FILE, SECOND_AT]])
  return String(Reflect.get(told[0]?.given ?? {}, "body"))
}

test("a fact established on a full page goes to its continuation with every learner at once", () => {
  const made = { beat: 4, page: "lore/the-mere", fact: "Eels live in the mere." }
  const memory: Memory[] = [
    { ...made, establishes: true },
    { ...made, learns: "character-player/elsie" },
    { ...made, beat: 5, learns: "character-other/ceri" },
  ]
  const body = addedBody(memoryTold(memory, fullReading({ [AT]: BODY })))
  expect(body).toContain('slug: "the-mere-2"')
  expect(body).toContain('about: "lore/the-mere"')
  expect(body).toContain(
    'knowers: ["lore-disclosure/game-master", "character-player/elsie", "character-other/ceri"]'
  )
})

test("two facts a full page has no room for open one continuation holding both", () => {
  const first: Memory = {
    beat: 4,
    page: "lore/the-mere",
    fact: "Eels live in the mere.",
    establishes: true,
  }
  const second: Memory = { ...first, beat: 5, fact: "Reeds ring the mere." }
  const body = addedBody(memoryTold([first, second], fullReading({ [AT]: BODY })))
  expect(body).toContain("Eels live in the mere.")
  expect(body).toContain("Reeds ring the mere.")
})

test("a fact told on a continuation is learned there, though the memory names the first page", () => {
  const reading = fullReading({ [AT]: BODY, [SECOND_AT]: SECOND })
  const learns = { ...ELSIE, fact: LATER }
  const told = memoryTold([learns, { ...learns, beat: 3 }], reading)
  if ("refused" in told) throw new Error(told.refused)
  expect(told.map((one) => [one.at, Reflect.get(one.given, "at")])).toEqual([[REPLACE, SECOND_AT]])
  expect(JSON.stringify(told[0])).toContain("character-player/elsie")
  const established: Memory = { beat: 1, page: "lore/the-mere", fact: LATER, establishes: true }
  expect(memoryTold([established], reading)).toEqual([])
})
