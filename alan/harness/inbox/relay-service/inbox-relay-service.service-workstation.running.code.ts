import { inboxesEmail } from "akasha/alan/harness/inbox/readouts/inboxes-email/inboxes-email.readout.ts"
import { inboxesTasks } from "akasha/alan/harness/inbox/readouts/inboxes-tasks/inboxes-tasks.readout.ts"
import { carryEachReading } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"
import { inboxesTemperTasks } from "akasha/temper/progress/inboxes-temper-tasks/inboxes-temper-tasks.readout.ts"

const TO = "https://alanwalton.com"

const CARRIES = [
  { point: `${readout.slug}/${inboxesEmail.slug}`, to: TO },
  { point: `${readout.slug}/${inboxesTasks.slug}`, to: TO },
  { point: `${readout.slug}/${inboxesTemperTasks.slug}`, to: TO },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
