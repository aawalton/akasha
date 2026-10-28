import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Paged } from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import type { PageRead } from "akasha/command/pages/story/turn/modules/cancel-unbeating/cancel-unbeating.module.code.ts"
import {
  besideListed,
  mergedNamings,
  type Played,
  turnUnplayed,
  type Unplaying,
} from "akasha/command/pages/story/turn/modules/turn-unplaying/turn-unplaying.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { lore } from "akasha/story/lore/lore.page-type.ts"

const PURSE = "metric-character-currency/her"

const PURSE_AT = "purses/her.metric-character-currency.ts"

const SKILL = "character-skill/her-swordplay"

const SKILL_AT = "skills/her-swordplay.character-skill.ts"

const HER = "character-player/her"

const HER_AT = "characters/her.character-player.ts"

const HALL = "place/the-hall"

const GATE = "place/the-gate"

const KEY = `${lore.slug}/the-key`

const KEY_AT = "lore/the-key.lore.ts"

const HISTORY_AT = "purses/her.metric-character-currency.history.jsonl"

const KEPT_LINE = JSON.stringify({ turn: 2, value: 9 })

const TURN_LINE = JSON.stringify({ turn: 3, value: 4 })

type World = {
  readonly pages: Readonly<Record<string, PageRead>>
  readonly before?: Readonly<Record<string, Value>>
  readonly story?: readonly Paged[]
}

function reachOf(world: World): Unplaying {
  const byPath = new Map(Object.values(world.pages).map((one) => [one.at, one.value]))
  return {
    beating: {
      pageOf: (address) => world.pages[address] ?? null,
      beside: (page, key) =>
        key === "history" && page.at === PURSE_AT
          ? { at: HISTORY_AT, text: `${KEPT_LINE}\n${TURN_LINE}\n` }
          : null,
    },
    storyOf: () => world.story ?? [],
    pathOf: (address) => world.pages[address]?.at ?? null,
    valueOf: (path) => byPath.get(path) ?? null,
    listedAt: (type, slug) => {
      const one = world.pages[`${type}/${slug}`]
      return one === undefined ? [] : [{ path: one.at }]
    },
    valueBefore: (path) => world.before?.[path] ?? null,
  }
}

const PAGES: Readonly<Record<string, PageRead>> = {
  [PURSE]: { at: PURSE_AT, value: { value: 4 } },
  [SKILL]: { at: SKILL_AT, value: { experience: 40 } },
  [HER]: { at: HER_AT, value: { place: GATE } },
}

function beatsOf(more: Partial<Beats> = {}): Beats {
  return {
    beats: ["She pays the carter.", "She drills.", "She walks to the gate."],
    scenes: [],
    changes: [
      { beat: 1, page: PURSE, key: "value", from: 9, to: 4, note: "paid" },
      { beat: 1, page: PURSE, key: "history", append: { turn: 3, value: 4 }, note: "logged" },
      { beat: 2, page: SKILL, key: "experience", from: 35, to: 40, note: "drill" },
    ],
    memory: [],
    ...more,
  }
}

function playedOf(beats: Beats, status: Played["status"] = "player"): Played {
  return { slug: "saga-00-003", game: "saga", status, position: 3, beats }
}

test("a taken-back turn sets each number back to what its first change found, and nothing else", () => {
  const said = turnUnplayed(reachOf({ pages: PAGES }), playedOf(beatsOf()))
  if ("refused" in said) throw new Error(said.refused)
  expect(said.namings.map((one) => [one.path, one.values])).toEqual([
    [PURSE_AT, { value: 9 }],
    [SKILL_AT, { experience: 35 }],
  ])
  expect(said.rewritten).toEqual([{ at: HISTORY_AT, kept: `${KEPT_LINE}\n` }])
})

test("a number changed since the turn left it refuses, since taking it back would undo that change", () => {
  const pages = { ...PAGES, [SKILL]: { at: SKILL_AT, value: { experience: 44 } } }
  const said = turnUnplayed(reachOf({ pages }), playedOf(beatsOf()))
  expect(said).toEqual({
    refused: expect.stringContaining("`experience` of `character-skill/her-swordplay` is 44"),
  })
})

test("a turn at beats takes back only the beats it has shown", () => {
  const beats = beatsOf({ prose: [{ beat: 1, prose: "She pays." }], none: [] })
  const pages = { ...PAGES, [SKILL]: { at: SKILL_AT, value: { experience: 35 } } }
  const said = turnUnplayed(reachOf({ pages }), playedOf(beats, "beats"))
  if ("refused" in said) throw new Error(said.refused)
  expect(said.namings.map((one) => one.path)).toEqual([PURSE_AT])
})

function pagedOf(slug: string, position: number, beats: Beats): Paged {
  return { slug, value: { position }, beats }
}

const MOVED = [{ beat: 3, place: GATE, present: [HER] }]

