import { dirname } from "node:path"
import { namedUnder, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { filedById, namesIn } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export const COMMAND = "command"

export const NAMESPACE = "namespace"

const MODULE = "module"

export const COMMANDS = "commands"

export const PAGES_AT = "commands/pages"

export const MODULES_AT = "commands/modules"

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
    "and the folder tree under `commands/` are one tree said twice"
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
    "`commands/` is named by a page under `commands/`"
  )
}

function moduleNamingReason(at: string): string {
  return (
    `the page naming this module among its parts is in \`${at}\` — a module under ` +
    "`commands/pages` is named by the command or the namespace beside it"
  )
}

function moduleFolderReason(at: string, wanted: string): string {
  return (
    `the module sits in \`${at}\`, and the page naming it is in \`${wanted}\` — a module ` +
    "under a command sits in a folder directly inside that command's own folder"
  )
}

function placeReason(at: string, wanted: string): string {
  return (
    `the module sits in \`${at}\`, and the pages reaching it sit under \`${wanted}\` — a module ` +
    "under `commands/pages` sits under the lowest level whose pages reach it"
  )
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
  return dirname(at) === wanted ? null : placeReason(at, wanted)
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
  if (dirname(at) !== folder) return moduleFolderReason(at, folder)
  return null
}

export function kindsFor(shadow: Shadow): Kinds {
  const tree = new Set([...shadow.index.kindsUnder(COMMAND), ...shadow.index.kindsUnder(NAMESPACE)])
  const modules = new Set([...shadow.index.kindsUnder(MODULE)].filter((one) => !tree.has(one)))
  return { tree, modules }
}

export function namedAt(path: string, kinds: Kinds): Named | null {
  const one = namedUnder(path, kinds.tree)
  if (one !== null) return { slug: one.slug, module: false }
  if (!path.startsWith(`${COMMANDS}/`)) return null
  const held = namedUnder(path, kinds.modules)
  return held === null ? null : { slug: held.slug, module: true }
}

const TREES = new WeakMap<Shadow, Tree>()

function treeIn(shadow: Shadow, kinds: Kinds): Tree {
  const levels = new Set<string>()
  const modules: string[] = []
  const left = [PAGES_AT]
  while (left.length > 0) {
    const folder = left.pop()
    if (folder === undefined) continue
    for (const file of shadow.index.filesIn(folder)) {
      const one = namedAt(file, kinds)
      if (one === null) continue
      if (one.module) modules.push(file)
      else levels.add(folder)
    }
    left.push(...shadow.index.foldersIn(folder))
  }
  return { levels, modules: modules.sort() }
}

export function treeUnder(shadow: Shadow, kinds: Kinds): Tree {
  const found = TREES.get(shadow)
  if (found !== undefined) return found
  const made = treeIn(shadow, kinds)
  TREES.set(shadow, made)
  return made
}

function reachingOver(shadow: Shadow): (folder: string) => readonly string[] {
  return (folder) => {
    const found = new Set<string>()
    for (const file of shadow.index.filesIn(folder)) {
      for (const one of shadow.index.importersOf(file)) {
        if (one.startsWith(`${folder}/`) || !one.startsWith(`${PAGES_AT}/`)) continue
        found.add(dirname(one))
      }
    }
    return [...found].sort()
  }
}

export function placingBy(shadow: Shadow, kinds: Kinds): Placing {
  const reaching = reachingOver(shadow)
  return (path) =>
    placeReasonIn(path, {
      levels: treeUnder(shadow, kinds).levels,
      reaching: reaching(dirname(path)),
    })
}

export function judgingBy(shadow: Shadow, kinds: Kinds): Judging {
  const known = shadow.index.knownIn()
  const placing = placingBy(shadow, kinds)
  return (id, path, named) => {
    const namer = shadow.index.idsNaming(id, PARTS)[0]
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
