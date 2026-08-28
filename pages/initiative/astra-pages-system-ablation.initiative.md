---
id: 01a04640-5886-7000-a6f2-bcfa5fc15a97
page-type-slug: initiative
slug: astra-pages-system-ablation
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: astra-pages-system
---

# Intent

- `tools/lib/page-id.ts` is gone, its one line naming two exports that do not exist.
- The seven zero-importer files are gone: `shared/pages-core/src/index.ts`, `shared/pages-core/src/view-state/index.ts`, `shared/pages-query/src/live-version.ts`, `shared/pages-access/src/answer-write.ts`, `shared/pages-access/src/test-support.ts`, `shared/pages-ui-store/src/realtime/index.ts`, `shared/pages-ui/src/supabase/use-page-type-definitions.ts`.
- Nothing reaches the dead port 8787: `shared/pages-query/src/index.ts:7-8`, `readouts/ask-over-http.ts:7`, `tools/lib/ci-container-dispatcher/container-manifest.ts:28,96`.
- `infra/k8s/src/page-query-service/` and `pages/workflow-template/workflow-page-query-service.workflow-template.md` are gone with the service they deploy.
- `shared/pages-access/`'s thirteen stale documents are gone, describing a PostgREST the code no longer has.
- Nothing under `shared/` imports from `page/`.
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

**`shared/pages-access/` is the one most likely to go wrong quietly**, and it is already wrong in a way nobody saw. `file-property-defs.ts:88-100` never sets `expression`, so all 74 computed properties parse-fail and fall back to text. `file-read.ts:90-114` re-filters and re-sorts client-side, so a predicate spelled differently narrows to zero rather than refusing. `file-rows.ts` derives ids by hashing a path, so a moved path convention rewrites every row's id and reads as a successful write.

**The two `page-seq` forks differ in mechanism, not only root.** `tools/lib/page-seq.ts:84-123` spawns a subprocess through the edit gate; `page/page-seq.ts:79-91` lands in-process via `landFiles`. A survivor targeting the wrong repo reads a stale counter, and `takeSeqOf` then hands back a seq already spent — which creates a colliding page rather than refusing.

**Importer counts, for judging cost:** `page/` 388, `shared/pages-core/` 337, `shared/pages-ui/` 140, `shared/pages-access/` 156, `tools/lib/page-*` 119, `shared/pages-query/` 115.
