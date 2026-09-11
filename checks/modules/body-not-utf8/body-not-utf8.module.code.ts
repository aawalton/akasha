import { refusalText } from "akasha/checks/modules/refusal-text/refusal-text.module.code.ts"
import { leadingBytes } from "akasha/code/utf8-body/utf8-body.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"

export function notUtf8(source: string, bytes: Uint8Array): string {
  return refusalText(
    "body-not-utf8",
    { source, bytes: String(bytes.length), leading: leadingBytes(bytes) },
    rootFor(resolveRoots(), AKASHA)
  )
}
