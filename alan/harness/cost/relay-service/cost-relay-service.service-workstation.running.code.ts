import { costMultiplier } from "akasha/alan/harness/cost/readouts/multiplier/cost-multiplier.readout.ts"
import { carryEachReading } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"

const MULTIPLIER = `${readout.slug}/${costMultiplier.slug}` as const

const CARRIES = [
  { point: MULTIPLIER, to: "https://alanwalton.com" },
  { point: MULTIPLIER, to: "https://smilingjenny.me" },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
