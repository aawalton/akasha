import { onceInCall } from "../during-call/during-call.ts"
import { repoPlacings, scan } from "./page-types.ts"
import { textAt } from "./text/text.ts"
import type { Roots } from "./page.ts"

export type Open = (relPath: string) => string | null

export interface FileTree {
  readonly paths: (glob: string | readonly string[]) => readonly string[]
  readonly open: Open
  readonly repoOf: (slug: string) => string | null
  readonly root?: string
  readonly pending?: ReadonlySet<string>
}

function builtDiskTree(roots: Roots): FileTree {
  const placed = repoPlacings(roots)
  const root = roots["instructions"] ?? ""
  return {
    root,
    pending: new Set<string>(),
    paths: (glob) => scan(roots, typeof glob === "string" ? [glob] : glob),
    open: (relPath) => textAt(root, relPath),
    repoOf: (slug) => placed.get(slug) ?? null,
  }
}

export function diskFileTree(roots: Roots): FileTree {
  return onceInCall(`disk:${roots["instructions"] ?? ""}`, () => builtDiskTree(roots))
}
