import { basename } from "node:path"
import { NAMING_NONE, type Naming } from "@akasha/code-system/code-specifier"
import type { Answering } from "@akasha/indexes/answering"
import { claimsOf, type FilePropertiesBy, type SidecarsBy } from "@akasha/indexes/entries"
import { edgesIn } from "@akasha/indexes/import"
import { reachingIn } from "@akasha/indexes/package-reaching"
import type { Known } from "@akasha/indexes/reaching"
import type { Change } from "@akasha/pages-system/change"
import { type Held, heldIn, partedIn } from "@akasha/pages-system/page-file-name"
import { textAt, textsAt } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import {
  bodyOf,
  FILES,
  input,
  textIn,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import type { Declaring, Standing } from "./folder-shapes/folder-shape.page-type.ts"
import { shapesIn } from "./modules/shape-loading/shape-loading.module.code.ts"

const TS = "ts"

const TS_ENDING = ".ts"

const PAGE_TYPE = "page-type"

const PACKAGE = "workspace-package"

const RECORD_PROPERTY = "record-property"

const PROPERTIES = "properties"

const MODULES = "modules"

const PAGES = "pages"

const SCRIPTS = "scripts"

const PLURAL_SLUG = "pluralSlug"

const PART_SLUGS = "partSlugs"

export function folderOf(path: string): string {
  const cut = path.lastIndexOf("/")
  return cut === -1 ? "" : path.slice(0, cut)
}

export function ancestorsOf(path: string): readonly string[] {
  const found: string[] = []
  let at = folderOf(path)
  while (at !== "") {
    found.push(at)
    at = folderOf(at)
  }
  return found
}

export function reachedFolders(target: string, importer: string): readonly string[] {
  const found: string[] = []
  let at = folderOf(target)
  while (at !== "" && !importer.startsWith(`${at}/`)) {
    found.push(at)
    at = folderOf(at)
  }
  return found
}

export function edgesOf(
  root: string,
  path: string,
  bytes: Uint8Array | null,
  naming: Naming = NAMING_NONE
): ReadonlySet<string> {
  if (bytes === null || !textNamed(path)) return new Set<string>()
  return new Set<string>(edgesIn(bodyOf({ root, path, bytes }), path, naming))
}

export function listedFiles(index: Answering, change: Change): readonly string[] {
  const found = new Set<string>(index.everyPath())
  for (const one of change.changed) {
    if (change.after(one) === null) found.delete(one)
    else found.add(one)
  }
  return [...found].sort()
}

export function foldersTouchedBy(
  change: Change,
  naming: Naming = NAMING_NONE
): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of change.changed) {
    for (const at of ancestorsOf(one)) found.add(at)
    const now = edgesOf(change.root, one, change.after(one), naming)
    const before = edgesOf(change.root, one, change.before(one), naming)
    for (const target of new Set([...now, ...before])) {
      if (now.has(target) === before.has(target)) continue
      for (const at of reachedFolders(target, one)) found.add(at)
    }
  }
  return found
}

function enteringOf(shadow: Shadow): (folder: string, path: string) => boolean {
  return (folder, path) => {
    for (const one of shadow.index.importersOf(path)) {
      if (!one.startsWith(`${folder}/`)) return true
    }
    return false
  }
}

export function namesFiling(
  fileProperties: ReadonlyMap<string, string | null>
): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [slug, fileName] of fileProperties) {
    if (fileName !== null) found.set(fileName, slug)
  }
  return found
}

export function pageNameOf(path: string): string {
  const name = basename(path)
  return name.endsWith(TS_ENDING) ? name.slice(0, -TS_ENDING.length) : name
}

export function claimedIn(held: Held, index: Answering, filing: ReadonlyMap<string, string>): Held {
  if (held.kind !== "stray") return held
  const propertySlug = filing.get(basename(held.path))
  if (propertySlug === undefined) return held
  const claiming = index.listedByPath(held.path)[0]
  if (claiming === undefined) return held
  return {
    path: held.path,
    kind: "property",
    slug: null,
    pageTypeSlug: null,
    page: pageNameOf(claiming.path),
    propertySlug,
    part: held.part,
    uncommitted: false,
  }
}

export type Grouped = {
  readonly at: (folder: string) => readonly string[]
  readonly foldersIn: (folder: string) => readonly string[]
}

