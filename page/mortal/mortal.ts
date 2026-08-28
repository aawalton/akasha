import { diskFileTree, type FileTree } from "../file-tree.ts"
import { parseFrontmatter, textField } from "../frontmatter.ts"
import { claimant, type PageType } from "../page-types.ts"
import { registryOf } from "../property/registry.ts"
import { rootsHere } from "../../repo/roots/roots.ts"

export const MORTAL_KEY = "mortal"

const said = new Map<string, boolean>()

function statesMortal(one: PageType, tree: FileTree, held: Map<string, boolean>): boolean {
  const at = `${tree.root ?? ""}/${one.relPath}`
  const standing = held.get(at)
  if (standing !== undefined) return standing
  const text = tree.open(one.relPath)
  const states = text !== null && textField(parseFrontmatter(text), MORTAL_KEY) === "true"
  held.set(at, states)
  return states
}

export function mortalPagesAt(relPath: string): boolean {
  const tree = diskFileTree(rootsHere())
  const types = registryOf(tree)
  if (types.length === 0) return false
  const claim = claimant(relPath, types)
  return claim.type !== null && statesMortal(claim.type, tree, said)
}

export interface Mortality {
  readonly pageAt: (relPath: string) => boolean
  readonly typeNamed: (slug: string) => boolean
}

export function mortalityIn(tree: FileTree, types: readonly PageType[]): Mortality {
  const held = new Map<string, boolean>()
  const bySlug = new Map(types.map((one) => [one.slug, one] as const))
  return {
    pageAt: (relPath) => {
      const claim = claimant(relPath, types)
      return claim.type !== null && statesMortal(claim.type, tree, held)
    },
    typeNamed: (slug) => {
      const one = bySlug.get(slug)
      return one !== undefined && statesMortal(one, tree, held)
    },
  }
}
