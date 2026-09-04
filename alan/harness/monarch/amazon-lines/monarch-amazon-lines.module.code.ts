import type { Movement } from "../amazon-match/monarch-amazon-match.module.code.ts"
import { movementOf } from "../amazon-match/monarch-amazon-match.module.code.ts"
import { AMAZON_SINCE } from "../amazon-write/monarch-amazon-write.module.code.ts"
import type { TransactionLine } from "../files/monarch-files.module.code.ts"
import { readAllTransactions } from "../files/monarch-files.module.code.ts"

export function namesAmazon(line: TransactionLine): boolean {
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
