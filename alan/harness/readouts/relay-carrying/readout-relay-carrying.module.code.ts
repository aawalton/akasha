import {
  carryReadingBeside,
  NO_SECRET_TO_CARRY_ON,
  RELAY_SECRET_NAME,
  statedIn,
} from "akasha/alan/harness/readouts/relay/readout-relay.module.code.ts"
import { pathOf } from "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

export type Carry = {
  readonly point: string
  readonly to: string
}

export async function carryEachReading(carries: readonly Carry[]): Promise<undefined> {
  const secret = statedIn(process.env, RELAY_SECRET_NAME)
  if (secret === null) throw new Error(NO_SECRET_TO_CARRY_ON)
  const root = checkoutAt()
  for (const { point, to } of carries) {
    const page = pathOf(root, point)
    if (typeof page !== "string") {
      process.stderr.write(`${page.refused}\n`)
      continue
    }
    try {
      process.stdout.write(`${await carryReadingBeside(root, page, to, secret)}\n`)
    } catch (thrown) {
      process.stderr.write(`${saidBy(thrown)}\n`)
    }
  }
}
