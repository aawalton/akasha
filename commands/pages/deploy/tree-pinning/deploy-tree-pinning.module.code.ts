import { existsSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { GIT_AT, TREES } from "akasha/files/git-place/git-place.module.code.ts"
import { gitDirIn } from "akasha/git/dir/git-dir.module.code.ts"
import { told } from "akasha/git/running/git-running.module.code.ts"

export type Pinned = { readonly at: string } | { readonly refused: string }

export function treeIn(root: string, kind: string): string | null {
  const dir = gitDirIn(root)
  return dir === null ? null : join(dir, TREES, kind)
}

export function saidOfNoTree(kind: string, why: string): string {
  return `\`${kind}\` is built from a tree pinned at the commit, and ${why}`
}

export function movedTree(at: string, commit: string): boolean {
  return told(at, ["reset", "--hard", commit]) !== null
}

export function madeTree(root: string, at: string, commit: string): boolean {
  mkdirSync(dirname(at), { recursive: true })
  told(root, ["worktree", "prune"])
  return told(root, ["worktree", "add", "--detach", at, commit]) !== null
}

export function pinnedTree(root: string, kind: string, commit: string): Pinned {
  const at = treeIn(root, kind)
  if (at === null) return { refused: saidOfNoTree(kind, `git names no folder under ${root}`) }
  if (existsSync(join(at, GIT_AT))) {
    if (movedTree(at, commit)) return { at }
    return { refused: saidOfNoTree(kind, `the tree at ${at} would not move to ${commit}`) }
  }
  if (madeTree(root, at, commit)) return { at }
  return { refused: saidOfNoTree(kind, `no tree could be made at ${at} for ${commit}`) }
}
