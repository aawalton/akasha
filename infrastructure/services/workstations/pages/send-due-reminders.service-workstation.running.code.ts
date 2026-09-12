import { sendDueReminders } from "akasha/alan/harness/reminder-system/due-reminder-sending/due-reminder-sending.module.code.ts"

export async function runService(done: string[] = []): Promise<void> {
  const code = await sendDueReminders(done)
  if (code !== 0) {
    throw new Error("a reminder that came due was held back, and each reason is on standard error")
  }
}
