---
id: 3c586390-9cf9-5325-b91b-409f8a1a0814
page-type-slug: finding
title: "Check file set from stale origin main"
domain-slug: domain/global
---

# Claim

`packages/infra/ci/cli/src/lib/checks.ts` computes the changed-file set (twice, at lines 45 and 231) as `git diff origin/main...HEAD --name-only` with no fetch, so `runPackageChecks` can run per-package checks over a file set roughly ten-fold wider than the branch's real diff when the local `origin/main` ref lags; how many other sites share this defect is unmeasured.

# Evidence

From project #17041 (status `someday_maybe`, `live-on: deploy`, domain `code-check`), captured and never defined.

The defect: `packages/infra/ci/cli/src/lib/checks.ts` computes the changed-file set twice (:45, :231), each as `git diff origin/main...HEAD --name-only`, with no fetch and no statement of which vintage of `origin/main` it read. `runPackageChecks` is what `bun ops project check` runs its per-package checks over.

Tested, not reasoned: a three-dot diff takes the merge base, so a lagging ref looks like it should leave the fork point unchanged. It does not, the fork point moves with the ref. Measured by project-16924: merge-base(current origin/main, HEAD) = d131f0398d -> 55 files; merge-base(main@200-behind, HEAD) = da578e0909 -> 542 files, a ten-fold wider set.

Already paid for once: #16937's specimen is a `project check` failing on a file its branch never touched, 118 commits behind, diagnosed as a liveness defect until now connected to branch age.

Not manifesting today, by luck: `origin/main` was byte-identical to the remote tip via `ls-remote`, because something else fetches often, not because these sites ensure it. Worktrees share one `origin/main` in the common git dir, so this is per-checkout staleness.

Nearby precedent: `pipeline/redeploy.ts:155` and `pipeline/reset-internals/discover-canonical-workers.ts:53` fetch before comparing; these two depart from it.

Population unmeasured: a crude non-test `.ts` search for `origin/main` with no fetch in-file returns ~85 files, not usable as-is — it includes `dist/` declarations and pure deciders needing a pure/effectful split the search cannot make. That count decides the remedy: two sites take an instance fix, twenty take a shared reader.

Still needed: fetch-before-read vs state-the-vintage-read (different guarantees); whether any site wants the local ref's vintage; how this divides against #16937's universal.
