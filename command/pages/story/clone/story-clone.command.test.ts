import { expect, test } from "bun:test"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Reach,
  storyClone,
} from "akasha/command/pages/story/clone/story-clone.command.code.ts"
import { worldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"

const WORLD = "story/world/pages/test-world/"

const WORLD_AT = `${WORLD}test-world.world.ts`

const PLACE_AT = `${WORLD}places/test-world-hall.place.ts`

const FOLDER = `${WORLD}stories/played/test-story/`

const CLONED = "story/world/pages/probe-world/"

const STORY_AT = `${FOLDER}test-story.story-played.ts`

const CHECK_AT = `${FOLDER}mechanics/checks/test-story-upkeep.world-check.ts`

const TURN_AT = `${FOLDER}turns/test-story-00-009.story-turn-played.ts`

const CHAPTER_AT = `${FOLDER}chapters/test-story-0002-x.story-chapter-played.ts`

const WORLD_CHECK = "story/world/mechanics/checks/world-check.page-type.ts"

const GIFTED =
  "story/world/pages/one-world/stories/played/gifted-reborn/gifted-reborn.story-played.ts"

const TEXTS: Record<string, string> = {
  [STORY_AT]: [
    "export const testStory = {",
    '  type: "page-type/story-played",',
    '  slug: "test-story",',
    '  coordinatorAgent: "iris-game-master-test-story",',
    '  opensAt: "2026-10-27T08:00:00.000Z",',
    "} as const satisfies StoryPlayed",
    "",
  ].join("\n"),
  [CHECK_AT]: [
    "export const testStoryUpkeep = {",
    '  type: "page-type/world-check",',
    '  slug: "test-story-upkeep",',
    "} as const satisfies WorldCheck",
    "",
  ].join("\n"),
  [WORLD_AT]: [
    "export const testWorld = {",
    '  type: "page-type/world",',
    '  slug: "test-world",',
    "  testing: true,",
    "} as const satisfies World",
    "",
  ].join("\n"),
  [PLACE_AT]: [
    "export const testWorldHall = {",
    '  type: "page-type/place",',
    '  slug: "test-world-hall",',
    "} as const satisfies Place",
    "",
  ].join("\n"),
}

const TYPED = "page-type"

const VALUES: Record<string, Record<string, unknown>> = {
  [STORY_AT]: {
    type: `${TYPED}/${storyPlayed.slug}`,
    slug: "test-story",
    coordinatorAgent: "iris-game-master-test-story",
  },
  [CHECK_AT]: { type: `${TYPED}/${worldCheck.slug}`, slug: "test-story-upkeep" },
  [TURN_AT]: { endsAt: "2026-10-27T08:50:00.000Z" },
  [CHAPTER_AT]: { endsAt: "2026-10-27T08:44:00.000Z" },
  [GIFTED]: { coordinatorAgent: "aine-game-master-gifted-reborn" },
  [WORLD_AT]: { slug: "test-world", testing: true },
}

const STORIES: Record<string, string> = { "test-story": STORY_AT, "gifted-reborn": GIFTED }

const MINTED = "01a17f40-0000-7000-8000-000000000000"

const REACH: Reach = {
  storyAt: (_root, slug) => STORIES[slug] ?? null,
  there: () => false,
  committedUnder: () => [WORLD_AT, PLACE_AT, STORY_AT, CHECK_AT, TURN_AT, CHAPTER_AT],
  textOf: (_root, path) => TEXTS[path] ?? null,
  valueOf: (_root, path) => VALUES[path] ?? null,
  partsNaming: (_root, path) => (path === CHECK_AT ? [WORLD_CHECK] : []),
  minted: () => MINTED,
}

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "story clone",
  from: "/nowhere",
  agentId: null,
  writer: "Awen <awen@alanwalton.com>",
}

type Landed = { asked: Asking[]; message: string }

function landingInto(landed: Landed[]) {
  return async (_root: string, asked: readonly Asking[], message: string) => {
    landed.push({ asked: [...asked], message })
    return { commit: "c0ffee", landed: [] } as never
  }
}

test("a clone lands its pages, and the parts naming a copied page name the copy", async () => {
  const landed: Landed[] = []
  const answer = await storyClone(
    ["--story", "test-story", "--as", "probe"],
    GIVEN,
    landingInto(landed),
    REACH
  )
  expect(answer.code).toBe(0)
  expect(landed.length).toBe(1)
  const asked = landed[0]?.asked ?? []
  const ats = asked.map((one) => (one.given as { readonly at: string }).at)
  expect(ats).toEqual([
    `${CLONED}places/probe-world-hall.place.ts`,
    `${CLONED}probe-world.world.ts`,
    `${CLONED}stories/played/probe/mechanics/checks/probe-upkeep.world-check.ts`,
    `${CLONED}stories/played/probe/probe.story-played.ts`,
    WORLD_CHECK,
  ])
  expect((asked[0]?.given as { readonly id?: string }).id).toBe(MINTED)
  const world = (asked[1]?.given as { readonly body: string }).body
  expect(world).toContain('slug: "probe-world"')
  expect(world).toContain("testing: true")
  expect(asked[4]?.given).toEqual({
    at: WORLD_CHECK,
    key: "parts",
    value: "world-check/probe-upkeep",
  })
  const story = (asked[3]?.given as { readonly body: string }).body
  expect(story).toContain('coordinatorAgent: "iris-game-master-probe"')
  expect(story).toContain('opensAt: "2026-10-27T08:50:00.000Z"')
  expect(story).toContain('clonedFrom: "story-played/test-story"')
  expect(answer.report).toContain("gameMaster\tiris-game-master-probe")
})

test("a story of a world stating no testing is refused, and nothing lands", async () => {
  const landed: Landed[] = []
  const answer = await storyClone(
    ["--story", "gifted-reborn", "--as", "probe"],
    GIVEN,
    landingInto(landed),
    REACH
  )
  expect(answer.code).not.toBe(0)
  expect(landed.length).toBe(0)
})

test("a slug held already is refused, and nothing lands", async () => {
  const landed: Landed[] = []
  const answer = await storyClone(
    ["--story", "test-story", "--as", "test-story"],
    GIVEN,
    landingInto(landed),
    REACH
  )
  expect(answer.code).not.toBe(0)
  expect(landed.length).toBe(0)
})

test("a source whose code imports a page of that story is refused, and nothing lands", async () => {
  const landed: Landed[] = []
  const code = `${FOLDER}mechanics/checks/test-story-upkeep.world-check.settling.code.ts`
  const bound: Reach = {
    ...REACH,
    committedUnder: () => [STORY_AT, CHECK_AT, code],
    textOf: (root, path) =>
      path === code
        ? `import { testStoryPlayer } from "akasha/${FOLDER}characters/test-story-player.character-player.ts"\n`
        : REACH.textOf(root, path),
  }
  const answer = await storyClone(
    ["--story", "test-story", "--as", "probe"],
    GIVEN,
    landingInto(landed),
    bound
  )
  expect(answer.code).not.toBe(0)
  expect(answer.refusals.join(" ")).toContain(code)
  expect(landed.length).toBe(0)
})

test("a slug that is no lower kebab case is refused", async () => {
  const landed: Landed[] = []
  const answer = await storyClone(
    ["--story", "test-story", "--as", "Probe_1"],
    GIVEN,
    landingInto(landed),
    REACH
  )
  expect(answer.code).not.toBe(0)
  expect(landed.length).toBe(0)
})
