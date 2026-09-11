import { sendDueReminders } from "akasha/alan/harness/reminder-system/due-reminder-sending/due-reminder-sending.module.code.ts"

export async function runService(): Promise<void> {
  const code = await sendDueReminders()
  if (code !== 0) process.exit(code)
}
