import { expect, test } from "bun:test"
import {
  clonedPath,
  cloneWorldFolderOf,
  copied,
  copiedFrom,
  copiesOf,
  latestOf,
  masterOf,
  renamedFor,
  slugsRenamed,
  storyBoundIn,
  strangersDropped,
  worldFolderOf,
  worldPageOf,
} from "akasha/command/pages/story/modules/cloning/story-cloning.module.code.ts"

const WORLD = "story/world/pages/test-world/"

const FOLDER = `${WORLD}stories/played/test-story/`

const CLONED = "story/world/pages/probe-world/stories/played/probe/"

const STORY_AT = `${FOLDER}test-story.story-played.ts`

const STORY = [
  'import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"',
  "",
  "export const testStory = {",
  '  id: "01a17ec6-053a-7bbd-aebe-77e7d77942c2",',
  '  type: "page-type/story-played",',
  '  slug: "test-story",',
  '  title: "Test Story",',
  '  world: "world/test-world",',
  '  externalId: "test-story",',
  '  coordinatorAgent: "iris-game-master-test-story",',
  '  opensAt: "2026-10-27T08:00:00.000Z",',
  '  chat: "jsonl",',
  '  createdAt: "2026-10-27T19:11:09.113Z",',
  '  updatedAt: "2026-10-27T20:28:28.004Z",',
  "} as const satisfies StoryPlayed",
  "",
].join("\n")

const PURSE = [
  "export const testStoryPlayer = {",
  '  id: "01a17ec6-9eaf-7b0b-8053-c85cc6cd59a0",',
  '  slug: "test-story-player",',
  '  character: "character-player/test-story-player",',
  '  history: "jsonl",',
  "} as const satisfies MetricCharacterCurrency",
  "",
].join("\n")

const CODE = [
  'import { testStoryPlayer } from "akasha/story/world/pages/test-world/stories/played/test-story/characters/test-story-player.character-player.ts"',
  'const SEAT = "mari-roleplay-test-story"',
  "",
].join("\n")

const FORWARDED = [
  'import { z } from "zod"',
  "export type Kept = { readonly paid: number }",
  "export function settled(reading: unknown) {",
  "  return reading",
  "}",
  "export async function added() {",
  "  return []",
  "}",
  "function hidden() {}",
  "",
].join("\n")

const CHECK = [
  "export const testStoryUpkeep = {",
  '  id: "01a17eeb-58cf-776b-ba64-5cc96eee1074",',
  '  slug: "test-story-upkeep",',
  "  settling: {},",
  "} as const satisfies WorldCheck",
  "",
].join("\n")

const STORY_FACTS = {
  from: "test-story",
  to: "probe",
  world: "test-world",
  master: "iris-game-master-probe",
  opensAt: "2026-10-27T08:44:00.000Z",
}

const CLONING = {
  worldFolder: WORLD,
  folder: FOLDER,
  storyPath: STORY_AT,
  story: STORY_FACTS,
}

test("a story's world is the folder above its stories, and the clone's world sits beside it", () => {
  expect(worldFolderOf(STORY_AT)).toBe(WORLD)
  expect(worldPageOf(WORLD)).toBe(`${WORLD}test-world.world.ts`)
  expect(cloneWorldFolderOf(WORLD, "probe")).toBe("story/world/pages/probe-world/")
})

test("a world's own pages are copied, its source story is, and no other story is", () => {
  expect(copiedFrom(WORLD, FOLDER, `${WORLD}places/test-world-hall.place.ts`)).toBe(true)
  expect(copiedFrom(WORLD, FOLDER, `${WORLD}test-world.world.ts`)).toBe(true)
  expect(copiedFrom(WORLD, FOLDER, STORY_AT)).toBe(true)
  const other = `${WORLD}stories/played/beat-flow-test/beat-flow-test.story-played.ts`
  expect(copiedFrom(WORLD, FOLDER, other)).toBe(false)
  expect(copiedFrom(WORLD, FOLDER, "story/world/pages/gifted/gifted.world.ts")).toBe(false)
})

test("a copied world page knows no character but the clone's own", () => {
  const said = strangersDropped(
    '["lore-disclosure/game-master", "character-player/beat-flow-test-player", "character-player/probe-player"]',
    "probe"
  )
  expect(said).toBe('["lore-disclosure/game-master", "character-player/probe-player"]')
})

test("a copied world page and the story in it name the clone's world", () => {
  const place = `${WORLD}places/test-world-hall.place.ts`
  const text = [
    "export const testWorldHall = {",
    '  slug: "test-world-hall",',
    '  world: "world/test-world",',
    '  facts: [{ fact: "Long.", knowers: ["character-player/test-story-player", "character-player/other-player"] }],',
    "} as const satisfies Place",
    "",
  ].join("\n")
  const made = copiesOf([{ path: place, text }], CLONING)[0]
  expect(made?.at).toBe("story/world/pages/probe-world/places/probe-world-hall.place.ts")
  expect(made?.body).toContain('slug: "probe-world-hall"')
  expect(made?.body).toContain('world: "world/probe-world"')
  expect(made?.body).toContain('knowers: ["character-player/probe-player"]')
})

