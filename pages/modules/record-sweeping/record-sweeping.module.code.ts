import { Buffer } from "node:buffer"
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { exclusively } from "akasha/files/modules/exclusive/exclusive.module.code.ts"
import {
  everyPath,
  readingIn,
  valuesOfType,
} from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/modules/shape/index-shape.module.code.ts"
import { partUnfiled } from "akasha/pages/indexes/path/index-path.index.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import { ENTRY_CEILING } from "akasha/pages/modules/entry-ceiling/entry-ceiling.module.code.ts"
import { pageOf, partedIn } from "akasha/pages/modules/file-name/page-file-name.module.code.ts"
import { uncommittedPartsOf } from "akasha/pages/modules/file-parts/page-file-parts.module.code.ts"
import {
  numberAt,
  textAt,
} from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"

const FILE_PROPERTY = "file-property"

const HELD = "jsonl"

const TS = ".ts"

const ENDING = ".uncommitted.jsonl"

const KEPT_FOR = "keptForHours"

const PROPERTY_SLUG = "propertySlug"

const HOUR_MS = 3_600_000

const TURN_MS = 5_000

const NUMBERED = /^part\d+$/

export function windowsIn(given: string | Reading): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const one of valuesOfType(given, FILE_PROPERTY)) {
    const hours = numberAt(one.value, KEPT_FOR)
    const slug = textAt(one.value, PROPERTY_SLUG)
    if (hours === null || slug === null) continue
    found.set(slug, hours)
  }
  return found
}

export function propertyOf(path: string, windows: ReadonlyMap<string, number>): string | null {
  if (!path.endsWith(ENDING)) return null
  const stem = path.slice(0, -ENDING.length)
  const sections = stem.slice(stem.lastIndexOf("/") + 1).split(".")
  const last = sections[sections.length - 1] ?? ""
  const said = NUMBERED.test(last) ? (sections[sections.length - 2] ?? "") : last
  return windows.has(said) ? said : null
}

export function sectionOf(page: string, path: string): string | null {
  const stem = page.slice(0, page.lastIndexOf("."))
  if (!path.startsWith(`${stem}.`) || !path.endsWith(ENDING)) return null
  const said = path.slice(stem.length + 1, -ENDING.length)
  const sections = said.split(".")
  const last = sections[sections.length - 1] ?? ""
  return NUMBERED.test(last) ? sections.slice(0, -1).join(".") : said
}

export type Stream = {
  readonly page: string
  readonly section: string
  readonly hours: number
}

export function streamsIn(given: string | Reading): readonly Stream[] {
  const reading = readingIn(given)
  const windows = windowsIn(reading)
  const found = new Map<string, Stream>()
  for (const path of everyPath(reading)) {
    const propertySlug = propertyOf(path, windows)
    if (propertySlug === null) continue
    const hours = windows.get(propertySlug)
    if (hours === undefined) continue
    const said = partedIn(path)
    if (said === null) continue
    const page = join(dirname(path), `${pageOf(said)}${TS}`)
    const section = sectionOf(page, path)
    if (section === null) continue
    const key = `${page}\t${section}`
    if (!found.has(key)) found.set(key, { page, section, hours })
  }
  return [...found.values()]
}

export type Kept = {
  readonly kept: string
  readonly dropped: number
}

export function keptFrom(text: string, cutoff: number): Kept {
  const held: string[] = []
  let dropped = 0
  for (const line of text.split("\n")) {
    if (line === "") continue
    let said: unknown
    try {
      said = (JSON.parse(line) as { readonly ranAt?: unknown }).ranAt
    } catch {
      held.push(line)
      continue
    }
    const when = typeof said === "string" ? Date.parse(said) : Number.NaN
    if (Number.isNaN(when) || when >= cutoff) held.push(line)
    else dropped += 1
  }
  return { kept: held.length === 0 ? "" : `${held.join("\n")}\n`, dropped }
}

export function packed(kept: string, ceiling: number): readonly string[] {
  const files: string[] = []
  let holding = ""
  for (const line of kept.split("\n")) {
    if (line === "") continue
    const one = `${line}\n`
    if (holding !== "" && Buffer.byteLength(holding + one, "utf8") > ceiling) {
      files.push(holding)
      holding = ""
    }
    holding += one
  }
  if (holding !== "") files.push(holding)
  return files
}

export function sweptStream(root: string, one: Stream, nowMs: number): number {
  const existing = (at: string): boolean => existsSync(join(root, at))
  const parts = uncommittedPartsOf(one.page, one.section, HELD, existing)
  const first = parts[0]
  if (first === undefined || !existing(first)) return 0
  const cutoff = nowMs - one.hours * HOUR_MS
  return exclusively(
    join(root, first),
    (): number => {
      const now = uncommittedPartsOf(one.page, one.section, HELD, existing)
      let text = ""
      for (const at of now) {
        try {
          text += readFileSync(join(root, at), "utf8")
        } catch {
          return 0
        }
      }
      const held = keptFrom(text, cutoff)
      if (held.dropped === 0) return 0
      const filling = packed(held.kept, ENTRY_CEILING)
      for (let at = 0; at < now.length; at += 1) {
        const path = now[at] as string
        const to = path.endsWith(ENDING) ? join(root, path) : null
        const body = filling[at]
        if (to === null) continue
        if (body === undefined) {
          rmSync(to, { force: true })
          partUnfiled(root, path)
          continue
        }
        writeFileSync(to, body)
      }
      return held.dropped
    },
    TURN_MS
  )
}

export function sweepRecords(argv: readonly string[]): number {
  const root = rootFor(resolveRoots(), AKASHA)
  const streams = streamsIn(root)
  if (!argv.includes("--remove")) {
    for (const one of streams) {
      process.stdout.write(`${one.page}\t${one.section}\t${String(one.hours)}h\n`)
    }
    process.stderr.write(
      `read ${String(streams.length)} stream(s) stating a window — ` +
        "nothing removed without --remove\n"
    )
    return 0
  }
  const now = Date.now()
  let dropped = 0
  let swept = 0
  let busy = 0
  for (const one of streams) {
    let took = 0
    try {
      took = sweptStream(root, one, now)
    } catch {
      busy += 1
      continue
    }
    if (took === 0) continue
    dropped += took
    swept += 1
  }
  process.stderr.write(
    `dropped ${String(dropped)} line(s) past the window from ${String(swept)} of ` +
      `${String(streams.length)} stream(s); ${String(busy)} whose turn did not come\n`
  )
  return 0
}

if (import.meta.main) process.exit(sweepRecords(process.argv.slice(2)))
