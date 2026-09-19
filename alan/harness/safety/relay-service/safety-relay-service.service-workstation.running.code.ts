import { carryEachReading } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"
import { upkeepSafety } from "akasha/alan/harness/safety/readouts/upkeep-safety/upkeep-safety.readout.ts"

const SAFETY = `${readout.slug}/${upkeepSafety.slug}` as const

const CARRIES = [
  { point: SAFETY, to: "https://alanwalton.com" },
  { point: SAFETY, to: "https://smilingjenny.me" },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
