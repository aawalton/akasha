import { DataError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { changeBranchWorktree } from "akasha/infrastructure/services/web-apps/change-branch-worktree/change-branch-worktree.module.code.ts"

export function resolveWorktreePath(seq: number): string {
  const worktree = changeBranchWorktree(seq)
  if (!worktree.ok) throw new DataError(worktree.why)
  return worktree.path
}
