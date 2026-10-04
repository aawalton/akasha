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
import { commitsIn } from "akasha/command/pages/story/turn/modules/turn-commits/turn-commits.module.code.ts"
import {
  storyTurnTakeBack,
  type TakingBack,
} from "akasha/command/pages/story/turn/take-back/story-turn-take-back.command.code.ts"
import {
  AT,
  BEFORE_AT,
  ELSEWHERE,
  ELSEWHERE_AT,
  GATE_AT,
  HALL_AT,
  HER,
  HER_AT,
  HER_REFERENCES_AT,
  NOW,
  OTHER_AT,
  OUTCOMES_AT,
  OWN_RUN,
  PROSE_AT,
  RUN,
  reachOver,
  SLUG,
  scoredLine,
  turnAt,
} from "akasha/command/pages/story/turn/take-back/story-turn-take-back.command.test-fixtures.ts"
import {
  putting,
  taking,
} from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"

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

test("every file of the turn's making goes back to its body before the turn, in one landing", async () => {
  const into = seen()
  const answer = await takenBy(reachOver(turnAt(), into), into)
  expect(answer.refusals).toEqual([])
  expect(into.asked).toEqual([
    putting({ path: HALL_AT, content: "the hall, before\n" }),
    taking(GATE_AT),
    putting({ path: HER_AT, content: "her, before\n" }),
    taking(OUTCOMES_AT),
    taking(PROSE_AT),
    taking(AT),
  ])
  expect(into.steps).toEqual([`hold ${AT}`, "land", `free ${AT}`])
  expect(answer.report).toContain("undone\tc3\tA fact of lore/the-gate is told")
  expect(answer.report.join("\n")).not.toContain("a message is read")
})

test("a file only ever appended to is taken away and written again, since a rewrite is dropped", async () => {
  const into = seen()
  const answer = await takenBy(reachOver(turnAt(), into, { appendOnly: [HER_AT] }), into)
  expect(answer.refusals).toEqual([])
  const at = into.asked.findIndex((one) => JSON.stringify(one) === JSON.stringify(taking(HER_AT)))
  expect(at).toBeGreaterThanOrEqual(0)
  expect(into.asked[at + 1]).toEqual(putting({ path: HER_AT, content: "her, before\n" }))
})

test("a file the landing keeps from the pages is left to the landing", async () => {
  const into = seen()
  await takenBy(reachOver(turnAt(), into), into)
  expect(JSON.stringify(into.asked)).not.toContain(HER_REFERENCES_AT)
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

test("an outcome's number on a page set back to its body is not taken back twice", async () => {
  const into = seen()
  const outcomes = `${scoredLine(HER)}\n${scoredLine(ELSEWHERE)}\n`
  const answer = await takenBy(reachOver(turnAt(), into, { outcomes }), into)
  expect(answer.refusals).toEqual([])
  expect(into.folded).toEqual([
    {
      pageTypeSlug: "persona",
      slug: "her",
      path: ELSEWHERE_AT,
      values: { relationshipPoints: 2 },
      merge: true,
    },
  ])
  expect(answer.report).toContain(`taken back\t${ELSEWHERE}\trelationshipPoints`)
  expect(answer.report).not.toContain(`taken back\t${HER}\trelationshipPoints`)
})

test("a file changed since the turn moved to player is refused and named, and nothing lands", async () => {
  const into = seen()
  const now = { ...NOW, [HALL_AT]: "the hall, told again later\n" }
  const answer = await takenBy(reachOver(turnAt(), into, { now }), into)
  expect(answer.refusals.join(" ")).toContain(`\`${HALL_AT}\` changed since`)
  expect(into.asked).toEqual([])
  expect(into.notices).toEqual([])
})

test("another story of the world changing during the making refuses a world file", async () => {
  const into = seen()
  const run = [...RUN, { commit: "c4", subject: "another-00-009 moves", paths: [OTHER_AT] }]
  const answer = await takenBy(reachOver(turnAt(), into, { run }), into)
  expect(answer.refusals.join(" ")).toContain(`\`${OTHER_AT}\`, of another story`)
  expect(into.asked).toEqual([])
})

test("another story changing while only the story's own files changed is no refusal", async () => {
  const into = seen()
  const answer = await takenBy(reachOver(turnAt(), into, { run: OWN_RUN }), into)
  expect(answer.refusals).toEqual([])
  expect(JSON.stringify(into.asked)).not.toContain(OTHER_AT)
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

test("a turn whose page no commit added is refused", async () => {
  const into = seen()
  const reach = { ...reachOver(turnAt(), into), addedOn: () => null }
  const answer = await takenBy(reach, into)
  expect(answer.refusals.join(" ")).toContain(`no commit added \`${AT}\``)
  expect(into.asked).toEqual([])
})

test("a git that cannot be read refuses and says why, and nothing lands", async () => {
  const into = seen()
  const reach: TakingBack = {
    ...reachOver(turnAt(), into),
    commitsOn: () => {
      throw new Error("git: not found")
    },
  }
  const answer = await takenBy(reach, into)
  expect(answer.refusals.join(" ")).toContain("git could not read the history")
  expect(answer.refusals.join(" ")).toContain("git: not found")
  expect(into.asked).toEqual([])
})

test("git's log is read into commits and the paths each changed", () => {
  const said = "\x1ec9\x1fone moves\n\na/b.ts\na/c.ts\n\x1ec1\x1fone is made\n\na/b.ts\n"
  expect(commitsIn(said)).toEqual([
    { commit: "c9", subject: "one moves", paths: ["a/b.ts", "a/c.ts"] },
    { commit: "c1", subject: "one is made", paths: ["a/b.ts"] },
  ])
})
