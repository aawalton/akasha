import {
  componentSwiftOf,
  mainSwiftOf,
  scriptBodyOf,
} from "akasha/code-system/ios-apps/decode-harness-script/decode-harness-script.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const OWN = "smilingjenny-decode-harness-run"

const DECODING = "smilingjenny-decode-harness"

export function componentSwiftIn(given: string | Reading): readonly string[] {
  return componentSwiftOf(given, DECODING)
}

export function mainSwiftIn(given: string | Reading): string {
  return mainSwiftOf(given, DECODING)
}

export function bodyIn(given: string | Reading): string {
  return scriptBodyOf(given, OWN, DECODING)
}
