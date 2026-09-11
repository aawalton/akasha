import { realpathSync } from "node:fs"
import { join } from "node:path"
import {
  type Answer,
  ASIDE,
  LET_THROUGH,
  payloadIn,
  refusing,
  SCOPE_FLAG,
  said,
} from "akasha/agents/hooks/hook-answer/hook-answer.module.code.ts"
import { opensYes } from "akasha/agents/models/modules/answer/model-answer.module.code.ts"
import {
  type Directive,
  directiveKept,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { directiveKept as test } from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.ts"
import {
  createSubagentReader,
  type SubagentNode,
} from "akasha/code-system/editor/extension/subagent-reading/subagent-reading.module.code.ts"
import { seatIn } from "akasha/commands/modules/reading/reading.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { valuedAt, valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { readOwnTranscriptTail } from "akasha/seat-system/agent-io-probe/agent-io-probe.module.code.ts"
import {
  lastAskedIn,
  lastSaidIn,
} from "akasha/seat-system/agent-last-said/agent-last-said.module.code.ts"
import {
  anyLiveShell,
  type TurnWorking,
  workingOf,
} from "akasha/seat-system/seat-observation/seat-turn/turn-working/turn-working.module.code.ts"
import { transcriptOf } from "akasha/seat-system/seat-transcript-path/seat-transcript-path.module.code.ts"
import { ran as spawned } from "akasha/utils/run/running/running.module.code.ts"

const HOOK = "keep-alan-directives"

const ACTIVE = "stop_hook_active"

const SEAT = "seat"

const PERSON = "person"

const MODULE = "module"

const FAMILY = "model-family"

const ASKER = "model-asking"

const CODE = "code"

const TS = "ts"

const ID = "id"

const NAME = "name"

const ACT = "act"

const WARRANT = "warrant"

const AIDS = "aids"

const DIRECTIVES = "directives"

const TOLD = "This is what you wrote to Alan, and it breaks a rule he holds. Write it again."

export type Valued = { readonly path: string; readonly value: Record<string, unknown> }

export const SCOPE: readonly string[] = [
  `${HOOK} judges the last words an agent wrote to Alan, as that agent's turn ends.`,
  "",
  "It catches:",
  "  the closing words of a turn, put to a model against each rule the seat's person states.",
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

export function directivesIn(given: unknown): readonly Directive[] {
  if (!Array.isArray(given)) return []
  const found: Directive[] = []
  for (const one of given) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const held = one as Record<string, unknown>
    const name = held[NAME]
    const act = held[ACT]
    const warrant = held[WARRANT]
    const aids = held[AIDS]
    if (typeof name !== "string" || typeof act !== "string" || typeof warrant !== "string") continue
    if (!Array.isArray(aids) || aids.some((aid) => typeof aid !== "string")) continue
    found.push({ name, act, warrant, aids: aids as readonly string[] })
  }
  return found
}

function modelOf(root: string): string {
  const slug = test.modelFamily.slice(test.modelFamily.indexOf("/") + 1)
  const held = valuedAt(root, FAMILY, slug).value[NAME]
  if (typeof held !== "string") throw new Error(`\`${slug}\` names no model a call can reach`)
  return held
}

function askedOf(
  root: string,
  model: string,
  prompts: readonly string[]
): readonly string[] | null {
  const asker = besideAt(valuedAt(root, MODULE, ASKER).path, CODE, TS)
  if (asker === null) return null
  const answered = spawned(["bun", "run", join(root, asker)], {
    stdin: new TextEncoder().encode(JSON.stringify({ model, prompts })),
    cwd: root,
  })
  if (answered.code !== 0) return null
  let held: unknown
  try {
    held = JSON.parse(answered.out)
  } catch {
    return null
  }
  const answers =
    typeof held === "object" && held !== null ? (held as { answers?: unknown }).answers : undefined
  if (!Array.isArray(answers) || answers.some((one) => typeof one !== "string")) return null
  return answers as readonly string[]
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

export function judging(root: string, agent: string, asked: string, turn: string): Answer {
  const person = personIn(valuesOfType(root, SEAT) as readonly Valued[], agent)
  if (person === null) return LET_THROUGH
  const directives = directivesIn(valuedAt(root, PERSON, person).value[DIRECTIVES])
  if (directives.length === 0) return LET_THROUGH
  const asking = directiveKept({ asked, turn, directives })
  const answers = askedOf(
    root,
    modelOf(root),
    asking.map((one) => one.prompt)
  )
  if (answers === null) return LET_THROUGH
  for (let at = 0; at < asking.length; at += 1) {
    if (!opensYes(answers[at] ?? "")) continue
    return refusing(`${TOLD}\n\n${asking[at]?.statement ?? ""}`)
  }
  return LET_THROUGH
}

export async function ran(): Promise<number> {
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
