import { runSshCapture, streamSshLines } from "@akasha/ssh-access/ssh-reach"
import {
  buildFetchScript,
  type HealthExport,
  type HealthMetric,
  NO_FILE,
  parseHealthExport,
} from "../health-export/health-export.module.code.ts"
import { MACBOOK } from "../laptop-host/laptop-host.module.code.ts"

export interface FetchOptions {
  readonly path: string | undefined
  readonly sinceDay: string
  readonly metrics: readonly HealthMetric[]
}

/**
 * The export read on this workstation, where this workstation holds one.
 *
 * The script narrows the export before the export leaves the machine, and it narrows the same way
 * on either machine, so the one script runs both roads and no second reader has to be kept true to
 * the first.
 */
async function runHere(script: string): Promise<string> {
  const ran = Bun.spawn(["bash", "-s"], {
    stdin: new TextEncoder().encode(script),
    stdout: "pipe",
    stderr: "ignore",
  })
  const said = await new Response(ran.stdout).text()
  await ran.exited
  return said
}

/**
 * An export, read from wherever a machine of Alan's holds one.
 *
 * This workstation is looked in first. The phone wrote the export onto the laptop while the laptop
 * was the only machine that could take one, and it reaches this workstation directly now, so the
 * near road is tried before a fetch over the wire. A workstation holding no export falls through to
 * the laptop rather than refusing, which is what keeps the older road working.
 */
export async function fetchHealthExport(opts: FetchOptions): Promise<HealthExport> {
  const script = buildFetchScript(opts)
  const here = parseHealthExport(await runHere(script))
  if (here.sourceFile !== null) return here
  return parseHealthExport(await runSshCapture(MACBOOK, script))
}

async function* linesOut(
  stream: ReadableStream<Uint8Array>
): AsyncGenerator<string, void, undefined> {
  const reading = new TextDecoder()
  let held = ""
  for await (const chunk of stream) {
    held += reading.decode(chunk, { stream: true })
    let at = held.indexOf("\n")
    while (at >= 0) {
      yield held.slice(0, at)
      held = held.slice(at + 1)
      at = held.indexOf("\n")
    }
  }
  held += reading.decode()
  if (held !== "") yield held
}

async function* streamHereLines(script: string): AsyncGenerator<string, void, undefined> {
  const ran = Bun.spawn(["bash", "-s"], {
    stdin: new TextEncoder().encode(script),
    stdout: "pipe",
    stderr: "ignore",
  })
  yield* linesOut(ran.stdout)
  await ran.exited
}

/**
 * The lines of an export, taken from whichever machine of Alan's holds one.
 *
 * A whole export is far too large to hold, so a caller reads the narrowed lines as those lines come
 * and writes in batches. The first line the script says is the export's own path or `NOFILE`, so
 * reading that one line settles which machine answers without reading a second export anywhere.
 */
export async function* streamExportLines(script: string): AsyncGenerator<string, void, undefined> {
  const here = streamHereLines(script)
  const first = await here.next()
  if (first.done !== true && first.value.trim() !== NO_FILE) {
    yield first.value
    yield* here
    return
  }
  await here.return(undefined)
  yield* streamSshLines(MACBOOK, script)
}
