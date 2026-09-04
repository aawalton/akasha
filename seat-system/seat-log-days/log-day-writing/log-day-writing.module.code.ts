import { existsSync, mkdirSync, statSync } from "node:fs"
import { appendFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { ENTRY_CEILING } from "@akasha/pages-system/entry-ceiling"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { uncommittedPartAt } from "@akasha/pages-system/page-file-parts"

const CALLED_AS = "log-day-writing"

const SOURCES_AT = "seat-system/log-sources/pages"

const DAYS_AT = "seat-system/seat-log-days/pages"

const LINES_KEY = "lines"

const HELD = "jsonl"

const FIRST_PART = 1

export type LogLine = {
  readonly "written-at": string
  readonly "agent-id"?: string | undefined
  readonly level?: string | undefined
  readonly text?: string | undefined
  readonly data?: unknown
}

export interface LogWriter {
  readonly write: (line: LogLine) => undefined
  readonly refused: () => string | null
  readonly flushed: () => Promise<void>
}

interface Appender {
  readonly append: (line: LogLine) => undefined
  readonly refused: () => string | null
  readonly at: () => string
  readonly flushed: () => Promise<void>
}

function said(value: string): string {
  return JSON.stringify(value)
}

export function dayNameOf(source: string, seatName: string, date: string): string {
  return `${source}-${seatName}-${date}`
}

export function sourcePathOf(source: string): string {
  return `${SOURCES_AT}/${source}.log-source.ts`
}

export function dayPathOf(slug: string): string {
  return `${DAYS_AT}/${slug}.seat-log-day.ts`
}

export function sourceBodyOf(source: string): string {
  return [
    'import type { LogSource } from "../log-source.page-type.ts"',
    "",
    `export const ${exportedAs(source)} = {`,
    '  pageTypeSlug: "log-source",',
    `  slug: ${said(source)},`,
    "} as const satisfies LogSource",
    "",
  ].join("\n")
}

export function dayBodyOf(slug: string, source: string, seatName: string, date: string): string {
  return [
    'import type { SeatLogDay } from "../seat-log-day.page-type.ts"',
    "",
    `export const ${exportedAs(slug)} = {`,
    '  pageTypeSlug: "seat-log-day",',
    `  slug: ${said(slug)},`,
    `  sourceSlug: ${said(source)},`,
    `  seatName: ${said(seatName)},`,
    `  date: ${said(date)},`,
    "} as const satisfies SeatLogDay",
    "",
  ].join("\n")
}

async function stood(root: string, path: string, body: string, message: string): Promise<boolean> {
  if (existsSync(join(root, path))) return true
  const answer = await landedMechanically(
    root,
    CALLED_AS,
    [{ path, body: new TextEncoder().encode(body) }],
    message
  )
  if (answer.code !== 0) return false
  return existsSync(join(root, path))
}

function partAt(pagePath: string, part: number): string | null {
  return uncommittedPartAt(pagePath, LINES_KEY, HELD, part)
}

function sizeOf(path: string): number {
  try {
    return statSync(path).size
  } catch {
    return 0
  }
}

function lastPartOf(root: string, pagePath: string): { path: string; part: number; bytes: number } {
  let part = FIRST_PART
  let found = partAt(pagePath, part) as string
  for (;;) {
    const next = partAt(pagePath, part + 1)
    if (next === null || !existsSync(join(root, next))) break
    part += 1
    found = next
  }
  return { path: join(root, found), part, bytes: sizeOf(join(root, found)) }
}

function appenderFor(
  root: string,
  source: string,
  seatName: string,
  date: string
): Appender | null {
  if (
    !stood(
      root,
      sourcePathOf(source),
      sourceBodyOf(source),
      `${source}: a log source is the log one program keeps`
    )
  ) {
    return null
  }
  const slug = dayNameOf(source, seatName, date)
  const pagePath = dayPathOf(slug)
  if (
    !stood(
      root,
      pagePath,
      dayBodyOf(slug, source, seatName, date),
      `${slug}: one source's lines for one seat on one day`
    )
  ) {
    return null
  }
  const held = lastPartOf(root, pagePath)
  mkdirSync(dirname(held.path), { recursive: true })
  let path = held.path
  let part = held.part
  let bytes = held.bytes
  let refused: string | null = null
  let queued: Promise<void> = Promise.resolve()
  return {
    append: (line): undefined => {
      if (refused !== null) return
      let text: string
      try {
        text = JSON.stringify(line)
      } catch (error) {
        refused = `no line reached ${path}: ${error instanceof Error ? error.message : String(error)}`
        return
      }
      const size = Buffer.byteLength(text, "utf8") + 1
      if (bytes > 0 && bytes + size > ENTRY_CEILING) {
        const next = partAt(dayPathOf(dayNameOf(source, seatName, date)), part + 1)
        if (next === null) {
          refused = `no part beyond ${String(part)} could be named beside ${pagePath}`
          return
        }
        part += 1
        path = join(root, next)
        bytes = 0
      }
      bytes += size
      const at = path
      queued = queued.then(async () => {
        try {
          await appendFile(at, `${text}\n`, "utf8")
        } catch (error) {
          refused = `no line reached ${at}: ${error instanceof Error ? error.message : String(error)}`
        }
      })
    },
    refused: () => refused,
    at: () => path,
    flushed: () => queued,
  }
}

export function logWriter(
  source: string,
  seatName: string,
  root: string = rootFor(resolveRoots(), AKASHA)
): LogWriter {
  let date = ""
  let appender: Appender | null = null
  let refused: string | null = null
  return {
    write: (line): undefined => {
      try {
        const today = line["written-at"].slice(0, 10)
        if (today !== date) {
          date = today
          appender = appenderFor(root, source, seatName, today)
          if (appender === null)
            refused = `no log day could be opened for \`${seatName}\` on ${today}`
        }
        appender?.append(line)
        const say = appender?.refused() ?? null
        if (say !== null) refused = say
      } catch (err) {
        refused = err instanceof Error ? err.message : String(err)
      }
    },
    refused: () => refused,
    flushed: () => appender?.flushed() ?? Promise.resolve(),
  }
}
