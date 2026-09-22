import { dirname } from "node:path"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { filedById, namesIn } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import { filesIn } from "akasha/page/index/modules/tree-reading/tree-reading.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { namedUnder, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const COMMAND = "command"

const NAMESPACE = "namespace"

const MODULE = "module"

export const COMMANDS = "command"

export const PAGES_AT = "command/pages"

const MODULES = "modules"

const MODULES_AT = `${COMMANDS}/${MODULES}`

const PAGE_TYPE = "page-type"

export const PARTS = "parts"

const HYPHEN = "-"

export type Above = {
  readonly folder: string
  readonly slug: string | null
}

export type Naming = {
  readonly folder: string
  readonly beside: boolean
}

export type Kinds = {
  readonly tree: ReadonlySet<string>
  readonly modules: ReadonlySet<string>
}

export type Named = {
  readonly slug: string
  readonly module: boolean
}

export type Placed = {
  readonly levels: ReadonlySet<string>
  readonly reaching: readonly string[]
}

export type Tree = {
  readonly levels: ReadonlySet<string>
  readonly modules: readonly string[]
}

export type Placing = (path: string) => string | null

export type Judging = (id: string, path: string, named: Named) => string | null

export function partsIn(value: Value | null): readonly string[] {
  return value === null ? [] : namesIn(value[PARTS])
}

function slugReason(slug: string, above: string): string {
  return (
    `the page names itself \`${slug}\`, and the page above it is \`${above}\` — a command or a ` +
    "namespace opens its slug with the slug of the page above it and a hyphen"
  )
}

function folderReason(at: string, wanted: string): string {
  return (
    `the page sits in \`${at}\`, and the parts above it name \`${wanted}\` — the command tree ` +
    "and the folder tree under `command/` are one tree said twice"
  )
}

function carriedReason(name: string, above: string, word: string): string {
  return (
    `the page names itself \`${name}\`, and \`${word}\` is already in \`${above}\` above it — a ` +
    "level of the command tree names itself with no name of a level above it"
  )
}

function namingReason(at: string): string {
  return (
    `the page naming this one among its parts is \`${at}\` — a command or a namespace is named ` +
    "by a namespace or by the `command` page type"
  )
}

function outsideReason(at: string): string {
  return (
    `the page naming this module among its parts is in \`${at}\` — a module under ` +
    "`command/` is named by a page under `command/`"
  )
}

function moduleNamingReason(at: string): string {
  return (
    `the page naming this module among its parts is in \`${at}\` — a module under ` +
    "`command/pages` is named by the command or the namespace beside it"
  )
}

function moduleFolderReason(at: string, wanted: string): string {
  return (
    `the module sits in \`${at}\`, and the page naming it is in \`${wanted}\` — a module ` +
    `under a command sits in a folder inside \`${wanted}/${MODULES}\``
  )
}

function placeReason(at: string, wanted: string): string {
  return (
    `the module sits in \`${at}\`, and the pages reaching it sit under \`${wanted}\` — a module ` +
    "under `command/pages` sits under the lowest level whose pages reach it"
  )
}

function insideOf(at: string, folder: string): boolean {
  const above = dirname(at)
  return above === folder || above === `${folder}/${MODULES}`
}

function apartReason(at: string): string {
  return (
    `the module sits in \`${at}\`, and the pages reaching it sit under no one command or ` +
    `namespace — a module reached that widely sits in \`${MODULES_AT}\``
  )
}

function levelOver(folder: string, levels: ReadonlySet<string>): string | null {
  let at = folder
  while (at.startsWith(`${PAGES_AT}/`)) {
    if (levels.has(at)) return at
    at = dirname(at)
  }
  return null
}

function metIn(folders: readonly string[]): string {
  const [first, ...rest] = folders
  if (first === undefined) return ""
  let common = first.split("/")
  for (const one of rest) {
    const said = one.split("/")
    let held = 0
    while (held < common.length && held < said.length && common[held] === said[held]) held += 1
    common = common.slice(0, held)
  }
  return common.join("/")
}

export function placeReasonIn(path: string, placed: Placed): string | null {
  const at = dirname(path)
  if (!at.startsWith(`${PAGES_AT}/`)) return null
  const under: string[] = []
  for (const one of placed.reaching) {
    const held = levelOver(one, placed.levels)
    if (held !== null) under.push(held)
  }
  const wanted = levelOver(metIn(under), placed.levels)
  if (wanted === null) return apartReason(at)
  return insideOf(at, wanted) ? null : placeReason(at, wanted)
}

function carriedIn(at: string): string | null {
  if (!at.startsWith(`${PAGES_AT}/`)) return null
  const levels = at.slice(PAGES_AT.length + 1).split("/")
  const name = levels[levels.length - 1]
  if (name === undefined) return null
  const carried = new Set(name.split(HYPHEN))
  for (const one of levels.slice(0, -1)) {
    const said = one.split(HYPHEN).find((word) => carried.has(word))
    if (said !== undefined) return carriedReason(name, one, said)
  }
  return null
}

