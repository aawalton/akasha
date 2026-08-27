---
id: 0c024f7a-3ea6-5d86-b02e-df9c2b1c0f84
slug: tenant-scope-class-unmeasured
page-type-slug: finding
title: "Tenant scope class unmeasured"
domain-slug: domain/pages-system
---

# Claim

No check enforces tenant scope on the rows a `public.pages` read returns, and the imbalance is the estate's rather than any one call site's. Measured 2026-08-07: 264 non-test files call `getPages(` against 11 using `getOwnerScopedPages`, and exactly one file under `packages/infra/checks/src/checks/` mentions `getOwnerScopedPages` or `tenant` at all. Three standing findings record instances of the class; nothing measures the class, so each is repaired alone while the rest stay open.

# Evidence

Measured 2026-08-07 against `~/code`, counting FILES rather than call sites. The unit is stated because a quarantined document counted call sites, and the two are not comparable.

`rg -c` over `*.ts` and `*.tsx`, excluding `*.test.ts`, `dist`, `.git` and `node_modules`: `getPages\(` matches 264 files, `getOwnerScopedPages` matches 11. `rg -l "getOwnerScopedPages|tenant"` over `packages/infra/checks/src/checks/` returns 1 file. Listing that folder for a name containing `tenant` or `owner` returns nothing, so no check is named for the concern either.

The denominator is stated because a bare zero here is indistinguishable from a search that ran over the wrong corpus, which is the failure this measurement is most exposed to.

Three findings already stand on instances of this class and none measures it: `page-list-unscoped-by-owner` (`ops page list` returns every tenant's rows), `persona-enumeration-unscoped-by-owner` (`listPersonaTargets` unscoped, 42 rows for 41 slugs), and `worker-read-scope-ungated` (nine pg-surface loaders take an optional `pipelineIdScope` nothing verifies), all under `findings/pages-system/`. Each names one reader. What none carries is the population, which is what says whether fixing three readers closes the class or leaves 250 open.

A quarantined document made the same structural claim on 2026-07-28 and rested it on a rule stated in `page-tenant-scoping.md`. That document is not live either — it sits under `dirty/maybe-keep/knowledge/` beside a `page-tenant-scoping-composed.md` — so this is filed on the measurement alone rather than on a rule the measurement contradicts. Its per-call-site figures are not restated here; only the file counts above were taken by me.
