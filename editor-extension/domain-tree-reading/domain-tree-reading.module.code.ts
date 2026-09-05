import * as path from "node:path"
import type { ChampionTree, DomainNode } from "../champions-tree/champions-tree.module.code.ts"

// The champion tree beside the checkout it was composed from, so a reader joins the two to open the
// document a row represents.
export interface DomainTree extends ChampionTree {
  readonly repo: string
}

export function documentPath(tree: DomainTree, node: DomainNode): string {
  return path.join(tree.repo, node.relPath)
}
