---
id: acf92c19-751a-5170-8c3d-8fb82941c6a0
page-type-slug: finding
title: "Checks docs citations dangling"
domain-slug: repo/code-repo
---

# Claim

Thirty-six tracked source files under `packages/` cite documents at `packages/infra/checks/docs/`, a directory that no longer exists in the code repo. Every one of those citations resolves to nothing, and nothing in the tree reports it.

# Evidence

Found while ingesting `dirty/knowledge/both-verdict-coverage.md`, whose own `code-path:` named one of these documents.

`git ls-files packages/infra/checks/docs/` returns zero rows: the directory is gone from tracking entirely, not thinned. `git grep -l "packages/infra/checks/docs/" -- 'packages/**/*.ts'` returns 36 files, carrying 39 citation lines between them and naming 12 distinct documents.

THE DOCUMENTS ARE GONE, and this is the correction that changes what the finding is about. When this was filed, eleven of the twelve stood in the instructions repo under quarantine at `dirty/code/`, so the citations were stale rather than wrong — a real document at an address that had moved. `e4992998f` on 2026-08-09 then removed that shelf whole, 826 files and 65,584 deletions, and `git ls-tree HEAD dirty/` now returns nothing. So the citations no longer name a document a reader can reach by any route. Re-read against `main` on 2026-08-10: 35 citing files, and `git ls-files packages/infra/checks/docs/` still returns zero.

The citing lines are load-bearing prose rather than decoration. `check-no-enum.ts:9` cites `typescript-unsoundness-vectors.md` "vector 4" and `check-no-void-return.ts:12` cites "vector 12" — a numbered row in a table nobody can now open. `check-client-env-inlined.ts:10` cites `app-capacitor-parity.md` § "Rung 1". `ephemeral.ts:22` names `work-surfacing-coverage.md` as "the claim to trust".

A second spelling the path search does not catch: `guard-reach.ts:17` cites by bare name — "`guard-reach.md` names the specimen". Citations written that way are not in the count, so 36 is a floor rather than the population.

Nothing measures this. The citations sit in comments, so the typecheck is green and every check passes; the reader who follows one is the instrument.

Horizon: first read against `~/code` at `main` on 2026-08-07, when the finding predicted `dirty/` would be removed and the eleven copies would stop being a durable address. That happened on 2026-08-09.
