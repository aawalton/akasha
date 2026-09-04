import { readdirSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { landRemovals } from "@akasha/command-system/gated-landing"
import { dropReadings } from "@akasha/command-system/reading"
import { fileStemOf } from "@akasha/file-page-identity"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { besideOf } from "@akasha/pages-system/page-beside"

const DEFAULT_KEEP_DAYS = 7

const DAY_MS = 86_400_000

const WRITER = "log-day-sweeper"

const DAYS_AT = "seat-system/seat-log-days/pages"

const PAGE_SUFFIX = ".seat-log-day.ts"

// A day states its date as one property line of the page it is. The page is read as text rather
// than loaded, because a sweep that imports every page it judges pays a module load for each.
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

export function daysIn(root: string): readonly DayFacts[] {
  let names: readonly string[]
  try {
    names = readdirSync(join(root, DAYS_AT))
  } catch {
    return []
  }
  const found: DayFacts[] = []
  for (const name of names) {
    if (!name.endsWith(PAGE_SUFFIX)) continue
    const relPath = `${DAYS_AT}/${name}`
    let text: string
    try {
      text = readFileSync(join(root, relPath), "utf8")
    } catch {
      continue
    }
    const said = DATE.exec(text)
    if (said === null) continue
    found.push({ relPath, name: name.slice(0, -PAGE_SUFFIX.length), date: said[1] as string })
  }
  return found
}

function removeLines(root: string, relPath: string): void {
  for (const one of besideOf(root, relPath)) rmSync(join(root, one), { force: true })
}

// A daemon composes this removal rather than authoring it, so it lands mechanically, in process,
// owing no read record. The sidecar beside each page is gitignored and goes separately, after.
function removePages(relPaths: readonly string[], root: string): { code: number; output: string } {
  const landed = landRemovals(
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

function keepDaysFrom(argv: readonly string[]): number | null {
  const at = argv.indexOf("--keep-days")
  if (at === -1) return DEFAULT_KEEP_DAYS
  const raw = argv[at + 1]
  if (raw === undefined) return null
  const days = Number(raw)
  return Number.isFinite(days) && days >= 0 ? days : null
}

function main(argv: readonly string[]): number {
  const keepDays = keepDaysFrom(argv)
  if (keepDays === null) {
    process.stderr.write("--keep-days takes a count of days, zero or more\n")
    return 1
  }

  const root = rootFor(resolveRoots(), AKASHA)
  const cutoff = cutoffFrom(Date.now(), keepDays)

  const standing = daysIn(root)
  const rotate = standing.filter((one) => decideDay(one.date, cutoff) === "rotate")

  for (const one of rotate) process.stdout.write(`${one.name}\t${one.date}\n`)

  if (!argv.includes("--remove")) {
    process.stderr.write(
      `read ${standing.length} log day(s), ${rotate.length} older than ${cutoff} ` +
        `(${keepDays} day window) — nothing removed without --remove\n`
    )
    return 0
  }
  if (rotate.length === 0) {
    process.stderr.write(`read ${standing.length} log day(s), none older than ${cutoff}\n`)
    return 0
  }

  const held: string[] = []
  const taken: DayFacts[] = []
  const together = removePages(
    rotate.map((one) => one.relPath),
    root
  )
  if (together.code === 0) {
    taken.push(...rotate)
  } else {
    for (const one of rotate) {
      const alone = removePages([one.relPath], root)
      if (alone.code === 0) taken.push(one)
      else held.push(`${one.name}: ${alone.output.trim().split("\n").slice(-1)[0] ?? "refused"}`)
    }
  }
  for (const one of taken) removeLines(root, one.relPath)
  // A page under akasha is held to what its writer read, so a page taken away leaves a reading
  // standing over a path at nothing. The reading goes with the page.
  if (taken.length > 0)
    dropReadings(
      root,
      taken.map((one) => one.relPath)
    )

  process.stderr.write(
    `removed ${taken.length} of ${rotate.length} log day(s) older than ${cutoff}; ` +
      `${standing.length - rotate.length} kept\n`
  )
  for (const one of held) process.stderr.write(`refused: ${one}\n`)
  return held.length === 0 ? 0 : 1
}

if (import.meta.main) process.exit(main(process.argv.slice(2)))
