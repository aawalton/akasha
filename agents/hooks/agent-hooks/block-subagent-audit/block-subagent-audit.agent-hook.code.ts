import type { Answer } from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import {
  ASIDE,
  inputIn,
  LET_THROUGH,
  payloadIn,
  refusing,
  SCOPE_FLAG,
  said,
  toldOf,
  unreadable,
} from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import {
  basenameOf,
  calledWords,
  segmentsOf,
} from "akasha/agents/hooks/shell-calls/shell-calls.module.code.ts"
import { SUBAGENT_MARK } from "akasha/agents/read-record/read-record.module.code.ts"

const HOOK = "block-subagent-audit"

const NAMES = "agent_id"

const RUNS = "command"

const AKASHA = "akasha"

const AUDIT = "audit"

const CHECK = "--check"

const FILE_PATH = "--file-path"

const NARROWS: readonly string[] = [CHECK, FILE_PATH]

const REFUSAL = toldOf(HOOK, [
  "`akasha audit --check` and `akasha audit --file-path` judge in this process, and this call",
  "carries a subagent's id. A bare `akasha audit` is not refused — run that one instead.",
  "",
  "WHAT A BARE RUN DOES NOW: it asks `audit-running.service` for a round rather than judging",
  "here. systemd runs one instance of that unit however many ask, so several calls at once are",
  "one round, and a check whose verdict already answers for your commit costs no round at all.",
  "",
  "WHY THESE TWO ARE STILL REFUSED, and the reason is not what the command writes. Each judges",
  "in the process that calls it, so several at once really are several audits. What is barred",
  "is what a run COSTS while it holds the machine, rather than what a run changes — so",
  "`akasha audit --help` settles nothing here. Its note that the command writes nothing is true",
  "and is beside the point, and reasoning from it to a run being harmless is the reasoning this",
  "refusal exists to end.",
  "",
  "WHAT A RUN COSTS, each figure measured rather than supposed:",
  "  a whole round                           20.4 GB peak, 55 checks, on 2026-09-11",
  "  --check folder-matches-a-shape          1.5 GB, 12s, one check over 120410 files",
  "  the same, --file-path <one folder>      0.6 GB, 3s, one check over 25 files",
  "",
  "`--check` narrows which checks run rather than which files they see, and it is which checks",
  "run that sets the cost, so one cheap check over every file is cheap and `typecheck` alone is",
  "most of a whole run. `--file-path` narrows the files as well. Neither is an argument for",
  "running one here: this refusal reads who calls rather than what the call asks for, so a cheap",
  "run is refused alongside the costly ones. Several at once take the machine and cost the",
  "whole swarm its model service, paid by every other agent rather than by this call.",
  "",
  "WHO USES THESE TWO: a seat landing a new check. A check that runs at no phase runs no other",
  "way, and `--file-path` is what keeps that loop cheap while the check is measured. Hand back",
  "what you wanted judged and let it run there.",
  "",
  "WHAT ANSWERS INSTEAD: `akasha audit` bare, which answers for the commit you are on and keeps",
  "each refusal whole beside the calling agent's page. A change landing through",
  "`akasha change draft` and `akasha change apply` is checked, so what you wrote that way is",
  "judged already. The tests, the typecheck and the linter all run over what the change carries,",
  "and refuse the change where one of them finds anything.",
])

export const SCOPE: readonly string[] = [
  `${HOOK} refuses a call running \`akasha audit\` with \`${CHECK}\` or \`${FILE_PATH}\` where a`,
  "subagent makes the call.",
  "  it runs at PreToolUse over Bash",
  "  a bare `akasha audit` is left through for anyone, subagent or seat",
  "  the seat that dispatched the subagent is not refused either way",
  "",
  "WHERE THE RULE COMES FROM: a bare run asks `audit-running.service` for a round, and systemd",
  "runs one instance of that unit however many ask, so several calls at once are one round and",
  "one peak. Each of these two flags judges in the process that calls it instead, so several at",
  "once are several audits and cost the swarm its model service. The bar is the memory a run",
  "holds rather than anything a run writes, and the command's own help says only that it writes",
  "nothing. A subagent reading that help and reasoning to a read-only run being safe reasons",
  "correctly from what it was told and lands on the wrong answer, so the refusal says the cost",
  "outright.",
  "",
  "HOW A SUBAGENT IS TOLD FROM THE SEAT: the payload names a subagent under",
  `  \`${NAMES}\`, and a call the seat makes carries no such name.`,
  "  This is the same reading `name-subagent` makes over the same event and the same tool, and",
  "  the read record is kept apart by it — a seat's readings are filed under a plain id and a",
  `  subagent's under that id, the mark \`${SUBAGENT_MARK}\` and its own.`,
  "",
  "A PREFIX THAT ONLY RUNS THE CALL BEHIND IT IS STEPPED OVER, so",
  "`timeout 900 akasha audit --check typecheck` is the call and is refused. A name set before",
  "the call is not the call.",
  "",
  "WHAT IS LEFT ALONE:",
  "  a bare `akasha audit`, which asks the service rather than judging where it is called",
  "  every akasha command but `audit`, none of which is judged here",
  "  a call the seat itself makes, which the payload names no subagent for",
  "",
  "A PAYLOAD THIS CANNOT READ judges nothing and exits so the dispatch refuses the call, rather",
  "than standing aside. A payload that parses and is not an object is one this cannot read.",
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

export function narrowedIn(segment: string): boolean {
  const words = calledWords(segment)
  const head = words[0]
  if (head === undefined || basenameOf(head) !== AKASHA) return false
  const after = words.slice(1)
  const at = after.findIndex((one) => !one.startsWith("-"))
  if (at < 0 || after[at] !== AUDIT) return false
  return after.slice(at + 1).some((one) => NARROWS.includes(one))
}

export function narrowedBy(command: string): boolean {
  return segmentsOf(command).some(narrowedIn)
}

export function underASubagent(payload: Record<string, unknown>): boolean {
  const held = payload[NAMES]
  return typeof held === "string" && held.trim() !== ""
}

export function answerFor(raw: string): Answer {
  const payload = payloadIn(raw)
  if (payload === null) return unreadable(HOOK, "the hook payload would not read")
  if (!underASubagent(payload)) return LET_THROUGH
  const runs = inputIn(payload)?.[RUNS]
  if (typeof runs !== "string" || runs === "") return LET_THROUGH
  return narrowedBy(runs) ? refusing(REFUSAL) : LET_THROUGH
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
