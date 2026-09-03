import { sync } from "../../../../../monarch/sync.ts"

async function main(argv: readonly string[]): Promise<number> {
  await sync({ incremental: argv.includes("--incremental") })
  return 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
