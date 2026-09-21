import { sha256Hex } from "akasha/code/body/modules/sha256-hex/sha256-hex.module.code.ts"

const SLUG_HOLDS = 16

export function bytesSlug(opens: string, bytes: Uint8Array): string {
  return `${opens}${sha256Hex(bytes).slice(0, SLUG_HOLDS)}`
}
