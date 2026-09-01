import { join } from "node:path"
import { bytes } from "@akasha/utils-run/running"

const BIOME_AT = "node_modules/.bin/biome"

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
