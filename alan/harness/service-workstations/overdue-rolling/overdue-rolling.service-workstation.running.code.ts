import { runOverdueRolling } from "akasha/alan/harness/modules/overdue-rolling/overdue-rolling.module.code.ts"

export async function runService(): Promise<void> {
  await runOverdueRolling()
}
