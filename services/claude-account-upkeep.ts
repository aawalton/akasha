#!/usr/bin/env bun

import { UPKEEP_PERIOD_MS } from "@akasha/agents/claude-account-oauth"
import { everyAccountStateIn, lastWindowTriggerAcross } from "@akasha/agents/claude-account-reading"
import { DOORS, upkeepPassIn } from "@akasha/agents/claude-account-upkeep"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"

const LOG = "[claude-account-upkeep]"
const TICK_INTERVAL_MS = UPKEEP_PERIOD_MS

const HELP = `bun services/claude-account-upkeep.ts — keep every claude account's token and usage current

One workstation process, and the only thing anywhere that renews a token — the model gateway,
seat startup, the local credential file and the account picker all read a credential now and
none of them makes one.

Once an hour it goes through the claude-account pages in alphabetical order and, for each
account that is not subscription-disabled, renews the OAuth token, reads the usage endpoint,
and writes both back onto the account. Where a rate-limit window has gone inactive it sends a
one-token message to start the next one and reads the usage again. Accounts are a minute apart,
so a pass over eight of them takes about seven minutes.

It observes and records; it decides nothing about which account a call goes on.

At boot it asks when a window was last triggered on any account. Where that was inside the past
hour it waits out the remainder before its first pass, so a restart does not trigger a second
window inside the hour.

It runs until stopped. SIGTERM and SIGINT both end the loop at its next boundary.

Whether it is still running is not this to answer — \`services/claude-account-upkeep-stall.ts\` rules on
that from the stamps this leaves on each page.

Usage:
  bun services/claude-account-upkeep.ts
  --help  This.
`

function sleepAbortable(ms: number, signal: AbortSignal): Promise<boolean> {
  if (signal.aborted) return Promise.resolve(false)
  return new Promise<boolean>((resolve) => {
    const cleanup = (): undefined => {
      clearTimeout(timer)
      signal.removeEventListener("abort", onAbort)
    }
    const onAbort = (): undefined => {
      cleanup()
      resolve(false)
    }
    const timer = setTimeout(() => {
      cleanup()
      resolve(true)
    }, ms)
    signal.addEventListener("abort", onAbort, { once: true })
  })
}

async function computeStartupDelayMs(root: string): Promise<number> {
  try {
    const lastTriggerMs = lastWindowTriggerAcross(everyAccountStateIn(root).values())
    if (lastTriggerMs === null) return 0
    if (!Number.isFinite(lastTriggerMs)) return 0
    const msSince = Date.now() - lastTriggerMs
    if (!Number.isFinite(msSince) || msSince < 0) return 0
    if (msSince >= TICK_INTERVAL_MS) return 0
    return TICK_INTERVAL_MS - msSince
  } catch (err) {
    console.warn(`${LOG} startup-delay query failed; ticking immediately:`, err)
    return 0
  }
}

async function main(): Promise<void> {
  if (process.argv.slice(2).some((one) => one === "--help" || one === "-h")) {
    process.stdout.write(HELP)
    return
  }

  const root = rootFor(resolveRoots(), AKASHA)

  const ac = new AbortController()
  process.on("SIGTERM", () => ac.abort())
  process.on("SIGINT", () => ac.abort())

  console.log(`${LOG} starting tick loop pid=${process.pid} tick=${TICK_INTERVAL_MS}ms`)

  const startupDelay = await computeStartupDelayMs(root)
  if (startupDelay > 0) {
    console.log(
      `${LOG} startup delay ${Math.round(startupDelay / 1000)}s — ` +
        "a window was triggered inside the hour, deferring"
    )
    const waited = await sleepAbortable(startupDelay, ac.signal)
    if (!waited) {
      console.log(`${LOG} stopping`)
      return
    }
  }

  while (!ac.signal.aborted) {
    try {
      await upkeepPassIn({ root, doors: DOORS, logPrefix: LOG })
    } catch (err) {
      if (!ac.signal.aborted) console.error(`${LOG} tick threw:`, err)
    }
    const slept = await sleepAbortable(TICK_INTERVAL_MS, ac.signal)
    if (!slept) break
  }

  console.log(`${LOG} stopping`)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error("claude-account-upkeep fatal:", err)
    process.exit(1)
  })
}
