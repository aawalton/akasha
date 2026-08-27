import { onceInCall } from "../during-call/during-call.ts"
import { repoPlacings, scan, scanSpanning } from "./page-types.ts"
import { textAt } from "./text/text.ts"
import { REPOS } from "../repo/roots/roots.ts"
import type { Roots } from "./page.ts"

export type Open = (relPath: string) => string | null

export interface FileTree {
  readonly paths: (glob: string | readonly string[]) => readonly string[]
  readonly open: Open
  readonly repoOf: (slug: string) => string | null
  readonly root?: string
  readonly roots?: Roots
  readonly pending?: ReadonlySet<string>
}

// `paths` scans every repository, so a path it hands back may stand in any of
// them. Opening one against a single root was right only while one repository
// held the pages; the page types stand in akasha now, and a tree that lists a
// path it cannot then read reports an empty registry rather than a missing one.
function openAcross(roots: Roots): Open {
  return (relPath: string): string | null => {
    for (const repo of REPOS) {
      const root = roots[repo]
      if (root === undefined) continue
      const text = textAt(root, relPath)
      if (text !== null) return text
    }
    return null
  }
}

function builtDiskTree(roots: Roots): FileTree {
  const placed = repoPlacings(roots)
  return {
    root: roots["instructions"] ?? "",
    pending: new Set<string>(),
    paths: (glob) => scan(roots, typeof glob === "string" ? [glob] : glob),
    open: openAcross(roots),
    repoOf: (slug) => placed.get(slug) ?? null,
  }
}

export function diskFileTree(roots: Roots): FileTree {
  return onceInCall(`disk:${roots["instructions"] ?? ""}`, () => builtDiskTree(roots))
}

function builtSpanningTree(roots: Roots): FileTree {
  const placed = repoPlacings(roots)
  return {
    root: roots["instructions"] ?? "",
    roots,
    pending: new Set<string>(),
    paths: (glob) => scanSpanning(roots, typeof glob === "string" ? [glob] : glob),
    open: openAcross(roots),
    repoOf: (slug) => placed.get(slug) ?? null,
  }
}

export function spanningFileTree(roots: Roots): FileTree {
  return onceInCall(`spanning:${roots["instructions"] ?? ""}`, () => builtSpanningTree(roots))
}
