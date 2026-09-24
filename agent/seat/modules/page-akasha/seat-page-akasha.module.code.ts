import {
  type Stating,
  statedSeat,
  tookSeat,
} from "akasha/agent/seat/declaration/modules/seat-landing/seat-landing.module.code.ts"
import { principalSeatNameOf } from "akasha/agent/seat/declaration/modules/seat-principal/seat-principal.module.code.ts"
import type { Stated } from "akasha/agent/seat/declaration/modules/seat-stated/seat-stated.module.code.ts"
import type { SeatStated } from "akasha/agent/seat/declaration/modules/seat-stating/seat-stating.module.code.ts"
import type { Outcome } from "akasha/change/modules/gated-write/gated-write.module.code.ts"
import { AKASHA, rootFor } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Roots } from "akasha/page/modules/markdown-page-at/markdown-page-at.module.code.ts"

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
