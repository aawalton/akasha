import { expect, test } from "bun:test"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Reach,
  storyCloneRemove,
} from "akasha/command/pages/story/clone-remove/story-clone-remove.command.code.ts"
import { worldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"

const FOLDER = "story/world/pages/test-world/stories/played/probe/"

const STORY_AT = `${FOLDER}probe.story-played.ts`

const CHECK_AT = `${FOLDER}mechanics/checks/probe-upkeep.world-check.ts`

const CODE_AT = `${FOLDER}mechanics/checks/probe-upkeep.world-check.settling.code.ts`

const TURN_AT = `${FOLDER}turns/probe-00-001.story-turn-played.ts`

const PROSE_AT = `${FOLDER}turns/probe-00-001.story-turn-played.prose.txt`

const WORLD_CHECK = "story/world/mechanics/checks/world-check.page-type.ts"

const NPC_AT = "story/world/pages/test-world/characters/probe-smith.character.ts"

const SEAT_AT = "agent/seat/pages/iris-game-master-probe/iris-game-master-probe.seat.ts"

const ORIGINAL = "story/world/pages/test-world/stories/played/test-story/test-story.story-played.ts"

const GIFTED =
  "story/world/pages/one-world/stories/played/gifted-reborn/gifted-reborn.story-played.ts"

const TYPED = "page-type"

const VALUES: Record<string, Record<string, unknown>> = {
  [STORY_AT]: {
    type: `${TYPED}/${storyPlayed.slug}`,
    slug: "probe",
    clonedFrom: `${storyPlayed.slug}/test-story`,
  },
  [CHECK_AT]: { type: `${TYPED}/${worldCheck.slug}`, slug: "probe-upkeep" },
  [ORIGINAL]: { type: `${TYPED}/${storyPlayed.slug}`, slug: "test-story" },
  [GIFTED]: { type: `${TYPED}/${storyPlayed.slug}`, slug: "gifted-reborn" },
}

const STORIES: Record<string, string> = {
  probe: STORY_AT,
  "test-story": ORIGINAL,
  "gifted-reborn": GIFTED,
}

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "story clone-remove",
  from: "/nowhere",
  agentId: null,
  writer: "Awen <awen@alanwalton.com>",
}

type Calls = {
  readonly stopped: string[]
  readonly landed: Asking[][]
  readonly swept: string[]
}

function reachInto(calls: Calls, refusing: string | null = null): Reach {
  return {
    storyAt: (_root, slug) => STORIES[slug] ?? null,
    valueOf: (_root, path) => VALUES[path] ?? null,
    committedUnder: () => [STORY_AT, CHECK_AT, CODE_AT, TURN_AT, PROSE_AT],
    referrersOf: (_root, path) => {
      if (path === CHECK_AT) return [{ propertySlug: "parts", path: WORLD_CHECK }]
      if (path === STORY_AT) {
        return [
          { propertySlug: "assignment-slug", path: SEAT_AT },
          { propertySlug: "character-story", path: NPC_AT },
          { propertySlug: "turn-story", path: TURN_AT },
        ]
      }
      return []
    },
    seatsOf: (_root, story) =>
      story === `${storyPlayed.slug}/probe`
        ? [{ name: "iris-game-master-probe", id: "seat-id" }]
        : [],
    halting: async (_given, _id, name) => {
      calls.stopped.push(name)
      if (refusing !== null) return { refused: refusing, code: 3 }
      return { stopped: { name, pids: [], signalled: false, how: "reconciled", moved: [] } }
    },
    sweep: (_root, folder) => {
      calls.swept.push(folder)
    },
  }
}

function landingInto(calls: Calls) {
  return async (_root: string, asked: readonly Asking[]) => {
    calls.landed.push([...asked])
    return { commit: "c0ffee", landed: [] } as never
  }
}

function fresh(): Calls {
  return { stopped: [], landed: [], swept: [] }
}

test("a drafting call lists the seats, parts and files, and stops and lands nothing", async () => {
  const calls = fresh()
  const answer = await storyCloneRemove(
    ["--story", "probe", "--draft"],
    GIVEN,
    landingInto(calls),
    reachInto(calls)
  )
  expect(answer.code).toBe(0)
  expect(answer.report).toContain("seat\tiris-game-master-probe")
  expect(answer.report).toContain(`unlist\t${WORLD_CHECK}\t${worldCheck.slug}/probe-upkeep`)
  expect(answer.report).toContain(`remove\t${STORY_AT}`)
  expect(answer.report).toContain(`remove\t${NPC_AT}`)
  expect(answer.report).not.toContain(`remove\t${CODE_AT}`)
  expect(answer.report).not.toContain(`remove\t${PROSE_AT}`)
  expect(calls.stopped).toEqual([])
  expect(calls.landed).toEqual([])
  expect(calls.swept).toEqual([])
})

test("a removal stops every seat, then lands the parts and pages in one landing", async () => {
  const calls = fresh()
  const answer = await storyCloneRemove(
    ["--story", "probe"],
    GIVEN,
    landingInto(calls),
    reachInto(calls)
  )
  expect(answer.code).toBe(0)
  expect(calls.stopped).toEqual(["iris-game-master-probe"])
  expect(calls.landed.length).toBe(1)
  const ats = (calls.landed[0] ?? []).map((one) => (one.given as { readonly at: string }).at)
  expect(ats).toEqual([WORLD_CHECK, STORY_AT, CHECK_AT, TURN_AT, NPC_AT])
  expect(calls.swept).toEqual([FOLDER])
  expect(answer.report).toContain("commit\tc0ffee")
})

test("a seat refusing to stop leaves every page where it is", async () => {
  const calls = fresh()
  const answer = await storyCloneRemove(
    ["--story", "probe"],
    GIVEN,
    landingInto(calls),
    reachInto(calls, "the seat has a subagent working")
  )
  expect(answer.code).not.toBe(0)
  expect(calls.landed).toEqual([])
  expect(calls.swept).toEqual([])
})

test("a story that is no clone is refused, and nothing is stopped", async () => {
  const calls = fresh()
  const answer = await storyCloneRemove(
    ["--story", "test-story"],
    GIVEN,
    landingInto(calls),
    reachInto(calls)
  )
  expect(answer.code).not.toBe(0)
  expect(calls.stopped).toEqual([])
  expect(calls.landed).toEqual([])
})

test("a story outside the test world is refused, and nothing is stopped", async () => {
  const calls = fresh()
  const answer = await storyCloneRemove(
    ["--story", "gifted-reborn"],
    GIVEN,
    landingInto(calls),
    reachInto(calls)
  )
  expect(answer.code).not.toBe(0)
  expect(calls.stopped).toEqual([])
  expect(calls.landed).toEqual([])
})
