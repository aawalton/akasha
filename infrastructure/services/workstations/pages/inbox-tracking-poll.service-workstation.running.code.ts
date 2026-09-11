import { runInboxTrackingPolling } from "akasha/alan/harness/inboxes/tracking-polling/inbox-tracking-polling.module.code.ts"

export async function runService(): Promise<void> {
  await runInboxTrackingPolling([])
}
