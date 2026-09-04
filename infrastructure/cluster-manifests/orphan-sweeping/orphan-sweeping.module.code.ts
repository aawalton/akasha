import { writeMessage } from "@akasha/seat-system/message-file"
import { sweepOrphanedResources } from "../orphan-resource-audit/orphan-resource-audit.module.code.ts"
import {
  decideSweepSignal,
  HANDLER,
  named,
  SENDER,
  type SweepReading,
} from "../orphan-sweep-notice/orphan-sweep-notice.module.code.ts"

const SWEEP_CEILING_MS = 300_000

const SAID = "[orphaned-resources-sweep]"

async function readSweep(deadlineMs: number): Promise<SweepReading> {
  try {
    const swept = await sweepOrphanedResources(deadlineMs)
    console.log(`${SAID} ${swept.sourceCount} source manifest key(s) read from this checkout`)
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

  const wrote = await writeMessage({
    to: HANDLER,
    from: SENDER,
    warrant: "announce",
    body: signal.text,
  })
  if (wrote.kind === "refused") {
    throw new Error(`${SAID} nothing is waiting for \`${HANDLER}\`: ${wrote.detail}`)
  }
  console.log(`${SAID} one message written to \`${HANDLER}\` at ${wrote.relPath}`)
}

if (import.meta.main) {
  await main().catch(async (err) => {
    console.error(`${SAID} fatal:`, err instanceof Error ? err.message : err)
    process.exit(1)
  })
}
