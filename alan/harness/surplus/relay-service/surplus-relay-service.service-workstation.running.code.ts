import {
  carryReadingBeside,
  NO_SECRET_TO_CARRY_ON,
  RELAY_SECRET_NAME,
  statedIn,
} from "akasha/alan/harness/readouts/relay/readout-relay.module.code.ts"
import { pathOf } from "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const POINT = "readout/upkeep-surplus"

const SHOWN_AT = ["https://alanwalton.com", "https://smilingjenny.me"]

export async function runService(): Promise<void> {
  const secret = statedIn(process.env, RELAY_SECRET_NAME)
  if (secret === null) throw new Error(NO_SECRET_TO_CARRY_ON)
  const root = checkoutAt()
  const page = pathOf(root, POINT)
  if (typeof page !== "string") {
    process.stderr.write(`${page.refused}\n`)
    return
  }
  for (const site of SHOWN_AT) {
    try {
      process.stdout.write(`${await carryReadingBeside(root, page, site, secret)}\n`)
    } catch (thrown) {
      process.stderr.write(`${saidBy(thrown)}\n`)
    }
  }
}
