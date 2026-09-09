import {
  runSshCapture,
  streamSshLines,
} from "akasha/alan/harness/ssh-access/ssh-reach/ssh-reach.module.code.ts"
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
