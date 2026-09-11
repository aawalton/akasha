import { pollTransactions } from "akasha/alan/harness/monarch/poll/monarch-poll.module.code.ts"

export async function runTransactionPolling(argv: readonly string[]): Promise<void> {
  await pollTransactions({ verbose: argv.includes("--verbose") })
}

if (import.meta.main) {
  await runTransactionPolling(process.argv.slice(2))
  process.exit(0)
}
