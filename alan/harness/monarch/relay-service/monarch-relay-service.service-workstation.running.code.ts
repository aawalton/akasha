import { carryEachReading } from "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"

const CARRIES = [
  { point: "readout/monarch-unreviewed-transactions", to: "https://alanwalton.com" },
  { point: "readout/monarch-unreviewed-transactions", to: "https://smilingjenny.me" },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
