import { sync } from "akasha/alan/harness/monarch/sync/monarch-sync.module.code.ts"

async function main(argv: readonly string[]): Promise<number> {
  await sync({ incremental: argv.includes("--incremental") })
  return 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
