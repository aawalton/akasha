import { readFileSync } from "node:fs"
import { isMissing } from "akasha/utils/fs/missing/missing.module.code.ts"
import { whyOf } from "../fault-saying/fault-saying.module.code.ts"

export type Reached =
  | { readonly bytes: Uint8Array }
  | { readonly absent: true }
  | { readonly unreadable: string }

export function bytesAt(at: string): Reached {
  try {
    return { bytes: readFileSync(at) }
  } catch (thrown) {
    return isMissing(thrown) ? { absent: true } : { unreadable: whyOf(thrown) }
  }
}

export function textOf(bytes: Uint8Array): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    return null
  }
}

export function textAt(at: string): string | null {
  const held = bytesAt(at)
  return "bytes" in held ? textOf(held.bytes) : null
}
