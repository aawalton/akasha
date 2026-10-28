import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  BUILDER,
  GAME,
  landingInto,
  MASTER,
  type Seen,
  seen,
  WRITER,
} from "akasha/command/pages/story/turn/cancel/story-turn-cancel.command.test-fixtures.ts"
import {
  storyTurnTakeBack,
  type TakingBack,
} from "akasha/command/pages/story/turn/take-back/story-turn-take-back.command.code.ts"
import {
  AT,
  BEATS_AT,
  BEFORE_AT,
  ELSEWHERE,
  ELSEWHERE_AT,
  HER,
  OUTCOMES_AT,
  PROSE_AT,
  PURSE_AT,
  reachOver,
  SLUG,
  scoredLine,
  turnAt,
} from "akasha/command/pages/story/turn/take-back/story-turn-take-back.command.test-fixtures.ts"
import { taking } from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha story turn take-back",
  from: "",
  writer: null,
  agentId: "an-agent",
}

async function takenBy(reach: TakingBack, into: Seen) {
  return await storyTurnTakeBack(
    ["--turn", `story-turn-played/${SLUG}`],
    GIVEN,
    landingInto(into),
    reach
  )
}

test("a take-back undoes what the turn's beats wrote and takes the turn's own files, in one landing", async () => {
  const into = seen()
  const answer = await takenBy(reachOver(turnAt(), into), into)
  expect(answer.refusals).toEqual([])
  expect(into.folded.map((one) => [one.path, one.values])).toEqual([[PURSE_AT, { value: 9 }]])
  expect(into.asked).toEqual([taking(PROSE_AT), taking(OUTCOMES_AT), taking(BEATS_AT), taking(AT)])
  expect(into.steps).toEqual([`hold ${AT}`, "land", `free ${AT}`])
  expect(answer.report).toContain(`restored\t${PURSE_AT}\tvalue\t9`)
})

test("a number changed since the turn left it refuses the take-back, and nothing lands", async () => {
  const into = seen()
  const answer = await takenBy(reachOver(turnAt(), into, { purse: 6 }), into)
  expect(answer.refusals.join(" ")).toContain("`value` of `metric-character-currency/mara` is 6")
  expect(into.asked).toEqual([])
  expect(into.notices).toEqual([])
})

test("a take-back leaves the game's reviewer and recorder seats on call, discards kept edits and names the latest turn left", async () => {
  const into = seen()
  await takenBy(reachOver(turnAt(), into), into)
  expect(into.stops).toEqual([])
  expect(into.releases).toEqual([AT])
  const said = `The turn \`${AT}\` was taken back; the story's latest turn is \`${BEFORE_AT}\`.`
  expect(into.notices).toEqual([`${MASTER}: ${said}`, `${BUILDER}: ${said}`, `${WRITER}: ${said}`])
})

test("a take-back puts the turn's action in its story's action draft, and sends nothing", async () => {
  const into = seen()
  const drafts: string[] = []
  const answer = await takenBy(reachOver(turnAt(), into, { drafts }), into)
  expect(drafts).toEqual([`${GAME}: I open the gate`])
  expect(answer.report).toContain(`drafted\t${GAME}\tthe action, back in the action bar`)
  expect(into.notices.join("\n")).not.toContain("I open the gate")
})

test("a take-back that lands nothing puts nothing in the action draft", async () => {
  const into = seen()
  const drafts: string[] = []
  await takenBy(reachOver(turnAt(), into, { drafts, latest: "the-saga-00-004" }), into)
  expect(drafts).toEqual([])
})

test("a draft not written is told, and the take-back still lands", async () => {
  const into = seen()
  const answer = await takenBy(reachOver(turnAt(), into, { draftRefused: "held" }), into)
  expect(JSON.stringify(answer)).toContain("the action was not put back in the action bar: held")
  expect(into.steps).toContain("land")
})

test("an outcome settled before outcomes kept what they added is taken back off its page", async () => {
  const into = seen()
  const outcomes = `${scoredLine(HER)}\n${scoredLine(ELSEWHERE)}\n`
  const answer = await takenBy(reachOver(turnAt(), into, { outcomes }), into)
  expect(answer.refusals).toEqual([])
  expect(into.folded).toContainEqual({
    pageTypeSlug: "persona",
    slug: "her",
    path: ELSEWHERE_AT,
    values: { relationshipPoints: 2 },
    merge: true,
  })
  expect(answer.report).toContain(`taken back\t${ELSEWHERE}\trelationshipPoints`)
  expect(answer.report).toContain(`taken back\t${HER}\trelationshipPoints`)
})

test("a turn that is not the latest of its story lands nothing", async () => {
  const into = seen()
  const answer = await takenBy(reachOver(turnAt(), into, { latest: "the-saga-00-004" }), into)
  expect(answer.refusals.join(" ")).toContain("is not the latest turn")
  expect(into.asked).toEqual([])
})

test("a turn before player is refused, since it is cancelled rather than taken back", async () => {
  const into = seen()
  const answer = await takenBy(reachOver(turnAt("recorders"), into), into)
  expect(answer.refusals.join(" ")).toContain("is cancelled rather than taken back")
  expect(into.asked).toEqual([])
  expect(into.stops).toEqual([])
})
