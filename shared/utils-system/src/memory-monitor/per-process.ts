import { KB_PER_GB, type MemoryKillDecision } from "./shared"

export const MAX_RSS_GB = 8

export type MemoryKillInput = {
  rssKb: number
  thresholdKb: number
  kindLabel: string
  pid: number
}

export function assessMemoryKill(input: MemoryKillInput): MemoryKillDecision {
  const rssGb = (input.rssKb / KB_PER_GB).toFixed(1)
  const thresholdGb = (input.thresholdKb / KB_PER_GB).toFixed(1)
  if (input.rssKb > input.thresholdKb) {
    return {
      kill: true,
      reason: `killing ${input.kindLabel} pid=${input.pid}: VmRSS ${rssGb} GB exceeds ${thresholdGb} GB ceiling`,
    }
  }
  return {
    kill: false,
    reason: `${input.kindLabel} pid=${input.pid}: VmRSS ${rssGb} GB`,
  }
}
