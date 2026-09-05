import { basename, dirname } from "node:path"
import { partedIn } from "@akasha/pages-system/page-file-name"
import type { Value } from "@akasha/pages-system/page-value"
import {
  everyOfType,
  idsNaming,
  listedAt,
  listedById,
  readingIn,
  schemaOf,
} from "../reading/index-reading.module.code.ts"
import type { Reading } from "../shape/index-shape.module.code.ts"

const DECLARES = "page-property-slug"

const EXTENDS = "extends-slug"

const PAGE_TYPE = "page-type"

const RECORD_PROPERTY = "record-property"

const FILE_NAME = "fileName"

export type Carrying = {
  readonly pageTypeSlug: string
  readonly path: string
  readonly id: string
  readonly within: string | null
}

export type Carried = { readonly carrying: readonly Carrying[] } | { readonly refused: string }

export type Declaring = {
  readonly slug: string
  readonly kind: string
  readonly id: string
  readonly path: string
}

export function declaringOf(given: string | Reading, id: string): readonly Declaring[] {
  const reading = readingIn(given)
  const found: Declaring[] = []
  for (const said of idsNaming(reading, id, DECLARES)) {
    const listed = listedById(reading, said)
    if (listed === null) continue
    const named = partedIn(listed.path)
    if (named === null || named.sections.length > 0) continue
    found.push({ slug: named.slug, kind: named.pageType, id: said, path: listed.path })
  }
  return found
}

function underneath(reading: Reading, id: string): readonly string[] {
  const found: string[] = []
  const walked = new Set<string>()
  const waiting = [id]
  for (let one = waiting.pop(); one !== undefined; one = waiting.pop()) {
    if (walked.has(one)) continue
    walked.add(one)
    const listed = listedById(reading, one)
    if (listed === null) continue
    const named = partedIn(listed.path)
    if (named === null || named.sections.length > 0 || named.pageType !== PAGE_TYPE) continue
    found.push(named.slug)
    waiting.push(...idsNaming(reading, one, EXTENDS))
  }
  return found
}

function carriesNo(named: string): string {
  return `no page property carries the slug \`${named}\`, so which pages carry it could not be answered`
}

function ordered(found: readonly Carrying[]): readonly Carrying[] {
  return [...found].sort((one, two) => {
    const here = `${one.path} ${one.within ?? ""}`
    const there = `${two.path} ${two.within ?? ""}`
    return here < there ? -1 : here > there ? 1 : 0
  })
}

export function carryingOf(given: string | Reading, named: string): Carried {
  const reading = readingIn(given)
  const filed = schemaOf(reading, named)
  if ("refused" in filed) return { refused: filed.refused }
  const slug = filed.schema.slug
  if (slug === null) return { refused: carriesNo(named) }
  const listed = listedAt(reading, filed.schema.pageTypeSlug, slug)[0]
  if (listed === undefined) return { refused: carriesNo(named) }

  const found: Carrying[] = []
  const already = new Set<string>()
  const take = (id: string, within: string | null): undefined => {
    for (const held of declaringOf(reading, id)) {
      if (held.kind === RECORD_PROPERTY) {
        if (within === null) take(held.id, held.slug)
        continue
      }
      if (held.kind !== PAGE_TYPE) continue
      for (const kind of underneath(reading, held.id)) {
        for (const one of everyOfType(reading, kind)) {
          const key = `${one.path} ${within ?? ""}`
          if (already.has(key)) continue
          already.add(key)
          found.push({ pageTypeSlug: kind, path: one.path, id: one.id, within })
        }
      }
    }
  }
  take(listed.id, null)
  return { carrying: ordered(found) }
}

export type Naming = {
  readonly path: string
  readonly value: Value | null
}

export function heldBeside(
  path: string,
  naming: Iterable<Naming>,
  wanted: (value: Value) => boolean,
  carriedBy: (named: string) => Carried
): boolean {
  const folder = dirname(path)
  const name = basename(path)
  for (const one of naming) {
    const value = one.value
    if (value === null || !wanted(value)) continue
    const named = value[FILE_NAME]
    if (typeof named !== "string" || named !== name) continue
    const said = partedIn(one.path)
    if (said === null || said.sections.length > 0) continue
    const held = carriedBy(`${said.pageType}/${said.slug}`)
    if ("refused" in held) continue
    if (held.carrying.some((two) => dirname(two.path) === folder)) return true
  }
  return false
}
