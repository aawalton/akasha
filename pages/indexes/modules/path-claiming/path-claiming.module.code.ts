import { dirname, isAbsolute, join, relative } from "node:path"
import type {
  FilePropertiesBy,
  FoldersBy,
  UncommittedBy,
} from "akasha/pages/indexes/modules/entries/index-entries.module.code.ts"
import type { Reading } from "akasha/pages/indexes/modules/shape/index-shape.module.code.ts"
import {
  besideAt,
  pageOf,
  partedIn,
  secretAt,
  uncommittedAt,
} from "akasha/pages/modules/file-name/page-file-name.module.code.ts"
import {
  partsOf,
  uncommittedPartsOf,
} from "akasha/pages/modules/file-parts/page-file-parts.module.code.ts"
import {
  slugOf,
  slugsIn,
  textAt,
  type Value,
} from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"
import {
  typeSlugsIn,
  typeValuesIn,
} from "akasha/pages/types/modules/gathering/page-type-gathering.module.code.ts"
import { dashEachCapital } from "akasha/utils/slug/modules/dash-each-capital/dash-each-capital.module.code.ts"

const PAGE_TYPE = "page-type"

const DECLARED = "properties"

const DECLARES = "pageProperty"

const WAS_DECLARES = "pagePropertySlug"

const EXTENDS = "extends"

const FALLBACK = "default"

const FIXED = "fixed"

