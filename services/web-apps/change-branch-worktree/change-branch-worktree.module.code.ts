import { existsSync } from "node:fs"
import { join } from "node:path"

const WORKTREES = "worktrees"

const CHANGE = "change"

export function changeBranchName(seq: number): string {
  return `${CHANGE}-${seq}`
}

export function branchWorktreePath(name: string): string {
  return join(process.env.HOME ?? "", WORKTREES, name)
}

export type BranchWorktree =
  | { readonly ok: true; readonly name: string; readonly path: string }
  | { readonly ok: false; readonly why: string }

export function changeBranchWorktree(seq: number): BranchWorktree {
  const name = changeBranchName(seq)
  const stated = process.env.WORKTREE_DIR
  if (stated !== undefined && stated !== "") {
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
