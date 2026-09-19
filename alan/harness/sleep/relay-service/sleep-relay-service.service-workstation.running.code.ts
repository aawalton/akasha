import { carryEachReading } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"
import { upkeepSleep } from "akasha/alan/harness/sleep/readouts/upkeep-sleep/upkeep-sleep.readout.ts"

const SLEEP = `${readout.slug}/${upkeepSleep.slug}` as const

const CARRIES = [
  { point: SLEEP, to: "https://alanwalton.com" },
  { point: SLEEP, to: "https://smilingjenny.me" },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
