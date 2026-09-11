import { runRecipientResolverRunning } from "akasha/seat-system/recipient-resolving/recipient-resolver-running/recipient-resolver-running.module.code.ts"

export async function runService(): Promise<void> {
  await runRecipientResolverRunning()
}
