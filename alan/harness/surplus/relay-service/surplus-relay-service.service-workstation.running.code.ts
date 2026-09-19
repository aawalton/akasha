import { carryEachReading } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"
import { upkeepSurplus } from "akasha/alan/harness/surplus/readouts/upkeep-surplus/upkeep-surplus.readout.ts"

const SURPLUS = `${readout.slug}/${upkeepSurplus.slug}` as const

const CARRIES = [
  { point: SURPLUS, to: "https://alanwalton.com" },
  { point: SURPLUS, to: "https://smilingjenny.me" },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
