import { Buffer } from "node:buffer"
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { exclusively } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
import {
  type Asked,
  closureOf,
} from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { extended } from "akasha/graph/predicate/pages/extended/extended.graph-predicate.ts"
import { extenders } from "akasha/graph/predicate/pages/extenders/extenders.graph-predicate.ts"
import { answeringOver } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  everyOfType,
  readingIn,
  type Valued,
  valueByPath,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { ENTRY_CEILING } from "akasha/page/modules/entry-ceiling/entry-ceiling.module.code.ts"
import { FIRST_PART } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  uncommittedPartAt,
  uncommittedPartsOf,
} from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import {
  numberAt,
  recordsIn,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { z } from "zod"

const FILE_PROPERTY = "file-property"

const FILE_PROPERTY_GROUP = "file-property-group"

const PAGE_TYPE = "page-type"

const HELD = "jsonl"

const ENDING = ".uncommitted.jsonl"

const KEPT_FOR = "keptForHours"

const PROPERTY_SLUG = "propertySlug"

const PAGE_PROPERTY = "pageProperty"

const PROPERTIES = "properties"

const SLUG = "slug"

const HOUR_MS = 3_600_000

const TURN_MS = 5_000

const TOLD_TO_STOP = "SIGTERM"

const STOPPED_EXIT = 1

const PARTS_PROBED = 2

const RAN_AT_LINE = z.object({ ranAt: z.string() })

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

type Declared = {
  readonly pageTypeSlug: string
  readonly slug: string
}

function typesIn(given: string | Reading): ReadonlyMap<string, Valued> {
  const found = new Map<string, Valued>()
  for (const one of valuesOfType(given, PAGE_TYPE)) {
    const slug = textAt(one.value, SLUG)
    if (slug !== null) found.set(slug, one)
  }
  return found
}

function askedOver(reading: Reading): Asked {
  return {
    index: answeringOver(reading, (path) => valueByPath(reading, path)),
    bodyAt: (path) => reading.read(path),
  }
}

function valuesAt(paths: readonly string[], asked: Asked): readonly Value[] {
  const found: Value[] = []
  for (const path of paths) {
    const value = asked.index.valueAt(path)
    if (value !== null) found.push(value)
  }
  return found
}

type Deriving = {
  readonly types: ReadonlyMap<string, Valued>
  readonly asked: Asked
  readonly windows: ReadonlyMap<string, number>
  readonly groups: ReadonlySet<string>
  readonly members: Map<string, ReadonlyMap<string, number>>
}

function declaredBy(deriving: Deriving, slug: string): readonly Declared[] {
  const own = deriving.types.get(slug)
  if (own === undefined) return []
  const found: Declared[] = []
  for (const one of valuesAt(closureOf(extended, [own.path], deriving.asked), deriving.asked)) {
    for (const held of recordsIn(one[PROPERTIES])) {
      const named = textAt(held, PAGE_PROPERTY)
      if (named === null) continue
      const address = addressIn(named)
      if (address.kind !== "qualified") continue
      found.push({ pageTypeSlug: address.pageTypeSlug, slug: address.slug })
    }
  }
  return found
}

function groupsIn(types: ReadonlyMap<string, Valued>, asked: Asked): ReadonlySet<string> {
  const group = types.get(FILE_PROPERTY_GROUP)
  if (group === undefined) return new Set()
  const found = new Set<string>()
  for (const one of valuesAt(closureOf(extenders, [group.path], asked), asked)) {
    const slug = textAt(one, SLUG)
    if (slug !== null && slug !== FILE_PROPERTY_GROUP) found.add(slug)
  }
  return found
}

function memberedIn(deriving: Deriving, slug: string): ReadonlyMap<string, number> {
  const held = deriving.members.get(slug)
  if (held !== undefined) return held
  const found = new Map<string, number>()
  for (const one of declaredBy(deriving, slug)) {
    if (one.pageTypeSlug !== FILE_PROPERTY) continue
    const hours = deriving.windows.get(one.slug)
    if (hours !== undefined) found.set(one.slug, hours)
  }
  deriving.members.set(slug, found)
  return found
}

function sectionedBy(deriving: Deriving, slug: string): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const one of declaredBy(deriving, slug)) {
    if (one.pageTypeSlug === FILE_PROPERTY) {
      const hours = deriving.windows.get(one.slug)
      if (hours !== undefined) found.set(one.slug, hours)
      continue
    }
    if (!deriving.groups.has(one.pageTypeSlug)) continue
    for (const [member, hours] of memberedIn(deriving, one.pageTypeSlug)) {
      found.set(`${one.slug}.${member}`, hours)
    }
  }
  return found
}

