import { runRecipientResolverRunning } from "akasha/agent/messaging/recipient-resolving/modules/recipient-resolver-running/recipient-resolver-running.module.code.ts"

export async function runService(): Promise<void> {
  await runRecipientResolverRunning()
}
