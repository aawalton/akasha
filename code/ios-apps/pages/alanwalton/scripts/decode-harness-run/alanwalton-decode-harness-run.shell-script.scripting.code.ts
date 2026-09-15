import { scriptBodyOf } from "akasha/code/ios-apps/modules/decode-harness-script/decode-harness-script.module.code.ts"
import type { Reading } from "akasha/pages/index/modules/shape/index-shape.module.code.ts"

const OWN = "alanwalton-decode-harness-run"

const DECODING = "alanwalton-decode-harness"

export function bodyIn(given: string | Reading): string {
  return scriptBodyOf(given, OWN, DECODING)
}
