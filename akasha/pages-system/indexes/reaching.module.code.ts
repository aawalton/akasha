import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { addressIn } from "../page/page-address.module.code.ts"
import { slugFor } from "../page-property/page-property-key/page-property-key.module.code.ts"
import { indexIdentity } from "./index/index-identity/index-identity.index.ts"
import { indexRelation } from "./index/index-relation/index-relation.index.ts"
import {
  type Entry,
  linesIn,
  type Standing,
  schemaAt,
  slugOf,
  textAt,
  under,
  type Value,
  valueAt,
} from "./index-entries.module.code.ts"

const IDENTITY = indexIdentity.indexName

const RELATION = indexRelation.indexName

const RECORD = "record-property"

const DECLARED = "properties"

const SAID = "pagePropertySlug"

const NOT_A_RELATION = new Set(["id", "slug", "pageTypeSlug"])

function standingIn(at: string): readonly Standing[] {
  return linesIn(at).map((one) => JSON.parse(one) as Standing)
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

function everyPageOf(root: string, pageTypeSlug: string): readonly Standing[] {
  const dir = join(root, IDENTITY, pageTypeSlug, "slug")
  if (!existsSync(dir)) return []
  const found: Standing[] = []
  for (const one of readdirSync(dir)) found.push(...standingIn(join(dir, one)))
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

export function knownIn(root: string, repo: string): Shaped {
  const target = new Map<string, string>()
  for (const [slug, held] of schemaAt(root)) {
    const named = held.pageTypeSlug === "relation-property" ? held.targetPageTypeSlug : null
    if (named !== null) target.set(slug, named)
  }

  const above = new Map<string, string>()
  for (const one of everyPageOf(root, "page-type")) {
    const value = valueAt(one.path, repo)
    if (value === null) continue
    const slug = textAt(value, "slug")
    const extendsSlug = textAt(value, "extendsSlug")
    if (slug !== null && extendsSlug !== null) above.set(slug, slugOf(extendsSlug))
  }
  const everyType = new Set<string>([...above.keys(), ...above.values()])

  const fields = new Map<string, readonly string[]>()
  for (const one of everyPageOf(root, RECORD)) {
    const value = valueAt(one.path, repo)
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
      standingIn(join(root, IDENTITY, pageTypeSlug, "slug", `${slug}.jsonl`)),
    byId: (id) => standingIn(join(root, IDENTITY, "page", "id", `${id}.jsonl`))[0] ?? null,
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

export type Filed = {
  readonly entries: readonly Entry[]
  readonly refused: readonly string[]
}

export const NOTHING_FILED: Filed = { entries: [], refused: [] }

export function relationIn(value: Value, path: string, known: Shaped, repo: string): Filed {
  const id = textAt(value, "id")
  if (id === null) return NOTHING_FILED
  const line = JSON.stringify({ path: under(repo, path) })
  const entries: Entry[] = []
  const refused: string[] = []
  const already = new Set<string>()
  const file = (propertySlug: string, held: unknown, said: string): void => {
    const wanted = known.targetOf(propertySlug)
    if (wanted === null) return
    for (const named of namesIn(held)) {
      const reached = reaches(named, wanted, known)
      if ("refused" in reached) {
        refused.push(`${path}: \`${said}\` — ${reached.refused}`)
        continue
      }
      const at = join(RELATION, "page", "id", reached.id, propertySlug, `${id}.jsonl`)
      if (already.has(at)) continue
      already.add(at)
      entries.push({ at, line })
    }
  }
  for (const [key, held] of Object.entries(value)) {
    if (NOT_A_RELATION.has(key) || held === null) continue
    const propertySlug = slugFor(key)
    if (known.targetOf(propertySlug) !== null) {
      file(propertySlug, held, propertySlug)
      continue
    }
    const fields = known.fieldsOf(propertySlug)
    if (fields.length === 0) continue
    for (const entry of recordsIn(held)) {
      for (const [inner, said] of Object.entries(entry)) {
        const field = slugFor(inner)
        if (fields.includes(field)) file(field, said, `${propertySlug} ${field}`)
      }
    }
  }
  return { entries, refused }
}
