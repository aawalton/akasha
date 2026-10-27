import { expect, test } from "bun:test"
import {
  clonedPath,
  copied,
  copiesOf,
  inTestWorld,
  latestOf,
  masterOf,
  slugsRenamed,
  storyBoundIn,
} from "akasha/command/pages/story/modules/cloning/story-cloning.module.code.ts"

const FOLDER = "story/world/pages/test-world/stories/played/test-story/"

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

const CLONING = {
  folder: FOLDER,
  storyPath: STORY_AT,
  story: {
    from: "test-story",
    to: "probe",
    master: "iris-game-master-probe",
    opensAt: "2026-10-27T08:44:00.000Z",
  },
}

test("only a played story under the test world is in the test world", () => {
  expect(inTestWorld(STORY_AT)).toBe(true)
  const gifted =
    "story/world/pages/one-world/stories/played/gifted-reborn/gifted-reborn.story-played.ts"
  expect(inTestWorld(gifted)).toBe(false)
  expect(inTestWorld("story/world/pages/test-world/test-world.world.ts")).toBe(false)
})

test("turns, chapters and the files play or the index write beside a page are left", () => {
  expect(copied(FOLDER, `${FOLDER}turns/test-story-00-009.story-turn-played.ts`)).toBe(false)
  expect(copied(FOLDER, `${FOLDER}chapters/test-story-0001-x.story-chapter-played.ts`)).toBe(false)
  expect(copied(FOLDER, `${FOLDER}test-story.story-played.chat.jsonl`)).toBe(false)
  const history = `${FOLDER}a/test-story-player.metric-character-health.history.jsonl`
  expect(copied(FOLDER, history)).toBe(false)
  expect(copied(FOLDER, `${FOLDER}a/test-story-points.page-type.types.ts`)).toBe(false)
  expect(copied(FOLDER, `${FOLDER}a/test-story-upkeep.world-check.settling.code.ts`)).toBe(true)
  expect(copied(FOLDER, STORY_AT)).toBe(true)
})

test("a slug is renamed where it is a whole name or begins one, and nowhere inside a longer name", () => {
  const said = slugsRenamed(
    '"story-played/test-story" "test-story-player" "iris-game-master-test-story" testStoryPlayer TestStoryPoints the test story',
    "test-story",
    "probe"
  )
  expect(said).toBe(
    '"story-played/probe" "probe-player" "iris-game-master-test-story" probePlayer ProbePoints the test story'
  )
})

test("a cloned file sits under the clone's folder under its renamed name", () => {
  const at = `${FOLDER}mechanics/points/pages/test-story-player-attribute.test-story-points.ts`
  expect(clonedPath(at, FOLDER, "test-story", "probe")).toBe(
    "story/world/pages/test-world/stories/played/probe/mechanics/points/pages/probe-player-attribute.probe-points.ts"
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
  expect(made.map((one) => one.at)).toEqual([
    "story/world/pages/test-world/stories/played/probe/probe.story-played.ts",
  ])
  const body = made[0]?.body ?? ""
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

test("code beside a page is copied as one line forwarding to the source's code", () => {
  const at = `${FOLDER}checks/test-story-upkeep.world-check.settling.code.ts`
  const made = copiesOf([{ path: at, text: FORWARDED }], CLONING)[0]
  expect(made?.at).toBe(
    "story/world/pages/test-world/stories/played/probe/checks/probe-upkeep.world-check.settling.code.ts"
  )
  expect(made?.body).toBe(
    [
      `export { settled, added } from "akasha/${at}"`,
      `export type { Kept } from "akasha/${at}"`,
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

test("a test beside code is left, since the copy forwards to code the source's test proves", () => {
  expect(copied(FOLDER, `${FOLDER}a/test-story-upkeep.world-check.settling.test.ts`)).toBe(false)
})

test("the latest instant is the latest stated", () => {
  expect(latestOf([null, "2026-10-27T08:44:00.000Z", "2026-10-27T08:10:00.000Z"])).toBe(
    "2026-10-27T08:44:00.000Z"
  )
  expect(latestOf([null])).toBeNull()
})
