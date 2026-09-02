#!/usr/bin/env bun
export const tool = {
  summary: "Tell Alan when the day has spent his night down a rung",
  repos: ["akasha"],
} as const

import { TICKS_BEFORE_ENDING, tickRatchet } from "../tools/lib/tick-ratchet.ts"
import {
  GROUP_SLUG,
  LOG,
  runBoundedSurplusFallTick,
  TICK_CEILING_MS,
  TICK_MS,
  WORKER_NAME,
} from "../tools/lib/surplus-fall/tick.ts"

const HELP = `bun services/surplus-fall-notifier.ts — the day eating into the night, said once per rung

One workstation process. Every ${TICK_MS / 1000} seconds it reads the one readout in the
\`${GROUP_SLUG}\` group two ways for today, and compares them.

Where the day OPENED is what Alan slept, placed on the readout's own scale, before anything
the day costs has come off it. Where it STANDS is the readout's reading now. A stand below the
open is a fall, and a fall is worth telling him about.

A RUNG IS SAID ONLY WHERE IT IS WORSE THAN THE WORST ALREADY SAID TODAY, and what was already
said today is read back off the notifications already sent, each of which names its rung in its
own \`source\`. A day that drops two rungs between ticks therefore says the one it reached and
never the one between, and a reading that recovers and falls again says nothing the second time.

The readout, its scale and its source are read as pages through the page query service, so a
threshold Alan moves is honoured on the next tick rather than on a deploy.

What this writes is a notification. Reaching his phone is the push notifier's job, and this
knows nothing about devices.

A tick still working ${TICK_CEILING_MS / 1000} seconds after it started ends the process
rather than leaving a second one to start beside it, and systemd restarts it.

A THROWN TICK IS NEVER SWALLOWED FOR LONG. ${TICKS_BEFORE_ENDING} throws in a row end the
process nonzero; systemd restarts it, and enough of those inside the unit's start-limit window
fail the unit outright. One throw is a store blinking. ${TICKS_BEFORE_ENDING} is a service that
has stopped working, and a service that has stopped working must not read as healthy.

It runs until stopped. SIGTERM and SIGINT both end the loop at its next boundary.

Usage:
  bun services/surplus-fall-notifier.ts
  --help  This.

Environment:
  PAGE_QUERY_ORIGIN  The page query service the readout, its reading and the day's page are
                     read through, and the feed and that page are written through.
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

  console.log(
    `${LOG} starting tick loop pid=${process.pid} tick=${TICK_MS}ms ceiling=${TICK_CEILING_MS}ms`
  )

  const ratchet = tickRatchet(WORKER_NAME, TICKS_BEFORE_ENDING)

  while (!ac.signal.aborted) {
    try {
      await runBoundedSurplusFallTick(WORKER_NAME, ac.signal)
      ratchet.worked()
    } catch (err) {
      if (ac.signal.aborted) break
      console.error(`${LOG} tick threw (${ratchet.threw()} in a row):`, err)
      if (ratchet.spent()) {
        console.error(`${LOG} ${ratchet.why()}`)
        process.exit(1)
      }
    }
    const slept = await sleepAbortable(TICK_MS, ac.signal)
    if (!slept) break
  }

  console.log(`${LOG} stopping`)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(`${LOG} fatal:`, err)
    process.exit(1)
  })
}
