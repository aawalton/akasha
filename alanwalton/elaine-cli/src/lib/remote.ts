import {
  buildFetchScript,
  type HealthExport,
  type HealthMetric,
  parseHealthExport,
} from "./health-export"
import { MACBOOK } from "./host"
import { runSshCapture } from "./ssh"

export interface FetchOptions {
  readonly path: string | undefined
  readonly sinceDay: string
  readonly metrics: readonly HealthMetric[]
}

export async function fetchHealthExport(opts: FetchOptions): Promise<HealthExport> {
  const stdout = await runSshCapture(MACBOOK, buildFetchScript(opts))
  return parseHealthExport(stdout)
}
