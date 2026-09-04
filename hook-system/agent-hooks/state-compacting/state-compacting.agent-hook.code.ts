import { seatIn } from "@akasha/command-system/reading"
import { setPending } from "@akasha/seat-system/seat-turn-pending"
import { ASIDE, payloadIn, SCOPE_FLAG } from "../../hook-answer/hook-answer.module.code.ts"

const HOOK = "state-compacting"

const OPENING = "PreCompact"

const CLOSING = "PostCompact"

const AT = "hook_event_name"

export const SCOPE: readonly string[] = [
  `${HOOK} states that a seat's context is being replaced by a summary of itself.`,
  "  it runs at PreCompact and PostCompact, over no tool, and refuses nothing",
  "  it turns the seat's `compacting` on at the first and off at the second",
  "",
  "WHERE THE RULE COMES FROM: a seat whose context is being compacted is waiting rather than",
  "working, and a reader with nothing said about it draws the seat as though it were idle.",
  "Compacting is one of the things a seat waits on, so it is written where the others are.",
  "",
  "WHAT IS WRITTEN:",
  "  one field of the turn-pending record kept beside the seat's page in akasha.",
  "  Every other field of that record is carried at the value it already held.",
  "",
  "WHAT IS LEFT ALONE:",
  "  a payload naming neither event, which belongs to something else",
  "  a call naming no seat, which nothing can be written against",
  "  a seat akasha holds no page for, which the write refuses on its own",
  "",
  "This hook changes what is there rather than judging a call. Every path through it lets",
  "the call by, and the worst it does is leave what is there as it was.",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  a compaction that never reaches its second event, whose seat waits until the next turn",
  "  a seat compacted while mid-turn, which reads as working because working is read first",
  "  every event but the two named, at which this is not registered",
  "  whether the summary the compaction wrote is any good, which nothing here reads",
  "",
  "The absence of a case from this list is NOT a finding that it is covered. It is unexamined.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this is said:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

export function compactingIn(payload: Record<string, unknown>): boolean | null {
  const at = payload[AT]
  if (at === OPENING) return true
  if (at === CLOSING) return false
  return null
}

export function stated(
  env: Readonly<Record<string, string | undefined>>,
  raw: string
): boolean | null {
  const payload = payloadIn(raw)
  if (payload === null) return null
  const compacting = compactingIn(payload)
  if (compacting === null) return null
  const seat = seatIn(env)
  if (seat === null) return null
  setPending(seat, { compacting })
  return compacting
}

export async function ranAsStating(
  env: Readonly<Record<string, string | undefined>>
): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${SCOPE.join("\n")}\n`)
    return ASIDE
  }
  try {
    stated(env, await Bun.stdin.text())
  } catch {
    return ASIDE
  }
  return ASIDE
}

export async function ran(): Promise<number> {
  return await ranAsStating(process.env)
}

if (import.meta.main) process.exit(await ran())
