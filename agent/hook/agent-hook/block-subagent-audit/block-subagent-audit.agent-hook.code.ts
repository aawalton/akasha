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
  READ_AS_BASH,
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

const NARROWS: readonly string[] = [FILE_PATH]

const REFUSAL = toldOf(HOOK, [
  `\`${FILE_PATH}\` IS NO ARGUMENT OF \`${AKASHA} ${AUDIT}\`, and this call carries a subagent's`,
  `id. That command takes \`${CHECK} <slug>\`, said again for each check, and no other flag, and`,
  "no run narrows which files the checks see. A call naming it is written against a command",
  "that is gone.",
  "",
  "NAME THE CHECKS YOU WANTED WITH `--check` AND RUN IT. That call is refused here by nothing,",
  `and neither is a bare \`${AKASHA} ${AUDIT}\`. Both ask \`audit-running.service\` for a round`,
  "over HTTP and judge no check in the process that calls them.",
  "",
  "WHAT EITHER COSTS THIS MACHINE, each figure measured rather than supposed:",
  "  the checks themselves     a Kubernetes job on a cluster node rather than this workstation",
  "  `akasha audit --check`    162.9 MB peak resident and 0.55s of processor time over 1m36s",
  "  `akasha audit` bare       164.7 MB peak resident and 4.42s of processor time over 25m47s",
  "  `audit-running.service`   38.5s of processor time and 778.1 MB over a round of 21m15s",
  "",
  "The service merges the asks it holds into one round for each commit and turns one round at a",
  "time, so several calls at once are one round however each of them narrowed, and a check",
  "whose verdict already answers for your commit costs no round at all. A change landing",
  "through `akasha change apply` is checked, so what you wrote that way is judged already.",
])

export const SCOPE: readonly string[] = [
  `${HOOK} refuses a call running \`akasha audit\` with \`${FILE_PATH}\` where a subagent makes`,
  "the call.",
  "  it runs at PreToolUse over Bash",
  "  `akasha audit` and `akasha audit --check <slug>` are left through for anyone",
  "  the seat that dispatched the subagent is not refused either way",
  "",
  `WHAT \`${FILE_PATH}\` IS: no argument of \`${AKASHA} ${AUDIT}\` at all. That command takes`,
  `\`${CHECK}\` alone, and no run narrows which files the checks see. The flag is judged here so`,
  "a call carrying it is told what the command takes now rather than meeting a refusal over a",
  "word the argument reader does not know.",
  "",
  "WHY `--check` IS REFUSED BY NOTHING: a run narrowed by it asks `audit-running.service` for a",
  "round over HTTP as a bare run does and judges no check where it is called, that service",
  "merges the asks it holds into one round for each commit and turns one round at a time, and",
  "the checks run as a Kubernetes job on a cluster node rather than here. Several narrowed",
  "calls at once are one round rather than several audits holding this machine's memory.",
  "",
  "HOW A SUBAGENT IS TOLD FROM THE SEAT: the payload names a subagent under",
  `  \`${NAMES}\`, and a call the seat makes carries no such name.`,
  "  This is the same reading `name-subagent` makes over the same event and the same tool, and",
  "  the read record is kept apart by it — a seat's readings are filed under a plain id and a",
  `  subagent's under that id, the mark \`${SUBAGENT_MARK}\` and its own.`,
  "",
  "A PREFIX THAT ONLY RUNS THE CALL BEHIND IT IS STEPPED OVER, so",
  "`timeout 900 akasha audit --file-path checks` is the call and is refused. A name set before",
  "the call is not the call.",
  "",
  "WHAT IS LEFT ALONE:",
  "  a bare `akasha audit`, which asks the service rather than judging where it is called",
  "  `akasha audit --check <slug>`, which asks the service the same way",
  "  every akasha command but `audit`, none of which is judged here",
  "  a call the seat itself makes, which the payload names no subagent for",
  "",
  "A PAYLOAD THIS CANNOT READ judges nothing and exits saying so, and the dispatch passes the",
  "call rather than refusing it. A payload that parses and is not an object is one this cannot",
  "read.",
  "",
  ...READ_AS_BASH,
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  a call another program builds — `xargs`, a script file",
  "  a call behind a prefix `shell-calls` does not name, which hides it as `xargs` does",
  "  a call named by a variable the line never sets, which is read as that variable",
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

export function judgedFor(payload: Record<string, unknown>): Answer {
  try {
    if (!underASubagent(payload)) return LET_THROUGH
    const runs = inputIn(payload)?.[RUNS]
    if (typeof runs !== "string" || runs === "") return LET_THROUGH
    return narrowedBy(runs) ? refusing(REFUSAL) : LET_THROUGH
  } catch {
    return LET_THROUGH
  }
}

export function answerFor(raw: string): Answer {
  const payload = payloadIn(raw)
  if (payload === null) return unreadable(HOOK, "the hook payload would not read")
  return judgedFor(payload)
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
