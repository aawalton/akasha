import {
  depsAt,
  ranOnce,
} from "akasha/alan/track/to-do/modules/on-complete-running/on-complete-running.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-checkout/service-checkout.module.code.ts"

export async function runService(): Promise<undefined> {
  const done = await ranOnce(depsAt(checkoutAt()), new Date())
  for (const one of done.said) process.stdout.write(`${one}\n`)
  if (done.wrong.length > 0) throw new Error(done.wrong.join("\n"))
  return undefined
}
