import { isMainThread, workerData } from "node:worker_threads"
import { checkoutAt } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-checkout/service-checkout.module.code.ts"

const NEVER: Promise<never> = new Promise(() => {})

export async function runService(): Promise<undefined> {
  if (!isMainThread) {
    const reading = await import(
      "akasha/page/service/modules/read-answering/read-answering.module.code.ts"
    )
    if (typeof workerData === "object" && workerData !== null && reading.THREADED in workerData) {
      return reading.answeringOnThread()
    }
    const { landingOnThread } = await import(
      "akasha/page/service/modules/page-landing/page-landing.module.code.ts"
    )
    return landingOnThread()
  }
  const { runPageListening } = await import(
    "akasha/page/service/modules/page-listening/page-listening.module.code.ts"
  )
  runPageListening(checkoutAt())
  return await NEVER
}
