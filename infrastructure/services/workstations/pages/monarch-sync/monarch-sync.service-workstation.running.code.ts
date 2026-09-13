import { runMonarchSyncing } from "akasha/alan/harness/monarch/modules/syncing/monarch-syncing.module.code.ts"

export async function runService(): Promise<void> {
  await runMonarchSyncing([])
}
