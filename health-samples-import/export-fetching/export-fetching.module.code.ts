import { runSshCapture } from "@akasha/ssh-access/ssh-reach"
import {
  buildFetchScript,
  type HealthExport,
  type HealthMetric,
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
