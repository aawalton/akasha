import { runAuditListening } from "akasha/check/modules/audit-listening/audit-listening.module.code.ts"
import { roundNow } from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/workstation/modules/service-checkout/service-checkout.module.code.ts"
import { sleptUntilStopped } from "akasha/infrastructure/service/workstation/modules/tick-sleeping/tick-sleeping.module.code.ts"

const AN_HOUR_MS = 3_600_000

const EVERY_CHECK: readonly string[] = []

const SAID = "audit-running:"

const NEVER_STOPS = new AbortController().signal

export async function runService(): Promise<never> {
  runAuditListening(checkoutAt())
  for (;;) {
    try {
      await roundNow(EVERY_CHECK)
    } catch (thrown) {
      process.stderr.write(`${SAID} ${saidBy(thrown)}\n`)
    }
    await sleptUntilStopped(AN_HOUR_MS, NEVER_STOPS)
  }
}
