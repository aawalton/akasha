import { runRecipientResolverRunning } from "akasha/agents/messaging/recipient-resolving/recipient-resolver-running/recipient-resolver-running.module.code.ts"

export async function runService(): Promise<void> {
  await runRecipientResolverRunning()
}
