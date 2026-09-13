import { runInboxTrackingPolling } from "akasha/alan/harness/inboxes/modules/tracking-polling/inbox-tracking-polling.module.code.ts"

export async function runService(): Promise<void> {
  await runInboxTrackingPolling([])
}
