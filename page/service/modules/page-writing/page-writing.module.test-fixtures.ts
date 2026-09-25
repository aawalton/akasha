import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type {
  Asked,
  Put,
} from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"

export const SCRATCH_AT = "/var/tmp"

export const WRITER = "Amy <amy@alanwalton.com>"

export const AT = "akasha/a.ts"

export function putting(content: string): { readonly puts: readonly Put[] } {
  return { puts: [{ path: AT, content }] }
}

export function asking(held: Partial<Asked>): Asked {
  return { writer: WRITER, message: "a message", ...held }
}

export function cleared(root: string): undefined {
  rmSync(root, { recursive: true, force: true })
  return undefined
}

export function rootHolding(path: string, content: string): string {
  const root = mkdtempSync(join(SCRATCH_AT, "page-writing-"))
  mkdirSync(dirname(join(root, path)), { recursive: true })
  writeFileSync(join(root, path), content)
  return root
}
