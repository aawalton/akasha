import {
  carryReadingBeside,
  NO_SECRET_TO_CARRY_ON,
  RELAY_SECRET_NAME,
  statedIn,
} from "akasha/alan/harness/readouts/relay/readout-relay.module.code.ts"
import { pathOf } from "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const CARRIES = ["readout/inboxes-email", "readout/inboxes-tasks", "readout/inboxes-temper-tasks"]

const TO = "https://alanwalton.com"

export async function runService(): Promise<void> {
  const secret = statedIn(process.env, RELAY_SECRET_NAME)
  if (secret === null) throw new Error(NO_SECRET_TO_CARRY_ON)
  const root = checkoutAt()
  for (const named of CARRIES) {
    const at = pathOf(root, named)
    if (typeof at !== "string") throw new Error(at.refused)
    try {
      process.stdout.write(`${await carryReadingBeside(root, at, TO, secret)}\n`)
    } catch (thrown) {
      process.stderr.write(`${saidBy(thrown)}\n`)
    }
  }
}
