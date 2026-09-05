// WHICH SEAT A TERMINAL SITS ON, KEYED BY THE PID OF THE SHELL THAT TERMINAL RUNS.
//
// The editor holds `terminal.processId` and nothing else that names a seat, so what it can look a
// seat up by is that pid. Before this the editor forked `ps -Ao pid=,ppid=,comm=` and
// `tmux list-clients` once a second and walked the process tree itself, on the thread that draws.
//
// A parent chain is read from /proc one pid at a time, so no process table is taken: a client
// twenty hops under its shell costs twenty small reads rather than a scan of every process there
// is. The fork that is left is the one `tmux` call, and it happens here rather than in the editor.

import { execFile } from "node:child_process"
import { readFileSync } from "node:fs"
import { promisify } from "node:util"

const execFileP = promisify(execFile)

const MAX_TREE_HOPS = 20
const TMUX_TIMEOUT_MS = 5_000
const FIRST_PROCESS = 1

export type TmuxClient = { readonly pid: number; readonly session: string }

// A command name may hold spaces and brackets of its own, so the fields after it are read from the
// last closing bracket rather than by parting the whole line on spaces.
export function parentOfPid(pid: number): number | undefined {
  let stat: string
  try {
    stat = readFileSync(`/proc/${pid}/stat`).toString("utf8")
  } catch {
    return undefined
  }
  const close = stat.lastIndexOf(")")
  if (close === -1) return undefined
  const after = stat
    .slice(close + 1)
    .trim()
    .split(/\s+/)
  const ppid = Number(after[1])
  return Number.isInteger(ppid) ? ppid : undefined
}

// A CALL THAT FAILED ANSWERS NOTHING, WHICH IS NOT THE SAME ANSWER AS NO CLIENT. `tmux` refuses
// while its server is coming back up and answers nothing at all where the call runs past its
// bound, and both were handed back as an empty list. Whoever read that list then held that no
// terminal sits on any seat, which is a fact rather than a gap, and acted on it: sixteen tabs in
// Alan's window lost the seat's name and the seat's color together and were given them back a
// second later, by the next beat, whose call went through.
export async function tmuxClients(): Promise<readonly TmuxClient[] | null> {
  let stdout: string
  try {
    ;({ stdout } = await execFileP(
      "tmux",
      ["list-clients", "-F", "#{client_pid} #{session_name}"],
      { timeout: TMUX_TIMEOUT_MS }
    ))
  } catch {
    return null
  }
  const clients: TmuxClient[] = []
  for (const line of stdout.split("\n")) {
    const trimmed = line.trim()
    const sep = trimmed.indexOf(" ")
    if (sep < 0) continue
    const pid = Number(trimmed.slice(0, sep))
    const session = trimmed.slice(sep + 1).trim()
    if (!Number.isFinite(pid) || session === "") continue
    clients.push({ pid, session })
  }
  return clients
}

// Every pid whose child chain reaches a tmux client sitting on a seat. The editor reads its
// terminal's pid out of this rather than walking a tree, so the walking is done once for the
// whole window instead of once for every tab.
//
// A pid two seats both reach is dropped rather than given to either. It is an ancestor they
// share, the editor itself being one, and no terminal of one seat runs under it alone.
export function seatByShellPid(
  clients: readonly TmuxClient[],
  seatNames: ReadonlySet<string>,
  parentOf: (pid: number) => number | undefined = parentOfPid
): ReadonlyMap<number, string> {
  const found = new Map<number, string>()
  const shared = new Set<number>()
  for (const client of clients) {
    if (!seatNames.has(client.session)) continue
    let cur = client.pid
    for (let hops = 0; hops < MAX_TREE_HOPS; hops++) {
      const parent = parentOf(cur)
      if (parent === undefined || parent <= FIRST_PROCESS) break
      const already = found.get(parent)
      if (already !== undefined && already !== client.session) shared.add(parent)
      found.set(parent, client.session)
      cur = parent
    }
  }
  for (const pid of shared) found.delete(pid)
  return found
}
