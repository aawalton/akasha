---
id: 6509d3b6-87eb-593d-83ec-92046feed0ae
slug: child-rows-keep-orphaned-shas
page-type-slug: finding
title: "Child rows keep orphaned shas"
domain-slug: barred-meaning/project
---

# Claim

The landed-commit-hash reconciliation runs for one seq — the deployed row's — so every child of a deployed parent keeps the SHAs it recorded at hand-back, which the rebases and the merge queue have since rewritten. A child owns no branch and no deploy of its own, so its work lands on its parent's deploy and nothing reconciles its row.

# Evidence

THE SCOPE IS ONE ROW, READ IN THE SOURCE. `packages/alanwalton/projects/cli/src/lib/rewrite-landed-commit-hashes.ts:43` takes `{ seq, ownCommitCount, landedSha, gitRepoDir }` and ends at `rewriteCommitHashes(seq, landedHashes)` at line 76. Its one caller is `move-to-deploy-land.ts:172`, which passes the deployed row's own `seq`. Nothing in that file or in `move-to-deploy-reconcile.ts` walks the parent's children.

THE ESTATE DOES RECONCILE COMMIT HASHES — that is what makes this narrow and fixable rather than absent. Four modules sit beside each other: `rewrite-landed-commit-hashes.ts`, `reconcile-rebased-commit-hashes.ts`, `resolve-post-rebase-commit-hashes.ts`, `reconcile-landed-resume-commit-hashes.ts`. The machinery exists across both a rebase and a land; its reach is the defect, and the shape of the fix is a scope change rather than new machinery.

WHY A CHILD IS ALWAYS EXPOSED. A child owns no branch, which `move-to.ts:87` states of its own gate — "the verdict is resolved on the row's own project-{seq} branch, a child owns none, and a child hands back at awaiting_manager_verification instead". So a child's commits reach main on its parent's deploy, and the reconciliation that deploy runs updates only the row it was invoked with.

OBSERVED. After `ops project deploy --seq 16537` landed at `b24fd9ee2192bbfc4072e20c70332b9b89569fd0` on 2026-07-27, #16537 held all five landed SHAs, reconciled by the deploy, while #16643 and #16644 still held the SHAs recorded at hand-back — every one rewritten by two rebases and then by the merge queue. They were set by hand.

WHY IT STAYS QUIET. The gate that reads the field checks existence, not reachability, and a rebase can un-reach a SHA without un-recording it, so an orphaned value passes every check that looks at it.

NOT MEASURED. How many child rows currently carry unreachable SHAs. That is one pass over the rows against `git merge-base --is-ancestor`, and it would turn this from a mechanism into a population.
