import type { PidSnapshot } from "../memory-reaper-proc-scan/memory-reaper-proc-scan.module.code.ts"

export const MAX_OWNER_HOPS = 32

export type SeatBinding = {
  readonly agentId: string
  readonly sessionId: string | null
  readonly pid: number
  readonly hops: number
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

function flagValue(argv: readonly string[], flag: string): string | null {
  const prefix = `${flag}=`
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at]
    if (token === undefined) continue
    if (token.startsWith(prefix)) return token.slice(prefix.length)
    if (token === flag) return argv[at + 1] ?? null
  }
  return null
}

function flagUuid(argv: readonly string[], flag: string): string | null {
  const value = flagValue(argv, flag)
  return value !== null && UUID_RE.test(value) ? value : null
}

export function seatBindingInArgv(
  argv: readonly string[],
  pid: number,
  hops: number
): SeatBinding | null {
  const agentId = flagUuid(argv, "--agent-id")
  if (agentId === null) return null
  return { agentId, sessionId: flagUuid(argv, "--session-id"), pid, hops }
}

export function resolveSeatBinding(
  victimPid: number,
  snapshots: readonly PidSnapshot[],
  readArgv: (pid: number) => readonly string[] | undefined
): SeatBinding | null {
  const ppidByPid = new Map(snapshots.map((s) => [s.pid, s.ppid]))
  const seen = new Set<number>()
  let cur: number | undefined = victimPid
  let hops = 0
  while (cur !== undefined && cur > 1 && !seen.has(cur) && hops < MAX_OWNER_HOPS) {
    seen.add(cur)
    const found = seatBindingInArgv(readArgv(cur) ?? [], cur, hops)
    if (found !== null) return found
    cur = ppidByPid.get(cur)
    hops += 1
  }
  return null
}
