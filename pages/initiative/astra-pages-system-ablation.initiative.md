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
- The eleven single-importer files in `tools/lib` are folded into their sole callers.
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

**The query path reads the index, and the index is load-bearing rather than advisory.** `page-derive.ts:160` calls `scanIn(root, [...], repo)` and `scanIn` consults the index first at `page/page-types.ts:81-87`; `scannedFromIndex` returns non-null whenever the repo is named, the globs end `*.{slug}.md`, and `indexReaches` holds — all true on this path. Measured over `pages/domain/**/*.domain.md`: 22ms through the index against 218ms forcing the disk walk, same 721 paths. `page/index/scan/scan.ts:30-35` throws rather than falling back when a repo carries no mark, because an empty answer reads like a repo with no pages and would pass every check. Only enumeration comes from the index — `textAt` and `valuesIn` are still per-file reads. `tools/lib/page-declared.ts:104-107` is a second index read on the same path. So the index is **more** expensive to change than its importer count suggests, not less, and nothing about it can be treated as a separate concern from the query path.

**Every single-page write rewrites all 18 MB of `pages.jsonl`.** `page/index/store/store.ts:387-397` sorts all 59,061 rows and writes the file whole, unconditionally, so the dominant cost of keeping the index current is fixed rather than proportional to what changed. Relation and identity shards are touched only where their entry set moved.

**The index data is not in the working tree.** `page/index/place/place.ts:52-59` puts it under the absolute git dir — `.git/pages/index` — so it is never committed and invisible to search. `page/index/` itself is 17 files of code, 100 KB.

**`shared/pages-access/` is the one most likely to go wrong quietly**, and it is already wrong in a way nobody saw. `file-read.ts:90-114` re-filters and re-sorts client-side, so a predicate spelled differently narrows to zero rather than refusing. `file-rows.ts` derives ids by hashing a path, so a moved path convention rewrites every row's id and reads as a successful write.

**`expression` is dropped three hops above `shared/pages-access/`.** `tools/lib/page-query-shape.ts:99-109` and `shared/pages-query/src/ask.ts:203-213` each build a property definition out of a hand-listed nine fields that do not include it, so `file-property-defs.ts:88-100` is the third link in a three-link break rather than the break. Nothing parse-fails and nothing falls back: `isComputed` reads false, so the value passes through untouched. The successor sets `expression` at all three points or at none. 15 of the 74 are written in the formula language of `{key}` references, all on the `name` property, so whatever starts parsing meets two languages in one field.

**Seq allocation stands above the gate, and `landFiles` stands below it.** `repo/land/land.ts:271` runs `akashaGated` from `land` alone, so a caller reaching `landFiles` directly moves a `next-seq` counter with nothing checking it. `tools/lib/page-seq.ts` takes every seq by spawning the edit command, which is why it is the one that stands; wherever it moves next, it moves above the gate.

**Importer counts, for judging cost:** `page/` 388, `shared/pages-core/` 337, `shared/pages-ui/` 140, `shared/pages-access/` 156, `tools/lib/page-*` 119, `shared/pages-query/` 115.

**A barrel cannot be edited, only deleted, and the tests mocking it are live.** `export-declared-here` refuses every forwarded export for any change to a barrel file, so there is no repair path at all — but a removal is not judged for its body, so deleting works where editing does not. Before deleting one, find what mocks it: a test that awaits a barrel and then calls `mock.module` on that specifier has Bun write the mock backwards through the re-export chain into the subpath modules the code under test imports, so the mock is live even though nothing under test imports the barrel. Delete the barrel under such a test and its stub stops being reached — measured on `shared/pages-access`, that turned one test into four live calls and an attempted write. Convert the tests onto subpath mocks first. `shared/pages-core/src/index.ts` is the next barrel on this list.

**A mock key bound to the real function is a trap, not a stub.** `shared/pages-access/src/test-support.ts` defaulted `getPage`, `getPages` and `getPagesForView` to the live network callers unless every one was overridden. Where a mock must answer a module's whole export surface, bind the keys the test does not exercise to a thrower naming the key, so reaching one fails loudly rather than going to the network.

**A file move can silently break a package build.** `shared/pages-access/tsconfig.json` carries a hand-maintained explicit `include` list. The gate's typecheck did not see it when `named-for` moved; `bunx tsc -b` inside the package did. It is the only such list in the repo.
