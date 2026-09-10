import { akashaSeatValuesOf } from "../seat-akasha-read/seat-akasha-read.module.code.ts"
import { seatAbove } from "../subagent-naming/subagent-naming.module.code.ts"

function statedOnAPage(agent: string): Record<string, unknown> | null {
  return akashaSeatValuesOf(agent)
}

export function pageValuesOf(agent: string): Record<string, unknown> | null {
  const own = statedOnAPage(agent)
  if (own !== null) return own
  const seat = seatAbove(agent)
  return seat === null ? null : statedOnAPage(seat)
}

export function pageTextOf(agent: string, key: string): string | null {
  const held = pageValuesOf(agent)?.[key]
  if (typeof held === "string" && held !== "") return held
  if (typeof held === "number") return String(held)
  return null
}

export function pageFlagOf(agent: string, key: string): boolean {
  return pageValuesOf(agent)?.[key] === true
}
