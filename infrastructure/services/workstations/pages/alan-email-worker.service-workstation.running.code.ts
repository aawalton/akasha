import { runInboxWatching } from "akasha/alan/harness/email-watch/modules/inbox-watching/inbox-watching.module.code.ts"

export async function runService(): Promise<void> {
  await runInboxWatching()
}
