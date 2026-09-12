import type { Outcome } from "akasha/commands/modules/gated-write/gated-write.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { seatNameForAgent } from "akasha/seat-system/seat-presence-read/seat-presence-read.module.code.ts"
import type { StandingSubagent } from "akasha/seat-system/subagent-guard/subagent-guard.module.code.ts"
import {
  akashaSubagentPathsOf,
  removeAkashaSubagentPagesOf,
  sweepingAkashaSubagentPagesOf,
} from "akasha/seat-system/subagent-page-akasha/subagent-page-akasha.module.code.ts"

const KIND = "dispatchedAs"

const UNSTATED = "unstated"

export async function removeSubagentPagesOf(seat: string, why: string): Promise<Outcome> {
  const seatName = seatNameForAgent(seat)
  if (seatName === null) return { kind: "unchanged" }
  return await removeAkashaSubagentPagesOf(seatName, why)
}

export function sweepSubagentPagesOf(seat: string, why: string): undefined {
  const seatName = seatNameForAgent(seat)
  if (seatName === null) return
  sweepingAkashaSubagentPagesOf(seatName, seat, why)
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
