import { realpathSync } from "node:fs"
import {
  type Answer,
  ASIDE,
  LET_THROUGH,
  payloadIn,
  refusing,
  SCOPE_FLAG,
  said,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { endsYes } from "akasha/agent/model/modules/answer/model-answer.module.code.ts"
import {
  askedOf,
  modelOf,
} from "akasha/agent/model/test/modules/running/model-test-running.module.code.ts"
import {
  type Directive,
  directiveKept,
  directivesIn,
  type Putter,
  type Putting,
} from "akasha/agent/model/test/pages/directive-kept/directive-kept.model-test.code.ts"
import { directiveKept as test } from "akasha/agent/model/test/pages/directive-kept/directive-kept.model-test.ts"
import { dontStopKept } from "akasha/agent/model/test/pages/dont-stop-kept/dont-stop-kept.model-test.code.ts"
import { letMeKept } from "akasha/agent/model/test/pages/let-me-kept/let-me-kept.model-test.code.ts"
import { noCommentaryKept } from "akasha/agent/model/test/pages/no-commentary-kept/no-commentary-kept.model-test.code.ts"
import { oneAtATimeKept } from "akasha/agent/model/test/pages/one-at-a-time-kept/one-at-a-time-kept.model-test.code.ts"

import { subagentBriefKept } from "akasha/agent/model/test/pages/subagent-brief-kept/subagent-brief-kept.model-test.code.ts"
import { readOwnTranscriptTail } from "akasha/agent/modules/io-probe/io-probe.module.code.ts"
import { lastAskedIn, lastSaidIn } from "akasha/agent/modules/last-said/last-said.module.code.ts"
import { seatIn } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import type { TurnWorking } from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import {
  anyLiveShell,
  workingOf,
} from "akasha/agent/seat/observation/seat-turn/modules/turn-working/turn-working.module.code.ts"
import { transcriptOf } from "akasha/agent/seat/session/modules/seat-transcript-path/seat-transcript-path.module.code.ts"
import { recorded } from "akasha/check/modules/cost/check-cost.module.code.ts"
import {
  createSubagentReader,
  type SubagentNode,
} from "akasha/code/editor/extension/modules/subagent-reading/subagent-reading.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  valuedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const HOOK = "keep-alan-directives"

const ACTIVE = "stop_hook_active"

const SEAT = "seat"

const PERSON = "person"

const ID = "id"

const DIRECTIVES = "directives"

const ROLE = "role"

const INTERVIEWER = "interviewer"

const DONT_STOP = "Don't Stop!"

const STOP_GATES = "stop-gates"

const POSITIVES = "positives"

const TEST = "model-test"

const HOOK_TYPE = "inference-hook"

export const GATES = {
  payload: "no payload read",
  held: "a stop this refused already",
  seat: "no seat in the environment",
  subagent: "a subagent still to report",
  shell: "a background command still to report",
  words: "no words closing the turn",
  person: "a seat answering to no person",
  rule: "a person stating no rule",
  model: "no model a call could reach",
  threw: "a throw nothing else caught",
  clean: "judged clean",
  open: "held open",
} as const

export function lineFor(gate: string, put: number, at: Date, seat: string | null): string {
  return `${JSON.stringify({ at: at.toISOString(), seat, gate, put })}\n`
}

function rootHere(): string | null {
  try {
    return rootOf(realpathSync(import.meta.path))
  } catch {
    return null
  }
}

function noting(
  root: string | null,
  seat: string | null,
  gate: string,
  put: number = 0
): undefined {
  if (root === null) return
  try {
    const line = lineFor(gate, put, new Date(), seat)
    recorded(root, valuedAt(root, HOOK_TYPE, HOOK).path, line, STOP_GATES)
  } catch {}
}

export function positiveFor(
  seat: string,
  about: string,
  prompt: string,
  answer: string,
  at: Date
): string {
  return `${JSON.stringify({ ranAt: at.toISOString(), seat, about, prompt, said: answer })}\n`
}

function recordingPositives(
  root: string,
  seat: string,
  asking: readonly Putting[],
  answers: readonly string[]
): undefined {
  const at = new Date()
  for (let one = 0; one < asking.length; one += 1) {
    const put = asking[one]
    const answer = answers[one] ?? ""
    if (put === undefined || !endsYes(answer)) continue
    try {
      const line = positiveFor(seat, put.about, put.prompt, answer, at)
      recorded(root, valuedAt(root, TEST, put.test).path, line, POSITIVES)
    } catch {}
  }
}

export const JUDGES: readonly Putter[] = [
  directiveKept,
  oneAtATimeKept,
  noCommentaryKept,
  subagentBriefKept,
  dontStopKept,
  letMeKept,
]

export type Valued = { readonly path: string; readonly value: Record<string, unknown> }

export const SCOPE: readonly string[] = [
  `${HOOK} judges the last words an agent wrote to Alan, as that agent's turn ends.`,
  "",
  "It catches:",
  "  the closing words of a turn, put to a model once for each rule a test here names.",
  "  what the person last asked for, put beside those words so a rule about it can be judged.",
  "",
  "It does not catch:",
  "  a turn under a seat that answers to no person.",
  "  a turn the agent closed with a tool call and no words.",
  "  a stop this hook held open already.",
  "  a turn ending while a subagent or a background command the seat started is still to report.",
  "  the rule against stopping, under a seat whose role is interviewer.",
  "  what a subagent wrote.",
  "  any tool call, and any event but `Stop`.",
  "",
  "A rule the model answers yes on comes back in that rule's own words.",
  "A model reached by no call leaves the turn unjudged.",
  "How far each run got is recorded beside this hook's page, whether or not a model was reached.",
  "A rule answered yes on is kept beside the test that asked it, with the turn and the answer.",
]

function namedIn(listed: readonly Valued[], agent: string, key: string): string | null {
  for (const one of listed) {
    if (one.value[ID] !== agent) continue
    const held = one.value[key]
    return typeof held === "string" && held !== "" ? slugOf(held) : null
  }
  return null
}

export function personIn(listed: readonly Valued[], agent: string): string | null {
  return namedIn(listed, agent, PERSON)
}

export function roleIn(listed: readonly Valued[], agent: string): string | null {
  return namedIn(listed, agent, ROLE)
}

export function keptFor(
  directives: readonly Directive[],
  role: string | null
): readonly Directive[] {
  if (role !== INTERVIEWER) return directives
  return directives.filter((one) => one.name !== DONT_STOP)
}

export function stillWorking(running: readonly SubagentNode[], working: TurnWorking): boolean {
  return running.length > 0 || anyLiveShell(working)
}

async function runningUnder(agent: string): Promise<readonly SubagentNode[]> {
  const held = transcriptOf(agent)?.value ?? null
  if (held === null || held === "") return []
  try {
    return await createSubagentReader().forSeat(agent, held)
  } catch {
    return []
  }
}

export function holding(asking: readonly Putting[], answers: readonly string[] | null): Answer {
  if (answers === null) return LET_THROUGH
  for (let at = 0; at < asking.length; at += 1) {
    if (!endsYes(answers[at] ?? "")) continue
    return refusing(asking[at]?.statement ?? "")
  }
  return LET_THROUGH
}

function judging(root: string, agent: string, asked: string, turn: string): Answer {
  const seats = valuesOfType(root, SEAT) as readonly Valued[]
  const person = personIn(seats, agent)
  if (person === null) {
    noting(root, agent, GATES.person)
    return LET_THROUGH
  }
  const stated = directivesIn(valuedAt(root, PERSON, person).value[DIRECTIVES])
  const directives = keptFor(stated, roleIn(seats, agent))
  if (directives.length === 0) {
    noting(root, agent, GATES.rule)
    return LET_THROUGH
  }
  const asking = JUDGES.flatMap((judge) => judge({ asked, turn, directives }))
  const prompts = asking.map((one) => one.prompt)
  const answers = askedOf(root, modelOf(root, test.modelFamily), prompts)
  if (answers === null) {
    noting(root, agent, GATES.model, asking.length)
    return LET_THROUGH
  }
  const held = holding(asking, answers)
  noting(root, agent, held === LET_THROUGH ? GATES.clean : GATES.open, asking.length)
  recordingPositives(root, agent, asking, answers)
  return held
}

async function ran(): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${SCOPE.join("\n")}\n`)
    return ASIDE
  }
  const root = rootHere()
  if (root === null) return ASIDE
  const payload = payloadIn(await Bun.stdin.text())
  if (payload === null) {
    noting(root, null, GATES.payload)
    return ASIDE
  }
  const agent = seatIn(process.env)
  if (payload[ACTIVE] === true) {
    noting(root, agent, GATES.held)
    return ASIDE
  }
  if (agent === null) {
    noting(root, null, GATES.seat)
    return ASIDE
  }
  const running = await runningUnder(agent)
  const working = workingOf(agent)
  if (stillWorking(running, working)) {
    noting(root, agent, running.length > 0 ? GATES.subagent : GATES.shell)
    return ASIDE
  }
  const tail = readOwnTranscriptTail(agent)
  const turn = tail === null ? null : lastSaidIn(tail)
  if (tail === null || turn === null) {
    noting(root, agent, GATES.words)
    return ASIDE
  }
  try {
    return said(judging(root, agent, lastAskedIn(tail) ?? "", turn))
  } catch {
    noting(root, agent, GATES.threw)
    return ASIDE
  }
}

if (import.meta.main) process.exit(await ran())
