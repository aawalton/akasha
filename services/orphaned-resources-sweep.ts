#!/usr/bin/env bun

import { writeMessage } from "../tools/lib/message-file.ts"
import { sweepOrphanedResources } from "../tools/lib/orphaned-resources-sweep/audit.ts"
import {
  decideSweepSignal,
  HANDLER,
  named,
  SENDER,
  type SweepReading,
} from "../tools/lib/orphaned-resources-sweep/notice.ts"

const SWEEP_CEILING_MS = 300_000

const SAID = "[orphaned-resources-sweep]"

const HELP = `bun services/orphaned-resources-sweep.ts — live cluster resources no source manifest accounts for

Reads every Deployment, Service and StatefulSet standing in the app namespaces, and every
manifest the code repository's \`synth.ts\` files name. A live resource labelled as a deploy's
that no manifest names has drifted: what runs no longer follows what the code says. Each one
found is sent to \`${HANDLER}\` as one message. A clean sweep says nothing.

A resource nothing labels as a deploy's is passed over, because nothing here claims to be its
source.

The manifests are read from the code checkout beside this one as it now stands, and the cluster
is reached with the same \`PIPELINE_SA_TOKEN\`, \`K8S_API_BASE\` and \`K8S_CA_CERT_B64\` every
other service here reaches it with.

The whole cluster read is bounded at ${SWEEP_CEILING_MS / 1000} seconds. A sweep that could not
run ends the process, so systemd records a failed run rather than silence reading as clean.

Driven by the orphaned-resources-sweep service, whose document states its cadence. Safe to run
by hand.

Usage:
  bun services/orphaned-resources-sweep.ts
  --help  This.
`

async function readSweep(deadlineMs: number): Promise<SweepReading> {
  try {
    const swept = await sweepOrphanedResources(deadlineMs)
    console.log(
      `${SAID} ${swept.sourceCount} source manifest key(s) read from the code checkout`
    )
    return {
      ranOk: true,
      orphans: swept.orphans,
      liveCount: swept.liveCount,
      namespaceCount: swept.namespaces.length,
      failureDetail: null,
    }
  } catch (err) {
    return {
      ranOk: false,
      orphans: [],
      liveCount: 0,
      namespaceCount: 0,
      failureDetail: `the sweep could not run: ${err instanceof Error ? err.message : String(err)}`,
    }
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  if (args.some((one) => one === "--help" || one === "-h")) {
    process.stdout.write(HELP)
    return
  }
  for (const one of args) {
    if (!one.startsWith("--")) continue
    process.stderr.write(`\`${one}\` is not an argument this takes — run it with --help\n`)
    process.exit(1)
  }

  const reading = await readSweep(Date.now() + SWEEP_CEILING_MS)
  console.log(
    `${SAID} ran=${reading.ranOk}; ${reading.orphans.length} orphan(s); ` +
      `${reading.liveCount} live resource(s) across ${reading.namespaceCount} app namespace(s)`
  )

  const signal = decideSweepSignal(reading)

  if (signal.kind === "could-not-run") throw new Error(`${SAID} ${signal.detail}`)

  if (signal.kind === "silent") {
    console.log(`${SAID} clean — nothing has drifted, so nothing is said`)
    return
  }

  for (const one of reading.orphans) console.log(`${SAID} ORPHAN: ${named(one)}`)

  const wrote = writeMessage({ to: HANDLER, from: SENDER, warrant: "announce", body: signal.text })
  if (wrote.kind === "refused") {
    throw new Error(`${SAID} nothing is waiting for \`${HANDLER}\`: ${wrote.detail}`)
  }
  console.log(`${SAID} one message written to \`${HANDLER}\` at ${wrote.relPath}`)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(`${SAID} fatal:`, err instanceof Error ? err.message : err)
    process.exit(1)
  })
}
