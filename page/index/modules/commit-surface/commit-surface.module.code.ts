import { join } from "node:path"
import {
  bodyAt,
  commitThere,
  namesAt,
} from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import type { Child, Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { INDEX_AT } from "akasha/page/index/modules/surface/index-surface.module.code.ts"

const ROOT = ""

const SLASH = "/"

const DECODER = new TextDecoder()

function textIn(root: string, base: string, path: string): string | null {
  const held = bodyAt(root, base, path)
  return held === null ? null : DECODER.decode(held)
}

function namedIn(root: string, base: string, at: string): boolean {
  const full = join(INDEX_AT, at)
  const cut = full.lastIndexOf(SLASH)
  const found = namesAt(root, base, cut < 0 ? ROOT : full.slice(0, cut))
  return found?.has(full.slice(cut + 1)) === true
}

export function readingFrom(root: string, base: string): Reading | null {
  if (!commitThere(root, base)) return null
  if (namesAt(root, base, INDEX_AT) === null) return null
  const lined = new Map<string, readonly string[]>()
  const listed = new Map<string, readonly Child[]>()
  const bodies = new Map<string, string | null>()
  return {
    holds: (at) => namedIn(root, base, at),
    listing: (at) => {
      const found = listed.get(at)
      if (found !== undefined) return found
      const made: Child[] = []
      for (const [name, one] of namesAt(root, base, join(INDEX_AT, at)) ?? []) {
        made.push({ name, directory: one.tree })
      }
      listed.set(at, made)
      return made
    },
    lines: (at) => {
      const found = lined.get(at)
      if (found !== undefined) return found
      const body = textIn(root, base, join(INDEX_AT, at))
      const made = body === null ? [] : body.split("\n").filter((one) => one !== "")
      lined.set(at, made)
      return made
    },
    read: (path) => {
      const found = bodies.get(path)
      if (found !== undefined) return found
      const made = textIn(root, base, path)
      bodies.set(path, made)
      return made
    },
  }
}
