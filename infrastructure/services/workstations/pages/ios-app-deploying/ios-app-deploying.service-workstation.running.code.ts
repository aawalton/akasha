import { IOS_APP } from "akasha/commands/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import { ticked } from "akasha/infrastructure/services/modules/deploy-looping/deploy-looping.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/services/workstations/modules/service-checkout/service-checkout.module.code.ts"

export async function runService(): Promise<undefined> {
  const done = await ticked(checkoutAt(), IOS_APP)
  for (const one of done.said) process.stdout.write(`${one}\n`)
  if (done.wrong.length > 0) throw new Error(done.wrong.join("\n"))
  return undefined
}
