export const PENDING_VERDICTS = ["stopped", "live-child", "awaiting-reply", "none"] as const

export type PendingVerdict = (typeof PENDING_VERDICTS)[number]

export type OutboundRecency =
  | { readonly kind: "sent"; readonly atMs: number }
  | { readonly kind: "none-sent" }

export function pendingAllowsStopAlone(verdict: PendingVerdict): boolean {
  return verdict === "stopped" || verdict === "live-child"
}

export function decidePending(opts: {
  readonly selfStopped: boolean
  readonly liveChildren: number
  readonly outbound: OutboundRecency
}): PendingVerdict {
  if (opts.selfStopped) return "stopped"
  if (opts.liveChildren > 0) return "live-child"
  return opts.outbound.kind === "none-sent" ? "none" : "awaiting-reply"
}
