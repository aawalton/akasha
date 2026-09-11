import { carryEachReading } from "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"

const CARRIES = [
  { point: "readout/cost-multiplier", to: "https://alanwalton.com" },
  { point: "readout/cost-multiplier", to: "https://smilingjenny.me" },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