const GROUP = "file-property-group"

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
  const type = textAt(value, "type") ?? textAt(value, "pageTypeSlug") ?? ""
  const carried = fileProperties.get(type)
  if (carried === undefined) return found
  const outside = withheld.get(type) ?? NO_SLUGS
  for (const [key, held] of Object.entries(value)) {
    if (typeof held !== "string") continue
    const propertySlug = dashEachCapital(key)
    if (!carried.has(propertySlug)) continue
    const uncommitted = outside.has(propertySlug)
    const fileName = carried.get(propertySlug) ?? null
    if (fileName !== null) {
      found.push({ at: join(dirname(own), fileName), uncommitted })
      continue
    }
    const parts = uncommitted
      ? uncommittedPartsOf(own, propertySlug, held, there)
      : partsOf(own, propertySlug, held, there)
    for (const at of parts) found.push({ at, uncommitted })
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

function foldersClaimedIn(
  value: Value,
  path: string,
  repo: string,
  folders: FoldersBy
): readonly string[] {
  const carried = folders.get(textAt(value, "type") ?? textAt(value, "pageTypeSlug") ?? "")
  if (carried === undefined) return []
  const own = under(repo, path)
  const found: string[] = []
  for (const [key, held] of Object.entries(value)) {
    if (held !== true) continue
    const folderName = carried.get(dashEachCapital(key))
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

type Members = (pageTypeSlug: string) => ReadonlyMap<string, Beside> | null

const NO_MEMBERS: Members = () => null

const NOTHING: Sidecars = { secret: false, uncommitted: false, besides: new Map() }

function typeNamedIn(declares: string): string | null {
  const at = declares.indexOf("/")
  return at === -1 ? null : declares.slice(0, at)
}

function declaredIn(value: Value, members: Members): Sidecars {
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
    const slug = held[DECLARES] ?? held[WAS_DECLARES]
    if (typeof slug !== "string") continue
    const named = typeNamedIn(slug)
    const group = named === null ? null : members(named)
    if (group !== null) {
      for (const [member, beside] of group) {
        const outside = withheld || beside.uncommitted
        found.set(`${slugOf(slug)}.${member}`, { held: beside.held, uncommitted: outside })
      }
      continue
    }
    const fallback = held[FALLBACK] ?? held[FIXED]
    if (typeof fallback === "string") {
      found.set(slugOf(slug), { held: fallback, uncommitted: withheld })
    }
  }
  return { secret, uncommitted, besides: found }
}

export function sidecarsIn(
  values: Iterable<Value>,
  among: ReadonlySet<string> = new Set([PAGE_TYPE])
): SidecarsBy {
  const raw = new Map<string, Value>()
  const above = new Map<string, readonly string[]>()
  for (const value of values) {
    const said = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
    if (said === null || !among.has(said)) continue
    const slug = textAt(value, "slug")
    if (slug === null) continue
    raw.set(slug, value)
    const extended = slugsIn(value[EXTENDS])
    if (extended.length > 0) above.set(slug, extended)
  }
  const grouped = new Map<string, boolean>()
  const grouping = (slug: string): boolean => {
    const done = grouped.get(slug)
    if (done !== undefined) return done
    grouped.set(slug, false)
    const said = slug === GROUP || (above.get(slug) ?? []).some((one) => grouping(one))
    grouped.set(slug, said)
    return said
  }
  const membered = new Map<string, ReadonlyMap<string, Beside>>()
  const members: Members = (slug) => {
    if (!grouping(slug)) return null
    const done = membered.get(slug)
    if (done !== undefined) return done
    const made = new Map<string, Beside>()
    membered.set(slug, made)
    const walked = new Set<string>()
    const waiting: string[] = [slug]
    for (let at = 0; at < waiting.length; at += 1) {
      const here = waiting[at]
      if (here === undefined || walked.has(here)) continue
      walked.add(here)
      const value = raw.get(here)
      if (value === undefined) continue
      for (const [key, beside] of declaredIn(value, NO_MEMBERS).besides) {
        if (!made.has(key)) made.set(key, beside)
      }
      for (const up of [...(above.get(here) ?? [])].reverse()) waiting.push(up)
    }
    return made
  }
  const own = new Map<string, Sidecars>()
  for (const [slug, value] of raw) {
    own.set(slug, grouping(slug) ? NOTHING : declaredIn(value, members))
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
  if (beside.uncommitted) {
    return uncommittedPartsOf(own, slug, beside.held, there).filter((one) => there(one))
  }
  const at = besideAt(own, slug, beside.held)
  return at === null || !there(at) ? [] : [at]
}

export function claimsOf(
  value: Value,
  path: string,
  repo: string,
  fileProperties: FilePropertiesBy,
  sidecars: SidecarsBy,
  withheld: UncommittedBy = NONE_WITHHELD,
  there: IsThere = () => false,
  folders: FoldersBy = NO_FOLDERS
): readonly string[] {
  const claimed = filesClaimedIn(value, path, repo, fileProperties, withheld, there)
  const found = [...claimed.map((one) => one.at), ...foldersClaimedIn(value, path, repo, folders)]
  const own = under(repo, path)
  const pageTypeSlug = textAt(value, "type") ?? textAt(value, "pageTypeSlug") ?? ""
  const carried = fileProperties.get(pageTypeSlug)
  const held = sidecars.get(pageTypeSlug)
  if (held === undefined) return found
  if (held.secret) {
    const secret = secretAt(own)
    if (secret !== null && there(secret)) found.push(secret)
  }
  if (held.uncommitted) {
    const beside = uncommittedAt(own)
    if (beside !== null && there(beside)) found.push(beside)
  }
  for (const [slug, beside] of held.besides) {
    if (carried?.get(slug) !== null) continue
    for (const at of besidesOf(own, slug, beside, there)) {
      if (!found.includes(at)) found.push(at)
    }
  }
  return found
}

const TS = ".ts"

const HELD = "ts"

const NO_TYPES: ReadonlySet<string> = new Set()

type TypesNaming = (named: string) => ReadonlySet<string>

const NAMING = new WeakMap<FilePropertiesBy, WeakMap<FoldersBy, TypesNaming>>()

function namingOver(fileProperties: FilePropertiesBy, folders: FoldersBy): TypesNaming {
  const found = new Map<string, Set<string>>()
  const held = (named: string): Set<string> => {
    const done = found.get(named)
    if (done !== undefined) return done
    const made = new Set<string>()
    found.set(named, made)
    return made
  }
  for (const [pageTypeSlug, carried] of fileProperties) {
    for (const fileName of carried.values()) {
      if (fileName !== null) held(fileName).add(pageTypeSlug)
    }
  }
  for (const [pageTypeSlug, carried] of folders) {
    for (const folderName of carried.values()) {
      if (folderName !== null) held(folderName).add(pageTypeSlug)
    }
  }
  return (named) => found.get(named) ?? NO_TYPES
}

function typesNaming(fileProperties: FilePropertiesBy, folders: FoldersBy): TypesNaming {
  const beneath = NAMING.get(fileProperties) ?? new WeakMap<FoldersBy, TypesNaming>()
  const done = beneath.get(folders)
  if (done !== undefined) return done
  const made = namingOver(fileProperties, folders)
  beneath.set(folders, made)
  NAMING.set(fileProperties, beneath)
  return made
}

export type Listing = (folder: string) => readonly string[]

function pagedOfTypeIn(
  listing: Listing,
  folder: string,
  types: ReadonlySet<string>
): string | null {
  for (const one of listing(folder)) {
    const said = partedIn(one)
    if (said === null || said.sections.length > 0 || said.held !== HELD) continue
    if (types.has(said.pageType)) return one
  }
  return null
}

export function claimantOf(
  listing: Listing,
  path: string,
  pageTypes: ReadonlySet<string>,
  fileProperties: FilePropertiesBy,
  folders: FoldersBy = NO_FOLDERS
): string | null {
  const said = partedIn(path)
  if (said !== null && pageTypes.has(said.pageType)) {
    return join(dirname(path), `${pageOf(said)}${TS}`)
  }
  const naming = typesNaming(fileProperties, folders)
  let folder = dirname(path)
  if (folder === ".") folder = ""
  for (;;) {
    const named = folder === "" ? path : path.slice(folder.length + 1)
    const types = naming(named)
    if (types.size > 0) {
      const found = pagedOfTypeIn(listing, folder, types)
      if (found !== null) return found
    }
    if (folder === "") return null
    const up = dirname(folder)
    folder = up === "." ? "" : up
  }
}
