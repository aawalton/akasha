import { principalSeatIdOf } from "../seat-principal/seat-principal.module.code.ts"
import { type Seated, seatsPresent } from "../seat-roster/seat-roster.module.code.ts"

// WHICH OF THESE SEATS STAND UNDER THAT ONE. The roster and the principal read are handed in rather
// than reached, so what decides a child can be tested without a fleet standing. Every fault this
// has ever had was in the deciding rather than in the reading.
export function childrenAmong(
  parentAgentId: string,
  among: readonly Seated[],
  principalOf: (agentId: string) => string | null
): readonly Seated[] {
  if (parentAgentId === "") return []
  return among.filter((one) => principalOf(one.id) === parentAgentId)
}

export function seatChildrenOf(parentAgentId: string): readonly Seated[] {
  return childrenAmong(parentAgentId, seatsPresent(), principalSeatIdOf)
}

// THE COUNT IS OF SEATS SOMEBODY IS PRESENT IN, because the roster it reads is the present one. A
// seat standing with nobody in it is not a child holding its parent open.
export function countLiveSeatChildren(parentAgentId: string): number {
  return seatChildrenOf(parentAgentId).length
}

// The statusline runs this file and reads one number off it, once per turn per seat. A seat named
// as nothing answers zero without reading the roster, which is what a statusline with no seat in
// its environment asks for.
if (import.meta.main) {
  const parent = process.argv[2] ?? ""
  process.stdout.write(`${parent === "" ? 0 : countLiveSeatChildren(parent)}\n`)
}
