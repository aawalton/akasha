---
id: 436f5edf-1d38-5d68-8332-36c181f987bb
page-type-slug: finding
title: "Dead rationale citations"
domain-slug: domain/global
---

# Claim

The rationale document every Temper addon runtime gate cites, `packages/temper/shared/build-deploy/checks/CLAUDE.md`, is not in the code repository, so each of those checks points its case for existing at nothing.

# Evidence

`ls packages/temper/shared/build-deploy/checks/` on main at 98d6426070 returns `dist`, `__fixtures__`, `package.json`, `src`, `tsconfig.json` and `tsconfig.tsbuildinfo` — no `CLAUDE.md`.

`packages/infra/checks/src/lib/check-configs-addons-runtime-gates.ts` registers the addon runtime gates, and its per-gate comments end "Source gate; rationale in packages/temper/shared/build-deploy/checks/CLAUDE.md" — `addon-cross-cluster-attach` at the registration I repaired under #18361, and `addon-base-filter-recall-unguarded` beside it.

Four entries in `packages/infra/checks/src/lib/prose-mechanism-restatement.ratchet.json` name anchors inside that same absent file: `#enumerateGlobalDependents`, `#evaluateEsoTypingsFreshness`, `#findControlNameGlobalCollisions` and `#findFingerprintResidue`. A ratchet holding entries that cite a document nobody can open cannot be measured down against it.

Found while reviewing `check-addon-cross-cluster-attach` for #18361: the review that preceded that project recorded the same absence, tracing the prose to the instructions repo's `dirty/` at 6a784e6ce and to a quarantine shelf removed whole on 2026-08-09. The citations in the code repository were not moved with it.
