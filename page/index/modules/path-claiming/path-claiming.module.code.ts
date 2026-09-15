import { dirname, isAbsolute, join, relative } from "node:path"
import type {
  Beside,
  SidecarsBy,
} from "akasha/page/index/modules/beside-declaring/beside-declaring.module.code.ts"
import {
  type ExtensionsBy,
  extensionPropertiesAt,
  type FilePropertiesBy,
  type FoldersBy,
  filePropertiesAt,
  folderPropertiesAt,
  pageTypesIn,
  type UncommittedBy,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { endingOf } from "akasha/page/index/modules/extension-carrying/extension-carrying.module.code.ts"
import {
  everyOfType,
  heldOnce,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  besideAt,
  pageOf,
  partedIn,
  secretAt,
  uncommittedAt,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  partsOf,
  uncommittedPartsOf,
} from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import {
  typeIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { dashEachCapital } from "akasha/page/naming/folding/modules/dash-each-capital/dash-each-capital.module.code.ts"

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
  const type = typeIn(value) ?? ""
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
  const carried = folders.get(typeIn(value) ?? "")
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
  const pageTypeSlug = typeIn(value) ?? ""
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

const NO_EXTENSIONS: ExtensionsBy = new Map()

type TypesNaming = {
  readonly named: (named: string) => ReadonlySet<string>
  readonly foldered: (named: string) => ReadonlySet<string>
  readonly ending: (extensionName: string) => ReadonlySet<string>
}

type NamingBy = WeakMap<FoldersBy, WeakMap<ExtensionsBy, TypesNaming>>

const NAMING = new WeakMap<FilePropertiesBy, NamingBy>()

function addingTo(found: Map<string, Set<string>>): (named: string) => Set<string> {
  return (named) => {
    const done = found.get(named)
    if (done !== undefined) return done
    const made = new Set<string>()
    found.set(named, made)
    return made
  }
}

function namingOver(
  fileProperties: FilePropertiesBy,
  folders: FoldersBy,
  extensions: ExtensionsBy
): TypesNaming {
  const every = new Map<string, Set<string>>()
  const deep = new Map<string, Set<string>>()
  const ended = new Map<string, Set<string>>()
  const held = addingTo(every)
  const beneath = addingTo(deep)
  const closing = addingTo(ended)
  for (const [pageTypeSlug, carried] of fileProperties) {
    for (const fileName of carried.values()) {
      if (fileName !== null) held(fileName).add(pageTypeSlug)
    }
  }
  for (const [pageTypeSlug, carried] of folders) {
    for (const folderName of carried.values()) {
      if (folderName === null) continue
      held(folderName).add(pageTypeSlug)
      beneath(folderName).add(pageTypeSlug)
    }
  }
  for (const [pageTypeSlug, carried] of extensions) {
    for (const extensionName of carried.values()) closing(extensionName).add(pageTypeSlug)
  }
  return {
    named: (named) => every.get(named) ?? NO_TYPES,
    foldered: (named) => deep.get(named) ?? NO_TYPES,
    ending: (extensionName) => ended.get(extensionName) ?? NO_TYPES,
  }
}

function typesNaming(
  fileProperties: FilePropertiesBy,
  folders: FoldersBy,
  extensions: ExtensionsBy
): TypesNaming {
  const beneath = NAMING.get(fileProperties) ?? new WeakMap()
  NAMING.set(fileProperties, beneath)
  const closing = beneath.get(folders) ?? new WeakMap<ExtensionsBy, TypesNaming>()
  beneath.set(folders, closing)
  const done = closing.get(extensions)
  if (done !== undefined) return done
  const made = namingOver(fileProperties, folders, extensions)
  closing.set(extensions, made)
  return made
}

const HERE = "."

export type OfType = (pageTypeSlug: string) => readonly { readonly path: string }[]

export type Paging = (folder: string, types: ReadonlySet<string>) => string | null

const PAGING = new WeakMap<OfType, Map<string, ReadonlyMap<string, string>>>()

export function folderOf(path: string): string {
  const at = dirname(path)
  return at === HERE ? "" : at
}

function foldersOf(ofType: OfType, pageTypeSlug: string): ReadonlyMap<string, string> {
  let beneath = PAGING.get(ofType)
  if (beneath === undefined) {
    beneath = new Map<string, ReadonlyMap<string, string>>()
    PAGING.set(ofType, beneath)
  }
  const done = beneath.get(pageTypeSlug)
  if (done !== undefined) return done
  const made = new Map<string, string>()
  beneath.set(pageTypeSlug, made)
  for (const one of ofType(pageTypeSlug)) {
    const said = partedIn(one.path)
    if (said === null || said.sections.length > 0 || said.held !== HELD) continue
    if (said.pageType !== pageTypeSlug) continue
    const folder = folderOf(one.path)
    const held = made.get(folder)
    if (held === undefined || one.path < held) made.set(folder, one.path)
  }
  return made
}

export function pagingOf(ofType: OfType): Paging {
  return (folder, types) => {
    let found: string | null = null
    for (const pageTypeSlug of types) {
      const at = foldersOf(ofType, pageTypeSlug).get(folder)
      if (at !== undefined && (found === null || at < found)) found = at
    }
    return found
  }
}

const UNDER = "/"

function claimedIn(
  paging: Paging,
  folder: string,
  named: string,
  naming: TypesNaming
): string | null {
  const whole = naming.named(named)
  if (whole.size > 0) {
    const found = paging(folder, whole)
    if (found !== null) return found
  }
  const cut = named.indexOf(UNDER)
  if (cut < 1) return null
  const above = naming.foldered(named.slice(0, cut))
  return above.size === 0 ? null : paging(folder, above)
}

function claimedUp(paging: Paging, path: string, naming: TypesNaming): string | null {
  let folder = folderOf(path)
  for (;;) {
    const named = folder === "" ? path : path.slice(folder.length + 1)
    const found = claimedIn(paging, folder, named, naming)
    if (found !== null) return found
    if (folder === "") return null
    folder = folderOf(folder)
  }
}

function closingAt(paging: Paging, path: string, naming: TypesNaming): string | null {
  const ending = endingOf(path)
  if (ending === null) return null
  const types = naming.ending(ending)
  return types.size === 0 ? null : paging(folderOf(path), types)
}

export function claimantOf(
  paging: Paging,
  path: string,
  pageTypes: ReadonlySet<string>,
  fileProperties: FilePropertiesBy,
  folders: FoldersBy = NO_FOLDERS,
  extensions: ExtensionsBy = NO_EXTENSIONS
): string | null {
  const said = partedIn(path)
  if (said !== null && pageTypes.has(said.pageType)) {
    return join(dirname(path), `${pageOf(said)}${TS}`)
  }
  const naming = typesNaming(fileProperties, folders, extensions)
  return claimedUp(paging, path, naming) ?? closingAt(paging, path, naming)
}

type Claiming = {
  readonly paging: Paging
  readonly pageTypes: ReadonlySet<string>
  readonly fileProperties: FilePropertiesBy
  readonly folders: FoldersBy
  readonly extensions: ExtensionsBy
}

const claiming = heldOnce(
  (reading: Reading): Claiming => ({
    paging: pagingOf((pageTypeSlug) => everyOfType(reading, pageTypeSlug)),
    pageTypes: pageTypesIn(reading),
    fileProperties: filePropertiesAt(reading),
    folders: folderPropertiesAt(reading),
    extensions: extensionPropertiesAt(reading),
  })
)

export function claimantIn(given: string | Reading, path: string): string | null {
  const held = claiming(given)
  return claimantOf(
    held.paging,
    path,
    held.pageTypes,
    held.fileProperties,
    held.folders,
    held.extensions
  )
}
