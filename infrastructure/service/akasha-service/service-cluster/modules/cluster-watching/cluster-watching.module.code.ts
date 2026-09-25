import {
  type AskedOn,
  foundationHealthFor,
} from "akasha/infrastructure/service/akasha-service/cluster-foundation/modules/foundation-health/foundation-health.module.code.ts"
import { healthFor } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/cluster-health/cluster-health.module.code.ts"
import type { Ran } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-deploying/workload-deploying.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-checkout/service-checkout.module.code.ts"
import {
  keepVerdicts,
  lookedBeside,
  type Verdict,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-wellness/service-wellness.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const SLUG = "cluster-watching"
const SERVICE_WORKSTATION = "service-workstation"
const SAID = "cluster-watching:"

export function ownPageIn(root: string): string | null {
  return listedAt(root, SERVICE_WORKSTATION, SLUG)[0]?.path ?? null
}

export function sayingOf(health: readonly Verdict[], wrote: readonly string[]): readonly string[] {
  return health
    .filter((one) => wrote.includes(one.slug))
    .map((one) =>
      one.broken === null ? `${one.slug} is well` : `${one.slug} is broken: ${one.broken}`
    )
}

export async function ticking(given: {
  readonly root: string
  readonly now: Date
  readonly ask?: () => Ran
  readonly askOn?: AskedOn
}): Promise<readonly string[]> {
  const health = healthFor(given.root, given.ask, given.now)
  if (typeof health === "string") {
    throw new Error(`${SAID} the cluster could not be read, so nothing is judged: ${health}`)
  }
  const founded = await foundationHealthFor(given.root, given.askOn)
  const saidFounded = sayingOf(founded, keepVerdicts(given.root, founded))
  const wrote = lookedBeside(given.root, health, given.now.toISOString(), ownPageIn(given.root))
  return [...sayingOf(health, wrote), ...saidFounded]
}

export async function runClusterWatching(): Promise<void> {
  for (const line of await ticking({ root: checkoutAt(), now: new Date() })) {
    process.stdout.write(`${SAID} ${line}\n`)
  }
}
