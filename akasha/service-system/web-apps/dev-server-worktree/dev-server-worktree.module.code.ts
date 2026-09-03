import { DataError } from "@akasha/errors-core/exit-code"
import { changeBranchWorktree } from "@tools/lib/branch-worktree"

export function resolveWorktreePath(seq: number): string {
  const worktree = changeBranchWorktree(seq)
  if (!worktree.ok) throw new DataError(worktree.why)
  return worktree.path
}
