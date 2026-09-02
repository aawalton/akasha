#!/usr/bin/env bun
export const tool = {
  summary: "Push every notification written for Alan at his devices",
  repos: ["akasha"],
} as const

import { apnsSenderFromEnv, APNS_AUTH_KEY_ENV } from "../tools/lib/push-notification/apns.ts"
import {
  LOG,
  openState,
  runBoundedPushNotifierTick,
  TICK_CEILING_MS,
  TICK_MS,
  WORKER_NAME,
} from "../tools/lib/push-notification/tick.ts"

const HELP = `bun services/apns-push-notifier.ts — Alan's notifications reach his phone

One workstation process. Every ${TICK_MS / 1000} seconds it does one thing.

It pushes every notification written since the one it last saw. A notification stands as a row
in the feed of the person it was pushed at, so the feed is what this watches; the first tick
after a start begins at the newest row already standing, which is why a start is not a flood.
The cursor moves past each notification as it goes and only ever moves forward, so nothing it
has passed is offered a second time.

NO PUSH CARRIES AN APP-ICON BADGE. It used to carry the open-question count, and a second leg
refreshed the badge on its own when that count fell. The questions system is gone and nothing
else was ever counted, so both went with it rather than leaving a number stuck at zero.

WITHOUT ${APNS_AUTH_KEY_ENV} NOTHING IS SENT. The provider token is signed from that PEM, and
with it unset every push is a logged no-op and the feed is still followed, so nothing is
pushed twice once it is set. It reaches this process from \`~/.secrets.env\`, which the
service wrapper sources.

A tick still working ${TICK_CEILING_MS / 1000} seconds after it started ends the process
rather than leaving a second one to start beside it, and systemd restarts it.

It runs until stopped. SIGTERM and SIGINT both end the loop at its next boundary.

Usage:
  bun services/apns-push-notifier.ts
  --help  This.

Environment:
  ${APNS_AUTH_KEY_ENV}  The APNs .p8 signing key, as PEM. Unset, nothing is sent.
  PAGE_QUERY_ORIGIN  The page query service the notifications are read through, and the
                     feed is written through.
`

function sleepAbortable(ms: number, signal: AbortSignal): Promise<boolean> {
  if (signal.aborted) return Promise.resolve(false)
  return new Promise<boolean>((resolve) => {
    const cleanup = (): undefined => {
      clearTimeout(timer)
      signal.removeEventListener("abort", onAbort)
      return undefined
    }
    const onAbort = (): undefined => {
      cleanup()
      resolve(false)
      return undefined
    }
    const timer = setTimeout(() => {
      cleanup()
      resolve(true)
    }, ms)
    signal.addEventListener("abort", onAbort, { once: true })
  })
}

async function main(): Promise<void> {
  if (process.argv.slice(2).some((one) => one === "--help" || one === "-h")) {
    process.stdout.write(HELP)
    return
  }

  const ac = new AbortController()
  process.on("SIGTERM", () => ac.abort())
  process.on("SIGINT", () => ac.abort())

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
    const slept = await sleepAbortable(TICK_MS, ac.signal)
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
