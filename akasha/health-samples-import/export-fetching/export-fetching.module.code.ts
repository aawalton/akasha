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

export async function fetchHealthExport(opts: FetchOptions): Promise<HealthExport> {
  const stdout = await runSshCapture(MACBOOK, buildFetchScript(opts))
  return parseHealthExport(stdout)
}
