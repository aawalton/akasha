import { inferenceHealthFor } from "akasha/infrastructure/service/akasha-service/service-inference/modules/inference-health/inference-health.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-checkout/service-checkout.module.code.ts"
import {
  lookedBeside,
  sayEach,
  sayingOf,
  type Verdict,
  watcherPageIn,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-wellness/service-wellness.module.code.ts"

const SLUG = "inference-watching"

const SAID = "inference-watching:"

export async function ticking(
  root: string,
  now: Date,
  look: (checkout: string) => Promise<readonly Verdict[]> = inferenceHealthFor
): Promise<readonly string[]> {
  const health = await look(root)
  const wrote = lookedBeside(root, health, now.toISOString(), watcherPageIn(root, SLUG))
  return sayingOf(health, wrote)
}

export async function runInferenceWatching(): Promise<void> {
  sayEach(SAID, await ticking(checkoutAt(), new Date()))
}
