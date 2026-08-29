import {
  ACTING_NAMED,
  SUBAGENT_MARK,
  seatIn,
} from "../../../command-system/reading/reading.module.code.ts"
import type { Answer } from "../../hook-answer/hook-answer.module.code.ts"
import {
  ASIDE,
  inputIn,
  payloadIn,
  rewriting,
  SCOPE_FLAG,
  STANDING_ASIDE,
  said,
} from "../../hook-answer/hook-answer.module.code.ts"

const HOOK = "name-subagent"

const AT = "PreToolUse"

const NAMES = "agent_id"

const RUNS = "command"

const SPELLABLE = /^[A-Za-z0-9_-]+$/

export const SCOPE: readonly string[] = [
  `${HOOK} names a subagent to the commands it runs, and refuses nothing.`,
  "  it runs at PreToolUse over Bash, and every call reaches the harness either way",
  `  the name is the seat's own id, the mark \`${SUBAGENT_MARK}\`, and the id the payload gives`,
  `  the call runs with \`export ${ACTING_NAMED}='<name>'\` and a newline before it`,
  "",
  "WHERE THE RULE COMES FROM: a read record is kept under whoever read, and a read is what lets",
  "a write stand. A subagent is handed its seat's environment whole, so without this it reads and",
  "writes under its seat's own name, and one agent's read authorises another agent's write. The",
  "name written here is what tells a seat's subagents apart, and apart from the seat.",
  "",
  "WHAT IS CHANGED:",
  "  the `command` of the Bash call, and nothing else the call carries.",
  "  A name is honoured further on only where the seat's own id begins it, so what is written",
  "    here reaches no other seat's record however the payload is spelled.",
  "",
  "WHAT IS LEFT ALONE:",
  "  a payload naming no subagent, which is the seat's own call",
  "  a name that comes out as the seat itself, which names nobody new",
  `  a name holding anything but ${SPELLABLE.source}, which would break out of the quoting`,
  "  a call carrying no command, and a payload that will not read",
  "",
  "This hook changes what a call runs rather than judging it. It refuses nothing and fails",
  "nothing: every path through it stands aside, and the worst it does is leave a call unnamed.",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  every tool but Bash, over which this is not registered",
  "  a command another program builds after this one ran, which carries what it is handed",
  "  a shell that reads no `export`, which is not what the harness runs",
  "  a subagent the harness names nothing for, which is recorded under its seat as before",
  "",
  "The absence of a path from this list is NOT a finding that it is named. It is unexamined.",
  "A call reaching the akasha commands unnamed is recorded under the seat, which is the shape",
  "this hook exists to end, not a gap that closes by widening what is written into a command.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this stands:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

export function spellable(name: string): boolean {
  return SPELLABLE.test(name)
}

export function exporting(name: string, command: string): string {
  return `export ${ACTING_NAMED}='${name}'\n${command}`
}

export function actingIn(
  env: Readonly<Record<string, string | undefined>>,
  payload: Record<string, unknown>
): string | null {
  const seat = seatIn(env)
  if (seat === null) return null
  const held = payload[NAMES]
  const one = typeof held === "string" && held.trim() !== "" ? held.trim() : null
  return one === null ? seat : `${seat}${SUBAGENT_MARK}${one}`
}

export function calledWith(
  env: Readonly<Record<string, string | undefined>>,
  payload: Record<string, unknown>
): Record<string, unknown> | null {
  const acting = actingIn(env, payload)
  if (acting === null || acting === seatIn(env)) return null
  if (!spellable(acting)) return null
  const input = inputIn(payload) ?? {}
  const standing = input[RUNS]
  if (typeof standing !== "string" || standing === "") return null
  return { ...input, [RUNS]: exporting(acting, standing) }
}

export function answerFor(env: Readonly<Record<string, string | undefined>>, raw: string): Answer {
  const payload = payloadIn(raw)
  if (payload === null) return STANDING_ASIDE
  const call = calledWith(env, payload)
  return call === null ? STANDING_ASIDE : rewriting(AT, call)
}

export async function ranAsNaming(
  env: Readonly<Record<string, string | undefined>>
): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${SCOPE.join("\n")}\n`)
    return ASIDE
  }
  try {
    return said(answerFor(env, await Bun.stdin.text()))
  } catch {
    return ASIDE
  }
}

if (import.meta.main) {
  process.exit(await ranAsNaming(process.env))
}
