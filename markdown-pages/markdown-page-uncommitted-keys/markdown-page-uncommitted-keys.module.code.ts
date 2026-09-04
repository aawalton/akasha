import type { FileTree } from "../markdown-file-tree/markdown-file-tree.module.code.ts"
import { declarationsFor } from "../markdown-page-property-types/markdown-page-property-types.module.code.ts"

export function uncommittedKeysFor(tree: FileTree, pageType: string): ReadonlySet<string> {
  const keys = new Set<string>()
  for (const [key, one] of declarationsFor(tree, pageType)) if (one.uncommitted) keys.add(key)
  return keys
}
