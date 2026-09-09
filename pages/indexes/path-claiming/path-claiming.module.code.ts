import { dirname, isAbsolute, join, relative } from "node:path"
import { besideAt, secretAt, uncommittedAt } from "@akasha/pages/page-file-name"
import { partsOf, uncommittedPartsOf } from "@akasha/pages/page-file-parts"
import { slugFor } from "@akasha/pages/page-property-key"
import { slugOf, slugsIn, textAt, type Value } from "@akasha/pages/page-value"
import { typeSlugsIn, typeValuesIn } from "../../types/gathering/page-type-gathering.module.code.ts"
import type {
  FilePropertiesBy,
  FoldersBy,
  UncommittedBy,
} from "../entries/index-entries.module.code.ts"
import type { Reading } from "../shape/index-shape.module.code.ts"

const PAGE_TYPE = "page-type"

const DECLARED = "properties"

const DECLARES = "pagePropertySlug"

const EXTENDS = "extends"

const WAS_EXTENDS = "extendsSlug"

const FALLBACK = "default"

const WITHHELD = "uncommitted"

export function under(repo: string, path: string): string {
  return isAbsolute(path) ? relative(repo, path) : path
}

export type IsThere = (at: string) => boolean

export type Claimed = {
  readonly at: string
  readonly uncommitted: boolean
}

const NO_SLUGS: ReadonlySet<string> = new Set()

const NONE_WITHHELD: UncommittedBy = new Map()

export function filesClaimedIn(
  value: Value,
  path: string,
  repo: string,
  fileProperties: FilePropertiesBy,
  withheld: UncommittedBy,
  there: IsThere = () => false
): readonly Claimed[] {
  const own = under(repo, path)
  const found: Claimed[] = [{ at: own, uncommitted: false }]
  const type = textAt(value, "pageTypeSlug") ?? ""
  const carried = fileProperties.get(type)
  if (carried === undefined) return found
  const outside = withheld.get(type) ?? NO_SLUGS
  for (const [key, held] of Object.entries(value)) {
    if (typeof held !== "string") continue
    const propertySlug = slugFor(key)
    if (!carried.has(propertySlug)) continue
    const uncommitted = outside.has(propertySlug)
    const fileName = carried.get(propertySlug) ?? null
    if (fileName !== null) {
      found.push({ at: join(dirname(own), fileName), uncommitted })
      continue
    }
    for (const at of partsOf(own, propertySlug, held, there)) found.push({ at, uncommitted })
  }
  return found
}

export function pathsOf(
  value: Value,
  path: string,
  repo: string,
  fileProperties: FilePropertiesBy,
  there: IsThere = () => false
): readonly string[] {
  const found = filesClaimedIn(value, path, repo, fileProperties, NONE_WITHHELD, there)
  return found.map((one) => one.at)
}

const NO_FOLDERS: FoldersBy = new Map()

export function foldersClaimedIn(
  value: Value,
  path: string,
  repo: string,
  folders: FoldersBy
): readonly string[] {
  const carried = folders.get(textAt(value, "pageTypeSlug") ?? "")
  if (carried === undefined) return []
  const own = under(repo, path)
  const found: string[] = []
  for (const [key, held] of Object.entries(value)) {
    if (held !== true) continue
    const folderName = carried.get(slugFor(key))
    if (folderName === undefined) continue
    found.push(join(dirname(own), folderName))
  }
  return found
}

export type Beside = {
  readonly held: string
  readonly uncommitted: boolean
}

export type Sidecars = {
  readonly secret: boolean
  readonly uncommitted: boolean
  readonly besides: ReadonlyMap<string, Beside>
}

export type SidecarsBy = ReadonlyMap<string, Sidecars>

function declaredIn(value: Value): Sidecars {
  let secret = false
  let uncommitted = false
  const found = new Map<string, Beside>()
  const declared = value[DECLARED]
  if (!Array.isArray(declared)) return { secret, uncommitted, besides: found }
  for (const one of declared) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const held = one as Record<string, unknown>
    const withheld = held[WITHHELD] === true
    if (held["secret"] === true) secret = true
    if (withheld) uncommitted = true
    const slug = held[DECLARES]
    const fallback = held[FALLBACK]
    if (typeof slug === "string" && typeof fallback === "string") {
      found.set(slugOf(slug), { held: fallback, uncommitted: withheld })
    }
  }
  return { secret, uncommitted, besides: found }
}

export function sidecarsIn(
  values: Iterable<Value>,
  among: ReadonlySet<string> = new Set([PAGE_TYPE])
): SidecarsBy {
  const own = new Map<string, Sidecars>()
  const above = new Map<string, readonly string[]>()
  for (const value of values) {
    const said = textAt(value, "pageTypeSlug")
    if (said === null || !among.has(said)) continue
    const slug = textAt(value, "slug")
    if (slug === null) continue
    own.set(slug, declaredIn(value))
    const extended = slugsIn(value[EXTENDS] ?? value[WAS_EXTENDS])
    if (extended.length > 0) above.set(slug, extended)
  }
  const found = new Map<string, Sidecars>()
  for (const slug of own.keys()) {
    let secret = false
    let uncommitted = false
    const beside = new Map<string, Beside>()
    const walked = new Set<string>()
    const waiting: string[] = [slug]
    for (let at = 0; at < waiting.length; at += 1) {
      const here = waiting[at]
      if (here === undefined || walked.has(here)) continue
      walked.add(here)
      const held = own.get(here)
      if (held?.secret === true) secret = true
      if (held?.uncommitted === true) uncommitted = true
      for (const [key, fallback] of held?.besides ?? []) {
        if (!beside.has(key)) beside.set(key, fallback)
      }
      for (const up of [...(above.get(here) ?? [])].reverse()) waiting.push(up)
    }
    found.set(slug, { secret, uncommitted, besides: beside })
  }
  return found
}

export function sidecarsOver(given: string | Reading, left: Iterable<Value>): SidecarsBy {
  const among = typeSlugsIn(given)
  return sidecarsIn([...typeValuesIn(given, among), ...left], among)
}

function besidesOf(own: string, slug: string, beside: Beside, there: IsThere): readonly string[] {
  if (beside.uncommitted) return uncommittedPartsOf(own, slug, beside.held, there)
  const at = besideAt(own, slug, beside.held)
  return at === null ? [] : [at]
}

export function claimsOf(
  value: Value,
  path: string,
  repo: string,
  fileProperties: FilePropertiesBy,
  sidecars: SidecarsBy,
  there: IsThere = () => false,
  folders: FoldersBy = NO_FOLDERS
): readonly string[] {
  const found = [
    ...pathsOf(value, path, repo, fileProperties, there),
    ...foldersClaimedIn(value, path, repo, folders),
  ]
  const own = under(repo, path)
  const pageTypeSlug = textAt(value, "pageTypeSlug") ?? ""
  const carried = fileProperties.get(pageTypeSlug)
  const held = sidecars.get(pageTypeSlug)
  if (held === undefined) return found
  if (held.secret) {
    const secret = secretAt(own)
    if (secret !== null) found.push(secret)
  }
  if (held.uncommitted) {
    const beside = uncommittedAt(own)
    if (beside !== null) found.push(beside)
  }
  for (const [slug, beside] of held.besides) {
    if (carried?.get(slug) !== null) continue
    for (const at of besidesOf(own, slug, beside, there)) {
      if (!found.includes(at)) found.push(at)
    }
  }
  return found
}
