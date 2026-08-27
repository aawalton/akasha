import type { Movement } from "./amazon-match.ts"
import { movementOf } from "./amazon-match.ts"
import { readAllTransactions } from "./files.ts"
import type { TransactionLine } from "./files.ts"
import { AMAZON_SINCE } from "./amazon-write.ts"

export function namesAmazon(line: TransactionLine): boolean {
  return (line.merchant ?? "").toLowerCase().includes("amazon")
}

export async function amazonMovements(
  wanted: (amount: number) => boolean
): Promise<readonly Movement[]> {
  const held: Movement[] = []
  for (const line of await readAllTransactions()) {
    if (!namesAmazon(line)) continue
    if (line.date < AMAZON_SINCE) continue
    if ((line.notes ?? "") !== "") continue
    if (!wanted(line.amount)) continue
    held.push(movementOf(line["monarch-id"], line.date, line.amount))
  }
  return held
}
