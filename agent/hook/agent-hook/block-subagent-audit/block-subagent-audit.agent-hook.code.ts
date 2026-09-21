import type { Answer } from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
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
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import {
  basenameOf,
  calledWords,
  segmentsOf,
} from "akasha/agent/hook/modules/shell-calls/shell-calls.module.code.ts"
import { SUBAGENT_MARK } from "akasha/agent/modules/read-record/read-record.module.code.ts"

const HOOK = "block-subagent-audit"

const NAMES = "agent_id"

const RUNS = "command"

const AKASHA = "akasha"

const AUDIT = "audit"

const CHECK = "--check"

const FILE_PATH = "--file-path"

const NARROWS: readonly string[] = [CHECK, FILE_PATH]

const REFUSAL = toldOf(HOOK, [
  `\`${AKASHA} ${AUDIT} ${CHECK}\` and \`${AKASHA} ${AUDIT} ${FILE_PATH}\` are refused where the`,
  "call carries a subagent's id, as this one does. A bare `akasha audit` is not refused — run",
  "that one instead.",
  "",
  `\`${FILE_PATH}\` IS NO ARGUMENT OF \`${AKASHA} ${AUDIT}\`. That command takes \`${CHECK} <slug>\`,`,
  "said again for each check, and no other flag, and no run narrows which files the checks see.",
  "A call naming it is written against a command that is gone, and the flag is named here only",
  "so a call carrying it is told what the command takes now.",
  "",
  "THE COST THIS REFUSAL ONCE NAMED IS GONE, and saying so is part of saying what is true. A run",
  `narrowed by \`${CHECK}\` asks \`audit-running.service\` for a round over HTTP exactly as a bare`,
  "run does, and judges no check in the process that calls it. Each figure here is measured",
  "rather than supposed:",
  "  the checks themselves     a Kubernetes job on a cluster node rather than this workstation",
  "  `audit-running.service`   38.5s of processor time and 778.1 MB over a round of 21m15s",
  "  the calling process       148 MB to 189 MB resident, 0.14s to 0.93s of processor time",
  "That last row is read off the runs recorded beside `audit.command.ts`. The service merges the",
  "asks it holds into one round for each commit and turns one round at a time, so several calls",
  "at once are one round however each of them narrowed, and a check whose verdict already",
  "answers for your commit costs no round at all.",
  "",
  "WHY THE REFUSAL REMAINS ANYWAY: what a hook refuses is Alan's to settle, and letting a",
  "narrowed run through changes what this hook refuses. The figures above are an argument to",
  "put to him rather than an argument for running one here. This refusal",
  "reads who calls rather than what the call asks for, so a cheap run is refused beside the",
  "costly ones.",
  "",
  "WHAT ANSWERS INSTEAD: `akasha audit` bare, which answers for the commit you are on and keeps",
  "each refusal whole beside the calling agent's page. Hand back what you wanted judged and let",
  "the seat run it narrowed, a seat being refused here by nothing. A change landing through",
  "`akasha change apply` is checked, so what you wrote that way is judged already.",
  "The tests, the typecheck and the linter all run over what the change carries, and refuse",
  "the change where one of them finds anything.",
])

export const SCOPE: readonly string[] = [
  `${HOOK} refuses a call running \`akasha audit\` with \`${CHECK}\` or \`${FILE_PATH}\` where a`,
  "subagent makes the call.",
  "  it runs at PreToolUse over Bash",
  "  a bare `akasha audit` is left through for anyone, subagent or seat",
  "  the seat that dispatched the subagent is not refused either way",
  "",
  `WHAT \`${FILE_PATH}\` IS NOW: no argument of \`${AKASHA} ${AUDIT}\` at all. That command takes`,
  `\`${CHECK}\` alone, and no run narrows which files the checks see. The flag is judged here so`,
  "a call carrying it is told what the command takes now.",
  "",
  "WHERE THE RULE CAME FROM AND WHAT IS LEFT OF IT: each of these two flags once judged in the",
  "process that called it, so several at once were several audits holding this machine's",
  "memory. Neither does now. A run narrowed by `--check` asks `audit-running.service` for a",
  "round over HTTP as a bare run does, that service merges the asks it holds into one round for",
  "each commit, and the checks run as a Kubernetes job on a cluster node rather than here. What",
  "is left is that a hook refuses what Alan settled it would refuse, so letting a narrowed run",
  "through is his call to make rather than this hook's to drop.",
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

async function ranAsJudging(): Promise<number> {
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

async function ran(): Promise<number> {
  return await ranAsJudging()
}

if (import.meta.main) process.exit(await ran())
