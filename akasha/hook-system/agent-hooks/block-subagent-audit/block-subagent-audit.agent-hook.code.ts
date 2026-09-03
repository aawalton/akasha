import { SUBAGENT_MARK } from "@akasha/command-system/reading"
import type { Answer } from "../../hook-answer/hook-answer.module.code.ts"
import {
  ASIDE,
  inputIn,
  LET_THROUGH,
  payloadIn,
  refusing,
  SCOPE_FLAG,
  said,
  toldOf,
} from "../../hook-answer/hook-answer.module.code.ts"
import { basenameOf, calledWords, segmentsOf } from "../../shell-calls/shell-calls.module.code.ts"

const HOOK = "block-subagent-audit"

const NAMES = "agent_id"

const RUNS = "command"

const AKASHA = "akasha"

const AUDIT = "audit"

const REFUSAL = toldOf(HOOK, [
  "`akasha audit` is the coordinating seat's to run, and this call carries a subagent's id.",
  "",
  "WHY, and the reason is not what the command writes. One audit peaks near 17 GB of memory for",
  "about fifteen minutes. What is barred is what a run COSTS while it holds the machine, rather",
  "than what a run changes — so `akasha audit --help` settles nothing here. Its note that the",
  "command writes nothing is true and is beside the point, and reasoning from it to a run being",
  "harmless is the reasoning this refusal exists to end.",
  "",
  "`--check` narrows which checks run and never which files they see, so a narrowed run still",
  "walks every file the index names and holds the memory a full one holds. Naming one check",
  "makes a run no cheaper. Several audits at once take the machine and cost the whole swarm its",
  "model service, which is a cost paid by every other agent rather than by this call.",
  "",
  "WHO RUNS IT: the seat that dispatched you, in the background, after a batch of mechanical",
  "changes rather than after each one. Hand back what you wanted judged and let it run there.",
  "",
  "WHAT ANSWERS INSTEAD, each scoped to what you touched:",
  "  akasha test --file-path <path>   the tests under one path",
  "  akasha lint --file-path <path>   the linter over one path",
  "",
  "A change landing through the akasha commands is checked as it lands, so what you wrote that",
  "way is judged already. An audit re-judges the whole tree rather than your change.",
])

export const SCOPE: readonly string[] = [
  `${HOOK} refuses a call that runs \`akasha audit\` where a subagent makes the call.`,
  "  it runs at PreToolUse over Bash",
  "  the seat that dispatched the subagent is not refused, and runs the audit as before",
  "",
  "WHERE THE RULE COMES FROM: one audit peaks near 17 GB for about fifteen minutes, so several",
  "at once cost the swarm its model service. The bar is the memory a run holds rather than",
  "anything a run writes, and the command's own help says only that it writes nothing. A",
  "subagent reading that help and reasoning to a read-only run being safe reasons correctly",
  "from what it was told and lands on the wrong answer, so the refusal says the cost outright.",
  "",
  "HOW A SUBAGENT IS TOLD FROM THE SEAT: the payload names a subagent under",
  `  \`${NAMES}\`, and a call the seat makes carries no such name.`,
  "  This is the same reading `name-subagent` makes over the same event and the same tool, and",
  "  the read record is kept apart by it — a seat's readings are filed under a plain id and a",
  `  subagent's under that id, the mark \`${SUBAGENT_MARK}\` and its own.`,
  "",
  "A PREFIX THAT ONLY RUNS THE CALL BEHIND IT IS STEPPED OVER, so `timeout 900 akasha audit` is",
  "the call and is refused. A name set before the call is not the call.",
  "",
  "WHAT IS LEFT ALONE:",
  "  every akasha command but `audit`, none of which is judged here",
  "  a call the seat itself makes, which the payload names no subagent for",
  "  a payload that will not read, over which nothing is judged and nothing is refused",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  a call another program builds — `sh -c`, `xargs`, a script file",
  "  a call behind a prefix `shell-calls` does not name, which hides it as `sh -c` does",
  "  a call inside a quoted run, which the dequoting step takes out before the cut",
  "  a harness that stops naming the subagent, under which this stands aside and refuses nobody",
  "",
  "The absence of a case from this list is NOT a finding that it is covered. It is unexamined.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this is said:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

export function auditIn(segment: string): boolean {
  const words = calledWords(segment)
  const head = words[0]
  if (head === undefined || basenameOf(head) !== AKASHA) return false
  for (const one of words.slice(1)) {
    if (one.startsWith("-")) continue
    return one === AUDIT
  }
  return false
}

export function auditedIn(command: string): boolean {
  return segmentsOf(command).some(auditIn)
}

export function underASubagent(payload: Record<string, unknown>): boolean {
  const held = payload[NAMES]
  return typeof held === "string" && held.trim() !== ""
}

export function answerFor(raw: string): Answer {
  const payload = payloadIn(raw)
  if (payload === null) return LET_THROUGH
  if (!underASubagent(payload)) return LET_THROUGH
  const runs = inputIn(payload)?.[RUNS]
  if (typeof runs !== "string" || runs === "") return LET_THROUGH
  return auditedIn(runs) ? refusing(REFUSAL) : LET_THROUGH
}

export async function ranAsJudging(): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${SCOPE.join("\n")}\n`)
    return ASIDE
  }
  try {
    return said(answerFor(await Bun.stdin.text()))
  } catch {
    return ASIDE
  }
}

export async function ran(): Promise<number> {
  return await ranAsJudging()
}

if (import.meta.main) process.exit(await ran())
