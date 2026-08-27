---
id: 64f8a134-748a-5d6c-965f-fafe5af96f7b
page-type-slug: finding
title: "Census rung count matches no ladder"
domain-slug: domain/global
---

# Claim

`ops project sibling-dep-census` explains its class with a rung count matching neither child ladder. Its docblock says a child reaches `done` two rungs past `awaiting_manager_verification`; `CHILD_DEPLOY_LADDER` puts four between them and `CHILD_COMMIT_LADDER` one. The live `--help` drops the number and keeps the premise it supported — that a child reaches `done` only after its PARENT's deploy — which no commit-track child can, its ladder carrying no deploy rung.

# Evidence

Found while ingesting `dirty/code/packages-alanwalton-projects-core-docs-project-dependency-graph.md`, which carries the same sentence. `rg -n "two rungs past|rungs past"` over `packages/` returns one live hit, `packages/alanwalton/projects/cli/src/pure/sibling-dep-census.ts:7` — so that docblock and the quarantined document are the only two places the number stands, and cross-checking one against the other returns agreement.

The ladders disagree with both. `packages/alanwalton/projects/core/src/lib/project-ladders.ts:71` declares `CHILD_DEPLOY_LADDER` ending `verification_predeploy, awaiting_manager_verification, awaiting_manager_deployment, verification_postdeploy, documentation, done` — four rungs. Line 102 declares `CHILD_COMMIT_LADDER` ending `checks, awaiting_manager_verification, done` — one. `rg -n "^export const [A-Z_]*LADDER"` returns six ladder constants and these are the only child ladders, so no third reading makes it two.

The `--help` over-claim is separate, read off the live command: it states "a child reaches `done` only after its PARENT's deploy while its siblings are dispatched during the tree's implementation". `CHILD_COMMIT_LADDER`'s docblock at line 87 says the commit ladder is the deploy ladder less four rungs including the deploy-wait, and that "The commit IS where it goes live". I read the census population selection — `readTree`, `EdgeInput`, `EdgeReading` — and it filters on tree membership and target terminality, never on track, so commit-track edges are inside the scanned population.

The predicate is not implicated: the census ran here at 2026-08-08T08:58:39Z reporting `scanned-rows=40 compared-edges=1 obligations=0 coverage=complete`, exit 0.

I opened `pages/finding/project-track/move-to-help-names-two-ladders.finding.md`, the nearest neighbour: its claim is that `move-to --help` names two ladders where six are declared. Different surface and different error.
