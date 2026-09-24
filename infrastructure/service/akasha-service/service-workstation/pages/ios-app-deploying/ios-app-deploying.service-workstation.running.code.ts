import { IOS_APP } from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import { ticked } from "akasha/infrastructure/service/akasha-service/modules/deploy-looping/deploy-looping.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-checkout/service-checkout.module.code.ts"

export async function runService(): Promise<undefined> {
  const done = await ticked(checkoutAt(), IOS_APP)
  for (const one of done.said) process.stdout.write(`${one}\n`)
  if (done.wrong.length > 0) throw new Error(done.wrong.join("\n"))
  return undefined
}
