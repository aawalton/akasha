import { monarchUnreviewedTransactions } from "akasha/alan/harness/monarch/readouts/unreviewed-transactions/monarch-unreviewed-transactions.readout.ts"
import { carryEachReading } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"

const UNREVIEWED = `${readout.slug}/${monarchUnreviewedTransactions.slug}` as const

const CARRIES = [
  { point: UNREVIEWED, to: "https://alanwalton.com" },
  { point: UNREVIEWED, to: "https://smilingjenny.me" },
]

export async function runService(): Promise<void> {
  await carryEachReading(CARRIES)
}
