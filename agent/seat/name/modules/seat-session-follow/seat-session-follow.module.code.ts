import { readFileSync } from "node:fs"
import {
  renameSeatSession,
  sessionNote,
} from "akasha/agent/seat/name/modules/seat-session-rename/seat-session-rename.module.code.ts"
import { seatNameForAgent } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import type { HeartbeatPoll } from "akasha/agent/seat/supervisor/supervisor-timer/modules/supervisor-heartbeat/supervisor-heartbeat.module.code.ts"
import { ranAwaited } from "akasha/code/spawning/modules/running/running.module.code.ts"

const POLL_NAME = "seat-session-follow"

const PATIENCE_MS = 5_000

const PANES = "#{pane_pid}\t#{session_name}\t#{session_windows}\t#{window_panes}"

const MOST_ANCESTORS = 64

interface PaneHeld {
  readonly pid: number
  readonly session: string
  readonly alone: boolean
}

export function panesIn(listed: string): readonly PaneHeld[] {
  const panes: PaneHeld[] = []
  for (const line of listed.split("\n")) {
    const [pid, session, windows, panesInWindow] = line.split("\t")
    const held = Number(pid)
    if (!Number.isSafeInteger(held) || held <= 0 || session === undefined || session === "") {
      continue
    }
    panes.push({ pid: held, session, alone: windows === "1" && panesInWindow === "1" })
  }
  return panes
}

function parentOf(pid: number): number | null {
  try {
    const stat = readFileSync(`/proc/${String(pid)}/stat`, "utf8")
    const parent = Number(stat.slice(stat.lastIndexOf(")") + 2).split(" ")[1])
    return Number.isSafeInteger(parent) && parent > 0 ? parent : null
  } catch {
    return null
  }
}

export function ancestorsOf(
  pid: number,
  parent: (child: number) => number | null = parentOf
): readonly number[] {
  const found: number[] = [pid]
  let at: number | null = pid
  while (found.length < MOST_ANCESTORS) {
    at = parent(at)
    if (at === null || found.includes(at)) break
    found.push(at)
  }
  return found
}

export function sessionHolding(
  panes: readonly PaneHeld[],
  ancestors: readonly number[]
): string | null {
  return panes.find((one) => one.alone && ancestors.includes(one.pid))?.session ?? null
}

async function listedPanes(): Promise<string | null> {
  try {
    const done = await ranAwaited(["tmux", "list-panes", "-a", "-F", PANES], {
      timeout: PATIENCE_MS,
    })
    return done.code === 0 ? done.out : null
  } catch {
    return null
  }
}

export function seatSessionFollowPoll(args: {
  getAgentId: () => string | null
  log: (line: string) => void
  readName?: (agent: string) => string | null
  listPanes?: () => Promise<string | null>
  ancestors?: () => readonly number[]
  rename?: typeof renameSeatSession
}): HeartbeatPoll {
  const readName = args.readName ?? seatNameForAgent
  const listPanes = args.listPanes ?? listedPanes
  const ancestors = args.ancestors ?? (() => ancestorsOf(process.pid))
  const rename = args.rename ?? renameSeatSession
  let followed: string | null = null

  const run = async (): Promise<void> => {
    const agent = args.getAgentId()
    if (agent === null) return
    const name = readName(agent)
    if (name === null || name === followed) return
    const listed = await listPanes()
    if (listed === null) return
    followed = name
    const held = sessionHolding(panesIn(listed), ancestors())
    if (held === null || held === name) return
    const outcome = rename(held, name)
    args.log(`seat session: ${held} -> ${name}${sessionNote(outcome, held, name)}`)
  }

  return { name: POLL_NAME, run }
}
