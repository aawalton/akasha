import { WEB_APP } from "akasha/commands/pages/deploy/kind-reading/deploy-kind-reading.module.code.ts"
import { ticked } from "akasha/infrastructure/services/deploy-looping/deploy-looping.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"

export function runService(): undefined {
  const done = ticked(checkoutAt(), WEB_APP)
  for (const one of done.said) process.stdout.write(`${one}\n`)
  if (done.wrong.length > 0) throw new Error(done.wrong.join("\n"))
  return undefined
}
