import { diskFileTree, type FileTree } from "../file-tree.ts"
import { parseFrontmatter, textField } from "../frontmatter.ts"
import { claimant, type PageType } from "../page-types.ts"
import { registryOf } from "../property/registry.ts"
import { rootsHere } from "../../repo/roots/roots.ts"

export const MORTAL_KEY = "mortal"

const said = new Map<string, boolean>()

function statesMortal(one: PageType, tree: FileTree): boolean {
  const at = `${tree.root ?? ""}/${one.relPath}`
  const held = said.get(at)
  if (held !== undefined) return held
  const text = tree.open(one.relPath)
  const states = text !== null && textField(parseFrontmatter(text), MORTAL_KEY) === "true"
  said.set(at, states)
  return states
}

export function mortalPagesAt(relPath: string): boolean {
  const tree = diskFileTree(rootsHere())
  const types = registryOf(tree)
  if (types.length === 0) return false
  const claim = claimant(relPath, types)
  return claim.type !== null && statesMortal(claim.type, tree)
}
