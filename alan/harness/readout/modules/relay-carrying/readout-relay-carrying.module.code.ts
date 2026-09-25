import { readoutsServedBy } from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import {
  carryReadingBeside,
  NO_SECRET_TO_CARRY_ON,
  RELAY_SECRET_NAME,
  sitesCarriedTo,
  statedIn,
} from "akasha/alan/harness/readout/modules/relay/readout-relay.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-checkout/service-checkout.module.code.ts"

type Carry = {
  readonly page: string
  readonly to: string
}

function carriesServedBy(root: string, servedBy: string): readonly Carry[] {
  const carries: Carry[] = []
  for (const { path, value } of readoutsServedBy(root, servedBy)) {
    try {
      for (const to of sitesCarriedTo(root, value)) carries.push({ page: path, to })
    } catch (thrown) {
      process.stderr.write(`${saidBy(thrown)}\n`)
    }
  }
  return carries
}

export async function carryReadingsServedBy(servedBy: string): Promise<undefined> {
  const secret = statedIn(process.env, RELAY_SECRET_NAME)
  if (secret === null) throw new Error(NO_SECRET_TO_CARRY_ON)
  const root = checkoutAt()
  for (const { page, to } of carriesServedBy(root, servedBy)) {
    try {
      process.stdout.write(`${await carryReadingBeside(root, page, to, secret)}\n`)
    } catch (thrown) {
      process.stderr.write(`${saidBy(thrown)}\n`)
    }
  }
}
