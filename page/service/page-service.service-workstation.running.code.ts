import { checkoutAt } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-checkout/service-checkout.module.code.ts"
import { runPageListening } from "akasha/page/service/modules/page-listening/page-listening.module.code.ts"

const NEVER: Promise<never> = new Promise(() => {})

export async function runService(): Promise<never> {
  runPageListening(checkoutAt())
  return await NEVER
}
