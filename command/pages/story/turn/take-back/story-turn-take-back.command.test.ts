import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  BUILDER,
  landingInto,
  MASTER,
  type Seen,
  seen,
  WRITER,
} from "akasha/command/pages/story/turn/cancel/story-turn-cancel.command.test-fixtures.ts"
import { commitsIn } from "akasha/command/pages/story/turn/take-back/modules/turn-commits/turn-commits.module.code.ts"
import {
  besideListed,
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

test("a file the landing keeps from the pages is left to the landing", async () => {
  const into = seen()
  await takenBy(reachOver(turnAt(), into), into)
  expect(JSON.stringify(into.asked)).not.toContain(HER_REFERENCES_AT)
})

test("a take-back stops the game's reviewer and recorder seats, discards kept edits and names the latest turn left", async () => {
  const into = seen()
  await takenBy(reachOver(turnAt(), into), into)
  expect(into.stops).toEqual([
    "mari-reviewer-the-saga-flex-1",
    "mari-story-recorder-the-saga-flex-1",
  ])
  expect(into.releases).toEqual([AT])
  const said = `The turn \`${AT}\` was taken back; the story's latest turn is \`${BEFORE_AT}\`.`
  expect(into.notices).toEqual([`${MASTER}: ${said}`, `${BUILDER}: ${said}`, `${WRITER}: ${said}`])
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

test("a turn no commit made from the player's action is refused", async () => {
  const into = seen()
  const reach = { ...reachOver(turnAt(), into), commitsOn: () => [] }
  const answer = await takenBy(reach, into)
  expect(answer.refusals.join(" ")).toContain("from the player's action")
  expect(into.asked).toEqual([])
})

const ROOT = mkdtempSync(join("/var/tmp", "story-turn-take-back-test-"))

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

test("the files beside a turn are its own files, never a folder such as its hold's lock", () => {
  const turns = join(ROOT, "turns")
  mkdirSync(join(turns, "one-003.story-turn-played.ts.lock"), { recursive: true })
  for (const name of [
    "one-003.story-turn-played.ts",
    "one-003.story-turn-played.prose.txt",
    "one-003.story-turn-played.edits.uncommitted.jsonl",
    "one-0030.story-turn-played.ts",
  ]) {
    writeFileSync(join(turns, name), "")
  }
  expect(besideListed(ROOT, "turns/one-003.story-turn-played.ts").toSorted()).toEqual([
    "turns/one-003.story-turn-played.prose.txt",
    "turns/one-003.story-turn-played.ts",
  ])
})

test("git's log is read into commits and the paths each changed", () => {
  const said = "\x1ec9\x1fone moves\n\na/b.ts\na/c.ts\n\x1ec1\x1fone is made\n\na/b.ts\n"
  expect(commitsIn(said)).toEqual([
    { commit: "c9", subject: "one moves", paths: ["a/b.ts", "a/c.ts"] },
    { commit: "c1", subject: "one is made", paths: ["a/b.ts"] },
  ])
})
