import type { Outcome } from "@akasha/command-system/gated-write"
import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { principalSeatNameOf } from "../seat-principal/seat-principal.module.code.ts"
import type { Stated } from "../seat-stated/seat-stated.module.code.ts"
import type { SeatStated, Stating } from "../seat-stating/seat-stating.module.code.ts"
import { statedSeat, tookSeat } from "../seat-stating/seat-stating.module.code.ts"

const DIR = "seat-system/seats/pages"

const SUFFIX = ".seat.ts"

export function akashaSeatRelPath(seatName: string): string {
  return `${DIR}/${seatName}${SUFFIX}`
}

// Where every seat page stands, for a caller watching the store rather than addressing one seat in
// it. The directory is spelled here with the paths that reach into it rather than a second time at
// whoever watches.
export function akashaSeatsDirIn(root: string): string {
  return `${root}/${DIR}`
}

// The old state carries each value wrapped in the record it was read from. What states a seat in
// akasha is the values themselves, so they are unwrapped here and nowhere else.
function seatStatedFrom(stated: Stated, parentName: string | null): SeatStated {
  return {
    agentId: stated.agent,
    persona: stated.attributes.persona?.slug ?? null,
    domain: stated.attributes.domain?.slug ?? null,
    assignment: stated.assignment,
    role: stated.attributes.role?.slug ?? null,
    principal: stated.principal?.value ?? null,
    mode: stated.recordedMode?.value ?? null,
    registration: stated.registration?.value ?? null,
    onCall: stated.onCall,
    session: stated.session?.value ?? null,
    parentName: parentName ?? principalSeatNameOf(stated.agent),
  }
}

function outcomeOf(said: Stating): Outcome {
  if (said.kind === "refused") return { kind: "refused", detail: said.said }
  if (said.kind === "wrote") return { kind: "written" }
  if (said.kind === "took") return { kind: "removed" }
  return said
}

export async function writeAkashaSeatPage(
  stated: Stated,
  seatName: string,
  roots: Roots,
  parentName: string | null = null
): Promise<Outcome> {
  const root = rootFor(roots, AKASHA)
  return outcomeOf(await statedSeat(root, seatStatedFrom(stated, parentName), seatName))
}

export async function removeAkashaSeatPage(
  seatName: string,
  roots: Roots,
  stopReason: string
): Promise<Outcome> {
  const root = rootFor(roots, AKASHA)
  return outcomeOf(await tookSeat(root, seatName, stopReason))
}
