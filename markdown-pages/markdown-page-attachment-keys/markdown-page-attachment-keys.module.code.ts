import { ATTACHMENT } from "@akasha/pages-system/page-value-key"
import { isAttachmentExtension } from "../markdown-attachment-file/markdown-attachment-file.module.code.ts"
import type { FileTree } from "../markdown-file-tree/markdown-file-tree.module.code.ts"
import { declarationsFor } from "../markdown-page-property-types/markdown-page-property-types.module.code.ts"

export { ATTACHMENT }

export function attachmentKeysFor(tree: FileTree, pageType: string): ReadonlyMap<string, string> {
  const keys = new Map<string, string>()
  for (const [key, one] of declarationsFor(tree, pageType)) {
    const extension = one.attachment
    if (extension !== null && isAttachmentExtension(extension)) keys.set(key, extension)
  }
  return keys
}
