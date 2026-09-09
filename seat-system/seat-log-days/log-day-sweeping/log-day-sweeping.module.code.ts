import { readFileSync, rmSync } from "node:fs"
import { basename, join } from "node:path"
import { everyOfType } from "@akasha/indexes"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages/checkout-roots"
import { besideOf } from "@akasha/pages/page-beside"
import { landRemovals } from "@akasha/seat-system/gated-landing"
import { fileStemOf } from "akasha/file-page-identity/file-page/file-page.module.code.ts"
import { dropReadings } from "../../../commands/modules/reading/reading.module.code.ts"

const DEFAULT_KEEP_DAYS = 7

const DAY_MS = 86_400_000

const WRITER = "log-day-sweeper"

const DAY_TYPE = "seat-log-day"

const PAGE_SUFFIX = ".seat-log-day.ts"

const DATE = /^\s*date: "(\d{4}-\d{2}-\d{2})",?\s*$/m

export interface DayFacts {
  readonly relPath: string
  readonly name: string
  readonly date: string
}

export function decideDay(date: string, cutoff: string): "keep" | "rotate" {
  return date < cutoff ? "rotate" : "keep"
}

export function cutoffFrom(nowMs: number, keepDays: number): string {
  return new Date(nowMs - keepDays * DAY_MS).toISOString().slice(0, 10)
}

export interface DaysRead {
  readonly days: readonly DayFacts[]
  readonly unjudged: readonly string[]
}

export function daysIn(root: string): DaysRead {
  const found: DayFacts[] = []
  const unjudged: string[] = []
  for (const one of everyOfType(root, DAY_TYPE)) {
    const relPath = one.path
    const name = basename(relPath)
    let text: string
    try {
      text = readFileSync(join(root, relPath), "utf8")
    } catch {
      unjudged.push(name)
      continue
    }
    const said = DATE.exec(text)
    if (said === null) {
      unjudged.push(name)
      continue
    }
    found.push({ relPath, name: name.slice(0, -PAGE_SUFFIX.length), date: said[1] as string })
  }
  return { days: found, unjudged }
}

function removeLines(root: string, relPath: string): undefined {
  for (const one of besideOf(root, relPath)) rmSync(join(root, one), { force: true })
}

async function removePages(
  relPaths: readonly string[],
  root: string
): Promise<{ code: number; output: string }> {
  const landed = await landRemovals(
    {
      repo: AKASHA,
      writer: WRITER,
      root,
      message: `past the window a log is kept for, so ${relPaths.length === 1 ? "this log day goes" : "these log days go"}: ${relPaths.map((one) => fileStemOf(one)).join(", ")}`,
    },
    relPaths
  )
  return landed.ok ? { code: 0, output: "" } : { code: 1, output: landed.why }
}

export function keepDaysFrom(argv: readonly string[]): number | null {
  const at = argv.indexOf("--keep-days")
  if (at === -1) return DEFAULT_KEEP_DAYS
  const raw = argv[at + 1]
  if (raw === undefined) return null
  const days = Number(raw)
  return Number.isFinite(days) && days >= 0 ? days : null
}

async function main(argv: readonly string[]): Promise<number> {
  const keepDays = keepDaysFrom(argv)
  if (keepDays === null) {
    process.stderr.write("--keep-days takes a count of days, zero or more\n")
    return 1
  }

  const root = rootFor(resolveRoots(), AKASHA)
  const cutoff = cutoffFrom(Date.now(), keepDays)

  const read = daysIn(root)
  const days = read.days
  const rotate = days.filter((one) => decideDay(one.date, cutoff) === "rotate")

  if (read.unjudged.length > 0) {
    process.stderr.write(
      `${read.unjudged.length} log day(s) state no date this can read, so none is judged: ` +
        `${read.unjudged.join(", ")}\n`
    )
  }

  for (const one of rotate) process.stdout.write(`${one.name}\t${one.date}\n`)

  if (!argv.includes("--remove")) {
    process.stderr.write(
      `read ${days.length} log day(s), ${rotate.length} older than ${cutoff} ` +
        `(${keepDays} day window) — nothing removed without --remove\n`
    )
    return 0
  }
  if (rotate.length === 0) {
    process.stderr.write(`read ${days.length} log day(s), none older than ${cutoff}\n`)
    return 0
  }

  const held: string[] = []
  const taken: DayFacts[] = []
  const together = await removePages(
    rotate.map((one) => one.relPath),
    root
  )
  if (together.code === 0) {
    taken.push(...rotate)
  } else {
    for (const one of rotate) {
      const alone = await removePages([one.relPath], root)
      if (alone.code === 0) taken.push(one)
      else held.push(`${one.name}: ${alone.output.trim().split("\n").slice(-1)[0] ?? "refused"}`)
    }
  }
  for (const one of taken) removeLines(root, one.relPath)
  if (taken.length > 0)
    dropReadings(
      root,
      taken.map((one) => one.relPath)
    )

  process.stderr.write(
    `removed ${taken.length} of ${rotate.length} log day(s) older than ${cutoff}; ` +
      `${days.length - rotate.length} kept\n`
  )
  for (const one of held) process.stderr.write(`refused: ${one}\n`)
  return held.length === 0 ? 0 : 1
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
