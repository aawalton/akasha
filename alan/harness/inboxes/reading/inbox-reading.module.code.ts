import { saidBy } from "@akasha/command-system/fault-saying"
import { getEsoDayStr } from "@akasha/day/eso-day"
import { listedAt } from "@akasha/indexes"
import { resolveRoots } from "@akasha/pages/checkout-roots"
import { asking } from "@akasha/pages-service/asking"
import { lowestIn, mailOn } from "@akasha/readouts/inboxes-email"
import { tasksIn } from "@akasha/readouts/inboxes-tasks"
import { keepReading } from "@akasha/readouts/readout-reading"
import { statedAt } from "@akasha/readouts/readout-tier"
import { openedDayOf } from "../../../track/daily/day-opening/day-opening.module.code.ts"
import { askDayByDate } from "../../../track/daily/day-reading/day-reading.module.code.ts"

const READOUT = "readout"

function pageOf(root: string, slug: string): string {
  const listed = listedAt(root, READOUT, slug)[0]
  if (listed === undefined) {
    throw new Error(
      `no \`${READOUT}\` is slugged \`${slug}\`, so a count taken for it would be kept nowhere`
    )
  }
  return listed.path
}

export function emailPage(root: string): string {
  return pageOf(root, "inboxes-email")
}

export function tasksPage(root: string): string {
  return pageOf(root, "inboxes-tasks")
}

export function temperTasksPage(root: string): string {
  return pageOf(root, "inboxes-temper-tasks")
}

const TEMPER_TASKS_KEY = "inbox-temper-tasks"

export const NOTHING_TO_TAKE =
  "no inbox could be read, so there is no reading to take. A tile showing no signal is right " +
  "where a tile showing an inbox nobody counted would be a lie."

export const SOME_STAND_STALE =
  "a readout nothing was kept for still holds the number kept before it, which is not the count now, " +
  "so this run did not succeed."

export type Taken = {
  readonly kept: Readonly<Record<string, number>>
  readonly unread: readonly string[]
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

function mailRow(root: string, day: string): Readonly<Record<string, unknown>> | null {
  const asked = asking(root, mailOn(day))
  if ("refused" in asked) {
    throw new Error(
      `the day could not be read, so the mail inbox is unknown rather than empty: ${asked.refused}`
    )
  }
  return asked.rows[0] ?? null
}

export async function takeReadings(root: string, now: Date = new Date()): Promise<Taken> {
  const emailAt = emailPage(root)
  const tasksAt = tasksPage(root)
  const temperTasksAt = temperTasksPage(root)
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
  const mailDay = openedDayOf(resolveRoots(), now)

  const [day, mail] = await Promise.allSettled([
    trackedDay(esoDay),
    (async () => mailRow(root, mailDay))(),
  ])

  if (day.status === "rejected") {
    wanting([tasksAt, temperTasksAt], saidBy(day.reason))
  } else if (day.value === null) {
    wanting([tasksAt, temperTasksAt], `no tracking day is written down for ${esoDay}`)
  } else {
    const values = day.value
    keep(tasksAt, tasksIn(values), `the tracking day for ${esoDay} states no task count`)
    keep(
      temperTasksAt,
      temperTasksIn(values),
      `the tracking day for ${esoDay} states no \`${TEMPER_TASKS_KEY}\``
    )
  }

  if (mail.status === "rejected") {
    wanting([emailAt], saidBy(mail.reason))
  } else if (mail.value === null) {
    wanting([emailAt], `no day is written down for ${mailDay}`)
  } else {
    keep(emailAt, lowestIn(mail.value), `the day ${mailDay} states no lowest mail count`)
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
    process.stderr.write(`${saidBy(thrown)}\n`)
    process.exit(1)
  }
}
