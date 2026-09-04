import { leadingBytes } from "@akasha/code-system/utf8-body"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { refusalText } from "../markdown-refusal-text/markdown-refusal-text.module.code.ts"

export function notUtf8(source: string, bytes: Uint8Array): string {
  return refusalText(
    "body-not-utf8",
    { source, bytes: String(bytes.length), leading: leadingBytes(bytes) },
    rootFor(resolveRoots(), AKASHA)
  )
}
