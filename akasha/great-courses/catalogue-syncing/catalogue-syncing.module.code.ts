import { syncGreatCourses } from "@akasha/great-courses/sync"
import { trackSyncRun } from "@akasha/great-courses/sync-run"

const SOURCE = "the-great-courses"

const SAID = "[great-courses-sync]"

async function main(): Promise<void> {
  await trackSyncRun(SOURCE, syncGreatCourses)
}

if (import.meta.main) {
  main().catch((thrown) => {
    console.error(`${SAID} fatal:`, thrown instanceof Error ? thrown.message : thrown)
    process.exit(1)
  })
}
