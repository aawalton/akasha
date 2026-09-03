import { akashaSeatValuesOf } from "../seat-akasha-read/seat-akasha-read.module.code.ts"
import { seatAbove } from "../subagent-naming/subagent-naming.module.code.ts"

// WHAT A SEAT STATES IS READ FROM AKASHA AND FROM NOWHERE ELSE. Both stores are still written, and
// reading the old one first is what this used to do. It stopped because the two had stopped saying
// the same thing: the old renderer addresses a seat's assignment against a tree the person pages
// have left, so it answers `alan` where akasha answers `person/alan`, and reading it first served
// the drifted value to everything downstream.
//
// A fallback to the old page is not kept. Akasha answers for every seat standing — checked field by
// field across the fleet, committed and observed both — and a fallback would go on hiding the next
// value that only one of them holds, which is the failure this read is meant to make visible.
//
// A subagent states nothing of its own and never had a page here, so it is read from the seat it
// was spawned under, which is found by splitting its id rather than by opening anything.
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
