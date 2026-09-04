import {
  sleptUntilStopped,
  stopsOnSignal,
} from "../../../../service-system/workstation-services/tick-sleeping/tick-sleeping.module.code.ts"
import { apnsSenderFromEnv } from "../apns-sending/apns-sending.module.code.ts"
import {
  LOG,
  openState,
  runBoundedPushNotifierTick,
  TICK_CEILING_MS,
  TICK_MS,
  WORKER_NAME,
} from "../push-notifier-tick/push-notifier-tick.module.code.ts"

async function main(): Promise<void> {
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
    try {
      await runBoundedPushNotifierTick(state, { sender, writer: WORKER_NAME }, ac.signal)
    } catch (err) {
      if (!ac.signal.aborted) console.error(`${LOG} tick threw:`, err)
    }
    const slept = await sleptUntilStopped(TICK_MS, ac.signal)
    if (!slept) break
  }

  sender?.close()
  console.log(`${LOG} stopping`)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(`${LOG} fatal:`, err)
    process.exit(1)
  })
}
