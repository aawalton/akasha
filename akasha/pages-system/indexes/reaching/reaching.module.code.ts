import { join } from "node:path"
import { addressIn } from "../../page/page-address/page-address.module.code.ts"
import { indexIdentity } from "../index/index-identity/index-identity.index.ts"
import {
  type Standing,
  schemaAt,
  slugOf,
  textAt,
  type Value,
  valueAt,
} from "../index-entries/index-entries.module.code.ts"
import { type Reading, readingOf } from "../index-surface/index-surface.module.code.ts"

const IDENTITY = indexIdentity.indexName

const RECORD = "record-property"

const DECLARED = "properties"

const SAID = "pagePropertySlug"

const ENDING = ".jsonl"

function standingIn(reading: Reading, at: string): readonly Standing[] {
  return reading.lines(at).map((one) => JSON.parse(one) as Standing)
}

export type Known = {
  readonly targetOf: (propertySlug: string) => string | null
  readonly admitting: (target: string) => readonly string[]
  readonly at: (pageTypeSlug: string, slug: string) => readonly Standing[]
  readonly byId: (id: string) => Standing | null
}

export type Shaped = Known & {
  readonly fieldsOf: (propertySlug: string) => readonly string[]
}

function everyPageOf(reading: Reading, pageTypeSlug: string): readonly Standing[] {
  const dir = join(IDENTITY, pageTypeSlug, "slug")
  const found: Standing[] = []
  for (const one of reading.listing(dir)) found.push(...standingIn(reading, join(dir, one.name)))
  return found
}

function fieldsIn(value: Value): readonly string[] {
  const declared = value[DECLARED]
  if (!Array.isArray(declared)) return []
  const found: string[] = []
  for (const one of declared) {
    if (one === null || typeof one !== "object") continue
    const named = (one as Value)[SAID]
    if (typeof named === "string") found.push(slugOf(named))
  }
  return found
}

export function knownIn(
  given: string | Reading,
  repo: string,
  pageOf: (path: string) => Value | null = (path) => valueAt(path, repo)
): Shaped {
  const reading = readingOf(given)
  const target = new Map<string, string>()
  for (const [slug, held] of schemaAt(reading)) {
    const named = held.pageTypeSlug === "relation-property" ? held.targetPageTypeSlug : null
    if (named !== null) target.set(slug, named)
  }

  const above = new Map<string, string>()
  for (const one of everyPageOf(reading, "page-type")) {
    const value = pageOf(one.path)
    if (value === null) continue
    const slug = textAt(value, "slug")
    const extendsSlug = textAt(value, "extendsSlug")
    if (slug !== null && extendsSlug !== null) above.set(slug, slugOf(extendsSlug))
  }
  const everyType = new Set<string>([...above.keys(), ...above.values()])

  const fields = new Map<string, readonly string[]>()
  for (const one of everyPageOf(reading, RECORD)) {
    const value = pageOf(one.path)
    if (value === null) continue
    const slug = textAt(value, "slug")
    if (slug !== null) fields.set(slug, fieldsIn(value))
  }

  const targetOf = (propertySlug: string): string | null => {
    return target.get(propertySlug) ?? null
  }

  const admitting = (wanted: string): readonly string[] => {
    const found: string[] = []
    for (const one of everyType) {
      const walked = new Set<string>()
      let here: string | undefined = one
      while (here !== undefined && !walked.has(here)) {
        if (here === wanted) {
          found.push(one)
          break
        }
        walked.add(here)
        here = above.get(here)
      }
    }
    return found
  }

  return {
    targetOf,
    admitting,
    at: (pageTypeSlug, slug) =>
      standingIn(reading, join(IDENTITY, pageTypeSlug, "slug", `${slug}${ENDING}`)),
    byId: (id) => standingIn(reading, join(IDENTITY, "page", "id", `${id}${ENDING}`))[0] ?? null,
    fieldsOf: (propertySlug) => fields.get(propertySlug) ?? [],
  }
}

export type Reached = { readonly id: string } | { readonly refused: string }

function only(found: readonly Standing[]): Standing | null {
  const one = found[0]
  return found.length === 1 && one !== undefined ? one : null
}

function among(named: string, found: readonly Standing[]): string {
  return `\`${named}\` narrows to ${found.length} pages and must name its page type — ${found
    .map((one) => one.path)
    .join(", ")}`
}

export function reaches(named: string, wanted: string | null, known: Known): Reached {
  const address = addressIn(named)
  if (address.kind === "id") {
    return known.byId(address.id) === null
      ? { refused: `no page carries the id \`${address.id}\`` }
      : { id: address.id }
  }
  if (address.kind === "qualified") {
    const { pageTypeSlug, slug } = address
    if (wanted !== null && !known.admitting(wanted).includes(pageTypeSlug)) {
      return {
        refused:
          `\`${named}\` names a \`${pageTypeSlug}\`, and this property admits only ` +
          `\`${wanted}\` and what stands under it`,
      }
    }
    const found = known.at(pageTypeSlug, slug)
    const one = only(found)
    if (one !== null) return { id: one.id }
    if (found.length === 0)
      return { refused: `no \`${pageTypeSlug}\` carries the slug \`${slug}\`` }
    return { refused: among(named, found) }
  }
  if (wanted === null) {
    return { refused: `\`${named}\` names no page type and its property declares no target` }
  }
  const found = known
    .admitting(wanted)
    .flatMap((pageTypeSlug) => known.at(pageTypeSlug, address.slug))
  const one = only(found)
  if (one !== null) return { id: one.id }
  if (found.length === 0)
    return { refused: `no page admitting \`${wanted}\` carries the slug \`${named}\`` }
  return { refused: among(named, found) }
}

export function namesIn(held: unknown): readonly string[] {
  if (typeof held === "string") return [held]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

export function recordsIn(held: unknown): readonly Value[] {
  const listed = Array.isArray(held) ? held : [held]
  return listed.filter(
    (one): one is Value => one !== null && typeof one === "object" && !Array.isArray(one)
  )
}
