import { diskFileTree } from "../file-tree.ts"
import { parseFrontmatter, textField } from "../frontmatter.ts"
import { claimant, type PageType } from "../page-types.ts"
import { registryOf } from "../property/registry.ts"
import { rootsHere } from "../../repo/roots/roots.ts"
import { textAt } from "../text/text.ts"

export const MORTAL_KEY = "mortal"

const said = new Map<string, boolean>()

function statesMortal(one: PageType, root: string): boolean {
  const at = `${root}/${one.relPath}`
  const held = said.get(at)
  if (held !== undefined) return held
  const text = textAt(root, one.relPath)
  const states = text !== null && textField(parseFrontmatter(text), MORTAL_KEY) === "true"
  said.set(at, states)
  return states
}

export function mortalPagesAt(relPath: string, repo: string): boolean {
  const roots = rootsHere()
  const root = roots.instructions
  if (root === undefined) return false
  const types = registryOf(diskFileTree(roots))
  if (types.length === 0) return false
  const claim = claimant(relPath, repo, types)
  return claim.type !== null && statesMortal(claim.type, root)
}
