import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  restoredOf,
  storyTurnCancel,
} from "akasha/command/pages/story/turn/cancel/story-turn-cancel.command.code.ts"
import {
  AT,
  BUILDER,
  CANCEL_NOTICE,
  HEALTH,
  HEALTH_AT,
  HEALTH_HISTORY,
  HEALTH_HISTORY_AT,
  HEALTH_KEPT,
  landingInto,
  MASTER,
  OUTCOMES_AT,
  PROSE_AT,
  RECORDER,
  REVIEWER,
  reachOver,
  type Seen,
  SLUG,
  type Story,
  seen,
  turnAt,
  WRITER,
} from "akasha/command/pages/story/turn/cancel/story-turn-cancel.command.test-fixtures.ts"
import type { Turn } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import {
  putting,
  taking,
} from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha story turn cancel",
  from: "",
  writer: null,
  agentId: null,
}

async function cancelledBy(argv: readonly string[], turn: Turn, into: Seen, story: Story = {}) {
  return await storyTurnCancel(
    ["--turn", `story-turn-played/${SLUG}`, ...argv],
    GIVEN,
    landingInto(into),
    reachOver(turn, into, story)
  )
}

function nothingDone(into: Seen) {
  expect(into.folded).toEqual([])
  expect(into.asked).toEqual([])
  expect(into.stops).toEqual([])
  expect(into.releases).toEqual([])
  expect(into.notices).toEqual([])
  expect(into.drafts).toEqual([])
}

test("a cancel puts the turn's action back in its story's action draft, as typed", async () => {
  const into = seen()
  const answer = await cancelledBy([], turnAt("world-builder"), into)
  expect(answer.refusals).toEqual([])
  expect(into.drafts).toEqual(["the-saga: I open the gate"])
  expect(answer.report).toContain("drafted\tthe-saga\tthe action, back in the action bar")
})

test("a cancel at game-master takes the turn's page and every file beside it away in one landing, stopping no seat", async () => {
  const into = seen()
  const turn = turnAt("game-master", { lore: ["world-place/the-hall"] })
  const answer = await cancelledBy([], turn, into)
  expect(answer.refusals).toEqual([])
  expect(into.folded).toEqual([])
  expect(into.asked).toEqual([taking(AT)])
  expect(into.stops).toEqual([])
  expect(into.steps).toEqual([`hold ${AT}`, "land", `free ${AT}`])
  expect(answer.report).toEqual(
    expect.arrayContaining([
      `${SLUG}\tgame-master\tcancelled`,
      `removed\t${AT}`,
      `removed\t${PROSE_AT}`,
      `removed\t${OUTCOMES_AT}`,
    ])
  )
})

test("a cancel stops the game's reviewer and recorder seats, discards their kept edits and tells the on-call seats", async () => {
  const into = seen()
  const turn = turnAt("recorders", { beats: ["Mara opens the gate"], prose: "txt" })
  const answer = await cancelledBy([], turn, into)
  expect(answer.refusals).toEqual([])
  expect(into.stops).toEqual([REVIEWER, RECORDER])
  expect(into.releases).toEqual([AT])
  expect(answer.report).toContain("discarded\tthe recorders' kept edits")
  expect(into.notices).toEqual([
    `${MASTER}: ${CANCEL_NOTICE}`,
    `${BUILDER}: ${CANCEL_NOTICE}`,
    `${WRITER}: ${CANCEL_NOTICE}`,
  ])
})

test("a published turn is refused, and nothing is done", async () => {
  const into = seen()
  const answer = await cancelledBy([], turnAt("player", { prose: "txt" }), into)
  expect(answer.refusals.join(" ")).toContain("published to the player already")
  nothingDone(into)
})

test("a turn that is not the latest of its story is refused, and nothing is done", async () => {
  const into = seen()
  const answer = await cancelledBy([], turnAt("game-master"), into, { latest: "the-saga-00-057" })
  expect(answer.refusals.join(" ")).toContain("is not the latest turn")
  nothingDone(into)
})

test("a seat other than the game's game master is refused, and nothing is done", async () => {
  const into = seen()
  const seat = { name: WRITER, role: "writer", game: "the-saga" }
  const answer = await cancelledBy([], turnAt("game-master"), into, { seat })
  expect(answer.refusals.join(" ")).toContain("cancelled by its game-master")
  nothingDone(into)
})

test("the game's game master cancels a turn", async () => {
  const into = seen()
  const seat = { name: MASTER, role: "game-master", game: "the-saga" }
  const answer = await cancelledBy([], turnAt("game-master"), into, { seat })
  expect(answer.refusals).toEqual([])
  expect(into.asked).toEqual([taking(AT)])
})

test("a turn with mechanics lines written is refused without the flag, naming the page", async () => {
  const into = seen()
  const answer = await cancelledBy([], turnAt("game-master"), into, { written: [HEALTH_AT] })
  const said = answer.refusals.join(" ")
  expect(said).toContain(HEALTH_AT)
  expect(said).toContain("--take-back-mechanics")
  nothingDone(into)
})

test("with the flag, the turn's history lines are taken back and the page's value restored, in the same landing", async () => {
  const into = seen()
  const answer = await cancelledBy(["--take-back-mechanics"], turnAt("game-master"), into, {
    written: [HEALTH_AT],
  })
  expect(answer.refusals).toEqual([])
  expect(into.folded).toEqual([
    {
      pageTypeSlug: "the-saga-health",
      slug: "mara",
      path: HEALTH_AT,
      values: { value: 10 },
      merge: true,
    },
  ])
  expect(into.asked).toEqual([
    taking(HEALTH_HISTORY_AT),
    putting({ path: HEALTH_HISTORY_AT, content: HEALTH_KEPT }),
    taking(AT),
  ])
  expect(answer.report).toContain(`restored\t${HEALTH_AT}\tvalue\t10`)
})

test("with the flag, a history with no line before the turn's is refused, naming the page", async () => {
  const into = seen()
  const answer = await cancelledBy(["--take-back-mechanics"], turnAt("game-master"), into, {
    written: [HEALTH_AT],
    history: '{"turn":56,"value":7}\n',
  })
  const said = answer.refusals.join(" ")
  expect(said).toContain(`restoring \`${HEALTH_AT}\` is not well defined`)
  nothingDone(into)
})

test("a history with a later turn's line after the turn's is not restored", () => {
  const history = `${HEALTH_HISTORY}{"turn":57,"value":3}\n`
  const said = restoredOf(
    { at: HEALTH_AT, value: HEALTH, historyAt: HEALTH_HISTORY_AT, history },
    56
  )
  expect("refused" in said && said.refused).toContain("a line for turn 57")
})

test("a page stating no number at its value is not restored", () => {
  const value = { ...HEALTH, value: "seven" }
  const at = { at: HEALTH_AT, value, historyAt: HEALTH_HISTORY_AT, history: HEALTH_HISTORY }
  const said = restoredOf(at, 56)
  expect("refused" in said && said.refused).toContain("states no number at `value`")
})

test("a turn naming no played turn here is refused", async () => {
  const into = seen()
  const answer = await storyTurnCancel(
    ["--turn", "story-turn-played/the-saga-00-099"],
    GIVEN,
    landingInto(into),
    reachOver(turnAt("game-master"), into)
  )
  expect(answer.refusals.join(" ")).toContain("names no played turn here")
  nothingDone(into)
})
