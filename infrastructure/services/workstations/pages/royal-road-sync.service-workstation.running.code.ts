import { main as runRoyalRoadSyncing } from "akasha/alan/collections/royal-road/syncing/royal-road-syncing.module.code.ts"

const COMMIT = "--commit"

export async function runService(): Promise<void> {
  const code = await runRoyalRoadSyncing([COMMIT])
  if (code !== 0) process.exit(code)
}
