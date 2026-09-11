import { sync } from "akasha/alan/harness/monarch/sync/monarch-sync.module.code.ts"

export async function runMonarchSyncing(args: readonly string[]): Promise<void> {
  await sync({ incremental: args.includes("--incremental") })
}

if (import.meta.main) {
  await runMonarchSyncing(process.argv.slice(2))
  process.exit(0)
}
