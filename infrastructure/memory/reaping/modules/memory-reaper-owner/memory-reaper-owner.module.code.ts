import { lowerUuid } from "akasha/page/name-format/pages/lower-uuid/lower-uuid.name-format.code.ts"

export type SeatBinding = {
  readonly agentId: string
  readonly sessionId: string | null
  readonly pid: number
  readonly hops: number
}

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
  return value !== null && lowerUuid(value) ? value : null
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
