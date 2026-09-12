import type { Movement } from "akasha/alan/harness/monarch/amazon-match/monarch-amazon-match.module.code.ts"
import { movementOf } from "akasha/alan/harness/monarch/amazon-match/monarch-amazon-match.module.code.ts"
import { AMAZON_SINCE } from "akasha/alan/harness/monarch/amazon-write/monarch-amazon-write.module.code.ts"
import type { TransactionLine } from "akasha/alan/harness/monarch/files/monarch-files.module.code.ts"
import { readAllTransactions } from "akasha/alan/harness/monarch/files/monarch-files.module.code.ts"

function namesAmazon(line: TransactionLine): boolean {
  return (line.merchant ?? "").toLowerCase().includes("amazon")
}

export async function amazonMovements(
  wanted: (amount: number) => boolean
): Promise<readonly Movement[]> {
  const held: Movement[] = []
  for (const line of await readAllTransactions()) {
    if (!namesAmazon(line)) continue
    if (line.transactionDay < AMAZON_SINCE) continue
    if ((line.transactionNote ?? "") !== "") continue
    if (!wanted(line.amount)) continue
    held.push(movementOf(line.monarchId, line.transactionDay, line.amount))
  }
  return held
}
