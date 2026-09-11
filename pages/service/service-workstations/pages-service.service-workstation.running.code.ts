import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"
import { runPageListening } from "akasha/pages/service/page-listening/page-listening.module.code.ts"

const NEVER: Promise<never> = new Promise(() => {})

export async function runService(): Promise<never> {
  runPageListening(checkoutAt())
  return await NEVER
}
