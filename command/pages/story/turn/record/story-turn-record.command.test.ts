import { expect, test } from "bun:test"
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
import type { Turn } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { storyTurnRecord } from "akasha/command/pages/story/turn/record/story-turn-record.command.code.ts"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"
import {
  RECORDERS,
  statusOf,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha story turn record",
  from: "",
  writer: null,
  agentId: null,
}

async function recordedBy(turn: Turn, into: Seen) {
  return await storyTurnRecord(
    ["--turn", `story-turn-played/${SLUG}`],
    GIVEN,
    landingInto(into),
    reachOver(turn, null, into)
  )
}

test("a turn at player no recorder ran on moves to recorders and starts a seat for each recorder", async () => {
  const into = seen()
  const answer = await recordedBy(turnAt("player", { prose: "txt" }), into)
  expect(answer.refusals).toEqual([])
  expect(into.folded).toEqual([
    {
      pageTypeSlug: "story-turn-played",
      slug: SLUG,
      path: AT,
      merge: true,
      values: { stepStatus: statusOf(RECORDERS), reviewedBy: REVIEWED },
    },
  ])
  expect(into.steps).toEqual(["read", `hold ${AT}`, "read", "read", "land", `free ${AT}`])
  expect(into.starts.map((one) => [one.role, one.game])).toEqual([
    ["story-recorder", "the-saga"],
    ["story-recorder", "the-saga"],
  ])
  expect(into.starts.every((one) => one.prompt.includes(AT))).toBe(true)
  expect(answer.report).toContain(`${SLUG}\tplayer\trecorders`)
})

test("each recorder's prompt hands in its step with the advance, never with record", async () => {
  const into = seen()
  await recordedBy(turnAt("player", { prose: "txt" }), into)
  const advance = `akasha story turn advance --turn story-turn-played/${SLUG} --recorder`
  expect(into.starts.every((one) => one.prompt.includes(advance))).toBe(true)
  expect(into.starts.some((one) => one.prompt.includes("turn record"))).toBe(false)
})

test("a record naming a recorder is refused with the advance a recorder runs", async () => {
  const into = seen()
  const answer = await storyTurnRecord(
    ["--turn", `story-turn-played/${SLUG}`, "--recorder", "memory"],
    GIVEN,
    landingInto(into),
    reachOver(turnAt("recorders"), null, into)
  )
  expect(answer.refusals.join(" ")).toContain("akasha story turn advance --turn")
  expect(into.starts).toEqual([])
})

test("a turn at recorders is refused with the advance a recorder runs", async () => {
  const into = seen()
  const answer = await recordedBy(turnAt("recorders"), into)
  expect(answer.refusals.join(" ")).toContain(
    `akasha story turn advance --turn story-turn-played/${SLUG} --recorder <recorder>`
  )
  expect(into.folded).toEqual([])
})

test("a turn a recorder ran on already is refused, and nothing is done", async () => {
  const into = seen()
  const turn = turnAt("player", { recordedBy: [`${storyRecorder.slug}/${memory.slug}`] })
  const answer = await recordedBy(turn, into)
  expect(answer.refusals.join(" ")).toContain("was recorded already")
  expect(into.folded).toEqual([])
  expect(into.starts).toEqual([])
})

test("a turn another turn follows is refused, so two turns' recorders never share seats", async () => {
  const into = seen()
  const turn = turnAt("player", { prose: "txt" })
  const next = { ...turnAt("world-builder"), slug: "the-saga-00-004" }
  const base = reachOver(turn, null, into)
  const answer = await storyTurnRecord(
    ["--turn", `story-turn-played/${SLUG}`],
    GIVEN,
    landingInto(into),
    { ...base, turnAt: (root, slug) => (slug === next.slug ? next : base.turnAt(root, slug)) }
  )
  expect(answer.refusals.join(" ")).toContain("is followed by `the-saga-00-004` already")
  expect(into.folded).toEqual([])
  expect(into.starts).toEqual([])
})

test("a turn before player is refused, and nothing is done", async () => {
  const into = seen()
  const answer = await recordedBy(turnAt("writer"), into)
  expect(answer.refusals.join(" ")).toContain("is at writer")
  expect(into.folded).toEqual([])
  expect(into.starts).toEqual([])
})

test("a turn naming no played turn here is refused", async () => {
  const into = seen()
  const answer = await storyTurnRecord(
    ["--turn", "story-turn-played/the-saga-00-099"],
    GIVEN,
    landingInto(into),
    reachOver(turnAt("player"), null, into)
  )
  expect(answer.refusals.join(" ")).toContain("names no played turn here")
  expect(into.starts).toEqual([])
})
