import type { RingCounts } from "akasha/alan/harness/readouts/body/readout-body.module.code.ts"
import { fetchRingCountsFromMonarch } from "akasha/alan/harness/readouts/pages/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.code.ts"
import {
  keepReading,
  readoutPage,
} from "akasha/alan/harness/readouts/reading/readout-reading.module.code.ts"
import { rootStated } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

export const READOUT_SLUG = "monarch-unreviewed-transactions"

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
  keepReading(root, readoutPage(root, READOUT_SLUG), counts.unreviewed, now)
  return counts.unreviewed
}

export function cookieIn(held: Record<string, string | undefined>): string | null {
  const cookie = held[COOKIE_NAME]?.trim()
  return cookie === undefined || cookie === "" ? null : cookie
}

const COOKIE_ABSENT_STATUS = 2

const TAKING_REFUSED_STATUS = 1

export async function runMonarchReading(): Promise<void> {
  const cookie = cookieIn(process.env)
  if (cookie === null) throw new Error(COOKIE_ABSENT)
  const root = rootStated(process.env) ?? process.cwd()
  const unreviewed = await takeReading(root, cookie)
  process.stdout.write(`${unreviewed} unreviewed, kept beside ${readoutPage(root, READOUT_SLUG)}\n`)
}

if (import.meta.main) {
  try {
    await runMonarchReading()
  } catch (thrown) {
    if (thrown instanceof Error && thrown.message === COOKIE_ABSENT) {
      process.stderr.write(`${COOKIE_ABSENT}\n`)
      process.exit(COOKIE_ABSENT_STATUS)
    }
    process.stderr.write(`${saidBy(thrown)}\n`)
    process.exit(TAKING_REFUSED_STATUS)
  }
}
