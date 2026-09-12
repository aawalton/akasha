import { syncGreatCourses } from "akasha/alan/collections/great-courses/sync/sync.module.code.ts"
import { trackSyncRun } from "akasha/alan/collections/great-courses/sync-run/sync-run.module.code.ts"

const SOURCE = "the-great-courses"

const SAID = "[great-courses-sync]"

export async function runCatalogueSyncing(): Promise<void> {
  await trackSyncRun(SOURCE, syncGreatCourses)
}

if (import.meta.main) {
  runCatalogueSyncing().catch((thrown) => {
    console.error(`${SAID} fatal:`, thrown instanceof Error ? thrown.message : thrown)
    process.exit(1)
  })
}
