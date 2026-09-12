import { principalSeatIdOf } from "akasha/agents/seats/modules/principal/seat-principal.module.code.ts"
import {
  type Seated,
  seatsPresent,
} from "akasha/seat-system/seat-roster/seat-roster.module.code.ts"

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

export function countLiveSeatChildren(parentAgentId: string): number {
  return seatChildrenOf(parentAgentId).length
}

if (import.meta.main) {
  const parent = process.argv[2] ?? ""
  process.stdout.write(`${parent === "" ? 0 : countLiveSeatChildren(parent)}\n`)
}
