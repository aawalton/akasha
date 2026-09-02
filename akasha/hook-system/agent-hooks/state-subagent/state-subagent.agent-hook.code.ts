import { seatIn } from "@akasha/command-system/reading"
import { rootOf } from "@akasha/command-system/rooting"
import { puttingUp, seatNamedIn, takingDown } from "@akasha/seat-system/subagent-presence"
import { ASIDE, payloadIn, SCOPE_FLAG } from "../../hook-answer/hook-answer.module.code.ts"

const HOOK = "state-subagent"

const STARTING = "SubagentStart"

const STOPPING = "SubagentStop"

const AT = "hook_event_name"

const NAMES = "agent_id"

const KIND = "agent_type"

export type Act =
  | { readonly act: "put"; readonly own: string; readonly dispatchedAs: string }
  | { readonly act: "take"; readonly own: string }

export const SCOPE: readonly string[] = [
  `${HOOK} puts up a subagent's page while it works and takes it away when it stops.`,
  "  it runs at SubagentStart and SubagentStop, over no tool, and refuses nothing",
  "  the page states the seat that ran the subagent and the kind it was dispatched as",
  "  the page states the agent id the subagent acts under, which is its seat's id and its own",
  "  the landing is asked for and left to finish, because a hook is given five seconds",
  "",
  "WHERE THE RULE COMES FROM: what a seat's subagents are doing is read from what is there,",
  "a seat is stopped or restarted against that reading. Without a page put up and taken away,",
  "every reader of it sees a seat with no subagents however many are out.",
  "",
  "WHAT IS WRITTEN:",
  "  one page under the subagents folder, named for its seat and the id the subagent runs under.",
  "  It states no id of its own, so the command that lands it mints one.",
  "  It is landed by a program rather than by an agent, so no writer is named for it.",
  "",
  "WHAT IS LEFT ALONE:",
  "  a payload naming no subagent, which is the seat's own event",
  "  a start naming no kind, which would compose a page short of what it must state",
  "  a seat the index carries no page for, which nothing can name",
  "  a page already there, and a page already gone",
  "",
  "This hook changes what is there rather than judging a call. Every path through it",
  "stands aside, and the worst it does is leave what is there as it was.",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  a subagent running when the page lands and gone before it does, whose page outlives it",
  "  a landing refused after the hook stood aside, which is unreported because nothing is waiting",
  "  every event but the two named, at which this is not registered",
  "  the old store outside the akasha folder, which nothing here writes or reads",
  "",
  "The absence of a case from this list is NOT a finding that it is covered. It is unexamined.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this is said:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

function textAt(payload: Record<string, unknown>, key: string): string | null {
  const held = payload[key]
  return typeof held === "string" && held.trim() !== "" ? held.trim() : null
}

export function actIn(payload: Record<string, unknown>): Act | null {
  const own = textAt(payload, NAMES)
  if (own === null) return null
  const at = textAt(payload, AT)
  if (at === STOPPING) return { act: "take", own }
  if (at !== STARTING) return null
  const dispatchedAs = textAt(payload, KIND)
  return dispatchedAs === null ? null : { act: "put", own, dispatchedAs }
}

export type Asked = {
  readonly seatName: string
  readonly seatId: string
  readonly act: Act
}

export function askedOf(
  env: Readonly<Record<string, string | undefined>>,
  raw: string,
  root: string
): Asked | null {
  const payload = payloadIn(raw)
  if (payload === null) return null
  const act = actIn(payload)
  if (act === null) return null
  const seat = seatIn(env)
  if (seat === null) return null
  const seatName = seatNamedIn(root, seat)
  return seatName === null ? null : { seatName, seatId: seat, act }
}

export function stated(
  env: Readonly<Record<string, string | undefined>>,
  raw: string,
  root: string
): Asked | null {
  const asked = askedOf(env, raw, root)
  if (asked === null) return null
  const act = asked.act
  if (act.act === "put") {
    puttingUp(root, asked.seatName, asked.seatId, act.own, act.dispatchedAs)
  } else takingDown(root, asked.seatName, act.own)
  return asked
}

export async function ranAsStating(
  env: Readonly<Record<string, string | undefined>>,
  at: string
): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${SCOPE.join("\n")}\n`)
    return ASIDE
  }
  try {
    stated(env, await Bun.stdin.text(), rootOf(at))
  } catch {
    return ASIDE
  }
  return ASIDE
}

export async function ran(): Promise<number> {
  return await ranAsStating(process.env, import.meta.path)
}

if (import.meta.main) process.exit(await ran())
