import { createRequire } from "node:module"
import { basename, join } from "node:path"
import type { Adding, Replacing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodyFor,
  type Held,
  heldOver,
} from "akasha/code/body/modules/body-loading/body-loading.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  type Answering,
  answeringOver,
} from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { fileOf } from "akasha/page/index/modules/property-file/property-file.module.code.ts"
import { indexNamed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Settling } from "akasha/page/index/modules/settling/index-settling.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Made, Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const GROUP = "module-property-group"

const WRITES = "file-written-by"

const CARRIES = "page-property"

const CODE = "code"

const HOLDS = "ts"

const ANSWERS = "bodyIn"

const SLUG = "slug"

const PROPERTY_SLUG = "propertySlug"

const ENDING = "."

const PARTED_BY = "/"

const INDEXED = `${indexNamed()}${PARTED_BY}`

const NUL = "\0"

const LOADED = createRequire(import.meta.url).cache

type Writing = (given: string | Reading) => string

type Reached = { readonly writing: Writing } | { readonly missing: string }

export type Reaching = (change: Change, at: string, body: string | null) => Reached

type Group = {
  readonly slug: string
  readonly propertySlug: string
  readonly pageTypeSlugs: readonly string[]
}

type Written = {
  readonly edits: readonly (Adding | Replacing)[]
  readonly said: readonly string[]
}

const NOTHING_WRITTEN: Written = { edits: [], said: [] }

function namedAt(index: Answering, id: string, key: string): string | null {
  const listed = index.listedById(id)
  if (listed === null) return null
  const value = index.pageByPath(listed.path)
  return value === null ? null : textAt(value, key)
}

function carriedBy(index: Answering, id: string): readonly string[] {
  const found: string[] = []
  for (const carrier of index.idsNaming(id, CARRIES)) {
    const slug = namedAt(index, carrier, SLUG)
    if (slug !== null) found.push(slug)
  }
  return found
}

export function groupsIn(index: Answering): readonly Group[] {
  const found: Group[] = []
  for (const listed of index.everyOfType(GROUP)) {
    const slug = namedAt(index, listed.id, SLUG)
    if (slug === null) continue
    for (const id of index.idsNaming(listed.id, WRITES)) {
      const propertySlug = namedAt(index, id, PROPERTY_SLUG)
      if (propertySlug === null) continue
      found.push({ slug, propertySlug, pageTypeSlugs: carriedBy(index, listed.id) })
    }
  }
  return found
}

export function groupAt(page: string, slug: string): string | null {
  return besideAt(page, slug + ENDING + CODE, HOLDS)
}

export function writingIn(change: Change, at: string, body: string | null = null): Reached {
  let held: Held
  try {
    held = heldOver(change, at, body)
  } catch (thrown) {
    return { missing: thrown instanceof Error ? thrown.message : String(thrown) }
  }
  const named = held[ANSWERS]
  if (typeof named !== "function") return { missing: "it answers to no `" + ANSWERS + "`" }
  return { writing: named as Writing }
}

type Answered = { readonly written: string } | { readonly missing: string }

function writtenBy(writing: Writing, reading: Reading): Answered {
  try {
    return { written: writing(reading) }
  } catch (thrown) {
    return { missing: thrown instanceof Error ? thrown.message : String(thrown) }
  }
}

function over(
  group: Group,
  pageTypeSlug: string,
  change: Change,
  shadow: Shadow,
  reading: Reading,
  reaching: Reaching,
  edits: (Adding | Replacing)[],
  said: string[]
): undefined {
  const kept = "` keeps a `" + group.slug + "` group"
  for (const listed of shadow.index.everyOfType(pageTypeSlug)) {
    const value = shadow.pageOf(listed.path)
    if (value === null) continue
    const slug = value[SLUG]
    if (typeof slug !== "string") continue
    const beside = groupAt(listed.path, group.slug)
    if (beside === null) continue
    if (change.after(beside) === null) continue
    let path: string
    try {
      path = fileOf(reading, { path: listed.path, value }, pageTypeSlug, group.propertySlug)
    } catch (thrown) {
      said.push(
        "`" +
          slug +
          kept +
          ", and the file that group writes has no name — " +
          (thrown instanceof Error ? thrown.message : String(thrown))
      )
      continue
    }
    const at = shadow.codeAt(beside)
    if (at === null) {
      said.push(
        "`" +
          slug +
          kept +
          " this change adds, and a group's code is loaded at the path holding it, so `" +
          path +
          "` is written again on the next landing rather than this one"
      )
      continue
    }
    const reached = reaching(change, at, bodyFor(change, beside))
    if ("missing" in reached) {
      said.push("`" + slug + kept + ", and `" + beside + "` gave none — " + reached.missing)
      continue
    }
    const answered = writtenBy(reached.writing, reading)
    if ("missing" in answered) {
      said.push("`" + slug + kept + ", and `" + beside + "` broke — " + answered.missing)
      continue
    }
    const was = textOf(change.after(path))
    if (was === answered.written) continue
    edits.push(
      was === null
        ? { kind: "add", path, content: answered.written }
        : { kind: "replace", path, contentFrom: was, contentTo: answered.written }
    )
    said.push("`" + path + "` was written again by the group `" + slug + "` keeps")
  }
}

