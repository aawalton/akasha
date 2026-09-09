import { basename } from "node:path"
import type { Naming } from "@akasha/code/code-specifier"
import type { Answering } from "@akasha/indexes/answering"
import type { FilePropertiesBy, FoldersBy } from "@akasha/indexes/entries"
import { reachingOf } from "@akasha/indexes/package-reaching"
import { claimsOf, type IsThere, type SidecarsBy } from "@akasha/indexes/path-claiming"
import type { Known } from "@akasha/indexes/reaching"
import { slugIn } from "@akasha/pages/page-address"
import { type Held, heldIn, partedIn } from "@akasha/pages/page-file-name"
import { textAt, textsAt } from "@akasha/pages/page-value"
import type { Shadow } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import type { Declaring, Standing } from "./folder-shapes/folder-shape.page-type.ts"
import {
  folderOf,
  type Grouped,
  segmentingOver,
} from "./modules/folder-grouping/folder-grouping.module.code.ts"
import {
  type Holding,
  type Holds,
  heldFolder,
  namingFolderOf,
  namingOver,
  openingWith,
} from "./modules/folder-naming/folder-naming.module.code.ts"
import {
  judgedBy,
  namesHeldBy,
  shapesIn,
} from "./modules/shape-loading/shape-loading.module.code.ts"

const TS = "ts"

const TS_ENDING = ".ts"

const PAGE_TYPE = "page-type"

const PACKAGE = "workspace-package"

const DOMAIN = "domain"

const RECORD_PROPERTY = "record-property"

const ONE_OF_PROPERTY = "one-of-property"

const MEMBERS = "members"

const PROPERTIES = "properties"

const PLURAL_SLUG = "pluralSlug"

const PARTS = "parts"

const PART_SLUGS = "partSlugs"

const PART_OF_COLLECTIONS = "partOfCollections"

export type Paged = Pick<Answering, "pageByPath">

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

export function pageTypesAt(grouped: Grouped, folder: string): readonly string[] {
  const found: string[] = []
  for (const one of grouped.at(folder)) {
    const said = partedIn(one)
    if (said === null || said.sections.length > 0) continue
    if (said.held === TS && said.pageType === PAGE_TYPE) found.push(said.slug)
  }
  return found
}

export function declaredBesideIn(
  index: Answering,
  grouped: Grouped,
  folder: string
): readonly string[] {
  const found: string[] = []
  for (const one of grouped.at(`${folder}/${PROPERTIES}`)) {
    const said = partedIn(one)
    if (said === null || said.sections.length > 0 || said.held !== TS) continue
    if (said.pageType === ONE_OF_PROPERTY) {
      const held = index.pageByPath(one)
      if (held === null) continue
      for (const member of textsAt(held, MEMBERS) ?? []) {
        const bare = slugIn(member)
        if (bare !== null) found.push(bare)
      }
      continue
    }
    if (said.pageType !== RECORD_PROPERTY) continue
    const value = index.pageByPath(one)
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
        propertySlugs: new Set<string>([...declared, ...declaredBesideIn(index, grouped, folder)]),
      }
    }
    held.set(folder, made)
    return made
  }
}

const NOTHING: Holding = { names: [], holds: [], declared: new Set<string>() }

function pairs(page: Held, said: Held): boolean {
  return page.pageTypeSlug === PAGE_TYPE && page.slug !== null && said.slug === page.slug
}

const BESIDE = new Set<string>([PACKAGE, DOMAIN])

function beside(said: Held): boolean {
  return said.pageTypeSlug !== null && BESIDE.has(said.pageTypeSlug)
}

export function pairedIn(pages: readonly Held[]): readonly Held[] {
  const [one, two] = pages
  if (one === undefined || pages.length > 2) return []
  if (two === undefined) return [one]
  if (beside(two) && pairs(one, two)) return [one, two]
  if (beside(one) && pairs(two, one)) return [two, one]
  return []
}

function declaredBy(index: Paged, page: Held | undefined): readonly string[] {
  if (page === undefined) return []
  const value = index.pageByPath(page.path)
  return value === null ? [] : (textsAt(value, PARTS) ?? textsAt(value, PART_SLUGS) ?? [])
}

function identityOf(page: Held | undefined): readonly string[] {
  if (page === undefined || page.slug === null || page.pageTypeSlug === null) return []
  return [`${page.pageTypeSlug}/${page.slug}`]
}

