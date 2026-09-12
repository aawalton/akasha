import { dirname } from "node:path"
import { namedUnder, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { filedById } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

export const COMMAND = "command"

export const NAMESPACE = "namespace"

const MODULE = "module"

const COMMANDS = "commands"

export const PAGES_AT = "commands/pages"

const PAGE_TYPE = "page-type"

const PARTS = "parts"

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

export type Judging = (id: string, path: string, named: Named) => string | null

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

export function judgingBy(shadow: Shadow, kinds: Kinds): Judging {
  const known = shadow.index.knownIn()
  return (id, path, named) => {
    const namer = shadow.index.idsNaming(id, PARTS)[0]
    if (namer === undefined) return null
    const filed = filedById(known, namer)
    if (filed === null) return null
    const said = partedIn(filed.path)
    if (said === null) return null
    if (named.module) {
      return moduleReasonIn(path, {
        folder: dirname(filed.path),
        beside: kinds.tree.has(said.pageType),
      })
    }
    if (said.pageType === PAGE_TYPE && said.slug === COMMAND) {
      return reasonIn(path, named.slug, { folder: PAGES_AT, slug: null })
    }
    if (said.pageType !== NAMESPACE) return namingReason(filed.path)
    return reasonIn(path, named.slug, { folder: dirname(filed.path), slug: said.slug })
  }
}
