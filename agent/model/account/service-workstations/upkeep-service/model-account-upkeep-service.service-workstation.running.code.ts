import { runAccountUpkeepRunning } from "akasha/agent/model/account/modules/account-upkeep-running/account-upkeep-running.module.code.ts"

export async function runService(): Promise<void> {
  await runAccountUpkeepRunning()
}
