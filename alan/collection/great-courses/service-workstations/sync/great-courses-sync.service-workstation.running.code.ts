import { runCatalogueSyncing } from "akasha/alan/collection/great-courses/modules/catalogue-syncing/catalogue-syncing.module.code.ts"

export async function runService(): Promise<void> {
  await runCatalogueSyncing()
}
