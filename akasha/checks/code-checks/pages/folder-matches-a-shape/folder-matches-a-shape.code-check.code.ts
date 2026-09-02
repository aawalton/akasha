import { createRequire } from "node:module"
import { basename, join } from "node:path"
import { NAMING_NONE, type Naming } from "@akasha/code-system/code-specifier"
import type { Answering } from "@akasha/indexes/answering"
import { claimsOf } from "@akasha/indexes/entries"
import { edgesIn } from "@akasha/indexes/import"
import { reachingIn } from "@akasha/indexes/package-reaching"
import type { Known } from "@akasha/indexes/reaching"
import type { Change } from "@akasha/pages-system/change"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import {
  besideAt,
  type Held,
  heldIn,
  namedIn,
  uncommittedAt,
} from "@akasha/pages-system/page-file-name"
import { textAt } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import {
  bodyOf,
  FILES,
  input,
  textIn,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import type { Declaring, Judging, Standing } from "./folder-shape/folder-shape.page-type.ts"

const SHAPE = "folder-shape"

const ENABLED = "enabled"

const CODE = "code"

const TS = "ts"

const TS_ENDING = ".ts"

const PAGE_TYPE = "page-type"

const RECORD_PROPERTY = "record-property"

const PROPERTIES = "properties"

const PLURAL_SLUG = "pluralSlug"

const loadFrom = createRequire(import.meta.url)

export type Shape = {
  readonly slug: string
  readonly judge: Judging
}

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
  if (bytes === null) return new Set<string>()
  return new Set<string>(edgesIn(bodyOf({ root, path, bytes }), path, naming))
}

export function shapesIn(root: string, shadow: Shadow): readonly Shape[] {
  const found: Shape[] = []
  for (const one of shadow.index.everyOfType(SHAPE)) {
    const value = shadow.pageOf(one.path)
    if (value === null) {
      throw new Error(
        `${one.path} is a folder shape, and its page reads as nothing, so whether it judges folders cannot be read`
      )
    }
    const enabled = value[ENABLED]
    if (typeof enabled !== "boolean") {
      throw new Error(`${one.path} is a folder shape, and its page says no \`${ENABLED}\``)
    }
    if (!enabled) continue
    const said = namedIn(one.path)
    if (said === null) {
      throw new Error(`${one.path} is a folder shape, and its name says no slug`)
    }
    const slug = said.stem
    const beside = besideAt(one.path, CODE, TS)
    if (beside === null) {
      throw new Error(
        `${one.path} is a folder shape, and no code file can stand beside a name like it`
      )
    }
    const codePath = shadow.codeAt(beside)
    if (codePath === null) {
      throw new Error(
        `${one.path} is a folder shape, and this change leaves ${beside} holding a body no path on disk holds, so it cannot be loaded to judge by`
      )
    }
    let mod: Record<string, unknown>
    try {
      mod = loadFrom(join(root, codePath)) as Record<string, unknown>
    } catch (thrown) {
      throw new Error(
        `${one.path} is a folder shape, and ${codePath} could not be loaded — ${thrown instanceof Error ? thrown.message : String(thrown)}`
      )
    }
    const named = mod[exportedAs(slug)]
    if (typeof named !== "function") {
      throw new Error(
        `${one.path} is a folder shape, and ${beside} answers to nothing that can judge`
      )
    }
    found.push({ slug, judge: named as Judging })
  }
  if (found.length === 0) {
    throw new Error(
      "no folder shape judges folders, so every folder would match nothing and a clean answer would mean nothing"
    )
  }
  return [...found].sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
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
    uncommitted: false,
  }
}

export function filesUnder(files: readonly string[], folder: string): readonly string[] {
  return files.filter((one) => folderOf(one) === folder)
}

export function subfoldersOf(folder: string, deep: readonly string[]): readonly string[] {
  const found = new Set<string>()
  for (const one of deep) {
    const at = one.slice(folder.length + 1)
    const cut = at.indexOf("/")
    if (cut !== -1) found.add(`${folder}/${at.slice(0, cut)}`)
  }
  return [...found].sort()
}

