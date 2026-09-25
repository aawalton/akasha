import { monarchReading } from "akasha/alan/harness/monarch/modules/reading/monarch-reading.module.ts"
import { fetchRingCountsFromMonarch } from "akasha/alan/harness/monarch/readouts/unreviewed-transactions/monarch-unreviewed-transactions.readout.reading.code.ts"
import type { RingCounts } from "akasha/alan/harness/readout/modules/body/readout-body.module.code.ts"
import {
  keepReading,
  readoutServedBy,
} from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { rootStated } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

const SERVED_BY = namedAs(module.slug, monarchReading.slug, null)

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
  keepReading(root, readoutServedBy(root, SERVED_BY), counts.unreviewed, now)
  return counts.unreviewed
}

export function readingTimedOut(thrown: unknown): boolean {
  if (typeof thrown !== "object" || thrown === null) return false
  return (thrown as { name?: unknown }).name === "TimeoutError"
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
  process.stdout.write(
    `${unreviewed} unreviewed, kept beside ${readoutServedBy(root, SERVED_BY)}\n`
  )
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
