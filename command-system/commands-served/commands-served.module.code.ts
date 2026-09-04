export const PROTOCOL = 1

export const LEASE_MS = 30_000

export const LEASE_ENV = "AKASHA_COMMAND_SERVER_LEASE_MS"

export function leaseAsked(stated: string | undefined = process.env[LEASE_ENV]): number {
  const asked = stated === undefined || stated === "" ? Number.NaN : Number(stated)
  return Number.isFinite(asked) && asked > 0 ? asked : LEASE_MS
}

export const COMMANDS_SERVED: readonly string[] = [
  "agent-forest",
  "agent-turn-colors",
  "claude-usage",
  "seat-transcripts",
  "work-tree",
]

export function isServed(command: string): boolean {
  return COMMANDS_SERVED.includes(command)
}