test("a clone's world states testing, whether its source's world states it or not", () => {
  const at = `${WORLD}test-world.world.ts`
  const page = (testing: string) =>
    [
      "export const testWorld = {",
      '  slug: "test-world",',
      '  title: "Test World",',
      ...(testing === "" ? [] : [testing]),
      "} as const satisfies World",
      "",
    ].join("\n")
  for (const said of ["", "  testing: false,", "  testing: true,"]) {
    const body = copiesOf([{ path: at, text: page(said) }], CLONING)[0]?.body ?? ""
    expect(body.match(/^ {2}testing: .*,$/gm)).toEqual(["  testing: true,"])
    expect(body).toContain('slug: "probe-world"')
  }
})

test("a copied page is exported under its own slug, where the source's export name is one word", () => {
  const story = { ...STORY_FACTS, from: "gifted-reborn", to: "gifted-trial", world: "gifted" }
  const at = "story/world/pages/gifted/gifted.world.ts"
  const text = ["export const gifted = {", '  slug: "gifted",', "} as const satisfies World", ""]
  const cloning = { ...CLONING, worldFolder: "story/world/pages/gifted/", story }
  const made = copiesOf([{ path: at, text: text.join("\n") }], cloning)[0]
  expect(made?.body).toContain("export const giftedTrialWorld = {\n")
  expect(made?.body).toContain('  slug: "gifted-trial-world",\n')
})

test("turns and chapters are copied with their prose, and a story design of the world is", () => {
  const chapter = `${FOLDER}chapters/test-story-0001-x.story-chapter-played`
  expect(copied(FOLDER, `${FOLDER}turns/test-story-00-009.story-turn-played.ts`)).toBe(true)
  expect(copied(FOLDER, `${chapter}.ts`)).toBe(true)
  expect(copied(FOLDER, `${chapter}.prose.txt`)).toBe(true)
  expect(copied(FOLDER, `${chapter}.beats.jsonl`)).toBe(true)
  const design = `${WORLD}designs/test-story.story-design`
  expect(copiedFrom(WORLD, FOLDER, `${design}.ts`)).toBe(true)
  expect(copiedFrom(WORLD, FOLDER, `${design}.premise.md`)).toBe(true)
  expect(clonedPath(`${design}.premise.md`, WORLD, STORY_FACTS)).toBe(
    "story/world/pages/probe-world/designs/probe.story-design.premise.md"
  )
})

test("a chapter's prose keeps its words, and its beats name the clone's pages", () => {
  const chapter = `${FOLDER}chapters/test-story-0001-x.story-chapter-played`
  const prose = "The test story opens in Test World, where test-story begins.\n"
  const beats = '{"beat":1,"place":"place/test-world-hall","event":"She walks in."}\n'
  const made = copiesOf(
    [
      { path: `${chapter}.prose.txt`, text: prose },
      { path: `${chapter}.beats.jsonl`, text: beats },
    ],
    CLONING
  )
  const at = `${CLONED}chapters/probe-0001-x.story-chapter-played`
  expect(made).toEqual([
    { at: `${at}.beats.jsonl`, body: beats.replace("test-world-hall", "probe-world-hall") },
    { at: `${at}.prose.txt`, body: prose },
  ])
})

test("the files play or the index write beside a page are left", () => {
  expect(copied(FOLDER, `${FOLDER}test-story.story-played.chat.jsonl`)).toBe(false)
  const history = `${FOLDER}a/test-story-player.metric-character-health.history.jsonl`
  expect(copied(FOLDER, history)).toBe(false)
  expect(copied(FOLDER, `${FOLDER}a/test-story-points.page-type.types.ts`)).toBe(false)
  expect(copied(FOLDER, `${FOLDER}a/test-story-upkeep.world-check.settling.code.ts`)).toBe(true)
  expect(copied(FOLDER, STORY_AT)).toBe(true)
})

test("a slug is renamed where it is a whole name or begins one, and nowhere inside a longer name", () => {
  const said = slugsRenamed(
    '["story-played/test-story", "test-story-player", "iris-game-master-test-story"] testStoryPlayer TestStoryPoints the test story',
    { "test-story": "probe" }
  )
  expect(said).toBe(
    '["story-played/probe", "probe-player", "iris-game-master-test-story"] probePlayer ProbePoints the test story'
  )
})

test("a clone named for its world is renamed once, its story and its world together", () => {
  const story = { ...STORY_FACTS, from: "gifted-reborn", to: "gifted-trial", world: "gifted" }
  const said = renamedFor(
    '["world/gifted", "gifted-reborn-nala"] gifted.world.ts giftedRebornNala giftedPathOfEndurance GiftedRebornPoints',
    story
  )
  expect(said).toBe(
    '["world/gifted-trial-world", "gifted-trial-nala"] gifted-trial-world.world.ts giftedTrialNala giftedTrialWorldPathOfEndurance GiftedTrialPoints'
  )
})

