---
id: 01a04640-5886-7000-a6f2-bcfa5fc15a97
page-type-slug: initiative
slug: astra-pages-system-ablation
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: astra-pages-system
---

# Intent

- The five zero-importer files are gone: `shared/pages-core/src/index.ts`, `shared/pages-core/src/view-state/index.ts`, `shared/pages-query/src/live-version.ts`, `shared/pages-ui-store/src/realtime/index.ts`, `shared/pages-ui/src/supabase/use-page-type-definitions.ts`.
- Nothing reaches the dead port 8787: `shared/pages-query/src/index.ts:7-8`, `readouts/ask-over-http.ts:7`, `tools/lib/ci-container-dispatcher/container-manifest.ts:28,96`.
- `infra/k8s/src/page-query-service/` and `pages/workflow-template/workflow-page-query-service.workflow-template.md` are gone with the service they deploy.
- `shared/pages-access/`'s thirteen stale documents are gone, describing a PostgREST the code no longer has.
- Nothing under `shared/` imports from `page/`. One reach remains, in the `shared/pages-access` barrel.
- `tools/lib/page-href.ts` is gone, byte-identical to `shared/pages-url/src/index.ts`.
- `tools/lib/page-standing.ts` and `tools/lib/pages-instant.ts` are gone, each read only by its own test.
- The eleven single-importer files in `tools/lib` are folded into their sole callers.
- One `page-seq` remains, not two.
- `page/page-type/unsplittable.ts` reads page types through `registryOf` rather than its own glob and frontmatter reader.
- `graph/frontmatter-at/` and `graph/page-index/` are gone, the page index doing its own caching.
- `tools/lib/page-expression.ts`, `page-expression-function.ts`, `page-expression-value.ts` and `tools/tests/formula-conformance/` are gone, replaced by `pages-system/formula/`.
- `shared/pages-core/src/formula/` is gone, replaced by `pages-system/formula/`.
- `tools/page/` is gone.
- `shared/status-bar-access` readings and `readouts/ask-over-http.ts` are gone.
- `shared/pages-query/` is gone, replaced by the pages system service.
- `shared/pages-access/` is gone.
- The `tools/lib/page-*` and `pages-*` cluster is gone.
- `page/` is gone.
- `shared/pages-core/` is gone.
- `shared/pages-ui/`, `shared/pages-ui-store/` and `shared/pages-url/` reach pages through `pages-system/` alone.

# Notes

Opened 2026-08-28 from a survey of every competing implementation, to hold the third intent of `astra-pages-system` — that no competing implementation of a pages system function exists. The order above is cheapest and safest first; each intent comes off as it is met.

**The trunk is `tools/lib/page-derive.ts`, and it is not on this list in order.** It is 328 lines with one export, the only consumer of the old expression evaluator, and what `tools/lib/page-query.ts` sits on. Replacing its core behind the existing `Deriver` interface — already types-only, in `page-derive-shape.ts` — turns the formula, `pages-query`, `pages-access` and `tools/lib` removals from rewrites into repoints. Everything else here is a leaf. Do that first whatever the order says.

**The query path and the page index never meet.** `page-derive.ts:160` scans the disk itself with `scanIn` + `textAt` + `valuesIn`, behind only a per-process TTL cache at `deriver-hold.ts:36`. It does not read `page/index/`. So the index is cheaper to change than its importer count suggests, and `page-derive.ts` is far more expensive.

**`shared/pages-access/` is the one most likely to go wrong quietly**, and it is already wrong in a way nobody saw. `file-read.ts:90-114` re-filters and re-sorts client-side, so a predicate spelled differently narrows to zero rather than refusing. `file-rows.ts` derives ids by hashing a path, so a moved path convention rewrites every row's id and reads as a successful write.

**`expression` is dropped three hops above `shared/pages-access/`.** `tools/lib/page-query-shape.ts:99-109` and `shared/pages-query/src/ask.ts:203-213` each build a property definition out of a hand-listed nine fields that do not include it, so `file-property-defs.ts:88-100` is the third link in a three-link break rather than the break. Nothing parse-fails and nothing falls back: `isComputed` reads false, so the value passes through untouched. The successor sets `expression` at all three points or at none. 15 of the 74 are written in the formula language of `{key}` references, all on the `name` property, so whatever starts parsing meets two languages in one field.

**The two `page-seq` forks differ in mechanism, not only root.** `tools/lib/page-seq.ts:84-123` spawns a subprocess through the edit gate; `page/page-seq.ts:79-91` lands in-process via `landFiles`. A survivor targeting the wrong repo reads a stale counter, and `takeSeqOf` then hands back a seq already spent — which creates a colliding page rather than refusing.

**Importer counts, for judging cost:** `page/` 388, `shared/pages-core/` 337, `shared/pages-ui/` 140, `shared/pages-access/` 156, `tools/lib/page-*` 119, `shared/pages-query/` 115.

**The last reach into `page/` is held by a barrel that cannot be edited.** `shared/pages-access/src/index.ts` is 110 lines, every one an `export … from`, so `export-declared-here` refuses all forty forwarded exports for any change to it. A removal is not judged for its body, so the shape is to delete the barrel rather than edit it — and no production code imports it, the package being consumed entirely through subpaths across 218 imports in 154 files. What holds it up is six test files that `mock.module("@shared/pages-access", …)`, and those mocks are live rather than inert. Each test awaits the barrel before mocking it, and Bun then writes the mock backwards through the barrel's re-export chain into the subpath modules the code under test imports. Measured both ways: with the barrel pre-loaded the stub is reached and no request leaves the process; without it the same test makes four live calls to port 8787 and one attempted write, retried four times. So deleting the barrel first turns five of these into tests that write production pages. The order is forced — convert the six onto subpath mocks, delete `shared/pages-access/src/test-support.ts`, then delete the barrel. All six are red on main meanwhile, at `export 'Page' not found in './types'` from `index.ts:93-101`.

**`shared/pages-access/src/test-support.ts` goes with the barrel.** It is a seventh barrel consumer, invisible to a search for the specifier because it imports `./index` by relative path, and its `makePagesAccessMock` defaults `getPage`, `getPages` and `getPagesForView` to the real network functions — a mock that hands back live callers unless every one is overridden.

**A file move can silently break a package build.** `shared/pages-access/tsconfig.json` carries a hand-maintained explicit `include` list. The gate's typecheck did not see it when `named-for` moved; `bunx tsc -b` inside the package did. It is the only such list in the repo.
