import { readAccountUpkeepStall } from "akasha/agents/claude-accounts/modules/account-upkeep-stall-reading/account-upkeep-stall-reading.module.code.ts"

const NOTIFY = "--notify"

export async function runService(): Promise<void> {
  const code = await readAccountUpkeepStall([NOTIFY])
  if (code !== 0) process.exit(code)
}
