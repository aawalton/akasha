import { type SyncAllOptions, syncAll } from "../sync-all/sync-all.module.code.ts"

function parseArgs(): SyncAllOptions {
  const args = process.argv.slice(2)
  const options: SyncAllOptions = { dryRun: args.includes("--dry-run") }
  const sourceIdx = args.indexOf("--source")
  if (sourceIdx !== -1 && args[sourceIdx + 1] != null) options.sourceSlug = args[sourceIdx + 1]
  return options
}

async function main(): Promise<void> {
  const options = parseArgs()
  console.log(
    `Calendar sync starting${options.sourceSlug != null ? ` (source=${options.sourceSlug})` : ""}${options.dryRun ? " [dry-run]" : ""}`
  )
  await syncAll(options)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
