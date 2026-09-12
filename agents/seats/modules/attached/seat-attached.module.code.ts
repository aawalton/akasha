import { ran } from "akasha/utils/run/running/running.module.code.ts"

const HELD_FOR_MS = 2000

const TMUX = "tmux"

const LIST: readonly string[] = ["list-clients", "-F", "#{client_session}"]

export function sessionsIn(said: string): ReadonlySet<string> {
  const found = new Set<string>()
  for (const line of said.split("\n")) {
    const name = line.trim()
    if (name !== "") found.add(name)
  }
  return found
}

function readAttached(): ReadonlySet<string> | null {
  try {
    const done = ran([TMUX, ...LIST])
    if (done.code !== 0) return null
    return sessionsIn(done.out)
  } catch {
    return null
  }
}

let held: { readonly at: number; readonly sessions: ReadonlySet<string> | null } | null = null

function attachedSessions(): ReadonlySet<string> | null {
  const now = Date.now()
  if (held !== null && now - held.at < HELD_FOR_MS) return held.sessions
  held = { at: now, sessions: readAttached() }
  return held.sessions
}

export function dropAttachedSessions(): undefined {
  held = null
}

export function seatIsAttached(seatName: string): boolean | null {
  const sessions = attachedSessions()
  return sessions === null ? null : sessions.has(seatName)
}