test("a character the turn moved goes back to where the story's beats before it left them", () => {
  const earlier = pagedOf("saga-00-002", 2, {
    beats: ["She comes in."],
    scenes: [{ beat: 1, place: HALL, arrive: [HER] }],
    changes: [],
    memory: [],
  })
  const beats = beatsOf({ changes: [], scenes: MOVED })
  const said = turnUnplayed(reachOf({ pages: PAGES, story: [earlier] }), playedOf(beats))
  if ("refused" in said) throw new Error(said.refused)
  expect(said.namings).toEqual([
    {
      pageTypeSlug: "character-player",
      slug: "her",
      path: HER_AT,
      values: { place: HALL },
      merge: true,
    },
  ])
})

test("a character no beat placed before the turn goes back to the place its page held then", () => {
  const before = { [HER_AT]: { place: HALL } }
  const beats = beatsOf({ changes: [], scenes: MOVED })
  const said = turnUnplayed(reachOf({ pages: PAGES, before }), playedOf(beats))
  if ("refused" in said) throw new Error(said.refused)
  expect(said.namings.map((one) => one.values)).toEqual([{ place: HALL }])
})

test("a character moved since the turn left them refuses", () => {
  const pages = { ...PAGES, [HER]: { at: HER_AT, value: { place: HALL } } }
  const beats = beatsOf({ changes: [], scenes: MOVED })
  expect(turnUnplayed(reachOf({ pages }), playedOf(beats))).toHaveProperty("refused")
})

const HEARTH = "The key is under the hearth."

const OPENS = "The key opens the gate."

const KEY_PAGE: PageRead = {
  at: KEY_AT,
  value: {
    type: `${pageType.slug}/${lore.slug}`,
    slug: "the-key",
    facts: [
      { fact: HEARTH, knowers: ["character-other/mara", HER] },
      { fact: OPENS, knowers: [HER] },
    ],
  },
}

test("the turn's memory is taken out of the lore, and what the lore held before stays", () => {
  const memory = [
    { beat: 1, page: KEY, fact: HEARTH, learns: HER },
    { beat: 2, page: KEY, fact: OPENS, establishes: true as const },
    { beat: 2, page: KEY, fact: OPENS, learns: HER },
  ]
  const before = { [KEY_AT]: { facts: [{ fact: HEARTH, knowers: ["character-other/mara"] }] } }
  const said = turnUnplayed(
    reachOf({ pages: { ...PAGES, [KEY]: KEY_PAGE }, before }),
    playedOf(beatsOf({ changes: [], memory }))
  )
  if ("refused" in said) throw new Error(said.refused)
  expect(said.namings).toEqual([
    {
      pageTypeSlug: lore.slug,
      slug: "the-key",
      path: KEY_AT,
      values: { facts: [{ fact: HEARTH, knowers: ["character-other/mara"] }] },
      merge: true,
    },
  ])
})

test("a knower an earlier turn taught stays, though the lore before this turn lacked it", () => {
  const memory = [{ beat: 1, page: KEY, fact: OPENS, learns: HER }]
  const earlier = pagedOf("saga-00-002", 2, {
    beats: ["She hears of the key."],
    scenes: [],
    changes: [],
    memory: [{ beat: 1, page: KEY, fact: OPENS, learns: HER }],
  })
  const said = turnUnplayed(
    reachOf({ pages: { ...PAGES, [KEY]: KEY_PAGE }, story: [earlier] }),
    playedOf(beatsOf({ changes: [], memory }))
  )
  if ("refused" in said) throw new Error(said.refused)
  expect(said.namings).toEqual([])
})

const ROOT = mkdtempSync(join("/var/tmp", "turn-unplaying-test-"))

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

test("the files beside a turn are its own files, never its page, a lock or a derived file", () => {
  const turns = join(ROOT, "turns")
  mkdirSync(join(turns, "one-003.story-turn-played.ts.lock"), { recursive: true })
  for (const name of [
    "one-003.story-turn-played.ts",
    "one-003.story-turn-played.prose.txt",
    "one-003.story-turn-played.referenced-by.jsonl",
    "one-003.story-turn-played.edits.uncommitted.jsonl",
    "one-0030.story-turn-played.ts",
  ]) {
    writeFileSync(join(turns, name), "")
  }
  expect(besideListed(ROOT, "turns/one-003.story-turn-played.ts")).toEqual([
    "turns/one-003.story-turn-played.prose.txt",
  ])
})

test("namings of one page are merged, so no fold writes over another", () => {
  const one = { pageTypeSlug: lore.slug, slug: "a", path: "a.ts", values: { x: 1 }, merge: true }
  const two = { pageTypeSlug: lore.slug, slug: "a", path: "a.ts", values: { y: 2 }, merge: true }
  expect(mergedNamings([one, two])).toEqual([{ ...one, values: { x: 1, y: 2 } }])
})
