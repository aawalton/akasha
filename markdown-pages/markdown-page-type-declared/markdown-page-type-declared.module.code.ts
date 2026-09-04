import type { Property } from "@akasha/pages-system/markdown-property"
import type { FileTree } from "../markdown-file-tree/markdown-file-tree.module.code.ts"
import { compiledPageTypeFor } from "../markdown-property-frontmatter/markdown-property-frontmatter.module.code.ts"
import { registryOf } from "../markdown-property-registry/markdown-property-registry.module.code.ts"

const declared = new WeakMap<FileTree, Map<string, readonly Property[] | null>>()

export function declaredFor(tree: FileTree, pageType: string): readonly Property[] | null {
  const byType = declared.get(tree) ?? new Map<string, readonly Property[] | null>()
  declared.set(tree, byType)
  const found = byType.get(pageType)
  if (found !== undefined) return found
  const type = registryOf(tree).find((one) => one.slug === pageType)
  const got = type === undefined ? null : compiledPageTypeFor(type, tree).properties
  const set = got === null || got.length === 0 ? null : got
  byType.set(pageType, set)
  return set
}
