import { carryEachReading } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"

const CARRIES = [
  { point: "readout/upkeep-sleep", to: "https://alanwalton.com" },
  { point: "readout/upkeep-sleep", to: "https://smilingjenny.me" },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
