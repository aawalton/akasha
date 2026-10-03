import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import {
  ENTRY_PROPERTY,
  filePropertiesAt,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  everyOfType,
  listedAt,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Naming,
  sourceFor,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  type Carried,
  pageAt,
  propertiesIfNamed,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import { beats as beatsFile } from "akasha/story/chapter/properties/beats.file-property.ts"
import {
  type Cached,
  cachedOf,
  changesRefused,
  type Filed,
  mergedOf,
  type Reading,
} from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import {
  type Beats,
  beatsWritten,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { typeOf } from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"
import {
  type Handed,
  type Held,
  MECHANICS,
  type Moved,
  PLAYER,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const BEATS = exportedAs(beatsFile.propertySlug)

const PROSE = "prose"

const EXTENSIONS = "extensions"

const JSONL = "jsonl"

const BREAK = "\n"

const APPEND = `${changeMechanicalFileContent.slug}/${appendLines.slug}` as const

type Refused = { readonly refused: string }

export type Changing = (root: string) => Reading

export function beatsBodyOf(held: Beats, said: Moved): string | null {
  if (said.planned !== null) return beatsWritten({ ...said.planned, changes: [], memory: [] })
  const pictured = said.pictured ?? null
  if (said.changes === null && said.memory === null && pictured === null) return null
  const changes = said.changes ?? held.changes
  const memory = said.memory ?? held.memory
  return beatsWritten({ ...held, changes, memory, pictured: pictured ?? held.pictured ?? [] })
}

export function bodiesOf(
  said: Moved,
  held: Beats
): { readonly bodies?: { readonly [key: string]: string } } {
  const bodies: { [key: string]: string } = {}
  if (said.prose !== null) bodies[PROSE] = said.prose
  const beats = beatsBodyOf(held, said)
  if (beats !== null) bodies[BEATS] = beats
  return Object.keys(bodies).length === 0 ? {} : { bodies }
}

function endingOf(root: string, one: Carried): string | null {
  const page = pageAt(root, one.pageTypeSlug, one.pagePropertySlug, (path) => valueAt(path, root))
  const extensions = stringsIn(page?.[EXTENSIONS])
  if (extensions.includes(JSONL)) return JSONL
  return extensions.length === 1 ? (extensions[0] ?? null) : null
}

type PathOf = (page: string) => string | null

function filedIndexed(root: string, pathOf: PathOf): Reading["filed"] {
  const source = sourceFor(root)
  const carrying = new Map<string, readonly Carried[]>()
  const carriedOf = (type: string): readonly Carried[] => {
    const held = carrying.get(type) ?? propertiesIfNamed(type, source) ?? []
    carrying.set(type, held)
    return held
  }
  return (page, key): Filed | null => {
    const type = typeOf(page)
    const one = carriedOf(type).find((each) => each.key === key)
    if (one === undefined || one.uncommitted || one.pageTypeSlug === ENTRY_PROPERTY) return null
    if (filePropertiesAt(root).get(type)?.get(one.propertySlug) !== null) return null
    const held = pathOf(page)
    const said = held === null ? undefined : valueAt(held, root)?.[key]
    const stated = typeof said === "string"
    const ending = stated ? said : endingOf(root, one)
    const at = held === null || ending === null ? null : besideAt(held, one.propertySlug, ending)
    return { propertySlug: one.propertySlug, ending, stated, at }
  }
}

export function changesIndexed(root: string): Reading {
  const pathOf: PathOf = (page) => listedAt(root, typeOf(page), slugOf(page))[0]?.path ?? null
  return {
    exists: (page) => pathOf(page) !== null,
    valueOf: (page, key) => {
      const at = pathOf(page)
      return at === null ? undefined : valueAt(at, root)?.[key]
    },
    filed: filedIndexed(root, pathOf),
  }
}

export function changesChecked(reading: Reading, held: Held, handed: Handed): string | null {
  if (handed.kind !== "record" || held.status !== MECHANICS) return null
  const more = handed.changes ?? []
  if (more.length === 0) return null
  return changesRefused(mergedOf(held.changes ?? [], more), reading)
}

export type Placing = (page: string) => string | null

const PARTED = "/"

type Kept = { readonly folder: string; readonly own: boolean }

function keptAt(path: string, type: string): Kept {
  const parted = path.split(PARTED)
  const name = parted.pop() ?? ""
  const slug = name.slice(0, -`.${type}.ts`.length)
  const own = parted.at(-1) === slug
  if (own) parted.pop()
  return { folder: parted.join(PARTED), own }
}

function mostOf(kept: readonly Kept[]): Kept | null {
  const counted = new Map<string, { readonly kept: Kept; count: number }>()
  for (const one of kept) {
    const key = `${one.folder}${PARTED}${one.own}`
    const held = counted.get(key) ?? { kept: one, count: 0 }
    held.count += 1
    counted.set(key, held)
  }
  const sorted = [...counted.values()].toSorted((one, other) => other.count - one.count)
  return sorted[0]?.kept ?? null
}

function underOf(path: string, folders: readonly string[]): string | null {
  const held = folders.filter((one) => path.startsWith(`${one}${PARTED}`))
  return held.toSorted((one, other) => other.length - one.length)[0] ?? null
}

export function placedAmong(
  page: string,
  paths: readonly string[],
  stories: readonly string[],
  story: string
): string {
  const type = typeOf(page)
  const slug = slugOf(page)
  const kept = paths.map((one) => keptAt(one, type))
  const own = mostOf(kept.filter((one) => underOf(`${one.folder}${PARTED}`, [story]) !== null))
  const elsewhere = mostOf(
    kept.flatMap((one): Kept[] => {
      const under = underOf(`${one.folder}${PARTED}`, stories)
      if (under === null) return []
      return [{ folder: `${story}${one.folder.slice(under.length)}`, own: one.own }]
    })
  )
  const found = own ?? elsewhere ?? { folder: `${story}${PARTED}${type}`, own: false }
  const folder = found.own ? `${found.folder}${PARTED}${slug}` : found.folder
  return `${folder}${PARTED}${slug}.${type}.ts`
}

const STORIES = [storyPlayed.slug, storyWritten.slug]

function folderOf(path: string): string {
  return path.slice(0, path.lastIndexOf(PARTED))
}

export function placingIndexed(root: string, game: string, chapter: boolean): Placing {
  const owner = listedAt(root, chapter ? storyWritten.slug : storyPlayed.slug, game)[0]
  if (owner === undefined) return () => null
  const story = folderOf(owner.path)
  return (page) => {
    const stories = STORIES.flatMap((type) => everyOfType(root, type)).map((one) =>
      folderOf(one.path)
    )
    const paths = everyOfType(root, typeOf(page)).map((one) => one.path)
    return placedAmong(page, paths, stories, story)
  }
}

export type Cache = {
  readonly namings: readonly Naming[]
  readonly appends: readonly Asking[]
}

function contentOf(lines: readonly unknown[]): string {
  return lines.map((one) => `${JSON.stringify(one)}${BREAK}`).join("")
}

function cacheOf(reading: Reading, placing: Placing, one: Cached, appends: Asking[]): Naming {
  const path = one.made ? placing(one.page) : null
  const values: Record<string, unknown> = { ...one.values }
  const bodies: Record<string, string> = {}
  for (const [key, lines] of Object.entries(one.lines ?? {})) {
    const filed = reading.filed(one.page, key)
    if (filed === null || filed.ending === null) continue
    if (!filed.stated) values[key] = filed.ending
    const content = contentOf(lines)
    if (filed.at === null) bodies[key] = content
    else appends.push({ at: APPEND, given: { at: filed.at, content } })
  }
  return {
    pageTypeSlug: typeOf(one.page),
    slug: slugOf(one.page),
    merge: !one.made,
    values,
    ...(Object.keys(bodies).length === 0 ? {} : { bodies }),
    ...(path === null ? {} : { path }),
  }
}

export function cacheNamed(
  reading: Reading,
  held: Held,
  status: TurnStep,
  placing: Placing = () => null
): Cache | Refused {
  const changes = held.changes ?? []
  if (status !== PLAYER || changes.length === 0) return { namings: [], appends: [] }
  const cached = cachedOf(changes, reading)
  if ("refused" in cached) return cached
  const appends: Asking[] = []
  const namings = cached.map((one) => cacheOf(reading, placing, one, appends))
  return { namings, appends }
}
