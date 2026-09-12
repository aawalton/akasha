import { carryEachReading } from "akasha/alan/harness/readouts/modules/relay-carrying/readout-relay-carrying.module.code.ts"

const CARRIES = [
  { point: "readout/upkeep-safety", to: "https://alanwalton.com" },
  { point: "readout/upkeep-safety", to: "https://smilingjenny.me" },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
