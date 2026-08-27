export const tool = {
  summary: "Delete every log day older than the days a log is kept for",
  repos: ["instructions"],
} as const

import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs"
import { basename, join } from "node:path"
import { stemOf as slugOf } from "../page/name/name"
import { sidecarsOf } from "../page/sidecar/sidecar.ts"
import { AKASHA, MEMORY, resolveRoots, rootFor } from "../repo/roots/roots"
import { parseFrontmatter, textField } from "../page/frontmatter.ts"
import { toolArgv } from "../tools/lib/tool-argv.ts"

const HELP = `bun services/sweep-log-days.ts — delete every log day past the window a log is kept for

pages/page-type/log-day.page-type.md says a log is rotated by taking its oldest days away. This is what
takes them. Each log day holds its lines in a sidecar beside it, so removing the page removes
the lines with it and nothing else has to be pruned.

A DAY IS JUDGED BY THE DATE IT STATES, NEVER BY A FILE'S TIMESTAMP. A log day carries the
calendar date its lines were written on, which is what rotation is about; a sidecar still being
appended to says only that the day is current, and a file copied or restored says nothing at all.

THE PAGE IS TRACKED AND THE LINES ARE NOT. The page goes through the gated removal so it lands
as a commit; the sidecar is gitignored and goes with a plain remove once the page is gone. A
sidecar left behind would be lines no page names, which nothing would ever read or take away.

ONE PAGE THAT CANNOT GO DOES NOT HOLD THE REST. The pages go in one call so they land in one
commit; where that call refuses, each is retried alone and every one still standing is named.

NOTHING IS REMOVED WITHOUT --remove. The sweep reports by default, because what it takes away
is a commit in another repository and seeing the list first costs one run.

Usage:
  bun ~/repos/instructions/services/sweep-log-days.ts [--remove] [--keep-days <n>]

  --remove          Take the log days away, through the gated removal.
  --keep-days <n>   Keep a log day this many days. Default ${String(7)}.
  --help            This.
`

const DEFAULT_KEEP_DAYS = 7

const DAY_MS = 86_400_000

const SCRATCH = "/var/tmp"

const WRITER = "log-day-sweeper"


const PAGE_SUFFIX = ".md"

const DAY_TYPES = ["seat-log-day", "log-day"] as const

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

function daysIn(memory: string, type: string): readonly DayFacts[] {
  const dir = `pages/${type}`
  let names: readonly string[]
  try {
    names = readdirSync(join(memory, dir))
  } catch {
    return []
  }
  const found: DayFacts[] = []
  for (const name of names) {
    if (!name.endsWith(PAGE_SUFFIX)) continue
    const relPath = `${dir}/${name}`
    let text: string
    try {
      text = readFileSync(join(memory, relPath), "utf8")
    } catch {
      continue
    }
    const date = textField(parseFrontmatter(text), "date")
    if (date === null || date === "") continue
    found.push({ relPath, name: name.slice(0, -PAGE_SUFFIX.length), date })
  }
  return found
}

function removeSidecars(memory: string, relPath: string): void {
  for (const one of sidecarsOf(memory, relPath)) rmSync(join(memory, one), { force: true })
}

function removePages(
  relPaths: readonly string[],
  memory: string,
  akashaRoot: string
): { code: number; output: string } {
  const dir = mkdtempSync(join(SCRATCH, "sweep-log-days-"))
  const outPath = join(dir, "out.txt")
  try {
    const proc = Bun.spawnSync(
      [
        process.execPath,
        ...toolArgv(
          "rm.ts",
          [
            ...relPaths.map((one) => join(memory, one)),
            "--repo",
            MEMORY,
            "--message",
            `past the window a log is kept for, so ${relPaths.length === 1 ? "this log day goes" : "these log days go"}: ${relPaths.map((one) => slugOf(one)).join(", ")}`,
          ],
          akashaRoot
        ),
      ],
      {
        stdout: Bun.file(outPath),
        stderr: "pipe",
        env: { ...process.env, AGENT_ID: WRITER, ACTING_AGENT_ID: "" },
      }
    )
    let output = ""
    try {
      output = readFileSync(outPath, "utf8")
    } catch {
      output = ""
    }
    const stderr = proc.stderr === null ? "" : new TextDecoder().decode(proc.stderr)
    return { code: proc.exitCode ?? 1, output: `${output}${stderr}` }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
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
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  const keepDays = keepDaysFrom(argv)
  if (keepDays === null) {
    process.stderr.write("--keep-days takes a count of days, zero or more\n")
    return 1
  }

  const roots = resolveRoots()
  const memory = rootFor(roots, MEMORY)
  const cutoff = cutoffFrom(Date.now(), keepDays)

  const standing: DayFacts[] = []
  for (const type of DAY_TYPES) standing.push(...daysIn(memory, type))
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
    memory,
    rootFor(roots, AKASHA)
  )
  if (together.code === 0) {
    taken.push(...rotate)
  } else {
    for (const one of rotate) {
      const alone = removePages([one.relPath], memory, rootFor(roots, AKASHA))
      if (alone.code === 0) taken.push(one)
      else held.push(`${one.name}: ${alone.output.trim().split("\n").slice(-1)[0] ?? "refused"}`)
    }
  }
  for (const one of taken) removeSidecars(memory, one.relPath)

  process.stderr.write(
    `removed ${taken.length} of ${rotate.length} log day(s) older than ${cutoff}; ` +
      `${standing.length - rotate.length} kept\n`
  )
  for (const one of held) process.stderr.write(`refused: ${one}\n`)
  return held.length === 0 ? 0 : 1
}

if (import.meta.main) process.exit(main(process.argv.slice(2)))
