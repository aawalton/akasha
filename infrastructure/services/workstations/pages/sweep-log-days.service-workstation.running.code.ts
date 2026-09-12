import { sweepLogDays } from "akasha/agents/seats/log-days/modules/log-day-sweeping/log-day-sweeping.module.code.ts"

const REMOVE = "--remove"

export async function runService(): Promise<void> {
  const code = await sweepLogDays([REMOVE])
  if (code !== 0) process.exit(code)
}
