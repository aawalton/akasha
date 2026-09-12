import { realpathSync } from "node:fs"
import {
  type Answer,
  ASIDE,
  LET_THROUGH,
  payloadIn,
  refusing,
  SCOPE_FLAG,
  said,
} from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import { readOwnTranscriptTail } from "akasha/agents/io-probe/io-probe.module.code.ts"
import { lastAskedIn, lastSaidIn } from "akasha/agents/last-said/last-said.module.code.ts"
import { endsYes } from "akasha/agents/models/modules/answer/model-answer.module.code.ts"
import {
  directiveKept,
  directivesIn,
  type Putter,
  type Putting,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { directiveKept as test } from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.ts"
import { noCommentaryKept } from "akasha/agents/models/tests/pages/no-commentary-kept/no-commentary-kept.model-test.code.ts"
import { oneAtATimeKept } from "akasha/agents/models/tests/pages/one-at-a-time-kept/one-at-a-time-kept.model-test.code.ts"
import { stillWaitingKept } from "akasha/agents/models/tests/pages/still-waiting-kept/still-waiting-kept.model-test.code.ts"
import { subagentBriefKept } from "akasha/agents/models/tests/pages/subagent-brief-kept/subagent-brief-kept.model-test.code.ts"
import {
  askedOf,
  modelOf,
} from "akasha/agents/models/tests/running/model-test-running.module.code.ts"
import { seatIn } from "akasha/agents/read-record/read-record.module.code.ts"
import { transcriptOf } from "akasha/agents/seats/modules/transcript-path/seat-transcript-path.module.code.ts"
import {
  createSubagentReader,
  type SubagentNode,
} from "akasha/code/editor/extension/subagent-reading/subagent-reading.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { valuedAt, valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  anyLiveShell,
  type TurnWorking,
  workingOf,
} from "akasha/seat-system/seat-observation/seat-turn/turn-working/turn-working.module.code.ts"

const HOOK = "keep-alan-directives"

const ACTIVE = "stop_hook_active"

const SEAT = "seat"

const PERSON = "person"

const ID = "id"

const DIRECTIVES = "directives"

const TOLD = "This is what you wrote to Alan, and it breaks a rule he holds. Write it again."

export const JUDGES: readonly Putter[] = [
  directiveKept,
  oneAtATimeKept,
  noCommentaryKept,
  subagentBriefKept,
  stillWaitingKept,
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
  "  what a subagent wrote.",
  "  any tool call, and any event but `Stop`.",
  "",
  "A rule the model answers yes on comes back in that rule's own words.",
  "A model reached by no call leaves the turn unjudged.",
]

export function personIn(listed: readonly Valued[], agent: string): string | null {
  for (const one of listed) {
    if (one.value[ID] !== agent) continue
    const held = one.value[PERSON]
    return typeof held === "string" && held !== "" ? held : null
  }
  return null
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
    return refusing(`${TOLD}\n\n${asking[at]?.statement ?? ""}`)
  }
  return LET_THROUGH
}

function judging(root: string, agent: string, asked: string, turn: string): Answer {
  const person = personIn(valuesOfType(root, SEAT) as readonly Valued[], agent)
  if (person === null) return LET_THROUGH
  const directives = directivesIn(valuedAt(root, PERSON, person).value[DIRECTIVES])
  if (directives.length === 0) return LET_THROUGH
  const asking = JUDGES.flatMap((judge) => judge({ asked, turn, directives }))
  const prompts = asking.map((one) => one.prompt)
  return holding(asking, askedOf(root, modelOf(root, test.modelFamily), prompts))
}

async function ran(): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${SCOPE.join("\n")}\n`)
    return ASIDE
  }
  const payload = payloadIn(await Bun.stdin.text())
  if (payload === null || payload[ACTIVE] === true) return ASIDE
  const agent = seatIn(process.env)
  if (agent === null) return ASIDE
  if (stillWorking(await runningUnder(agent), workingOf(agent))) return ASIDE
  const tail = readOwnTranscriptTail(agent)
  const turn = tail === null ? null : lastSaidIn(tail)
  if (tail === null || turn === null) return ASIDE
  try {
    return said(
      judging(rootOf(realpathSync(import.meta.path)), agent, lastAskedIn(tail) ?? "", turn)
    )
  } catch {
    return ASIDE
  }
}

if (import.meta.main) process.exit(await ran())