export function sectionsOfType(
  given: string | Reading
): ReadonlyMap<string, ReadonlyMap<string, number>> {
  const reading = readingIn(given)
  const types = typesIn(reading)
  const asked = askedOver(reading)
  const deriving: Deriving = {
    types,
    asked,
    windows: windowsIn(reading),
    groups: groupsIn(types, asked),
    members: new Map(),
  }
  const found = new Map<string, ReadonlyMap<string, number>>()
  for (const slug of types.keys()) {
    const sections = sectionedBy(deriving, slug)
    if (sections.size > 0) found.set(slug, sections)
  }
  return found
}

export type Stream = {
  readonly page: string
  readonly section: string
  readonly hours: number
}

export function streamThere(
  page: string,
  section: string,
  existing: (at: string) => boolean
): boolean {
  for (let part = FIRST_PART; part < FIRST_PART + PARTS_PROBED; part += 1) {
    const at = uncommittedPartAt(page, section, HELD, part)
    if (at !== null && existing(at)) return true
  }
  return false
}

export function streamsIn(
  given: string | Reading,
  existing: (at: string) => boolean
): readonly Stream[] {
  const reading = readingIn(given)
  const found: Stream[] = []
  for (const [pageTypeSlug, sections] of sectionsOfType(reading)) {
    for (const one of everyOfType(reading, pageTypeSlug)) {
      for (const [section, hours] of sections) {
        if (streamThere(one.path, section, existing)) {
          found.push({ page: one.path, section, hours })
        }
      }
    }
  }
  return found
}

function existingIn(root: string): (at: string) => boolean {
  return (at) => existsSync(join(root, at))
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
    let said: ReturnType<typeof RAN_AT_LINE.safeParse>
    try {
      said = RAN_AT_LINE.safeParse(JSON.parse(line))
    } catch {
      held.push(line)
      continue
    }
    const when = said.success ? Date.parse(said.data.ranAt) : Number.NaN
    if (Number.isNaN(when) || when >= cutoff) held.push(line)
    else dropped += 1
  }
  return { kept: held.length === 0 ? "" : `${held.join("\n")}\n`, dropped }
}

export function packed(kept: string, ceiling: number): readonly string[] {
  const files: string[] = []
  let holding: string[] = []
  let width = 0
  for (const line of kept.split("\n")) {
    if (line === "") continue
    const one = `${line}\n`
    const wide = Buffer.byteLength(one, "utf8")
    if (width > 0 && width + wide > ceiling) {
      files.push(holding.join(""))
      holding = []
      width = 0
    }
    holding.push(one)
    width += wide
  }
  if (width > 0) files.push(holding.join(""))
  return files
}

export function sweptStream(root: string, one: Stream, nowMs: number): number {
  const existing = existingIn(root)
  const parts = uncommittedPartsOf(one.page, one.section, HELD, existing)
  const first = parts[0]
  if (first === undefined || !parts.some((at) => existing(at))) return 0
  const cutoff = nowMs - one.hours * HOUR_MS
  return exclusively(
    join(root, first),
    (): number => {
      const now = uncommittedPartsOf(one.page, one.section, HELD, existing)
      let text = ""
      for (const at of now) {
        if (at === first && !existing(at)) continue
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
          continue
        }
        writeFileSync(to, body)
      }
      return held.dropped
    },
    TURN_MS
  )
}

export type Swept = {
  readonly dropped: number
  readonly swept: number
  readonly streams: number
  readonly busy: number
  readonly reached: number | null
}

export function reportOf(said: Swept): string {
  const stopped =
    said.reached === null
      ? ""
      : `told to stop at ${String(said.reached)} of ${String(said.streams)} stream(s), ` +
        "so lines past the window are still there — "
  return (
    `${stopped}dropped ${String(said.dropped)} line(s) past the window from ` +
    `${String(said.swept)} of ${String(said.streams)} stream(s); ` +
    `${String(said.busy)} whose turn did not come\n`
  )
}

function turned(): Promise<undefined> {
  return new Promise((go) => {
    setImmediate(go)
  })
}

export async function sweepRecords(argv: readonly string[]): Promise<number> {
  const root = rootFor(resolveRoots(), AKASHA)
  const streams = streamsIn(root, existingIn(root))
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
  let reached = 0
  let stopping = false
  const heard = (): undefined => {
    stopping = true
  }
  process.on(TOLD_TO_STOP, heard)
  for (const one of streams) {
    let took = 0
    try {
      took = sweptStream(root, one, now)
    } catch {
      busy += 1
    }
    if (took > 0) {
      dropped += took
      swept += 1
    }
    reached += 1
    await turned()
    if (stopping) break
  }
  process.off(TOLD_TO_STOP, heard)
  const said = { dropped, swept, streams: streams.length, busy, reached: stopping ? reached : null }
  process.stderr.write(reportOf(said))
  return stopping ? STOPPED_EXIT : 0
}

if (import.meta.main) process.exit(await sweepRecords(process.argv.slice(2)))
