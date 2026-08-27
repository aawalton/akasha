#!/usr/bin/env bun
export const tool = {
  summary: "Run the recipient-resolver daemon",
  repos: ["akasha"],
} as const

import { listPersonHandlers } from "../tools/lib/person-handler-slugs.ts"
import { listPersonaSlugs, listPersonaWakeSources } from "../tools/lib/persona-wake-slugs.ts"
import { resolveRecipientResolverConfig, recipientResolverConfigBanner } from "../tools/lib/recipient-resolver-config.ts"
import { defaultRecipientResolverDeps } from "../tools/lib/recipient-resolver-deps.ts"
import { assembleRecipientResolverSpecs } from "../tools/lib/recipient-resolver-registry.ts"
import { runRecipientResolverTick } from "../tools/lib/recipient-resolver-tick.ts"

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

const HELP = `bun services/recipient-resolver-daemon.ts — revives absent seats when their work arrives

One systemd-managed process, outside the fleet it serves. Each tick it assembles the armed specs
afresh, reads each one's inbound messages, and revives a seat whose page does not stand and whose
inbound work matches.

It runs until stopped. SIGTERM and SIGINT both end the loop at its next boundary.

Usage:
  bun services/recipient-resolver-daemon.ts
  --help  This.

Environment:
  RECIPIENT_RESOLVER_DRY_RUN  Log what would be revived and spawn nothing. Off by default.
`

async function main(): Promise<void> {
  if (process.argv.slice(2).some((one) => one === "--help" || one === "-h")) {
    process.stdout.write(HELP)
    return
  }
  const ac = new AbortController()
  process.on("SIGTERM", () => ac.abort())
  process.on("SIGINT", () => ac.abort())

  const config = resolveRecipientResolverConfig()

  const effects = defaultRecipientResolverDeps(ac.signal, config)

  console.log(recipientResolverConfigBanner(config))
  console.log(
    `recipient-resolver: starting tick loop pid=${process.pid} specs=dynamic (per-tick persona enumeration + explicit statics)`
  )

  while (!ac.signal.aborted) {
    try {
      const specs = await assembleRecipientResolverSpecs(
        listPersonaSlugs,
        listPersonaWakeSources,
        listPersonHandlers
      )
      await runRecipientResolverTick({ specs, ...effects })
    } catch (err) {
      console.error("recipient-resolver: tick threw:", err)
    }
    const slept = await sleepAbortable(config.tickMs, ac.signal)
    if (!slept) break
  }

  console.log("recipient-resolver: stopping")
}

if (import.meta.main) {
  main().catch((err) => {
    console.error("recipient-resolver fatal:", err)
    process.exit(1)
  })
}
