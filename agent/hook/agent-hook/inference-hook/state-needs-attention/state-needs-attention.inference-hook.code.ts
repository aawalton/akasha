import { spawn } from "node:child_process"
import {
  lineFor,
  personIn,
  rootHere,
  runningUnder,
  stillWorking,
  type Valued,
} from "akasha/agent/hook/agent-hook/inference-hook/keep-alan-directives/keep-alan-directives.inference-hook.code.ts"
import {
  ASIDE,
  payloadIn,
  SCOPE_FLAG,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { endsYes } from "akasha/agent/model/modules/answer/model-answer.module.code.ts"
import {
  type Answers,
  askedOf,
  modelOf,
} from "akasha/agent/model/test/modules/running/model-test-running.module.code.ts"
import { promptFor } from "akasha/agent/model/test/pages/needs-attention/needs-attention.model-test.code.ts"
import { needsAttention as test } from "akasha/agent/model/test/pages/needs-attention/needs-attention.model-test.ts"
import { readOwnTranscriptTail } from "akasha/agent/modules/io-probe/io-probe.module.code.ts"
import { lastAskedIn, lastSaidIn } from "akasha/agent/modules/last-said/last-said.module.code.ts"
import { seatIn } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { setNeedsAttention } from "akasha/agent/seat/observation/seat-turn/modules/needs-attention/needs-attention.module.code.ts"
import { workingOf } from "akasha/agent/seat/observation/seat-turn/modules/turn-working/turn-working.module.code.ts"
import { recorded } from "akasha/check/modules/cost/check-cost.module.code.ts"
import {
  valuedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const HOOK = "state-needs-attention"

const HOOK_TYPE = "inference-hook"

const STOP_GATES = "stop-gates"

const SEAT = "seat"

const AT = "hook_event_name"

const STOP = "Stop"

const PROMPT = "UserPromptSubmit"

export const JUDGE_FLAG = "--judge"

export const GATES = {
  payload: "no payload read",
  seat: "no seat in the environment",
  subagent: "a subagent still to report",
  shell: "a background command still to report",
  words: "no words closing the turn",
  person: "a seat answering to no person",
  model: "no model a call could reach",
  begun: "a turn begun before the answer came",
  threw: "a throw nothing else caught",
  asks: "asks Alan for something",
  tells: "asks Alan for nothing",
} as const

export const SCOPE: readonly string[] = [
  `${HOOK} writes whether the last words an agent wrote ask Alan for something.`,
  "  it runs at Stop and UserPromptSubmit, over no tool, and refuses nothing",
  "  at Stop it starts a judge apart and returns, so the stop waits on no model",
  "  at UserPromptSubmit it clears the seat's `needs-attention`",
  "",
  "WHERE THE RULE COMES FROM: a seat whose turn asked Alan for something is drawn red, over",
  "waiting, ready and idle, so Alan sees which seats wait on him. Every hook at an event",
  "shares one fifteen-second ceiling, and a judged stop already spends most of it, so the",
  "judge runs apart from the stop.",
  "",
  "WHAT IS WRITTEN:",
  "  the seat's `needs-attention`, true where the model answers yes and false otherwise.",
  "  a line beside this hook's page saying how far each judge got.",
  "",
  "WHAT IS WRITTEN FALSE:",
  "  a turn ending with a subagent or a background command still to report",
  "  a turn the agent closed with no words",
  "  a seat answering to no person",
  "  a turn no model call reached",
  "",
  "WHAT IS LEFT ALONE:",
  "  a call naming no seat, which nothing can be written against",
  "  a turn begun before the model answered, whose own stop is judged again",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  a stop another hook refused, since the dispatch returns at the first refusal",
  "  a turn interrupted with no prompt after it, which keeps the value it had",
  "  what a subagent wrote",
  "",
  "The absence of a case from this list is NOT a finding that it is covered. It is unexamined.",
  "",
  `Printed by \`${HOOK}.inference-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this is said:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

export type Settled = {
  readonly gate: string
  readonly attention: boolean | null
  readonly put: number
  readonly answered: number
}

export function attentionIn(answers: Answers | null): boolean | null {
  const said = answers?.[0]
  if (said === undefined || said === null) return null
  return endsYes(said)
}

function noting(root: string, seat: string | null, one: Settled | string): undefined {
  const settled = typeof one === "string" ? { gate: one, put: 0, answered: 0 } : one
  try {
    const line = lineFor(settled.gate, settled.put, settled.answered, new Date(), seat)
    recorded(root, valuedAt(root, HOOK_TYPE, HOOK).path, line, STOP_GATES)
  } catch {}
}

function cleared(gate: string): Settled {
  return { gate, attention: false, put: 0, answered: 0 }
}

async function settledFor(root: string, agent: string): Promise<Settled> {
  const running = await runningUnder(agent)
  if (stillWorking(running, workingOf(agent))) {
    return cleared(running.length > 0 ? GATES.subagent : GATES.shell)
  }
  const tail = readOwnTranscriptTail(agent)
  const turn = tail === null ? null : lastSaidIn(tail)
  if (tail === null || turn === null) return cleared(GATES.words)
  if (personIn(valuesOfType(root, SEAT) as readonly Valued[], agent) === null) {
    return cleared(GATES.person)
  }
  const prompt = promptFor(lastAskedIn(tail) ?? "", turn)
  const attention = attentionIn(askedOf(root, modelOf(root, test.modelFamily), [prompt]))
  if (attention === null) return { gate: GATES.model, attention: false, put: 1, answered: 0 }
  if (workingOf(agent).activeTurn === true) {
    return { gate: GATES.begun, attention: null, put: 1, answered: 1 }
  }
  return { gate: attention ? GATES.asks : GATES.tells, attention, put: 1, answered: 1 }
}

async function judged(env: Readonly<Record<string, string | undefined>>): Promise<number> {
  const root = rootHere()
  if (root === null) return ASIDE
  const agent = seatIn(env)
  if (agent === null) {
    noting(root, null, GATES.seat)
    return ASIDE
  }
  try {
    const settled = await settledFor(root, agent)
    if (settled.attention !== null) setNeedsAttention(agent, settled.attention)
    noting(root, agent, settled)
  } catch {
    noting(root, agent, GATES.threw)
  }
  return ASIDE
}

function judgingApart(root: string): undefined {
  const child = spawn(process.execPath, [import.meta.path, JUDGE_FLAG], {
    cwd: root,
    detached: true,
    stdio: "ignore",
    env: process.env,
  })
  child.unref()
  return undefined
}

async function ran(): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${SCOPE.join("\n")}\n`)
    return ASIDE
  }
  if (Bun.argv[2] === JUDGE_FLAG) return await judged(process.env)
  const root = rootHere()
  if (root === null) return ASIDE
  const payload = payloadIn(await Bun.stdin.text())
  if (payload === null) {
    noting(root, null, GATES.payload)
    return ASIDE
  }
  const agent = seatIn(process.env)
  if (agent === null) return ASIDE
  try {
    if (payload[AT] === PROMPT) setNeedsAttention(agent, false)
    if (payload[AT] === STOP) judgingApart(root)
  } catch {
    noting(root, agent, GATES.threw)
  }
  return ASIDE
}

if (import.meta.main) process.exit(await ran())
