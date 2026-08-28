import { existsSync } from "node:fs"
import { diskFileTree, type FileTree } from "../../../page/file-tree.ts"
import { parseFrontmatter } from "../../../page/frontmatter.ts"
import { claimant, type PageType, placeDirOf } from "../../../page/page-types.ts"
import { registryOf } from "../../../page/property/registry.ts"
import { rootsHere } from "../../../repo/roots/roots.ts"
import { idOfFilePage } from "../../../page/name/naming/naming.ts"

const ID_KEY = "id"

const OPENING = "---\n"

export interface Stating {
  readonly relPath: string
  readonly body: string | Uint8Array
}

function treeWriting(repo: string, writing: readonly string[]): FileTree {
  const base = diskFileTree(rootsHere())
  return {
    ...base,
    repoOf: (slug: string) => {
      const held = base.repoOf(slug)
      if (held !== null) return held
      const dir = `${placeDirOf(slug)}/`
      return writing.some((at) => at.startsWith(dir)) ? repo : null
    },
  }
}

function idToState(
  relPath: string,
  body: string,
  repo: string,
  types: readonly PageType[]
): string | null {
  if (claimant(relPath, types).type === null) return null
  if (!body.startsWith(OPENING)) return null
  const fm = parseFrontmatter(body)
  if (!fm.present || fm.error !== null || fm.keys.includes(ID_KEY)) return null
  return idOfFilePage(null, `${repo}:${relPath}`)
}

export function statingIds<T extends Stating>(
  repo: string,
  root: string,
  entries: readonly T[]
): readonly T[] {
  const making = new Set(
    entries.filter((one) => !existsSync(`${root}/${one.relPath}`)).map((one) => one.relPath)
  )
  if (making.size === 0) return entries
  const types = registryOf(treeWriting(repo, entries.map((one) => one.relPath)))
  return entries.map((entry) => {
    const body = entry.body
    if (!making.has(entry.relPath) || typeof body !== "string") return entry
    const id = idToState(entry.relPath, body, repo, types)
    if (id === null) return entry
    return { ...entry, body: `${OPENING}${ID_KEY}: ${id}\n${body.slice(OPENING.length)}` }
  })
}