export function pageTypesAt(files: readonly string[], folder: string): readonly string[] {
  const found: string[] = []
  for (const one of filesUnder(files, folder)) {
    const said = namedIn(one)
    if (said !== null && said.held === TS && said.tail === PAGE_TYPE) found.push(said.stem)
  }
  return found
}

export function fieldsIn(
  index: Answering,
  files: readonly string[],
  folder: string
): readonly string[] {
  const found: string[] = []
  for (const one of filesUnder(files, `${folder}/${PROPERTIES}`)) {
    const said = namedIn(one)
    if (said === null || said.held !== TS || said.tail !== RECORD_PROPERTY) continue
    const value = index.pageAt(RECORD_PROPERTY, said.stem)
    if (value === null) continue
    for (const carried of index.carriedIn(value, said.stem)) found.push(carried.pagePropertySlug)
  }
  return found
}

export function declaringOver(
  index: Answering,
  files: readonly string[]
): (folder: string) => Declaring | null {
  const held = new Map<string, Declaring | null>()
  return (folder) => {
    const found = held.get(folder)
    if (found !== undefined) return found
    const slugs = pageTypesAt(files, folder)
    const slug = slugs.length === 1 ? slugs[0] : undefined
    let made: Declaring | null = null
    if (slug !== undefined) {
      const value = index.pageAt(PAGE_TYPE, slug)
      const declared = index.propertiesOf(slug).map((one) => one.pagePropertySlug)
      made = {
        slug,
        pluralSlug: value === null ? null : textAt(value, PLURAL_SLUG),
        propertySlugs: new Set<string>([...declared, ...fieldsIn(index, files, folder)]),
      }
    }
    held.set(folder, made)
    return made
  }
}

export function namingOver(
  index: Answering,
  files: readonly string[],
  pageTypes: ReadonlySet<string>,
  fileProperties: ReadonlySet<string>
): (folder: string) => string | null {
  const held = new Map<string, string | null>()
  return (folder) => {
    const found = held.get(folder)
    if (found !== undefined) return found
    const pages = filesUnder(files, folder)
      .map((one) => heldIn(one, pageTypes, fileProperties))
      .filter((one) => one.kind === "page")
    const page = pages.length === 1 ? pages[0] : undefined
    let made: string | null = null
    if (page !== undefined && page.slug !== null && page.pageTypeSlug !== null) {
      const value = index.pageAt(page.pageTypeSlug, page.slug)
      made = value === null ? page.slug : (textAt(value, PLURAL_SLUG) ?? page.slug)
    }
    held.set(folder, made)
    return made
  }
}

export function partsOver(
  index: Answering,
  root: string,
  stated: ReadonlyMap<string, string | null>
): (page: Held) => readonly string[] {
  return (page) => {
    if (page.slug === null || page.pageTypeSlug === null) return [page.path]
    const value = index.pageAt(page.pageTypeSlug, page.slug)
    if (value === null) return [page.path]
    const held = uncommittedAt(page.path)
    const claimed = claimsOf(value, page.path, root, stated)
    return held === null ? claimed : [...claimed, held]
  }
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const shapes = shapesIn(change.root, shadow)
  const pageTypes = shadow.index.pageTypesIn()
  const stated = shadow.index.filePropertiesAt()
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
  const files = listedFiles(shadow.index, change)
  const declaring = declaringOver(shadow.index, files)
  const namedFor = namingOver(shadow.index, files, pageTypes, fileProperties)
  const parts = partsOver(shadow.index, change.root, stated)
  const entering = enteringOf(shadow)
  const found: Judged[] = []
  for (const folder of [...foldersTouchedBy(change, naming)].sort()) {
    const here = filesUnder(files, folder)
    const deep = files.filter((one) => one.startsWith(`${folder}/`) && folderOf(one) !== folder)
    const held = here.map((one) =>
      claimedIn(heldIn(one, pageTypes, fileProperties), shadow.index, filing)
    )
    const described: Standing = {
      folder,
      files: here,
      deep,
      subfolders: subfoldersOf(folder, deep),
      under: (at) => filesUnder(files, at),
      pages: held.filter((one) => one.kind === "page"),
      properties: held.filter((one) => one.kind === "property"),
      strays: held.filter((one) => one.kind === "stray"),
      entered: (path) => entering(folder, path),
      extending,
      declaring,
      naming: namedFor,
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
