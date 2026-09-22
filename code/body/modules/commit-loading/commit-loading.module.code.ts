import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  bodyAt,
  commitThere,
} from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"

const PACKAGE = "akasha/"

const NAMESPACE = "akasha-commit"

const TSX = ".tsx"

const DECODER = new TextDecoder()

type Loaded = { readonly contents: string; readonly loader: "ts" | "tsx" }

const SPECIAL = /[.*+?^${}()|[\]\\]/g

function underRoot(root: string): RegExp {
  return new RegExp(`^${root.replace(SPECIAL, "\\$&")}/.*\\.tsx?$`)
}

let claiming = false

export function loadingFrom(root: string, base: string): boolean {
  if (claiming) return true
  if (typeof Bun === "undefined") return false
  try {
    if (!commitThere(root, base)) return false
  } catch {
    return false
  }
  const bodies = new Map<string, string>()
  const bodyFor = (full: string, at: string): string | null => {
    const found = bodies.get(full)
    if (found !== undefined) return found
    let held: Uint8Array | null
    try {
      held = bodyAt(root, base, at)
    } catch {
      return null
    }
    if (held === null) return null
    const made = DECODER.decode(held)
    bodies.set(full, made)
    return made
  }
  const loaded = (args: { readonly path: string }): Loaded => ({
    contents: bodies.get(args.path) ?? readFileSync(args.path, "utf8"),
    loader: args.path.endsWith(TSX) ? "tsx" : "ts",
  })
  Bun.plugin({
    name: NAMESPACE,
    setup: (build) => {
      build.onResolve({ filter: /^akasha\/.*\.tsx?$/ }, (args) => {
        const at = args.path.slice(PACKAGE.length)
        const full = join(root, at)
        if (bodyFor(full, at) === null) return undefined
        if (existsSync(full)) return undefined
        return { path: full, namespace: NAMESPACE }
      })
      build.onLoad({ filter: underRoot(root) }, loaded)
      build.onLoad({ filter: /.*/, namespace: NAMESPACE }, loaded)
    },
  })
  claiming = true
  return true
}
