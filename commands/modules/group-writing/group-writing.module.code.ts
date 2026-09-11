import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { basename, join } from "node:path"
import type { Adding, Replacing } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { textOf } from "akasha/code-system/body-text/body-text.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { besideAt, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Answering } from "akasha/pages/indexes/answering/index-answering.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const GROUP = "module-property-group"

const WRITES = "file-written-by"

const CARRIES = "page-property"

const CODE = "code"

const HOLDS = "ts"

const ANSWERS = "bodyIn"

const SLUG = "slug"

const PROPERTY_SLUG = "propertySlug"

const ENDING = "."

const LOADER = "ts"

const SPECIAL = /[.*+?^${}()|[\]\\]/g

const NO_PLUGIN =
  "a body the change leaves is loaded with `Bun.plugin`, which only bun carries, and this runtime " +
  "holds no `Bun` global"

const loadFrom = createRequire(import.meta.url)

const bodyHeld = new Map<string, string>()

const claimed = new Set<string>()

export type Writing = (given: string | Reading) => string

export type Reached = { readonly writing: Writing } | { readonly missing: string }

export type Reaching = (root: string, at: string, body: string | null) => Reached

export type Group = {
  readonly slug: string
  readonly propertySlug: string
  readonly pageTypeSlugs: readonly string[]
}

export type Written = {
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

function forgotten(full: string): undefined {
  delete loadFrom.cache[full]
}

function claiming(full: string): undefined {
  if (claimed.has(full)) return
  claimed.add(full)
  const filter = new RegExp("^" + full.replace(SPECIAL, "\\$&") + "$")
  Bun.plugin({
    name: full,
    setup: (build) => {
      build.onLoad({ filter }, (args) => ({
        contents: bodyHeld.get(args.path) ?? readFileSync(args.path, "utf8"),
        loader: LOADER,
      }))
    },
  })
}

function loadedOver(full: string, body: string): Record<string, unknown> {
  if (typeof Bun === "undefined") throw new Error(NO_PLUGIN)
  bodyHeld.set(full, body)
  claiming(full)
  forgotten(full)
  try {
    return loadFrom(full) as Record<string, unknown>
  } finally {
    bodyHeld.delete(full)
    forgotten(full)
  }
}

export function writingIn(root: string, at: string, body: string | null = null): Reached {
  const full = join(root, at)
  let held: Record<string, unknown>
  try {
    held = body === null ? (loadFrom(full) as Record<string, unknown>) : loadedOver(full, body)
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

const CHANGED = new WeakMap<Change, ReadonlySet<string>>()

function changedIn(change: Change): ReadonlySet<string> {
  const found = CHANGED.get(change)
  if (found !== undefined) return found
  const made = new Set(change.changed)
  CHANGED.set(change, made)
  return made
}

function bodyFor(change: Change, at: string): string | null {
  return changedIn(change).has(at) ? textOf(change.after(at)) : null
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
    const reached = reaching(change.root, at, bodyFor(change, beside))
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

export function couldWrite(change: Change): boolean {
  for (const path of change.changed) {
    if (partedIn(path) !== null) return true
    if (!basename(path).includes(ENDING)) return true
  }
  return false
}

export function bodiesFor(change: Change): Written {
  try {
    if (!couldWrite(change)) return NOTHING_WRITTEN
    const cast = shadowFor(change)
    if ("refused" in cast)
      return { edits: [], said: ["no group wrote its file again — " + cast.refused] }
    return writtenOver(change, cast.shadow, cast.reading)
  } catch (thrown) {
    return {
      edits: [],
      said: [
        "no group wrote its file again — " +
          (thrown instanceof Error ? thrown.message : String(thrown)),
      ],
    }
  }
}
