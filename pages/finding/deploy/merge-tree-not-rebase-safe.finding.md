---
id: 3a5d31ba-365a-5a9e-8c41-54aad4fe2da9
slug: merge-tree-not-rebase-safe
page-type-slug: finding
title: "Merge tree not rebase safe"
domain-slug: domain/deploy
---

# Claim

`git merge-tree`, used to predict whether a branch will deploy cleanly, answers merge-conflict-freedom, not rebase-conflict-freedom, and `bun ops project deploy` enforces the latter via a rebase — so a branch whose final tree merges cleanly can still fail the deploy's sync step if an intermediate commit conflicts with where main has since moved, and nothing points an agent from the predictive question to the enforcing one.

# Evidence

From project #16210 (`deploy`, `someday_maybe`), no objective — captured 2026-07-25, moved from retired `notes` 2026-08-15. Found and diagnosed by aranya, filed under `deploy` as `[1/7] sync` is a CI/deploy surface there. Not urgent: no code is wrong.

Cost: one failed deploy (aranya, 2026-07-25 ~14:15Z, `project-15805`). She verified rebaseability with `git merge-tree --write-tree origin/main origin/project-15805` — rc=0, 0 CONFLICT, twice — then `ops project deploy` failed at `[1/7] sync`: `sync conflict: packages/infra/talos/src/nodes-main.ts`.

Mechanism: `sync.ts` declares itself "Fetch + rebase onto origin/main," replaying every commit against a main that had moved 493 commits. `merge-tree` merges endpoint trees; a rebase replays the path — a branch merging cleanly can still be unrebaseable if an intermediate commit conflicts. Her final tree was conflict-free; its first commit edited `nodes-main.ts`, since rewritten by main, so two commits conflicted on replay though the destination never did.

Ordinary care would not have caught this: the same instrument had already found and confirmed four real conflicts earlier. "Does this branch conflict with main?" has two answers — merge- and rebase-conflict-freedom — the tooling returns the easier one without saying which was asked.

Gap is guidance, not code: `bun ops project rebase` exists, uses the enforcing operation, and does not auto-abort — the command that predicts also fixes, but nothing points an agent from "will this conflict?" to it. Proposed: document the rule where a pre-deploy agent reads it, naming the operation.

Two corollaries, both aranya's: verify a replay-conflict resolution with the final diff plus a grep the peer's work survived (2 files/164 insertions, `gpuHardwareLabels` #16049 present x8) — a silent revert hides here; measure a branch against its merge-base, never the tip (a tip-diff misreported "1298 files changed, 63259 deletions" on a branch deleting nothing).
