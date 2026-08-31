import { namedIn } from "../../page/page-file-name/page-file-name.module.code.ts"
import {
  everyOfType,
  idsNaming,
  readingIn,
  schemaOf,
  standingAt,
  standingById,
} from "../index-reading/index-reading.module.code.ts"
import type { Reading } from "../index-shape/index-shape.module.code.ts"

const DECLARES = "page-property-slug"

const EXTENDS = "extends-slug"

const PAGE_TYPE = "page-type"

const RECORD_PROPERTY = "record-property"

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
    const standing = standingById(reading, said)
    if (standing === null) continue
    const named = namedIn(standing.path)
    if (named === null) continue
    found.push({ slug: named.stem, kind: named.tail, id: said, path: standing.path })
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
    const standing = standingById(reading, one)
    if (standing === null) continue
    const named = namedIn(standing.path)
    if (named === null || named.tail !== PAGE_TYPE) continue
    found.push(named.stem)
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
  const standing = standingAt(reading, filed.schema.pageTypeSlug, slug)[0]
  if (standing === undefined) return { refused: carriesNo(named) }

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
  take(standing.id, null)
  return { carrying: ordered(found) }
}

export function carryingAnswered(given: string | Reading, named: string): readonly Carrying[] {
  const said = carryingOf(given, named)
  if ("refused" in said) throw new Error(said.refused)
  return said.carrying
}