export function reasonIn(path: string, slug: string, above: Above): string | null {
  const opening = above.slug
  if (opening !== null && !slug.startsWith(`${opening}${HYPHEN}`)) return slugReason(slug, opening)
  const tail = opening === null ? slug : slug.slice(`${opening}${HYPHEN}`.length)
  const wanted = `${above.folder}/${tail}`
  const at = dirname(path)
  if (at !== wanted) return folderReason(at, wanted)
  return carriedIn(at)
}

export function moduleReasonIn(path: string, naming: Naming): string | null {
  const folder = naming.folder
  if (folder !== COMMANDS && !folder.startsWith(`${COMMANDS}/`)) return outsideReason(folder)
  if (!path.startsWith(`${PAGES_AT}/`)) return null
  if (!naming.beside) return moduleNamingReason(folder)
  const at = dirname(path)
  if (!insideOf(at, folder)) return moduleFolderReason(at, folder)
  return null
}

export function kindsFor(paged: Paged): Kinds {
  const tree = new Set([...paged.index.kindsUnder(COMMAND), ...paged.index.kindsUnder(NAMESPACE)])
  const modules = new Set([...paged.index.kindsUnder(MODULE)].filter((one) => !tree.has(one)))
  return { tree, modules }
}

export function namedAt(path: string, kinds: Kinds): Named | null {
  const one = namedUnder(path, kinds.tree)
  if (one !== null) return { slug: one.slug, module: false }
  if (!path.startsWith(`${COMMANDS}/`)) return null
  const held = namedUnder(path, kinds.modules)
  return held === null ? null : { slug: held.slug, module: true }
}

const TREES = new WeakMap<Paged, Tree>()

const UNDER_PAGES = `${PAGES_AT}/`

function pagesOfTypes(paged: Paged, kinds: ReadonlySet<string>): readonly string[] {
  const found: string[] = []
  for (const slug of kinds) {
    for (const one of paged.index.everyOfType(slug)) {
      if (one.path.startsWith(UNDER_PAGES)) found.push(one.path)
    }
  }
  return found
}

function treeIn(paged: Paged, kinds: Kinds): Tree {
  const levels = new Set<string>()
  for (const one of pagesOfTypes(paged, kinds.tree)) levels.add(dirname(one))
  return { levels, modules: [...pagesOfTypes(paged, kinds.modules)].sort() }
}

export function treeUnder(paged: Paged, kinds: Kinds): Tree {
  const found = TREES.get(paged)
  if (found !== undefined) return found
  const made = treeIn(paged, kinds)
  TREES.set(paged, made)
  return made
}

export type Files = (folder: string) => readonly string[]

export function filesLeftBy(change: Change): Files {
  const base = change.base ?? null
  return (folder) => {
    const held = new Set<string>(filesIn(change.root, folder, base))
    for (const one of change.changed) {
      if (dirname(one) !== folder) continue
      if (change.after(one) === null) held.delete(one)
      else held.add(one)
    }
    return [...held].sort()
  }
}

function reachingOver(paged: Paged, files: Files): (folder: string) => readonly string[] {
  return (folder) => {
    const found = new Set<string>()
    for (const file of files(folder)) {
      for (const one of paged.index.importersOf(file)) {
        if (one.startsWith(`${folder}/`) || !one.startsWith(UNDER_PAGES)) continue
        found.add(dirname(one))
      }
    }
    return [...found].sort()
  }
}

export function placingBy(paged: Paged, kinds: Kinds, files: Files): Placing {
  const reaching = reachingOver(paged, files)
  return (path) =>
    placeReasonIn(path, {
      levels: treeUnder(paged, kinds).levels,
      reaching: reaching(dirname(path)),
    })
}

export function judgingBy(paged: Paged, kinds: Kinds, files: Files): Judging {
  const known = paged.index.knownIn()
  const placing = placingBy(paged, kinds, files)
  return (id, path, named) => {
    const namer = paged.index.idsNaming(id, PARTS)[0]
    if (namer === undefined) return null
    const filed = filedById(known, namer)
    if (filed === null) return null
    const said = partedIn(filed.path)
    if (said === null) return null
    if (named.module) {
      const naming = moduleReasonIn(path, {
        folder: dirname(filed.path),
        beside: kinds.tree.has(said.pageType),
      })
      return naming ?? placing(path)
    }
    if (said.pageType === PAGE_TYPE && said.slug === COMMAND) {
      return reasonIn(path, named.slug, { folder: PAGES_AT, slug: null })
    }
    if (said.pageType !== NAMESPACE) return namingReason(filed.path)
    return reasonIn(path, named.slug, { folder: dirname(filed.path), slug: said.slug })
  }
}
