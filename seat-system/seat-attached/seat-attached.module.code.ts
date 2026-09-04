import { spawnSync } from "node:child_process"

const HELD_FOR_MS = 2000

const LIST: readonly string[] = ["list-clients", "-F", "#{client_session}"]

// WHAT TMUX SAYS, TURNED INTO THE SET OF SESSIONS SOMEBODY IS WATCHING. This is parted from the
// call so that the reading can be tested without a tmux: the shape of the answer is the whole of
// what there is to get wrong here, and it is got wrong on an empty line rather than on a name.
export function sessionsIn(said: string): ReadonlySet<string> {
  const found = new Set<string>()
  for (const line of said.split("\n")) {
    const name = line.trim()
    if (name !== "") found.add(name)
  }
  return found
}

// A TMUX THAT CANNOT BE REACHED IS NOT A TMUX WATCHING NOTHING. Null is the unknown and an empty
// set is the answer that nobody is attached, and a caller that read the two alike would report
// every seat as unwatched for as long as tmux was down.
function readAttached(): ReadonlySet<string> | null {
  try {
    const ran = spawnSync("tmux", [...LIST], { stdio: ["ignore", "pipe", "ignore"] })
    if (ran.status !== 0) return null
    return sessionsIn(new TextDecoder().decode(ran.stdout ?? new Uint8Array()))
  } catch {
    return null
  }
}

let held: { readonly at: number; readonly sessions: ReadonlySet<string> | null } | null = null

// The reading is held for a couple of seconds because every seat on the statusline asks for it and
// the answer moves only when somebody opens or closes a terminal.
export function attachedSessions(): ReadonlySet<string> | null {
  const now = Date.now()
  if (held !== null && now - held.at < HELD_FOR_MS) return held.sessions
  held = { at: now, sessions: readAttached() }
  return held.sessions
}

export function dropAttachedSessions(): void {
  held = null
}

// A SEAT'S NAME IS THE SESSION IT IS WATCHED UNDER, so nothing is opened to answer this. Null is
// unknown, carried through from the read rather than flattened into false.
export function seatIsAttached(seatName: string): boolean | null {
  const sessions = attachedSessions()
  return sessions === null ? null : sessions.has(seatName)
}
