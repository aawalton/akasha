import { carryEachReading } from "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"

const CARRIES = [
  { point: "readout/attribute-strength", to: "https://alanwalton.com" },
  { point: "readout/attribute-endurance", to: "https://alanwalton.com" },
  { point: "readout/attribute-constitution", to: "https://alanwalton.com" },
  { point: "readout/attribute-wisdom", to: "https://alanwalton.com" },
  { point: "readout/attribute-intelligence", to: "https://alanwalton.com" },
  { point: "readout/attribute-charisma", to: "https://alanwalton.com" },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
