import { expect, test } from "bun:test"
import {
  answerOver,
  type Heard,
  heardIn,
  jobIn,
  MOST_REFUSALS,
  progressOf,
  roleOf,
  SCOPE,
} from "akasha/agent/hook/agent-hook/block-stop-before-advance/block-stop-before-advance.agent-hook.code.ts"
import { ASIDE, REFUSED } from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { reviewer } from "akasha/agent/role/pages/reviewer.role.ts"
import { writer } from "akasha/agent/role/pages/writer.role.ts"
import { role } from "akasha/agent/role/role.page-type.ts"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"
import { continuity } from "akasha/story/reviewer/pages/continuity.story-reviewer.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import {
  RECORDERS,
  REVIEWERS,
  statusOf,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const TURN = "story-turn-played/game-00-004"

const ADVANCE = `akasha story turn advance --turn ${TURN} --reviewer style --issues-file <path>`

const JOB_PROMPT = `You are the Style story reviewer.\n\n${ADVANCE}\n`

function line(held: Record<string, unknown>): string {
  return JSON.stringify(held)
}

function sent(text: string, kind = "human"): string {
  return line({ type: "user", origin: { kind }, message: { role: "user", content: text } })
}

function said(text: string): string {
  return line({ type: "assistant", message: { content: [{ type: "text", text }] } })
}

function shell(command: string): string {
  return line({
    type: "assistant",
    message: { content: [{ type: "tool_use", name: "Bash", input: { command } }] },
  })
}

function refused(): string {
  return line({
    type: "user",
    isMeta: true,
    message: { role: "user", content: "Stop hook feedback:\nblock-stop-before-advance: still" },
  })
}

function heardOf(...lines: readonly string[]): Heard | null {
  return heardIn(lines.join("\n"))
}

const AT_REVIEWERS = { step: "reviewers", done: ["continuity"] } as const

test("a job is the page, the step and the doer an advance names", () => {
  expect(jobIn(ADVANCE)).toEqual({
    pageType: "story-turn-played",
    slug: "game-00-004",
    address: TURN,
    kind: "reviewer",
    doer: "style",
    line: `--turn ${TURN} --reviewer style`,
  })
  const chapter = jobIn("advance --chapter story-chapter-written/tale-003 --recorder memory")
  expect(chapter?.kind).toBe("recorder")
  expect(chapter?.pageType).toBe("story-chapter-written")
  expect(jobIn("no advance here")).toBeNull()
})

test("a transcript naming no advance names no job", () => {
  expect(heardOf(sent("hello"), said("hi"))).toBeNull()
  expect(heardOf(said(ADVANCE))).toBeNull()
})

test("a seat ending on words before its advance is refused", () => {
  const heard = heardOf(sent(JOB_PROMPT), said("Reading the rules now."))
  const answer = answerOver(heard, AT_REVIEWERS)
  expect(answer.code).toBe(REFUSED)
  expect(answer.err).toContain(`--turn ${TURN} --reviewer style`)
})

test("a turn naming the seat's reviewer done lets the stop through", () => {
  const heard = heardOf(sent(JOB_PROMPT), said("done"))
  expect(answerOver(heard, { step: "reviewers", done: ["continuity", "style"] }).code).toBe(ASIDE)
})

test("a turn that left the step, or is gone, lets the stop through", () => {
  const heard = heardOf(sent(JOB_PROMPT))
  expect(answerOver(heard, { step: "recorders", done: [] }).code).toBe(ASIDE)
  expect(answerOver(heard, { step: "player", done: [] }).code).toBe(ASIDE)
  expect(answerOver(heard, null).code).toBe(ASIDE)
})

test("a seat that sent the game master a message since it was last sent one waits", () => {
  const heard = heardOf(sent(JOB_PROMPT), shell('akasha seat send --to gm --body "refused"'))
  expect(heard?.waiting).toBe(true)
  expect(answerOver(heard, AT_REVIEWERS).code).toBe(ASIDE)
})

test("an answer to the seat's message ends its waiting", () => {
  const heard = heardOf(
    sent(JOB_PROMPT),
    shell("akasha seat send --to gm --body x"),
    sent("<channel>do it</channel>", "channel"),
    said("Doing it.")
  )
  expect(heard?.waiting).toBe(false)
  expect(heard?.job.doer).toBe("style")
  expect(answerOver(heard, AT_REVIEWERS).code).toBe(REFUSED)
})

test("a job refused its most stops already lets the next through", () => {
  const refusals = Array.from({ length: MOST_REFUSALS }, refused)
  const heard = heardOf(sent(JOB_PROMPT), ...refusals, said("still words"))
  expect(heard?.refusals).toBe(MOST_REFUSALS)
  expect(answerOver(heard, AT_REVIEWERS).code).toBe(ASIDE)
  const fewer = heardOf(sent(JOB_PROMPT), refused(), said("words"))
  expect(answerOver(fewer, AT_REVIEWERS).code).toBe(REFUSED)
})

test("refusals before the job was sent are not counted against it", () => {
  const heard = heardOf(refused(), refused(), refused(), refused(), sent(JOB_PROMPT))
  expect(heard?.refusals).toBe(0)
})

test("a turn's progress reads its step and who is done, bare", () => {
  const value = {
    stepStatus: statusOf(REVIEWERS),
    reviewedBy: [`${storyReviewer.slug}/${continuity.slug}`],
    recordedBy: [`${storyRecorder.slug}/${memory.slug}`],
  }
  expect(progressOf(value, "reviewer")).toEqual({ step: REVIEWERS, done: [continuity.slug] })
  expect(progressOf(value, "recorder").done).toEqual([memory.slug])
  expect(progressOf({ turnStatus: statusOf(RECORDERS) }, "recorder").step).toBe(RECORDERS)
})

test("a seat's role is read from the page carrying its id", () => {
  const seats = [
    { value: { id: "one", role: `${role.slug}/${reviewer.slug}` } },
    { value: { id: "two", role: `${role.slug}/${writer.slug}` } },
  ]
  expect(roleOf(seats, "one")).toBe("reviewer")
  expect(roleOf(seats, "two")).toBe("writer")
  expect(roleOf(seats, "three")).toBeNull()
})

test("the scope says what is let through", () => {
  expect(SCOPE.join("\n")).toContain("LET THROUGH")
})