export function holdingOver(
  index: Paged,
  grouped: Grouped,
  pageTypes: ReadonlySet<string>,
  fileProperties: ReadonlySet<string>
): Holds {
  const held = new Map<string, Holding>()
  return (folder) => {
    const found = held.get(folder)
    if (found !== undefined) return found
    const paired = pairedIn(
      grouped
        .at(folder)
        .map((one) => heldIn(one, pageTypes, fileProperties))
        .filter((one) => one.kind === "page")
    )
    const page = paired[0]
    let made = NOTHING
    if (page !== undefined && page.slug !== null && page.pageTypeSlug !== null) {
      const value = index.pageByPath(page.path)
      const plural = value === null ? null : textAt(value, PLURAL_SLUG)
      made = {
        names: plural === null ? [page.slug] : [page.slug, plural],
        holds: [...identityOf(paired[0]), ...identityOf(paired[1])],
        declared: new Set<string>([
          ...(value === null ? [] : (textsAt(value, PARTS) ?? textsAt(value, PART_SLUGS) ?? [])),
          ...declaredBy(index, paired[1]),
        ]),
      }
    }
    held.set(folder, made)
    return made
  }
}

export function partsOver(
  index: Paged,
  root: string,
  stated: FilePropertiesBy,
  sidecars: SidecarsBy,
  folders: FoldersBy,
  there: IsThere
): (page: Held) => readonly string[] {
  return (page) => {
    const value = index.pageByPath(page.path)
    if (value === null) return [page.path]
    return claimsOf(value, page.path, root, stated, sidecars, there, folders)
  }
}

export function partOfOver(index: Paged): (page: Held) => readonly string[] {
  return (page) => {
    const value = index.pageByPath(page.path)
    if (value === null) return []
    return textsAt(value, PART_OF_COLLECTIONS) ?? []
  }
}

export type Reading = {
  readonly root: string
  readonly shadow: Shadow
  readonly grouped: Grouped
  readonly textAt: (path: string) => string | null
}

export type Judging = {
  readonly naming: Naming
  readonly holds: Holds
  readonly heldNames: ReadonlySet<string>
  readonly refusalsAt: (folders: Iterable<string>) => readonly Judged[]
}

export function judgingOver(given: Reading): Judging {
  const index = given.shadow.index
  const grouped = given.grouped
  const shapes = shapesIn(given.root, given.shadow)
  const pageTypes = index.pageTypesIn()
  const stated = index.fileKeysAt()
  const fileProperties = new Set<string>(stated.keys())
  const filing = namesFiling(stated)
  const naming = reachingOf(index.manifestsBeside(stated), given.textAt)
  let known: Known | null = null
  const admits = new Map<string, ReadonlySet<string>>()
  const extending = (pageTypeSlug: string, wanted: string): boolean => {
    let seen = admits.get(wanted)
    if (seen === undefined) {
      if (known === null) known = index.knownIn()
      seen = new Set<string>(known.admitting(wanted))
      admits.set(wanted, seen)
    }
    return seen.has(pageTypeSlug)
  }
  const segmenting = segmentingOver(stated, grouped)
  const declaring = declaringOver(index, grouped)
  const holds = holdingOver(index, grouped, pageTypes, fileProperties)
  const heldNames = namesHeldBy(shapes)
  const namedFor = namingOver(holds, heldNames)
  const parts = partsOver(
    index,
    given.root,
    index.filePropertiesAt(),
    index.sidecarsAt(),
    index.folderPropertiesAt(),
    (at) => grouped.at(folderOf(at)).includes(at)
  )
  const partOf = partOfOver(index)
  const entering = enteringOf(given.shadow)
  const refusalsAt = (folders: Iterable<string>): readonly Judged[] => {
    const found: Judged[] = []
    for (const folder of [...folders].sort()) {
      if (segmenting(folder)) continue
      const named = basename(folder)
      const opening = heldFolder(folder, holds, heldNames)
        ? null
        : openingWith(named, holds(namingFolderOf(folder, holds, heldNames)).names)
      if (opening !== null) {
        found.push({
          path: folder,
          reason: `this folder opens with \`${opening}\`, what the page above it is named`,
        })
        continue
      }
      const here = grouped.at(folder)
      const held = here.map((one) =>
        claimedIn(heldIn(one, pageTypes, fileProperties), index, filing)
      )
      const described: Standing = {
        folder,
        files: here,
        subfolders: grouped.foldersIn(folder),
        held: heldNames,
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
        partOf,
      }
      const said = shapes.map((one) => ({ slug: one.slug, reasons: judgedBy(one, described) }))
      if (said.some((one) => one.reasons.length === 0)) continue
      const why = said.map((one) => `as ${one.slug}, ${one.reasons.join(" and ")}`).join("; ")
      found.push({ path: folder, reason: `this folder matches no folder shape — ${why}` })
    }
    return found
  }
  return { naming, holds, heldNames, refusalsAt }
}
