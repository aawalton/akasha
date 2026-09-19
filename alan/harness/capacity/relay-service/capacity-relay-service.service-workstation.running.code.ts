import { upkeepCapacity } from "akasha/alan/harness/capacity/readouts/upkeep-capacity/upkeep-capacity.readout.ts"
import { carryEachReading } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"

const CAPACITY = `${readout.slug}/${upkeepCapacity.slug}` as const

const CARRIES = [
  { point: CAPACITY, to: "https://alanwalton.com" },
  { point: CAPACITY, to: "https://smilingjenny.me" },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
