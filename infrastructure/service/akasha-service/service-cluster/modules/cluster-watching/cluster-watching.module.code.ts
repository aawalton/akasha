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
  sayEach,
  sayingOf,
  watcherPageIn,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-wellness/service-wellness.module.code.ts"
import {
  type Fetched,
  webAppHealthFor,
} from "akasha/infrastructure/service/akasha-service/web-app/modules/host-answering/host-answering.module.code.ts"

const SLUG = "cluster-watching"
const SAID = "cluster-watching:"

export async function ticking(given: {
  readonly root: string
  readonly now: Date
  readonly ask?: () => Ran
  readonly askOn?: AskedOn
  readonly fetched?: Fetched
}): Promise<readonly string[]> {
  const health = healthFor(given.root, given.ask, given.now)
  if (typeof health === "string") {
    throw new Error(`${SAID} the cluster could not be read, so nothing is judged: ${health}`)
  }
  const founded = await foundationHealthFor(given.root, given.askOn)
  const saidFounded = sayingOf(founded, keepVerdicts(given.root, founded))
  const served = await webAppHealthFor(given.root, given.fetched)
  const saidServed = sayingOf(served, keepVerdicts(given.root, served))
  const own = watcherPageIn(given.root, SLUG)
  const wrote = lookedBeside(given.root, health, given.now.toISOString(), own)
  return [...sayingOf(health, wrote), ...saidFounded, ...saidServed]
}

export async function runClusterWatching(): Promise<void> {
  sayEach(SAID, await ticking({ root: checkoutAt(), now: new Date() }))
}
