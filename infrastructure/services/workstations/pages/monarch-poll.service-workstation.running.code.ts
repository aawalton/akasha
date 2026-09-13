import { runTransactionPolling } from "akasha/alan/harness/monarch/modules/transaction-polling/transaction-polling.module.code.ts"

export async function runService(): Promise<void> {
  await runTransactionPolling([])
}
