import { trackedIn } from "@akasha/markdown-pages/tracked"
import { locate } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { normalizeAbsolute } from "@akasha/pages-system/repo-path"

const TS_FOR_JS: readonly (readonly [string, string])[] = [
  [".js", ".ts"],
  [".jsx", ".tsx"],
  [".mjs", ".mts"],
  [".cjs", ".cts"],
]

const IMPLIED = [".ts", ".tsx", ".mts", ".cts"] as const

const BESIDE = [".d.ts", ".js", ".jsx", ".mjs", ".cjs", ".json", ".css", ".node", ".wasm"] as const

export interface Named {
  readonly to: string
  readonly spell: (relative: string) => string
}

function without(path: string, ending: string): string {
  return path.endsWith(ending) ? path.slice(0, -ending.length) : path
}

export function namesMoved(absolute: string, moved: ReadonlyMap<string, string>): Named | null {
  const written = moved.get(absolute)
  if (written !== undefined) return { to: written, spell: (relative) => relative }
  for (const [js, ts] of TS_FOR_JS) {
    if (!absolute.endsWith(js)) continue
    const to = moved.get(`${without(absolute, js)}${ts}`)
    if (to !== undefined) return { to, spell: (relative) => `${without(relative, ts)}${js}` }
  }
  for (const ending of IMPLIED) {
    const to = moved.get(`${absolute}${ending}`)
    if (to !== undefined) return { to, spell: (relative) => without(relative, ending) }
  }
  for (const ending of IMPLIED) {
    const to = moved.get(`${absolute}/index${ending}`)
    if (to === undefined) continue
    const index = `/index${ending}`
    return {
      to,
      spell: (relative) =>
        relative.endsWith(index) ? without(relative, index) : without(relative, ending),
    }
  }
  return null
}

interface Holding {
  readonly files: ReadonlyMap<string, string>
  readonly dirs: ReadonlySet<string>
}

function holdingOf(root: string): Holding {
  const files = new Map<string, string>()
  const dirs = new Set<string>()
  let listed: readonly string[]
  try {
    listed = trackedIn(root)
  } catch {
    return { files, dirs }
  }
  for (const relPath of listed) {
    const absolute = normalizeAbsolute(`${root}/${relPath}`)
    files.set(absolute, absolute)
    let cut = absolute.lastIndexOf("/")
    while (cut > root.length) {
      const dir = absolute.slice(0, cut)
      if (dirs.has(dir)) break
      dirs.add(dir)
      cut = absolute.lastIndexOf("/", cut - 1)
    }
  }
  return { files, dirs }
}

function holds(holding: Holding, absolute: string): boolean {
  if (holding.dirs.has(absolute)) return true
  if (namesMoved(absolute, holding.files) !== null) return true
  for (const ending of BESIDE) {
    if (holding.files.has(`${absolute}${ending}`)) return true
    if (holding.files.has(`${absolute}/index${ending}`)) return true
  }
  return false
}

export type Held = (absolute: string) => boolean

export function heldIn(roots: Roots): Held {
  const known = new Map<string, Holding>()
  return (absolute) => {
    const at = locate(absolute, roots)
    if (at === null) return false
    const root = roots[at.repo]
    if (root === undefined) return false
    let holding = known.get(at.repo)
    if (holding === undefined) {
      holding = holdingOf(root)
      known.set(at.repo, holding)
    }
    return holds(holding, absolute)
  }
}
