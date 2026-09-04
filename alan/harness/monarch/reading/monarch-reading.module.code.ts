import { saidBy } from "@akasha/command-system/fault-saying"
import type { RingCounts } from "../../../../readout-system/readout-body/readout-body.module.code.ts"
import { keepReading } from "../../../../readout-system/readout-reading/readout-reading.module.code.ts"
import { fetchRingCountsFromMonarch } from "../../../../readout-system/readouts/pages/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.code.ts"

export const READOUT_PAGE =
  "readout-system/readouts/pages/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.ts"

export const COOKIE_NAME = "MONARCH_COOKIE"

export const COOKIE_ABSENT =
  `${COOKIE_NAME} is not set, so there is no reading to take. It is the whole Cookie header ` +
  "from a signed-in session at app.monarch.com, and only Alan at a browser can produce one."

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

export function cookieIn(held: Record<string, string | undefined>): string | null {
  const cookie = held[COOKIE_NAME]?.trim()
  return cookie === undefined || cookie === "" ? null : cookie
}

if (import.meta.main) {
  const cookie = cookieIn(process.env)
  if (cookie === null) {
    process.stderr.write(`${COOKIE_ABSENT}\n`)
    process.exit(2)
  }
  const root = process.env.AKASHA_ROOT ?? process.cwd()
  try {
    const unreviewed = await takeReading(root, cookie)
    process.stdout.write(`${unreviewed} unreviewed, kept beside ${READOUT_PAGE}\n`)
  } catch (thrown) {
    process.stderr.write(`${saidBy(thrown)}\n`)
    process.exit(1)
  }
}
