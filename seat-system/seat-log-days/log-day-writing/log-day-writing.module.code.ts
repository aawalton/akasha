import { existsSync, mkdirSync } from "node:fs"
import { appendFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { ENTRY_CEILING } from "akasha/pages/entry-ceiling/entry-ceiling.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { uncommittedPartAt } from "akasha/pages/file-parts/page-file-parts.module.code.ts"
import { partFiled } from "akasha/pages/indexes/path/index-path.index.code.ts"
import { typeSlugOf } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { sizeOnDisk } from "akasha/utils/fs/file-size/file-size.module.code.ts"

const PUT = "change-mechanical/add-file-of-any-kind"

const LOG_SOURCE_TYPE = "01a0657c-cb14-7c6f-83df-0d533f4f7821"

const SEAT_LOG_DAY_TYPE = "01a0657c-cb14-7b5b-a206-18059a84a88a"

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
  return `${DAYS_AT}/${slug}/${slug}.seat-log-day.ts`
}

function dayPathIn(root: string, slug: string): string {
  const flat = `${DAYS_AT}/${slug}.seat-log-day.ts`
  return existsSync(join(root, flat)) ? flat : dayPathOf(slug)
}

export function sourceBodyOf(root: string, source: string): string {
  return [
    'import type { LogSource } from "akasha/seat-system/log-sources/log-source.page-type.types.ts"',
    "",
    `export const ${exportedAs(source)} = {`,
    `  pageTypeSlug: ${said(typeSlugOf(root, LOG_SOURCE_TYPE))},`,
    `  type: ${said(typeSlugOf(root, LOG_SOURCE_TYPE))},`,
    `  slug: ${said(source)},`,
    "} as const satisfies LogSource",
    "",
  ].join("\n")
}

export function dayBodyOf(
  root: string,
  slug: string,
  source: string,
  seatName: string,
  date: string
): string {
  return [
    'import type { SeatLogDay } from "akasha/seat-system/seat-log-days/seat-log-day.page-type.types.ts"',
    "",
    `export const ${exportedAs(slug)} = {`,
    `  pageTypeSlug: ${said(typeSlugOf(root, SEAT_LOG_DAY_TYPE))},`,
    `  type: ${said(typeSlugOf(root, SEAT_LOG_DAY_TYPE))},`,
    `  slug: ${said(slug)},`,
    `  source: ${said(source)},`,
    `  seatName: ${said(seatName)},`,
    `  date: ${said(date)},`,
    "} as const satisfies SeatLogDay",
    "",
  ].join("\n")
}

async function putUp(root: string, path: string, body: string, message: string): Promise<boolean> {
  if (existsSync(join(root, path))) return true
  const landed = await runMechanicalChange(root, [{ at: PUT, given: { at: path, body } }], message)
  if ("refusals" in landed || landed.wrong.length > 0) return false
  return existsSync(join(root, path))
}

function partAt(pagePath: string, part: number): string | null {
  return uncommittedPartAt(pagePath, LINES_KEY, HELD, part)
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
  return { path: join(root, found), part, bytes: sizeOnDisk(join(root, found)) }
}

function appenderFor(root: string, source: string, seatName: string, date: string): Appender {
  const slug = dayNameOf(source, seatName, date)
  const pagePath = dayPathIn(root, slug)
  const held = lastPartOf(root, pagePath)
  mkdirSync(dirname(held.path), { recursive: true })
  let path = held.path
  let part = held.part
  let bytes = held.bytes
  let refused: string | null = null
  let queued: Promise<void> = (async () => {
    const sourceAt = sourcePathOf(source)
    const sourceUp = await putUp(
      root,
      sourceAt,
      sourceBodyOf(root, source),
      `${source}: a log source is the log one program keeps`
    )
    if (!sourceUp) {
      refused = `no page landed at ${sourceAt}, so no line is written`
      return
    }
    const dayUp = await putUp(
      root,
      pagePath,
      dayBodyOf(root, slug, source, seatName, date),
      `${slug}: one source's lines for one seat on one day`
    )
    if (!dayUp) refused = `no page landed at ${pagePath}, so no line is written`
  })()
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
      let opened = false
      if (bytes > 0 && bytes + size > ENTRY_CEILING) {
        const next = partAt(pagePath, part + 1)
        if (next === null) {
          refused = `no part beyond ${String(part)} could be named beside ${pagePath}`
          return
        }
        part += 1
        path = join(root, next)
        bytes = 0
        opened = true
      }
      bytes += size
      const at = path
      queued = queued.then(async () => {
        if (refused !== null) return
        try {
          await appendFile(at, `${text}\n`, "utf8")
          if (opened) partFiled(root, pagePath, at)
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
