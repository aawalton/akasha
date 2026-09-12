import {
  akashaHolderProcessOf,
  akashaSeatIdForName,
} from "akasha/seat-system/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import {
  type SeatPresence,
  statedProcessPresence,
} from "akasha/seat-system/seat-proc-key/seat-proc-key.module.code.ts"

export interface SeatByName {
  readonly id: string
  readonly name: string
  readonly presence: SeatPresence
}

export function seatByName(name: string): SeatByName | null {
  const id = akashaSeatIdForName(name)
  if (id === null) return null
  return { id, name, presence: statedProcessPresence(akashaHolderProcessOf(id)) }
}
