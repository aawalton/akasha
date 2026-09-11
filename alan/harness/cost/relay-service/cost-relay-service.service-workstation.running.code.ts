import {
  carryReadingBeside,
  NO_SECRET_TO_CARRY_ON,
  RELAY_SECRET_NAME,
  statedIn,
} from "akasha/alan/harness/readouts/relay/readout-relay.module.code.ts"
import { pathOf } from "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const READOUT = "readout/cost-multiplier"

const SHOWN_ON: readonly string[] = ["https://alanwalton.com", "https://smilingjenny.me"]

const REFUSED_EXIT = 2

export async function runService(): Promise<void> {
  const root = checkoutAt()
  const page = pathOf(root, READOUT)
  if (typeof page !== "string") {
    process.stderr.write(`${page.refused}\n`)
    return process.exit(REFUSED_EXIT)
  }
  const secret = statedIn(process.env, RELAY_SECRET_NAME)
  if (secret === null) {
    process.stderr.write(`${NO_SECRET_TO_CARRY_ON}\n`)
    return process.exit(REFUSED_EXIT)
  }
  for (const to of SHOWN_ON) {
    try {
      process.stdout.write(`${await carryReadingBeside(root, page, to, secret)}\n`)
    } catch (thrown) {
      process.stderr.write(`${saidBy(thrown)}\n`)
    }
  }
}
