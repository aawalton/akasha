export type IdleObservation = {
  inFlight: number | null
  busyChildren: number | null
  inFlightDispatchChildren: number | null
  claudePresent: boolean
}

export type IdleVerdict = { readonly idle: boolean; readonly reason: string }

export type BusyChildDetail = { pid: string; cmdline: string; ageMs: number | null }

export function isIdleForPreservingRestart(obs: IdleObservation): boolean {
  return obs.inFlight === 0 && obs.busyChildren === 0 && obs.claudePresent
}

export function isIdleForPreservingRestartPastCliff(obs: IdleObservation): boolean {
  return obs.inFlight === 0 && obs.claudePresent
}

export function preservingRestartBusyReason(
  obs: IdleObservation,
  opts?: { ignoreBusyChildren?: boolean }
): string {
  const parts: string[] = []
  if (obs.inFlight !== 0) parts.push(`inFlight=${obs.inFlight ?? "unread"}`)
  if (!opts?.ignoreBusyChildren && obs.busyChildren !== 0)
    parts.push(`busyChildren=${obs.busyChildren ?? "unread"}`)
  if (!obs.claudePresent) parts.push("claude-absent")
  return parts.length === 0 ? "idle" : parts.join(", ")
}

export function preservingRestartVerdict(obs: IdleObservation): IdleVerdict {
  return { idle: isIdleForPreservingRestart(obs), reason: preservingRestartBusyReason(obs) }
}

export function pastCliffVerdict(obs: IdleObservation): IdleVerdict {
  return {
    idle: isIdleForPreservingRestartPastCliff(obs),
    reason: preservingRestartBusyReason(obs, { ignoreBusyChildren: true }),
  }
}

const MCP_CHILD_CMDLINE_MARKERS = [
  "mcp.ts",
  "-mcp.module.code.ts",
  "playwright-mcp",
  "@playwright/mcp",
  "npm exec @",
]

export function isIgnoredMcpChildCmdline(cmdline: string): boolean {
  return MCP_CHILD_CMDLINE_MARKERS.some((marker) => cmdline.includes(marker))
}
