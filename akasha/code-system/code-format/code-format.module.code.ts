import { join } from "node:path"
import { bytes } from "@akasha/utils-run/running"
import { classifyExtension, type FileKind } from "../file-kind/file-kind.module.code.ts"

const BIOME_AT = "node_modules/.bin/biome"

const FORMATS: ReadonlySet<FileKind> = new Set<FileKind>(["ts", "tsx", "js", "jsx", "css"])

const CHECKS = "check"

const REWRITES = "--write"

const OVER = "--stdin-file-path="

export type Formatted = {
  readonly body: Uint8Array
  readonly changed: boolean
}

function sameAs(one: Uint8Array, other: Uint8Array): boolean {
  if (one.byteLength !== other.byteLength) return false
  return one.every((byte, at) => byte === other[at])
}

export function formattedBody(root: string, path: string, body: Uint8Array): Formatted {
  const held: Formatted = { body, changed: false }
  const kind = classifyExtension(path)
  if (kind === null || !FORMATS.has(kind)) return held
  try {
    const done = bytes([join(root, BIOME_AT), CHECKS, REWRITES, `${OVER}${path}`], {
      cwd: root,
      stdin: body,
    })
    if (done.code !== 0) return held
    const said = done.out
    if (said.byteLength === 0 || sameAs(said, body)) return held
    return { body: said, changed: true }
  } catch {
    return held
  }
}
