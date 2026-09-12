import { existsSync } from "node:fs"
import { join } from "node:path"
import { isFolder } from "akasha/commands/modules/folder-clearing/folder-clearing.module.code.ts"
import type { Bodied } from "akasha/commands/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { gitIgnoring } from "akasha/git/pathspec/git-pathspec.module.code.ts"

export type Parted = {
  readonly committing: readonly Bodied[]
  readonly uncommitted: readonly Bodied[]
}

export function heldBack(root: string, changed: readonly Bodied[]): Parted {
  const ignored = gitIgnoring(
    root,
    changed.map((one) => one.path)
  )
  if (ignored === null || ignored.size === 0) return { committing: changed, uncommitted: [] }
  return {
    committing: changed.filter((one) => !ignored.has(one.path)),
    uncommitted: changed.filter((one) => ignored.has(one.path)),
  }
}

export function asideFrom(root: string, changed: readonly Bodied[]): ReadonlySet<string> {
  const held = changed.filter(
    (one) => one.body === null && existsSync(join(root, one.path)) && !isFolder(root, one.path)
  )
  return new Set(held.map((one) => one.path))
}
