import {
  componentSwiftOf,
  mainSwiftOf,
} from "akasha/code/ios-apps/modules/decode-harness-script/decode-harness-script.module.code.ts"
import type { Reading } from "akasha/pages/indexes/modules/shape/index-shape.module.code.ts"

const DECODING = "smilingjenny-decode-harness"

export function componentSwiftIn(given: string | Reading): readonly string[] {
  return componentSwiftOf(given, DECODING)
}

export function mainSwiftIn(given: string | Reading): string {
  return mainSwiftOf(given, DECODING)
}
