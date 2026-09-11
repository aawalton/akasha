import { runAccountUpkeepRunning } from "akasha/agents/claude-accounts/modules/account-upkeep-running/account-upkeep-running.module.code.ts"

export async function runService(): Promise<void> {
  await runAccountUpkeepRunning()
}