test("a word of prose spelled as a slug is left as written, so no text is lengthened", () => {
  const story = { ...STORY_FACTS, from: "gifted-reborn", to: "gifted-trial", world: "gifted" }
  const prose =
    'fact: "Gifted, which Talented evolves into, speeds every Path." She was gifted. He was gifted a sword.'
  expect(renamedFor(prose, story)).toBe(prose)
  expect(renamedFor('title: "Gifted: Reborn",', story)).toBe('title: "Gifted: Reborn",')
  expect(renamedFor('slug: "gifted", externalId: "gifted-reborn"', story)).toBe(
    'slug: "gifted-trial-world", externalId: "gifted-trial"'
  )
  const statement =
    "statement: 'A reading states `\"gifted\"` where she holds it, as `gifted-0002-chapter-1` shows.',"
  expect(renamedFor(statement, story)).toBe(statement)
  expect(renamedFor('{"gifted": 3}', story)).toBe('{"gifted": 3}')
})

test("a cloned file sits under the clone's folder under its renamed name", () => {
  const at = `${FOLDER}mechanics/points/pages/test-story-player-attribute.test-story-points.ts`
  expect(clonedPath(at, WORLD, STORY_FACTS)).toBe(
    `${CLONED}mechanics/points/pages/probe-player-attribute.probe-points.ts`
  )
})

test("a clone's game master is the source's persona as game master of the clone", () => {
  expect(masterOf("iris-game-master-test-story", "test-story", "probe")).toBe(
    "iris-game-master-probe"
  )
  expect(masterOf("mari-roleplay-test-story", "test-story", "probe")).toBeNull()
})

test("the clone's story names its own game master, its source and the source's current time", () => {
  const made = copiesOf([{ path: STORY_AT, text: STORY }], CLONING)
  expect(made.map((one) => one.at)).toEqual([`${CLONED}probe.story-played.ts`])
  const body = made[0]?.body ?? ""
  expect(body).toContain('  world: "world/probe-world",\n')
  expect(body).toContain('  coordinatorAgent: "iris-game-master-probe",\n')
  expect(body).toContain('  clonedFrom: "story-played/test-story",\n')
  expect(body).toContain('  opensAt: "2026-10-27T08:44:00.000Z",\n')
  expect(body).toContain('  externalId: "probe",\n')
  expect(body).toContain("export const probe = {")
  expect(body).not.toContain("08:00:00")
  expect(body).not.toContain("chat:")
  expect(body).not.toContain("id:")
  expect(body).not.toContain("createdAt")
})

test("a page is copied with no id, instant or history, and its relations name the copy", () => {
  const at = `${FOLDER}purses/test-story-player.metric-character-currency.ts`
  const made = copiesOf([{ path: at, text: PURSE }], CLONING)[0]
  expect(made?.body).toBe(
    [
      "export const probePlayer = {",
      '  slug: "probe-player",',
      '  character: "character-player/probe-player",',
      "} as const satisfies MetricCharacterCurrency",
      "",
    ].join("\n")
  )
})

test("code beside a page is not copied", () => {
  const at = `${FOLDER}checks/test-story-upkeep.world-check.settling.code.ts`
  expect(copiesOf([{ path: at, text: FORWARDED }], CLONING)).toEqual([])
})

test("a module of the world is not copied, since the source's checks reach its code", () => {
  const at = `${WORLD}mechanics/modules/stepping/test-world-stepping.module.ts`
  const page = 'export const testWorldStepping = {\n  slug: "test-world-stepping",\n} as const\n'
  expect(copiesOf([{ path: at, text: page }], CLONING)).toEqual([])
})

test("a copied check names the source check whose code settles it, in place of its own", () => {
  const at = `${FOLDER}checks/test-story-upkeep.world-check.ts`
  const made = copiesOf([{ path: at, text: CHECK }], CLONING)[0]
  expect(made?.body).toBe(
    [
      "export const probeUpkeep = {",
      '  slug: "probe-upkeep",',
      '  settledBy: "world-check/test-story-upkeep",',
      "} as const satisfies WorldCheck",
      "",
    ].join("\n")
  )
})

test("code importing a page of its own story is found, and other code is not", () => {
  const bound = `${FOLDER}checks/test-story-upkeep.world-check.settling.code.ts`
  const free = `${FOLDER}checks/test-story-time-passing.world-check.settling.code.ts`
  const sources = [
    { path: bound, text: CODE },
    { path: free, text: FORWARDED },
  ]
  expect(storyBoundIn(sources, FOLDER)).toEqual([bound])
})

test("a test beside code is left, since the copy is settled by code the source's test proves", () => {
  expect(copied(FOLDER, `${FOLDER}a/test-story-upkeep.world-check.settling.test.ts`)).toBe(false)
})

test("the latest instant is the latest stated", () => {
  expect(latestOf([null, "2026-10-27T08:44:00.000Z", "2026-10-27T08:10:00.000Z"])).toBe(
    "2026-10-27T08:44:00.000Z"
  )
  expect(latestOf([null])).toBeNull()
})
