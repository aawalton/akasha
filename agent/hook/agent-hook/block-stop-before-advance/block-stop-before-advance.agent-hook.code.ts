import { readFileSync, realpathSync } from "node:fs"
import {
  runningUnder,
  stillWorking,
} from "akasha/agent/hook/agent-hook/inference-hook/keep-alan-directives/keep-alan-directives.inference-hook.code.ts"
import {
  type Answer,
  LET_THROUGH,
  passing,
  ranAsJudged,
  refusing,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { seatIn } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder as recorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { workingOf } from "akasha/agent/seat/observation/seat-turn/modules/turn-working/turn-working.module.code.ts"
import { escapeRegExp } from "akasha/code/type/narrowing/modules/escape-reg-exp/escape-reg-exp.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import { recorder as recorderArgument } from "akasha/command/argument/pages/recorder.argument.ts"
import { reviewer as reviewerArgument } from "akasha/command/argument/pages/reviewer.argument.ts"
import { writtenChapter } from "akasha/command/argument/pages/written-chapter.argument.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  valuedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  bareOf,
  MECHANICS,
  RECORDERS,
  REVIEWERS,
  stepIn,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const HOOK = "block-stop-before-advance"

export const MOST_REFUSALS = 4

const TRANSCRIPT = "transcript_path"

const SEAT = "seat"

const ID = "id"

const ROLE = "role"

const STEP_STATUS = "stepStatus"

const TURN_STATUS = "turnStatus"

const REVIEWED_BY = "reviewedBy"

const RECORDED_BY = "recordedBy"

const SENDING = "akasha seat send"

const FEEDBACK = "Stop hook feedback:"

const PARTED = "/"

type Kind = "reviewer" | "recorder"

type Job = {
  readonly pageType: string
  readonly slug: string
  readonly address: string
  readonly kind: Kind
  readonly doer: string
  readonly line: string
}

export type Heard = {
  readonly job: Job
  readonly refusals: number
  readonly waiting: boolean
}

type Progress = { readonly step: TurnStep | null; readonly done: readonly string[] }

export const SCOPE: readonly string[] = [
  `${HOOK} refuses a story reviewer's or story recorder's stop while the turn it was started for`,
  "still waits on its advance, so the seat keeps working instead of sitting idle.",
  "",
  "THE JOB. The last message the seat was sent that names an advance, `--turn <address>` or",
  "`--chapter <address>` then `--reviewer <slug>` or `--recorder <slug>`, is the job it is judged on.",
  "",
  "LET THROUGH:",
  "  a seat whose role is neither story reviewer nor story recorder",
  "  a seat whose messages name no advance",
  "  a job whose page is gone, has left the reviewers or recorders step, or names the slug done",
  "  a seat that sent a seat a message since the last message it was sent, waiting on the answer",
  "  a seat with a subagent or a background command still running",
  `  a job this has refused ${MOST_REFUSALS} times already`,
  "  anything this could not read",
  "",
  "NOT REACHED: every event but Stop, a subagent's stop, and a job no message named.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts --scope\`, which is where this sits: it is what the`,
  "program says about itself, held as the text it prints rather than as a comment.",
]

const JOB = new RegExp(
  `(?:${escapeRegExp(playedTurn.said)}|${escapeRegExp(writtenChapter.said)})\\s+([\\w-]+/[\\w-]+)\\s+` +
    `(${escapeRegExp(reviewerArgument.said)}|${escapeRegExp(recorderArgument.said)})\\s+([\\w-]+)`
)

export function jobIn(text: string): Job | null {
  const found = JOB.exec(text)
  if (found === null) return null
  const [line, address, flag, doer] = found
  if (line === undefined || address === undefined || doer === undefined) return null
  const at = address.indexOf(PARTED)
  return {
    pageType: address.slice(0, at),
    slug: address.slice(at + 1),
    address,
    kind: flag === reviewerArgument.said ? "reviewer" : "recorder",
    doer,
    line,
  }
}

type Entry = Readonly<Record<string, unknown>>

function recordAt(held: unknown): Entry | null {
  return held !== null && typeof held === "object" && !Array.isArray(held) ? (held as Entry) : null
}

function entriesIn(transcript: string): readonly Entry[] {
  const found: Entry[] = []
  for (const line of transcript.split("\n")) {
    if (line.trim() === "") continue
    try {
      const held = recordAt(JSON.parse(line))
      if (held !== null) found.push(held)
    } catch {}
  }
  return found
}

function contentOf(entry: Entry): unknown {
  return recordAt(entry["message"])?.["content"]
}

function textOf(content: unknown): string {
  if (typeof content === "string") return content
  if (!Array.isArray(content)) return ""
  return content
    .map((one) => {
      const block = recordAt(one)
      return block?.["type"] === "text" && typeof block["text"] === "string" ? block["text"] : ""
    })
    .join("\n")
}

function mainLine(entry: Entry): boolean {
  return entry["isSidechain"] !== true
}

function sentToSeat(entry: Entry): boolean {
  if (entry["type"] !== "user" || !mainLine(entry) || entry["isMeta"] === true) return false
  return recordAt(entry["origin"])?.["kind"] !== undefined
}

function refusedHere(entry: Entry): boolean {
  if (entry["type"] !== "user" || !mainLine(entry)) return false
  const said = textOf(contentOf(entry))
  return said.startsWith(FEEDBACK) && said.includes(HOOK)
}

function sendsToSeat(entry: Entry): boolean {
  if (entry["type"] !== "assistant" || !mainLine(entry)) return false
  const content = contentOf(entry)
  if (!Array.isArray(content)) return false
  return content.some((one) => {
    const block = recordAt(one)
    if (block?.["type"] !== "tool_use") return false
    const command = recordAt(block["input"])?.["command"]
    return typeof command === "string" && command.includes(SENDING)
  })
}

export function heardIn(transcript: string): Heard | null {
  const entries = entriesIn(transcript)
  let job: Job | null = null
  let jobAt = -1
  let lastSent = -1
  for (let at = 0; at < entries.length; at += 1) {
    const entry = entries[at]
    if (entry === undefined || !sentToSeat(entry)) continue
    lastSent = at
    const found = jobIn(textOf(contentOf(entry)))
    if (found === null) continue
    job = found
    jobAt = at
  }
  if (job === null) return null
  const refusals = entries.slice(jobAt + 1).filter(refusedHere).length
  const waiting = entries.slice(lastSent + 1).some(sendsToSeat)
  return { job, refusals, waiting }
}

export function progressOf(value: Readonly<Record<string, unknown>>, kind: Kind): Progress {
  const step = stepIn(value[STEP_STATUS] ?? value[TURN_STATUS])
  const done = stringsIn(value[kind === "reviewer" ? REVIEWED_BY : RECORDED_BY]).map(bareOf)
  return { step, done }
}

function stepsFor(kind: Kind): readonly TurnStep[] {
  return kind === "reviewer" ? [REVIEWERS] : [MECHANICS, RECORDERS]
}

function refusal(heard: Heard, step: TurnStep): string {
  return [
    `${HOOK}: \`${heard.job.address}\` is still at ${step}, waiting on your advance as \`${heard.job.doer}\`.`,
    "Do not end your turn in words. Keep making tool calls until this lands:",
    "",
    `  akasha story turn advance ${heard.job.line}`,
    "",
    `Where a refusal stops you and you cannot mend it, send it to the game master with \`${SENDING}\`, then end your turn.`,
  ].join("\n")
}

export function answerOver(heard: Heard | null, progress: Progress | null): Answer {
  if (heard === null || progress === null || progress.step === null) return LET_THROUGH
  if (!stepsFor(heard.job.kind).includes(progress.step)) return LET_THROUGH
  if (progress.done.includes(heard.job.doer)) return LET_THROUGH
  if (heard.waiting) return LET_THROUGH
  if (heard.refusals >= MOST_REFUSALS) {
    return passing(
      `${HOOK}: \`${heard.job.address}\` was refused ${heard.refusals} stops, so this one passes`
    )
  }
  return refusing(refusal(heard, progress.step))
}

const JUDGED_ROLES: readonly string[] = [reviewerRole.slug, recorderRole.slug]

type Valued = { readonly value: Readonly<Record<string, unknown>> }

export function roleOf(seats: readonly Valued[], agent: string): string | null {
  for (const one of seats) {
    if (one.value[ID] !== agent) continue
    const held = one.value[ROLE]
    return typeof held === "string" && held !== "" ? slugOf(held) : null
  }
  return null
}

function progressAt(root: string, job: Job): Progress | null {
  try {
    return progressOf(valuedAt(root, job.pageType, job.slug).value, job.kind)
  } catch {
    return null
  }
}

async function judgedOver(payload: Record<string, unknown>): Promise<Answer> {
  const agent = seatIn(process.env)
  if (agent === null) return LET_THROUGH
  const root = rootOf(realpathSync(import.meta.path))
  const role = roleOf(valuesOfType(root, SEAT), agent)
  if (role === null || !JUDGED_ROLES.includes(role)) return LET_THROUGH
  const at = payload[TRANSCRIPT]
  if (typeof at !== "string" || at === "") return LET_THROUGH
  const heard = heardIn(readFileSync(at, "utf8"))
  const answer = answerOver(heard, heard === null ? null : progressAt(root, heard.job))
  if (answer.code === LET_THROUGH.code) return answer
  if (stillWorking(await runningUnder(agent), workingOf(agent))) return LET_THROUGH
  return answer
}

export async function judgedFor(payload: Record<string, unknown>): Promise<Answer> {
  try {
    return await judgedOver(payload)
  } catch {
    return LET_THROUGH
  }
}

async function ran(): Promise<number> {
  return await ranAsJudged(HOOK, SCOPE, judgedFor)
}

if (import.meta.main) process.exit(await ran())