export function groupedBy(files: readonly string[]): Grouped {
  const sitting = new Map<string, string[]>()
  const beneath = new Map<string, Set<string>>()
  for (const one of files) {
    const folder = folderOf(one)
    const held = sitting.get(folder)
    if (held === undefined) sitting.set(folder, [one])
    else held.push(one)
    let here = folder
    while (here !== "") {
      const above = folderOf(here)
      const kept = beneath.get(above)
      if (kept === undefined) beneath.set(above, new Set<string>([here]))
      else kept.add(here)
      here = above
    }
  }
  const sorted = new Map<string, readonly string[]>()
  return {
    at: (folder) => sitting.get(folder) ?? [],
    foldersIn: (folder) => {
      const found = sorted.get(folder)
      if (found !== undefined) return found
      const made = [...(beneath.get(folder) ?? [])].sort()
      sorted.set(folder, made)
      return made
    },
  }
}

export function pageTypesAt(grouped: Grouped, folder: string): readonly string[] {
  const found: string[] = []
  for (const one of grouped.at(folder)) {
    const said = partedIn(one)
    if (said === null || said.sections.length > 0) continue
    if (said.held === TS && said.pageType === PAGE_TYPE) found.push(said.slug)
  }
  return found
}

export function fieldsIn(index: Answering, grouped: Grouped, folder: string): readonly string[] {
  const found: string[] = []
  for (const one of grouped.at(`${folder}/${PROPERTIES}`)) {
    const said = partedIn(one)
    if (said === null || said.sections.length > 0) continue
    if (said.held !== TS || said.pageType !== RECORD_PROPERTY) continue
    const value = index.pageAt(RECORD_PROPERTY, said.slug)
    if (value === null) continue
    for (const carried of index.carriedIn(value, said.slug)) found.push(carried.pagePropertySlug)
  }
  return found
}

export function declaringOver(
  index: Answering,
  grouped: Grouped
): (folder: string) => Declaring | null {
  const held = new Map<string, Declaring | null>()
  return (folder) => {
    const found = held.get(folder)
    if (found !== undefined) return found
    const slugs = pageTypesAt(grouped, folder)
    const slug = slugs.length === 1 ? slugs[0] : undefined
    let made: Declaring | null = null
    if (slug !== undefined) {
      const value = index.pageAt(PAGE_TYPE, slug)
      const declared = index.propertiesOf(slug).map((one) => one.pagePropertySlug)
      made = {
        slug,
        pluralSlug: value === null ? null : textAt(value, PLURAL_SLUG),
        propertySlugs: new Set<string>([...declared, ...fieldsIn(index, grouped, folder)]),
      }
    }
    held.set(folder, made)
    return made
  }
}

export const HELD_FOLDERS = new Set<string>([MODULES, PAGES, PROPERTIES, SCRIPTS])

export function strippedOf(named: string, above: readonly string[]): string {
  for (const one of above) {
    if (named.startsWith(`${one}-`)) return named.slice(one.length + 1)
  }
  return named
}

export function heldFolder(at: string, holds: Holds): boolean {
  const named = basename(at)
  return HELD_FOLDERS.has(named) && !holds(at).names.includes(named)
}

export function namingFolderOf(folder: string, holds: Holds): string {
  let at = folderOf(folder)
  while (at !== "" && heldFolder(at, holds)) at = folderOf(at)
  return at
}

export function openingWith(named: string, above: readonly string[]): string | null {
  for (const one of above) {
    if (named === one || named.startsWith(`${one}-`)) return one
  }
  return null
}

export type Holding = {
  readonly names: readonly string[]
  readonly holds: string | null
  readonly declared: ReadonlySet<string>
}

export type Holds = (folder: string) => Holding

const NOTHING: Holding = { names: [], holds: null, declared: new Set<string>() }

function pluralOf(index: Answering, page: Held): string | null {
  if (page.pageTypeSlug !== PAGE_TYPE || page.slug === null) return null
  const value = index.pageAt(PAGE_TYPE, page.slug)
  return value === null ? null : textAt(value, PLURAL_SLUG)
}

export function pairedIn(index: Answering, pages: readonly Held[]): readonly Held[] {
  const [one, two] = pages
  if (one === undefined || pages.length > 2) return []
  if (two === undefined) return [one]
  if (two.pageTypeSlug === PACKAGE && two.slug === pluralOf(index, one)) return [one, two]
  if (one.pageTypeSlug === PACKAGE && one.slug === pluralOf(index, two)) return [two, one]
  return []
}

function declaredBy(index: Answering, page: Held | undefined): readonly string[] {
  if (page === undefined || page.slug === null || page.pageTypeSlug === null) return []
  const value = index.pageAt(page.pageTypeSlug, page.slug)
  return value === null ? [] : (textsAt(value, PART_SLUGS) ?? [])
}