export function writtenOver(
  change: Change,
  shadow: Shadow,
  reading: Reading,
  reaching: Reaching = writingIn
): Written {
  const edits: (Adding | Replacing)[] = []
  const said: string[] = []
  for (const group of groupsIn(shadow.index)) {
    for (const pageTypeSlug of group.pageTypeSlugs) {
      over(group, pageTypeSlug, change, shadow, reading, reaching, edits, said)
    }
  }
  return { edits, said }
}

function couldWrite(change: Change): boolean {
  for (const path of change.changed) {
    if (partedIn(path) !== null) return true
    if (!basename(path).includes(ENDING)) return true
  }
  return false
}

type Kept = {
  readonly root: string
  readonly base: string
  readonly touched: readonly string[]
  readonly read: ReadonlySet<string>
}

let kept: Kept | null = null

function recorded(reading: Reading, read: Set<string>): Reading {
  return {
    holds: (at) => {
      read.add(at)
      return reading.holds(at)
    },
    listing: (at) => {
      read.add(at)
      return reading.listing(at)
    },
    lines: (at) => {
      read.add(at)
      return reading.lines(at)
    },
    read: (path) => {
      read.add(path)
      return reading.read(path)
    },
  }
}

function touchedBy(change: Change, settled: Settling): readonly string[] {
  return [
    ...change.changed,
    ...settled.filings.map((one) => one.at),
    ...settled.references.map((one) => one.at),
    ...settled.beside.keys(),
  ]
}

export function readOver(read: ReadonlySet<string>, path: string): boolean {
  let at = path.startsWith(INDEXED) ? path.slice(INDEXED.length) : path
  for (;;) {
    if (read.has(at)) return true
    const cut = at.lastIndexOf(PARTED_BY)
    if (cut < 0) return false
    at = at.slice(0, cut)
  }
}

function movedSince(root: string, from: string, to: string): readonly string[] {
  if (from === to) return []
  return gitIn(root, ["diff", "--name-only", "--no-renames", "-z", from, to])
    .split(NUL)
    .filter((one) => one !== "")
}

function unturned(change: Change, touched: readonly string[]): boolean {
  const base = change.base
  if (kept === null || base === undefined || kept.root !== change.root) return false
  let since: readonly string[]
  try {
    since = movedSince(change.root, kept.base, base)
  } catch {
    return false
  }
  for (const path of [...since, ...kept.touched, ...touched]) {
    if (readOver(kept.read, path)) return false
    if (join(change.root, path) in LOADED) return false
  }
  return true
}

function keptOver(change: Change, cast: Made): Written {
  const settled = cast.settled
  const base = change.base
  if (settled === null || base === undefined) {
    kept = null
    return writtenOver(change, cast.shadow, cast.reading)
  }
  const touched = touchedBy(change, settled)
  if (unturned(change, touched)) return NOTHING_WRITTEN
  kept = null
  const read = new Set<string>()
  const reading = recorded(cast.reading, read)
  const pageOf = (path: string) => {
    read.add(path)
    return cast.shadow.pageOf(path)
  }
  const codeAt = (path: string) => {
    read.add(path)
    return cast.shadow.codeAt(path)
  }
  const index = answeringOver(reading, pageOf)
  const written = writtenOver(change, { ...cast.shadow, pageOf, codeAt, index }, reading)
  kept = { root: change.root, base, touched, read }
  return written
}

export function generateChange(change: Change): Written {
  try {
    if (!couldWrite(change)) return NOTHING_WRITTEN
    const cast = shadowFor(change)
    if ("refused" in cast)
      return { edits: [], said: ["no group wrote its file again — " + cast.refused] }
    return keptOver(change, cast)
  } catch (thrown) {
    kept = null
    return {
      edits: [],
      said: [
        "no group wrote its file again — " +
          (thrown instanceof Error ? thrown.message : String(thrown)),
      ],
    }
  }
}
