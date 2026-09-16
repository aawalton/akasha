import { asked } from "akasha/check/modules/audit-asking/audit-asking.module.code.ts"
import { roundFor } from "akasha/check/modules/audit-job/audit-job.module.code.ts"
import { runAuditListening } from "akasha/check/modules/audit-listening/audit-listening.module.code.ts"
import {
  commitOf,
  refusingHere,
  roundNow,
} from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"
import { checksAt, checksIn } from "akasha/check/modules/checking/checking.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/workstation/modules/service-checkout/service-checkout.module.code.ts"
import { sleptUntilStopped } from "akasha/infrastructure/service/workstation/modules/tick-sleeping/tick-sleeping.module.code.ts"

const AN_HOUR_MS = 3_600_000

const EVERY_CHECK: readonly string[] = []

const AUDIT = "audit"

const SAID = "audit-running:"

const NEVER_STOPS = new AbortController().signal

async function judgedInCluster(root: string): Promise<undefined> {
  const commit = await commitOf(root)
  const checks = checksAt(checksIn(root), AUDIT).map((one) => one.slug)
  const told = await asked({ root, checks, commit, round: roundFor(root, commit) })
  if (told.broken !== null) process.stderr.write(`${SAID} ${told.broken}\n`)
}

export async function runService(): Promise<never> {
  const root = checkoutAt()
  runAuditListening(root)
  for (;;) {
    try {
      await judgedInCluster(root)
      await roundNow(EVERY_CHECK, refusingHere)
    } catch (thrown) {
      process.stderr.write(`${SAID} ${saidBy(thrown)}\n`)
    }
    await sleptUntilStopped(AN_HOUR_MS, NEVER_STOPS)
  }
}
