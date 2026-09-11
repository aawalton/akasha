import { runCatalogueSyncing } from "akasha/alan/collections/great-courses/catalogue-syncing/catalogue-syncing.module.code.ts"

export async function runService(): Promise<void> {
  await runCatalogueSyncing()
}
