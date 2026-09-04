import { getEsoDayStr } from "@akasha/day/eso-day"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"
import { lowestIn, mailOn } from "@akasha/readout-system/inboxes-email"
import { tasksIn } from "@akasha/readout-system/inboxes-tasks"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { statedAt } from "@akasha/readout-system/readout-tier"
import { askDayByDate } from "@tools/lib/tracking/day-place"
import { wakeDayOf } from "@tools/lib/wake-day"

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
