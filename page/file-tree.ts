import { onceInCall } from "../during-call/during-call.ts"
import { repoPlacings, scanSpanning } from "./page-types.ts"
import { textAt } from "./text/text.ts"
import { AKASHA, REPOS, rootFor } from "../repo/roots/roots.ts"
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
    root: rootFor(roots, AKASHA),
    pending: new Set<string>(),
    paths: (glob) => scanSpanning(roots, typeof glob === "string" ? [glob] : glob),
    open: openAcross(roots),
    repoOf: (slug) => placed.get(slug) ?? null,
  }
}

export function rootsKey(roots: Roots): string {
  return REPOS.map((repo) => roots[repo] ?? "").join("|")
}

export function diskFileTree(roots: Roots): FileTree {
  return onceInCall(`disk:${rootsKey(roots)}`, () => builtDiskTree(roots))
}

function builtSpanningTree(roots: Roots): FileTree {
  const placed = repoPlacings(roots)
  return {
    root: rootFor(roots, AKASHA),
    roots,
    pending: new Set<string>(),
    paths: (glob) => scanSpanning(roots, typeof glob === "string" ? [glob] : glob),
    open: openAcross(roots),
    repoOf: (slug) => placed.get(slug) ?? null,
  }
}

export function spanningFileTree(roots: Roots): FileTree {
  return onceInCall(`spanning:${rootsKey(roots)}`, () => builtSpanningTree(roots))
}
