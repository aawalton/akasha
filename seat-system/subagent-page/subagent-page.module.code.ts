import type { Outcome } from "@akasha/command-system/gated-write"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { partedIn } from "@akasha/pages-system/page-file-name"
import { textAt, valueAt } from "@akasha/pages-system/page-value"
import { seatNameForAgent } from "../seat-presence-read/seat-presence-read.module.code.ts"
import type { StandingSubagent } from "../subagent-guard/subagent-guard.module.code.ts"
import {
  akashaSubagentPathsOf,
  removeAkashaSubagentPagesOf,
} from "../subagent-page-akasha/subagent-page-akasha.module.code.ts"

const KIND = "dispatchedAs"

const UNSTATED = "unstated"

export async function removeSubagentPagesOf(seat: string, why: string): Promise<Outcome> {
  const seatName = seatNameForAgent(seat)
  if (seatName === null) return { kind: "unchanged" }
  return await removeAkashaSubagentPagesOf(seatName, why)
}

function namedAt(absolute: string): string {
  const said = partedIn(absolute)
  return said === null ? absolute : said.slug
}

function kindAt(absolute: string, root: string): string {
  const value = valueAt(absolute, root)
  const stated = value === null ? null : textAt(value, KIND)
  return stated === null || stated === "" ? UNSTATED : stated
}

export function standingSubagentsOf(seat: string): readonly StandingSubagent[] {
  const seatName = seatNameForAgent(seat)
  if (seatName === null) return []
  const root = rootFor(resolveRoots(), AKASHA)
  return akashaSubagentPathsOf(seatName).map((absolute) => ({
    name: namedAt(absolute),
    dispatchedAs: kindAt(absolute, root),
  }))
}
