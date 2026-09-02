import type { Finding } from "../finding.page-type.ts"

export const opsWorktreeMergeRefusesEveryCallSinceWorktreeCheckWasRemoved = {
  id: "01a0614b-dae8-71e0-989d-8009d5bd1400",
  pageTypeSlug: "finding",
  slug: "ops-worktree-merge-refuses-every-call-since-worktree-check-was-removed",
  domainSlug: "domain/akasha-migration",
  claim:
    "`ops worktree merge` refuses every call, and its refusal names a command that is not there. It lands a worktree only where that worktree's page states `passed-commit`, and nothing has stamped that field since `ops worktree check` was deleted with the old check system. The refusal tells the reader to run `ops worktree check <name>` first, which is not one of the 311 commands the surface carries. `ops worktree start` writes a worktree page holding no such field, so no worktree ever acquires one.",
  evidence:
    '`merge.command.code.attachment.ts:90-100` reads `passed-commit` off the worktree page and refuses on both a null and a mismatch, telling the caller to run `ops worktree check` in each. `ops-cli/worktree/check` was deleted 2026-08-29 in `dff2ff75e2` ("unhook everything from the old check system"), whose message names it among two commands "whose whole subject was the old registry". Listing `commandSet()` gives 311 commands, of which the only ones under `worktree` are `abandon`, `merge` and `start`.\n\nThe field has no other writer. Grepping the checkout for `passed-commit` and `passedCommit` outside `.git/` and `dist/` returns three sites: the constant in `merge.command.code.attachment.ts:24`, and the property page `pages/page-property-definition/worktree-passed-commit.page-property-definition.md`, whose Design says it "is stamped only by a run that finished with no failures". `pageBody` at `start.command.code.attachment.ts:145-156` writes id, page-type-slug, seq, slug and seat-slug and nothing else.\n\nThe call taken: the command is left as it is and its document says so, at `pages/old-ops-command/ops-worktree-merge.old-ops-command.md`. Fixing the refusal text would need to know what replaces the stamp, and nothing here says. A worktree is landed by hand or given up with `ops worktree abandon`, which does work.',
} as const satisfies Finding
