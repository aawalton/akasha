// How far each of Alan's three inboxes is from empty is read here, on the workstation that carries
// the checkout, and kept beside the readout each count was taken for. It lives outside `akasha/`
// because an akasha file imports no file outside the akasha folder, and the day's row is reached
// only through `tools/lib/tracking/day-place.ts`, the one file that says where a day is kept. What
// to ask and how to read the answer are said on each readout's own page; this file supplies the
// reach and nothing else.
//
// Three readouts, two sources. Tasks and temper tasks are two keys on one `daily-tracking` row,
// asked once. The mail count is on its own `email-entry` page, keyed by the day `wakeDayOf`
// answers, which is the day `inbox-tracking-poll` writes it under — asking for the ESO day instead
// would read the wrong page on any day where the two differ.
//
// A mail entry is an akasha page, so it is asked for with `asking`, which reads this checkout in
// this process and refuses both a page type the index does not hold and a key the page type does
// not declare. That refusal is the point of choosing it: `valuesOfType` answers a page type that is
// not there with no rows rather than with a refusal, which is the shape a count nobody could read
// hides behind.
//
// `inboxes-temper-tasks` is the one readout whose count is named here rather than read by its own
// module. Its code is at `akasha/temper/temper-progress/readouts/inboxes-temper-tasks/`, and
// `temper-progress` is a domain that names no manifest, so nothing outside it can import that
// code. The key is spelled here and the number is read with `statedAt`, which is the same reader
// that module uses, so only the key is said twice. See the finding
// `temper-progress-names-no-manifest-so-its-readout-code-is-unreachable`.
//
// A source that cannot be read stops that one reading and no other, and the run says which. Every
// readout this run kept no number for is named on stderr and takes the exit code with it: 2 where
// nothing was read at all, 1 where some were read and some were not. It is not enough to log it.
// A readout nothing was kept for is left standing on the number kept before it, and `inbox.domain`
// holds that a count nothing can be read for is shown as no signal rather than as a zero — so a run
// that could not read a source has not succeeded, whatever else it read, and a unit that exits 0
// would be saying the tile is current when it is not.
//
// The counts themselves are never printed. They say how far behind Alan is today, and a service
// log is the wrong place for that.

import { getEsoDayStr } from "@akasha/day/eso-day"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"
import { lowestIn, mailOn } from "@akasha/readout-system/inboxes-email"
import { tasksIn } from "@akasha/readout-system/inboxes-tasks"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { statedAt } from "@akasha/readout-system/readout-tier"
import { wakeDayOf } from "../akasha/alan/tracking/daily/day-opening/day-opening.module.code.ts"
import { askDayByDate } from "../tools/lib/tracking/day-place.ts"

const READOUTS = "akasha/readout-system/readouts/pages"

export const EMAIL_PAGE = `${READOUTS}/inboxes-email/inboxes-email.readout.ts`

export const TASKS_PAGE = `${READOUTS}/inboxes-tasks/inboxes-tasks.readout.ts`

export const TEMPER_TASKS_PAGE =
  "akasha/temper/temper-progress/readouts/inboxes-temper-tasks/inboxes-temper-tasks.readout.ts"

const TEMPER_TASKS_KEY = "inbox-temper-tasks"

export const NOTHING_TO_TAKE =
  "no inbox could be read, so there is no reading to take. A tile showing no signal is right " +
  "where a tile showing an inbox nobody counted would be a lie."

export const SOME_STAND_STALE =
  "a readout nothing was kept for stands on the number kept before it, which is not the count now, " +
  "so this run did not succeed."

export type Taken = {
  readonly kept: Readonly<Record<string, number>>
  readonly unread: readonly string[]
}

function whyOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function temperTasksIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[TEMPER_TASKS_KEY])
}

async function trackedDay(day: string): Promise<Readonly<Record<string, unknown>> | null> {
  const asked = await askDayByDate(day)
  if (!asked.ok) {
    throw new Error(
      `the tracking day could not be read, so the inboxes on it are unknown rather than empty: ${asked.why}`
    )
  }
  return asked.rows[0]?.values ?? null
}

function mailEntry(root: string, day: string): Readonly<Record<string, unknown>> | null {
  const asked = asking(root, mailOn(day))
  if ("refused" in asked) {
    throw new Error(
      `the mail entry could not be read, so the inbox is unknown rather than empty: ${asked.refused}`
    )
  }
  return asked.rows[0] ?? null
}

/**
 * Every count this run could take, keyed by the page each was kept beside, beside every readout it
 * could take none for and why.
 *
 * A source that throws leaves its own readouts out and lets the rest through, since one unreachable
 * source is no reason to drop the inboxes that answered. What it does not do is pass silently: a
 * readout left out is named in `unread`, because the number standing beside it is the one taken
 * before and nothing downstream can tell that from a count taken now.
 */
export async function takeReadings(root: string, now: Date = new Date()): Promise<Taken> {
  const kept: Record<string, number> = {}
  const unread: string[] = []
  const wanting = (pages: readonly string[], why: string): undefined => {
    for (const page of pages) unread.push(`${page} — ${why}`)
    return undefined
  }
  const keep = (page: string, value: number | null, unstated: string): undefined => {
    if (value === null) return wanting([page], unstated)
    keepReading(root, page, value, now)
    kept[page] = value
    return undefined
  }

  const esoDay = getEsoDayStr(now)
  const mailDay = wakeDayOf(resolveRoots(), now)

  const [day, mail] = await Promise.allSettled([
    trackedDay(esoDay),
    (async () => mailEntry(root, mailDay))(),
  ])

  if (day.status === "rejected") {
    wanting([TASKS_PAGE, TEMPER_TASKS_PAGE], whyOf(day.reason))
  } else if (day.value === null) {
    wanting([TASKS_PAGE, TEMPER_TASKS_PAGE], `no tracking day is written down for ${esoDay}`)
  } else {
    const values = day.value
    keep(TASKS_PAGE, tasksIn(values), `the tracking day for ${esoDay} states no task count`)
    keep(
      TEMPER_TASKS_PAGE,
      temperTasksIn(values),
      `the tracking day for ${esoDay} states no \`${TEMPER_TASKS_KEY}\``
    )
  }

  if (mail.status === "rejected") {
    wanting([EMAIL_PAGE], whyOf(mail.reason))
  } else if (mail.value === null) {
    wanting([EMAIL_PAGE], `no mail entry is written down for ${mailDay}`)
  } else {
    keep(
      EMAIL_PAGE,
      lowestIn(mail.value),
      `the mail entry for ${mailDay} states no lowest inbox count`
    )
  }

  return { kept, unread }
}

if (import.meta.main) {
  const root = process.env.AKASHA_ROOT ?? process.cwd()
  try {
    const taken = await takeReadings(root)
    for (const one of taken.unread) process.stderr.write(`${one}\n`)
    const pages = Object.keys(taken.kept)
    if (pages.length === 0) {
      process.stderr.write(`${NOTHING_TO_TAKE}\n`)
      process.exit(2)
    }
    process.stdout.write(`${pages.length} inbox readings were taken and kept beside their pages\n`)
    if (taken.unread.length > 0) {
      process.stderr.write(`${SOME_STAND_STALE}\n`)
      process.exit(1)
    }
  } catch (thrown) {
    process.stderr.write(`${whyOf(thrown)}\n`)
    process.exit(1)
  }
}
