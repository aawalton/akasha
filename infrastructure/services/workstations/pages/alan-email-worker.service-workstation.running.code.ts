import { runInboxWatching } from "akasha/alan/harness/email-watch/inbox-watching/inbox-watching.module.code.ts"

export async function runService(): Promise<void> {
  await runInboxWatching()
}
