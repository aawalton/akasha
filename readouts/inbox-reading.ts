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
// `inboxes-temper-tasks` is the one readout whose count is named here rather than read by its own
// module. Its code is at `akasha/temper/temper-progress/readouts/inboxes-temper-tasks/`, and
// `temper-progress` is a domain that names no manifest, so nothing outside it can import that
// code. The key is spelled here and the number is read with `statedAt`, which is the same reader
// that module uses, so only the key is said twice. See the finding
// `temper-progress-names-no-manifest-so-its-readout-code-is-unreachable`.
//
// A source that cannot be read stops that one reading and no other. Two counts kept and one
// missing is right: a readout with no fresh reading answers an empty ring rather than dropping out
// of the group, so Alan sees three rings with the gap showing in one of them. Only a run that kept
// nothing exits 2.
//
// The counts themselves are never printed. They say how far behind Alan is today, and a service
// log is the wrong place for that.
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { lowestIn } from "@akasha/readout-system/inboxes-email"
import { tasksIn } from "@akasha/readout-system/inboxes-tasks"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { statedAt } from "@akasha/readout-system/readout-tier"
import { getEsoDayStr } from "@akasha/day/eso-day"
import { askComposed } from "../tools/lib/page-query-client.ts"
import { askDayByDate } from "../tools/lib/tracking/day-place.ts"
import { wakeDayOf } from "../tools/lib/wake-day.ts"

const READOUTS = "akasha/readout-system/readout/readouts"

export const EMAIL_PAGE = `${READOUTS}/inboxes-email/inboxes-email.readout.ts`

export const TASKS_PAGE = `${READOUTS}/inboxes-tasks/inboxes-tasks.readout.ts`

export const TEMPER_TASKS_PAGE =
  "akasha/temper/temper-progress/readouts/inboxes-temper-tasks/inboxes-temper-tasks.readout.ts"

const TEMPER_TASKS_KEY = "inbox-temper-tasks"

export const NOTHING_TO_TAKE =
  "no inbox could be read, so there is no reading to take. A tile showing no signal is right " +
  "where a tile showing an inbox nobody counted would be a lie."

export type Taken = Readonly<Record<string, number>>

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

async function mailEntry(day: string): Promise<Readonly<Record<string, unknown>> | null> {
  const asked = await askComposed({
    "page-type": "email-entry",
    where: { date: { is: day } },
    limit: 1,
  })
  if (!asked.ok) {
    throw new Error(
      `the mail entry could not be read, so the inbox is unknown rather than empty: ${asked.why}`
    )
  }
  return asked.rows[0]?.values ?? null
}

/**
 * Every count this run could take, keyed by the page each was kept beside.
 *
 * A source that throws leaves its own readouts out and lets the rest through, since one unreachable
 * source is no reason to drop the inboxes that answered.
 */
export async function takeReadings(root: string, now: Date = new Date()): Promise<Taken> {
  const kept: Record<string, number> = {}
  const keep = (page: string, value: number | null): undefined => {
    if (value === null) return undefined
    keepReading(root, page, value, now)
    kept[page] = value
    return undefined
  }

  const settled = await Promise.allSettled([
    trackedDay(getEsoDayStr(now)),
    mailEntry(wakeDayOf(resolveRoots(), now)),
  ])

  const [day, mail] = settled

  if (day.status === "fulfilled" && day.value !== null) {
    keep(TASKS_PAGE, tasksIn(day.value))
    keep(TEMPER_TASKS_PAGE, temperTasksIn(day.value))
  }
  if (mail.status === "fulfilled" && mail.value !== null) {
    keep(EMAIL_PAGE, lowestIn(mail.value))
  }

  return kept
}

if (import.meta.main) {
  const root = process.env.AKASHA_ROOT ?? process.cwd()
  try {
    const kept = await takeReadings(root)
    const pages = Object.keys(kept)
    if (pages.length === 0) {
      process.stderr.write(`${NOTHING_TO_TAKE}\n`)
      process.exit(2)
    }
    process.stdout.write(`${pages.length} inbox readings were taken and kept beside their pages\n`)
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  }
}
