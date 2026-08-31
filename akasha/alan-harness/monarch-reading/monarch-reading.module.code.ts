import {
  fetchRingCountsFromMonarch,
  type RingCounts,
} from "../../readout-system/readout/readouts/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.code.ts"
import { keepReading } from "../../readout-system/readout-reading/readout-reading.module.code.ts"

export const READOUT_PAGE =
  "akasha/readout-system/readout/readouts/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.ts"

export type CountsTaken = (cookie: string, now: Date) => Promise<RingCounts>

export async function takeReading(
  root: string,
  cookie: string,
  now: Date = new Date(),
  take: CountsTaken = fetchRingCountsFromMonarch
): Promise<number> {
  const counts = await take(cookie, now)
  keepReading(root, READOUT_PAGE, counts.unreviewed, now)
  return counts.unreviewed
}
