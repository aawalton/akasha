import { appendFileSync } from "node:fs"
import {
  ASIDE,
  LET_THROUGH,
  payloadIn,
  SCOPE_FLAG,
  said,
} from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import { readOwnTranscriptTail } from "akasha/agents/io-probe/io-probe.module.code.ts"
import { seatIn } from "akasha/agents/read-record/read-record.module.code.ts"
import { seatNameForAgent } from "akasha/agents/seats/modules/presence-read/seat-presence-read.module.code.ts"
import { transcriptRecordOf } from "akasha/seat-system/seat-transcript-path/seat-transcript-path.module.code.ts"

const HOOK = "name-session"

const AT = "Stop"

const NAMES = "agent-name"

const TITLES = "custom-title"

const TRANSCRIPT = "transcript_path"

const SESSION = "session_id"

const TAIL_BYTES = 65_536

export type Naming = {
  readonly at: string
  readonly lines: string
}

export const SCOPE: readonly string[] = [
  `${HOOK} names a seat's Claude Code session for that seat, and refuses nothing.`,
  `  it runs at ${AT}, and every stop reaches the harness either way`,
  "  the name is the seat's own slug, which is the name the seat is addressed by",
  `  the name is written as a \`${NAMES}\` line and a \`${TITLES}\` line into the transcript`,
  "",
  "WHERE THE RULE COMES FROM: a session Alan opens in Remote Control is listed by the name its",
  "transcript carries, and a session carrying none is listed by the folder it runs in. Several",
  "seats run in one folder, so without this they are one name over and over and Alan cannot see",
  "who he is talking to. A seat's name and its session's title are meant to be one value.",
  "",
  "WHAT IS CHANGED:",
  "  two lines appended to the transcript the payload names, and nothing else.",
  "  Both are the shape the harness itself writes when a session is named at its launch,",
  "    so what is read back is read by the reader that was already there.",
  "",
  "WHAT IS LEFT ALONE:",
  "  a stop under no seat, which is an agent this has no name for",
  "  a seat akasha holds no page for, which names nobody",
  "  a transcript already carrying the seat's name, which is written nothing",
  "  a payload naming no transcript or no session, and a payload that will not read",
  "",
  "This hook writes a name rather than judging a stop. It refuses nothing and fails nothing:",
  "every path through it steps aside, and the worst it does is leave a session unnamed.",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  `  every event but ${AT}, at which alone this is registered`,
  "  the name the session is running under in its own process, which no file reaches",
  "  a subagent, whose stop is another event",
  "  a session whose transcript the harness has moved, which is named where it now is",
  "",
  "The absence of a path from this list is NOT a finding that it is named. It is unexamined.",
  "A session shown under its folder is a session this has not yet reached, which is the shape",
  "this hook exists to end, not a gap that closes by writing a name somewhere else.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this is held:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

export function namingLines(name: string, session: string): string {
  return [
    JSON.stringify({ type: NAMES, agentName: name, sessionId: session }),
    JSON.stringify({ type: TITLES, customTitle: name, sessionId: session }),
    "",
  ].join("\n")
}

export function nameInTail(tail: string, session: string): string | null {
  let found: string | null = null
  for (const line of tail.split("\n")) {
    if (!line.startsWith("{")) continue
    let held: unknown
    try {
      held = JSON.parse(line)
    } catch {
      continue
    }
    if (held === null || typeof held !== "object" || Array.isArray(held)) continue
    const one = held as Record<string, unknown>
    if (one["type"] !== NAMES || one["sessionId"] !== session) continue
    const named = one["agentName"]
    if (typeof named === "string") found = named
  }
  return found
}

function textIn(payload: Record<string, unknown>, key: string): string | null {
  const held = payload[key]
  return typeof held === "string" && held !== "" ? held : null
}

export function namingOver(
  payload: Record<string, unknown>,
  name: string,
  tailOf: (at: string) => string | null
): Naming | null {
  const at = textIn(payload, TRANSCRIPT)
  const session = textIn(payload, SESSION)
  if (at === null || session === null) return null
  const tail = tailOf(at)
  if (tail !== null && nameInTail(tail, session) === name) return null
  return { at, lines: namingLines(name, session) }
}

export function namingFor(
  env: Readonly<Record<string, string | undefined>>,
  raw: string,
  nameOf: (agent: string) => string | null,
  tailOf: (at: string) => string | null
): Naming | null {
  const payload = payloadIn(raw)
  if (payload === null) return null
  const agent = seatIn(env)
  if (agent === null) return null
  const name = nameOf(agent)
  if (name === null || name === "") return null
  return namingOver(payload, name, tailOf)
}

export function tailAt(at: string): string | null {
  return readOwnTranscriptTail(at, TAIL_BYTES, transcriptRecordOf)
}

export function written(one: Naming): undefined {
  appendFileSync(one.at, one.lines)
}

export async function ranAsNaming(
  env: Readonly<Record<string, string | undefined>>,
  nameOf: (agent: string) => string | null = seatNameForAgent,
  tailOf: (at: string) => string | null = tailAt,
  write: (one: Naming) => undefined = written
): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${SCOPE.join("\n")}\n`)
    return ASIDE
  }
  try {
    const one = namingFor(env, await Bun.stdin.text(), nameOf, tailOf)
    if (one !== null) write(one)
  } catch {
    return ASIDE
  }
  return said(LET_THROUGH)
}

export async function ran(): Promise<number> {
  return await ranAsNaming(process.env)
}

if (import.meta.main) process.exit(await ran())
