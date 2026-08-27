---
id: 60e3577e-345d-552c-99e6-b5b37151e5f9
slug: gin-anchor-scope-gap
page-type-slug: finding
title: "Gin anchor scope gap"
domain-slug: domain/database
---

# Claim

`check-pages-gin-friendly-sql`'s anchors are incomplete against what `check-no-raw-pages-sql` sanctions: 8 live GIN-defeating predicates go unseen by the GIN check — 6 in a second, unanchored proc tree (`packages/infra/ci/proc/trigger-pipeline.ts` x5, `mark-pipeline-rebased.ts` x1), 2 in `access/src/` outside the GIN anchor's narrower `pg/` subdirectory — and the GIN check never reads `.sql` at all, unlike the sargable check, which scans the same snapshots as its drift-catcher.

# Evidence

Captured by aranya 2026-07-26 ~03:10Z, from #16317's surviving finding. That row's premise was dead — its three offending queries were hand-typed psql, not product code — but the hypothesis held, verified by running the real scanners, not reading them.

Gap: `check-pages-gin-friendly-sql`'s anchors are not complete against what `check-no-raw-pages-sql` sanctions.

Findings: 8 live GIN-defeating predicates the GIN check cannot see. Six sit in `packages/infra/ci/proc/` (`trigger-pipeline.ts` x5, `mark-pipeline-rebased.ts` x1), a second unanchored proc tree authoring deployed pages SQL. Two are children of `access/src/`, GIN-blind since that anchor covers only its `pg/` subdirectory though the sargable check scans all of `access/src/`. The GIN check also never reads `.sql`; the snapshots the sargable check scans as its drift-catcher go GIN-unscanned — the two sibling checks disagree on scope, neither saying which is wrong.

Precedent: `check-pages-slug-attribute-readers.ts` solved this class repo-wide for a sibling antipattern, after an anchored gate missed something real in the same directories.

Why not landed as one edit: the 8 findings are not one edit. Six sit in deployed CI proc SQL where the fix is plausibly a covering index, not a rewrite — migration plus index design on `public.pages`, used by every domain; widening first breaks CI fleet-wide. Sequence: characterize the 8, decide rewrite-vs-index each, remediate, widen last so the gate cannot reopen. The #16317 worker declined the one-line version, recorded so this isn't repeated blind.

Principle: an anchored gate's scope decays silently as the tree grows — a proc tree appeared and no gate noticed, since a gate reports nothing on files never pointed at. A green check doesn't distinguish no violations from not looking; a check should state its coverage, so collapse reads as a number changing, not silence.

Captured, never defined — moved off the retired `notes` attribute on 2026-08-15.
