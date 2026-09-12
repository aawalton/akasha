import { carryEachReading } from "akasha/alan/harness/readouts/modules/relay-carrying/readout-relay-carrying.module.code.ts"

const CARRIES = [
  { point: "readout/inboxes-email", to: "https://alanwalton.com" },
  { point: "readout/inboxes-tasks", to: "https://alanwalton.com" },
  { point: "readout/inboxes-temper-tasks", to: "https://alanwalton.com" },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
