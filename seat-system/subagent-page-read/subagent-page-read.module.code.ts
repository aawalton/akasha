import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { seatNameForAgent } from "../seat-presence-read/seat-presence-read.module.code.ts"
import { seatAbove, subagentUnder } from "../subagent-naming/subagent-naming.module.code.ts"
import {
  akashaSubagentPathsOf,
  akashaSubagentRelPath,
  akashaSubagentSlug,
} from "../subagent-page-akasha/subagent-page-akasha.module.code.ts"

export const SUBAGENT_PAGE_TYPE = "subagent"

export const SUBAGENT_PAGE_SUFFIX = ".subagent.ts"

export function subagentSeatName(agent: string): string | null {
  const seat = seatAbove(agent)
  return seat === null ? null : seatNameForAgent(seat)
}

export function subagentPageRelPath(seatName: string, own: string): string {
  return akashaSubagentRelPath(akashaSubagentSlug(seatName, own))
}

export function subagentPagePathFor(agent: string): string | null {
  const own = subagentUnder(agent)
  const seatName = subagentSeatName(agent)
  if (own === null || seatName === null) return null
  return `${rootFor(resolveRoots(), AKASHA)}/${subagentPageRelPath(seatName, own)}`
}

export function standingPagePathsOf(seatName: string): readonly string[] {
  return akashaSubagentPathsOf(seatName)
}
