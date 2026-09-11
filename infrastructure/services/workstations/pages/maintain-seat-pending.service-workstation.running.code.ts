import { runPendingMaintaining } from "akasha/seat-system/seat-pending/pending-maintaining/pending-maintaining.module.code.ts"

const NEVER: Promise<never> = new Promise(() => {})

export async function runService(): Promise<never> {
  const code = runPendingMaintaining([])
  if (code !== 0) process.exit(code)
  return await NEVER
}
