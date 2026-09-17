import { runAuditListening } from "akasha/check/modules/audit-listening/audit-listening.module.code.ts"
import { roundJoined } from "akasha/check/modules/audit-round/audit-round.module.code.ts"
import { cleanly, measured } from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/workstation/modules/service-checkout/service-checkout.module.code.ts"
import { sleptUntilStopped } from "akasha/infrastructure/service/workstation/modules/tick-sleeping/tick-sleeping.module.code.ts"
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

const AN_HOUR_MS = 3_600_000

const SAID = "audit-running:"

const NEVER_STOPS = new AbortController().signal

async function judgedInCluster(root: string): Promise<undefined> {
  const told = await roundJoined(root)
  const red = told.ran.filter((one) => measured(one.verdict) && !cleanly(one.verdict)).length
  const nothing = told.ran.filter((one) => !measured(one.verdict)).length
  process.stdout.write(
    `${SAID} ${counted(told.ran.length, "audit")}, ${red} refusing, ${nothing} unmeasured\n`
  )
  for (const one of told.refused) process.stderr.write(`${SAID} ${one}\n`)
}

export async function runService(): Promise<never> {
  const root = checkoutAt()
  runAuditListening(root, async (checks) => await roundJoined(root, checks))
  for (;;) {
    try {
      await judgedInCluster(root)
    } catch (thrown) {
      process.stderr.write(`${SAID} ${saidBy(thrown)}\n`)
    }
    await sleptUntilStopped(AN_HOUR_MS, NEVER_STOPS)
  }
}
