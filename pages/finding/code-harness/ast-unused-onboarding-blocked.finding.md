---
id: a92b54f1-bc16-567f-9a4a-c6791772c106
slug: ast-unused-onboarding-blocked
page-type-slug: finding
title: "Ast unused onboarding blocked"
domain-slug: domain/global
---

# Claim

Onboarding the currently-undiscovered workspaces into ast-unused's discovery list produces 2317 unused-export findings inside packages that are already curated and green today, and that count is invariant to every entry-glob and ignore-glob choice — it is caused by those workspaces joining the file-to-workspace partition at all, not by glob configuration or by newcomer-export auditing.

# Evidence

Project #16403 (status someday_maybe, domain code-harness), follow-up to #16378, which built the coverage gate but deliberately did not onboard the backlog.

Measured three ways on fresh graphs (no cache confound — getOrBuildGraph skips cache when treeSha is undefined): default-globs -> 4467 (2150 newcomers + 2317 curated); consumer-only (entries:[], ignore:['**/*']) -> 2317; broad-entry consumer-only -> 2317.

Three hypotheses tested and disproved: (1) lost entry-roots — broad-entry raised entries to 12611, above the 8676 baseline, count stayed 2317; (2) newcomer exports audited — consumer-only suppresses newcomer auditing entirely, count stayed 2317; (3) path-prefix collision in the partition — only 18 of 209 newly-added roots nest inside a curated root, 0 are ancestors, and the three loudest offenders (683 findings) have zero new descendants and zero new ancestors. Root cause not found; start from ast-unused-build-graph.ts:114-115 and :131 (tsconfig-include-only recovery branch) and the producer's workspaceRoot attribution.

Blast radius the fix addresses: 64 (package, name) export pairs across 19 packages are "invisible-only" — their only static importer in the 378-workspace repo lives inside a workspace the checker cannot see. Worst: @automation/orchestrator 9/9, @infra/tests 5/5, @infra/ci-merge-queue-coordinator 9/10, @agents/shared 15/37, @temper/game-items-rules-eval 6/9 (lower bound, regex scan, misses transitive re-exports).

Definition of done as scoped: pendingCuration reaches 0 and PENDING_CURATION_CEILING in packages/infra/checks/src/lib/ast-unused-coverage.ts is lowered to 0 alongside it; the ceiling may only ever decrease.

Also noted, not investigated: ast-unused.config.json's entry for packages/temper/shared/build-deploy/tstl/lualib may be inert — lualib has no package.json so is never a declared workspace, so its '!'-suffix globs may never take effect. #16378 deliberately spared it rather than remove it blind.
