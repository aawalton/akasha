import { existsSync } from "node:fs"
import { join } from "node:path"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

const WORKTREES = "worktrees"

const CHANGE = "change"

function changeBranchName(seq: number): string {
  return `${CHANGE}-${seq}`
}

function branchWorktreePath(name: string): string {
  return join(optionalEnv("HOME") ?? "", WORKTREES, name)
}

export type BranchWorktree =
  | { readonly ok: true; readonly name: string; readonly path: string }
  | { readonly ok: false; readonly why: string }

export function changeBranchWorktree(seq: number): BranchWorktree {
  const name = changeBranchName(seq)
  const stated = optionalEnv("WORKTREE_DIR")
  if (stated !== undefined) {
    if (!existsSync(stated)) {
      return {
        ok: false,
        why: `WORKTREE_DIR names ${stated}, which is not on disk, so there is nowhere to make the change`,
      }
    }
    return { ok: true, name, path: stated }
  }
  const path = branchWorktreePath(name)
  if (!existsSync(path)) {
    return {
      ok: false,
      why:
        `--seq ${seq} names branch ${name}, whose worktree ${path} is not on disk, so there is ` +
        "nowhere to make the change. Nothing makes a change- worktree any more, so point " +
        "WORKTREE_DIR at a checkout of your own.",
    }
  }
  return { ok: true, name, path }
}
