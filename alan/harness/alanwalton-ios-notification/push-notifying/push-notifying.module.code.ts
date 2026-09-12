import { apnsSenderFromEnv } from "akasha/alan/harness/alanwalton-ios-notification/modules/apns-sending/apns-sending.module.code.ts"
import {
  LOG,
  openState,
  runBoundedPushNotifierTick,
  TICK_CEILING_MS,
  TICK_MS,
  WORKER_NAME,
} from "akasha/alan/harness/alanwalton-ios-notification/push-notifier-tick/push-notifier-tick.module.code.ts"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "akasha/infrastructure/services/workstations/tick-sleeping/tick-sleeping.module.code.ts"

export async function runPushNotifying(): Promise<void> {
  const ac = stopsOnSignal()

  const { sender, why } = apnsSenderFromEnv()
  if (why !== null) console.log(`${LOG} ${why}`)
  else console.log(`${LOG} APNs is provisioned; pushes are delivered`)

  const state = await openState()
  console.log(
    `${LOG} starting tick loop pid=${process.pid} tick=${TICK_MS}ms ceiling=${TICK_CEILING_MS}ms ` +
      `from=${state.sentThrough}`
  )

  while (!ac.signal.aborted) {
    const done: string[] = []
    try {
      await runBoundedPushNotifierTick(state, { sender, writer: WORKER_NAME }, ac.signal, done)
    } catch (err) {
      if (!ac.signal.aborted) {
        console.error(`${LOG} tick threw:`, err)
        for (const one of done) console.error(`${LOG} the tick had already done this: ${one}`)
      }
    }
    const slept = await sleptUntilStopped(TICK_MS, ac.signal)
    if (!slept) break
  }

  sender?.close()
  console.log(`${LOG} stopping`)
}

if (import.meta.main) {
  runPushNotifying().catch((err) => {
    console.error(`${LOG} fatal:`, err)
    process.exit(1)
  })
}
