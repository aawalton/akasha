---
id: 7ac7a797-16b5-58d9-bf63-8b7ea5be8709
slug: summed-floor-hides-empty-page-type
page-type-slug: finding
title: "Summed floor hides empty page type"
domain-slug: domain/instrument-population
---

# Claim

A denominator floor summed across two independently-sourced page types cannot see one type empty out, and `framework-doc` is empty today while the floor reads satisfied.

# Evidence

Measured 2026-08-07 against `~/code` at `ecf5f9518f` and the live database. A quarantined document reported this on 2026-07-30 against a check that no longer exists; the carrier it named does exist, so I re-ran it here.

`DOCTRINE_PAGE_TYPES` at `packages/infra/checks/src/lib/citation-carriers.ts:59` is `["persona", "framework-doc"]`. `readPageCarrier` loops both types into one `documents` array, sets `const denominator = documents.length`, and returns `unreachable` only where that sum is 0, with the reason *"read 0 rows across persona, framework-doc — a doctrine corpus is never empty"*. The floor is levied on the sum.

Row counts today, from `public.pages` where `deleted_at is null`: `persona` **42**, `framework-doc` **0**. So one of the two declared halves of the corpus is absent, the other alone clears the floor, and the state reported is `evaluated` with a denominator of 42 — a line that reads as a corpus examined rather than as a corpus half of which does not exist.

The same shape stands a second time at `packages/infra/checks/src/lib/deletion-residue-scans.ts:234-255`: `pageScanner` loops the same constant, counts `examined` across both, and fails only at `examined === 0`.

Consumers are `packages/infra/checks/src/audits/doctrine-path-citations.ts:143` and `packages/infra/checks/src/checks/deletion-residue.ts`. Neither is registered — `ops enforcement list` reports 234 mechanisms across check-step, syntax-scanner, ast-grep-rule and hook, and names neither — so what this costs is a reading rather than a gate.

A per-type floor would fire. The summed one cannot, and cannot for any multi-source carrier where one source is populated.

Not established: whether `framework-doc` ever carried rows, or when it emptied. I read the counts, not their history.
