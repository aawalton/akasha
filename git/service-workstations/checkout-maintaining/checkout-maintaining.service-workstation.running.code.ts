import { ranGit } from "akasha/git/modules/capping/git-capping.module.code.ts"
import { holding } from "akasha/git/modules/holding/holding.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-checkout/service-checkout.module.code.ts"

const BATCH = 50_000

const BOUND_MS = 240_000

const SAID = "checkout-maintaining:"

const PACKING: readonly string[] = [
  "-c",
  `maintenance.loose-objects.batchSize=${BATCH}`,
  "maintenance",
  "run",
  "--task=loose-objects",
]

export function runService(): Promise<undefined> {
  const root = checkoutAt()
  const done = holding(root, () => ranGit(root, PACKING, { ceilingMs: BOUND_MS }))
  const why = new TextDecoder().decode(done.stderr).trim()
  if (done.code !== 0) throw new Error(`${SAID} git maintenance exited ${done.code}: ${why}`)
  process.stdout.write(`${SAID} packed up to ${BATCH} loose objects\n`)
  return Promise.resolve(undefined)
}
