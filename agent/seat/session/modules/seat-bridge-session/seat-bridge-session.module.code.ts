import { closeSync, openSync, readSync, statSync } from "node:fs"
import {
  clearSeatRecord,
  keepSeatRecord,
  seatRecordOf,
} from "akasha/agent/seat/modules/record/seat-record.module.code.ts"
import { transcriptOf } from "akasha/agent/seat/session/modules/seat-transcript-path/seat-transcript-path.module.code.ts"
import type { HeartbeatPoll } from "akasha/agent/seat/supervisor/supervisor-timer/modules/supervisor-heartbeat/supervisor-heartbeat.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

export const BRIDGE_SESSION_KEY = "bridge-session-id"

export const TAIL_BYTES = 1_048_576

const POLL_NAME = "bridge-session"

const BRIDGE_RECORD = "bridge-session"

const AS_BRIDGED = "cse_"

const AS_LINKED = "session_"

export function publicSessionOf(id: string): string {
  return id.startsWith(AS_BRIDGED) ? `${AS_LINKED}${id.slice(AS_BRIDGED.length)}` : id
}

const BRIDGE_LINE = SHAPE.looseObject({
  type: SHAPE.literal(BRIDGE_RECORD),
  bridgeSessionId: SHAPE.string().min(1),
})

function sessionNamedBy(line: string): string | null {
  if (!line.includes(BRIDGE_RECORD)) return null
  try {
    const held = BRIDGE_LINE.safeParse(JSON.parse(line))
    return held.success ? publicSessionOf(held.data.bridgeSessionId) : null
  } catch {
    return null
  }
}

export function bridgeSessionIn(text: string): string | null {
  const lines = text.split("\n")
  for (let at = lines.length - 1; at >= 0; at -= 1) {
    const named = sessionNamedBy(lines[at] ?? "")
    if (named !== null) return named
  }
  return null
}

function tailOf(path: string): string | null {
  let file: number | null = null
  try {
    const size = statSync(path).size
    const from = Math.max(0, size - TAIL_BYTES)
    file = openSync(path, "r")
    const into = Buffer.alloc(size - from)
    const read = readSync(file, into, 0, into.length, from)
    return into.subarray(0, read).toString("utf8")
  } catch {
    return null
  } finally {
    if (file !== null) closeSync(file)
  }
}

export function bridgeSessionAt(path: string): string | null {
  const text = tailOf(path)
  return text === null ? null : bridgeSessionIn(text)
}

export function bridgeSessionOf(agent: string): string | null {
  return seatRecordOf(agent, BRIDGE_SESSION_KEY)?.value ?? null
}

function keepBridgeSession(agent: string, session: string): undefined {
  keepSeatRecord(agent, BRIDGE_SESSION_KEY, session)
}

function clearBridgeSession(agent: string): undefined {
  clearSeatRecord(agent, BRIDGE_SESSION_KEY)
}

function transcriptPathOf(agent: string): string | null {
  return transcriptOf(agent)?.value ?? null
}

export function bridgeSessionPoll(args: {
  getAgentId: () => string | null
  readTranscript?: (agent: string) => string | null
  readHeld?: (agent: string) => string | null
  keep?: (agent: string, session: string) => undefined
  clear?: (agent: string) => undefined
}): HeartbeatPoll {
  const readTranscript = args.readTranscript ?? transcriptPathOf
  const readHeld = args.readHeld ?? bridgeSessionOf
  const keep = args.keep ?? keepBridgeSession
  const clear = args.clear ?? clearBridgeSession

  const run = async (): Promise<void> => {
    const agent = args.getAgentId()
    if (agent === null) return
    const path = readTranscript(agent)
    if (path === null) return
    const session = bridgeSessionAt(path)
    const held = readHeld(agent)
    if (session === held) return
    if (session === null) clear(agent)
    else keep(agent, session)
  }

  return { name: POLL_NAME, run }
}
