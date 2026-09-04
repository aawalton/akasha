import { pollTransactions } from "../poll/monarch-poll.module.code.ts"

async function main(argv: readonly string[]): Promise<number> {
  await pollTransactions({ verbose: argv.includes("--verbose") })
  return 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
