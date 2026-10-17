import { expect, test } from "bun:test"
import { mkdtempSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  AT,
  landingInto,
  REVIEWED,
  reachOver,
  type Seen,
  SLUG,
  seen,
  turnAt,
} from "akasha/command/pages/story/turn/advance/story-turn-advance.command.test-fixtures.ts"
import {
  type Making,
  storyTurnMake,
} from "akasha/command/pages/story/turn/make/story-turn-make.command.code.ts"
import type { Turn } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import {
  statusOf,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const ROOT = mkdtempSync(join("/var/tmp", "story-turn-make-test-"))

writeFileSync(join(ROOT, "action.txt"), "I draw my sword and step into the hall.\n")

writeFileSync(join(ROOT, "empty.txt"), "\n")

const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha story turn make",
  from: "",
  writer: null,
  agentId: null,
}

const NEXT = "the-saga-00-004"

const NEXT_AT = `stories/the-saga/turns/${NEXT}.story-turn-played.ts`

function makingOver(turn: Turn | null, into: Seen): Making {
  const base = reachOver(turn ?? turnAt("player"), null, into)
  return {
    ...base,
    turnsOf: () => (turn === null ? [] : [{ at: turn.at, slug: turn.slug, position: 3 }]),
    chapterLast: () => null,
  }
}

async function madeBy(reach: Making, into: Seen, file = "action.txt") {
  return await storyTurnMake(
    ["--story", "the-saga", "--action-file", file],
    GIVEN,
    landingInto(into),
    reach
  )
}

test("a turn is made roleplayed and reviewed after the latest turn at player, at world-builder", async () => {
  const into = seen()
  const answer = await madeBy(makingOver(turnAt("player"), into), into)
  expect(answer.refusals).toEqual([])
  expect(into.folded).toEqual([
    {
      pageTypeSlug: "story-turn-played",
      slug: NEXT,
      path: NEXT_AT,
      fresh: true,
      values: {
        partOfCollections: ["story-played/the-saga"],
        position: 4,
        stepStatus: statusOf(WORLD_BUILDER),
        action: "I draw my sword and step into the hall.",
        roleplayed: true,
        reviewedBy: REVIEWED,
      },
    },
  ])
  expect(into.steps).toContain(`hold ${AT}`)
  expect(into.steps).toContain("land")
  expect(answer.report).toContain(`story-turn-played/${NEXT}\tworld-builder`)
})

test("a making tells no seat, starts no seat and pushes Alan nothing", async () => {
  const into = seen()
  await madeBy(makingOver(turnAt("player"), into), into)
  expect(into.notices).toEqual([])
  expect(into.starts).toEqual([])
  expect(into.pushes).toEqual([])
})

test("a turn is not made while the latest turn is still being made", async () => {
  const into = seen()
  const answer = await madeBy(makingOver(turnAt("mechanics"), into), into)
  expect(answer.refusals.join(" ")).toContain("still being made")
  expect(into.folded).toEqual([])
})

test("an action file holding no action is refused before anything is read", async () => {
  const into = seen()
  const answer = await madeBy(makingOver(turnAt("player"), into), into, "empty.txt")
  expect(answer.refusals.join(" ")).toContain("holds no action")
  expect(into.steps).toEqual([])
})

test("a story with no turn and no chapter is refused", async () => {
  const into = seen()
  const answer = await madeBy(makingOver(null, into), into)
  expect(answer.refusals.join(" ")).toContain("has no turn and no chapter")
  expect(into.folded).toEqual([])
})

test("a turn after the last chapter is made beside the chapters, after its last turn", async () => {
  const into = seen()
  const reach: Making = {
    ...makingOver(null, into),
    chapterLast: () => ({
      at: "stories/the-saga/chapters/the-saga-0002.story-chapter-played.ts",
      latest: {
        slug: SLUG,
        position: 3,
        collections: ["story-played/the-saga"],
        unit: null,
        status: null,
      },
    }),
  }
  const answer = await madeBy(reach, into)
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.path).toBe(NEXT_AT)
})