export function holdingOver(
  index: Answering,
  grouped: Grouped,
  pageTypes: ReadonlySet<string>,
  fileProperties: ReadonlySet<string>
): Holds {
  const held = new Map<string, Holding>()
  return (folder) => {
    const found = held.get(folder)
    if (found !== undefined) return found
    const paired = pairedIn(
      index,
      grouped
        .at(folder)
        .map((one) => heldIn(one, pageTypes, fileProperties))
        .filter((one) => one.kind === "page")
    )
    const page = paired[0]
    let made = NOTHING
    if (page !== undefined && page.slug !== null && page.pageTypeSlug !== null) {
      const value = index.pageAt(page.pageTypeSlug, page.slug)
      const plural = value === null ? null : textAt(value, PLURAL_SLUG)
      made = {
        names: plural === null ? [page.slug] : [page.slug, plural],
        holds: `${page.pageTypeSlug}/${page.slug}`,
        declared: new Set<string>([
          ...(value === null ? [] : (textsAt(value, PART_SLUGS) ?? [])),
          ...declaredBy(index, paired[1]),
        ]),
      }
    }
    held.set(folder, made)
    return made
  }
}

export function namingOver(holds: Holds): (folder: string) => string | null {
  return (folder) => {
    const names = holds(folder).names
    const wants = names[1] ?? names[0]
    if (wants === undefined) return null
    return strippedOf(wants, holds(namingFolderOf(folder, holds)).names)
  }
}

export function partsOver(
  index: Answering,
  root: string,
  stated: FilePropertiesBy,
  sidecars: SidecarsBy
): (page: Held) => readonly string[] {
  return (page) => {
    if (page.slug === null || page.pageTypeSlug === null) return [page.path]
    const value = index.pageAt(page.pageTypeSlug, page.slug)
    if (value === null) return [page.path]
    return claimsOf(value, page.path, root, stated, sidecars)
  }
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const shapes = shapesIn(change.root, shadow)
  const pageTypes = shadow.index.pageTypesIn()
  const stated = shadow.index.fileKeysAt()
  const fileProperties = new Set<string>(stated.keys())
  const filing = namesFiling(stated)
  const naming = reachingIn(shadow.index.everyPath(), stated, (path) => textIn(change, path))
  let known: Known | null = null
  const admits = new Map<string, ReadonlySet<string>>()
  const extending = (pageTypeSlug: string, wanted: string): boolean => {
    let held = admits.get(wanted)
    if (held === undefined) {
      if (known === null) known = shadow.index.knownIn()
      held = new Set<string>(known.admitting(wanted))
      admits.set(wanted, held)
    }
    return held.has(pageTypeSlug)
  }
  const grouped = groupedBy(listedFiles(shadow.index, change))
  const declaring = declaringOver(shadow.index, grouped)
  const holds = holdingOver(shadow.index, grouped, pageTypes, fileProperties)
  const namedFor = namingOver(holds)
  const parts = partsOver(
    shadow.index,
    change.root,
    shadow.index.filePropertiesAt(),
    shadow.index.sidecarsAt()
  )
  const entering = enteringOf(shadow)
  const found: Judged[] = []
  for (const folder of [...foldersTouchedBy(change, naming)].sort()) {
    const named = basename(folder)
    const opening = heldFolder(folder, holds)
      ? null
      : openingWith(named, holds(namingFolderOf(folder, holds)).names)
    if (opening !== null) {
      found.push({
        path: folder,
        reason: `this folder opens with \`${opening}\`, what the page above it is named`,
      })
      continue
    }
    const here = grouped.at(folder)
    const held = here.map((one) =>
      claimedIn(heldIn(one, pageTypes, fileProperties), shadow.index, filing)
    )
    const described: Standing = {
      folder,
      files: here,
      subfolders: grouped.foldersIn(folder),
      under: (at) => grouped.at(at),
      pages: held.filter((one) => one.kind === "page"),
      properties: held.filter((one) => one.kind === "property"),
      strays: held.filter((one) => one.kind === "stray"),
      entered: (path) => entering(folder, path),
      extending,
      declaring,
      naming: namedFor,
      holds: (at) => holds(at).holds,
      declared: (at) => holds(at).declared,
      parts,
    }
    const said = shapes.map((one) => ({ slug: one.slug, reasons: one.judge(described) }))
    if (said.some((one) => one.reasons.length === 0)) continue
    const why = said.map((one) => `as ${one.slug}, ${one.reasons.join(" and ")}`).join("; ")
    found.push({ path: folder, reason: `this folder matches no folder shape — ${why}` })
  }
  return found
}

export const folderMatchesAShape = input(FILES, refusalsIn)
