import { upkeepPlants } from "akasha/alan/harness/plant/readouts/upkeep-plants/upkeep-plants.readout.ts"
import { carryEachReading } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"

const PLANTS = `${readout.slug}/${upkeepPlants.slug}` as const

const CARRIES = [
  { point: PLANTS, to: "https://alanwalton.com" },
  { point: PLANTS, to: "https://smilingjenny.me" },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
