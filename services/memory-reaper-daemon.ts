#!/usr/bin/env bun
export const tool = {
  summary: "Run the fleet memory-reaper daemon",
  repos: ["akasha"],
} as const

import { reaperConfigBanner, TICK_MS } from "../tools/lib/memory-reaper-config.ts"
import { type ReaperState, runBoundedReaperTick } from "../tools/lib/memory-reaper-tick.ts"

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

const HELP = `bun services/memory-reaper-daemon.ts — the fleet's host-global memory reaper

One system-managed process, outside the fleet it polices. It watches every uid-1000 agent
supervisor tree and, under host memory pressure, kills the single largest subtree-total tree,
then backs off for a recovery window before it will kill again.

It runs until stopped. SIGTERM and SIGINT both end the loop at its next boundary.

Usage:
  bun services/memory-reaper-daemon.ts
  --help  This.
`

async function main(): Promise<void> {
  if (process.argv.slice(2).some((one) => one === "--help" || one === "-h")) {
    process.stdout.write(HELP)
    return
  }
  const ac = new AbortController()
  process.on("SIGTERM", () => ac.abort())
  process.on("SIGINT", () => ac.abort())

  console.log(reaperConfigBanner())
  console.log(`memory-reaper: starting tick loop pid=${process.pid}`)

  const state: ReaperState = { lastGlobalKillAtMs: null }

  while (!ac.signal.aborted) {
    try {
      await runBoundedReaperTick(state, ac.signal)
    } catch (err) {
      if (!ac.signal.aborted) console.error("memory-reaper: tick threw:", err)
    }
    const slept = await sleepAbortable(TICK_MS, ac.signal)
    if (!slept) break
  }

  console.log("memory-reaper: stopping")
}

if (import.meta.main) {
  main().catch((err) => {
    console.error("memory-reaper fatal:", err)
    process.exit(1)
  })
}
