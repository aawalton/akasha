import { sweepStrayProcesses } from "akasha/agents/modules/stray-sweeping/stray-sweeping.module.code.ts"

export async function runService(): Promise<void> {
  await sweepStrayProcesses()
}
