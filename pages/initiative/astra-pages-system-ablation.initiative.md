---
id: 01a04640-5886-7000-a6f2-bcfa5fc15a97
page-type-slug: initiative
slug: astra-pages-system-ablation
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: astra-pages-system
---

# Intent

- Nothing reaches the dead port 8787, including the sites that reach it by composing the origin rather than carrying the literal.
- The eleven single-importer files in `tools/lib` are folded into their sole callers.
- `page/page-type/unsplittable.ts` reads page types through `registryOf` rather than its own glob and frontmatter reader.
- `graph/frontmatter-at/` and `graph/page-index/` are gone, the page index doing its own caching.
- `shared/pages-core/src/formula/resolve.ts` is gone, with the twelve callers that reach a resolver whose corpus is empty.
- `tools/page/` is gone.
- `shared/status-bar-access` readings and `readouts/ask-over-http.ts` are gone.
- `shared/pages-query/` is gone, its reads answered by `pages-system/query/` in the calling process.
- `shared/pages-access/` is gone.
- The `tools/lib/page-*` and `pages-*` cluster is gone.
- `page/` is gone.
- `shared/pages-core/` is gone.
- `shared/pages-ui/`, `shared/pages-ui-store/` and `shared/pages-url/` reach pages through `pages-system/` alone.

# Notes

The order above is cheapest and safest first; each intent comes off as it is met.

**The trunk is `tools/lib/page-derive.ts`, and it is not on this list in order.** It is 347 lines with one export, the only consumer of the old expression evaluator, and what `tools/lib/page-query.ts` sits on. `Deriver` in `page-derive-shape.ts` is types-only, but replacing the core behind it is a rewrite and not a repoint: `pages-system/formula/` implements a different language, and zero of 74 declarations agree between the two evaluators. Sized at 55 programs. Do the trunk first whatever the order says.

**The query path reads the index, and the index is load-bearing rather than advisory.** `page-derive.ts` calls `scanIn`, which consults the index first at `page/page-types.ts:81-87`. Measured: 22ms through the index against 218ms forcing the disk walk over the same 721 paths. `page/index/scan/scan.ts:30-35` throws rather than falling back where a repo carries no mark, because an empty answer reads like a repo with no pages and would pass every check. So it is **more** expensive to change than its importer count suggests, and cannot be treated as separate from the query path.

**`shared/pages-access/` is the one most likely to go wrong quietly.** Two mechanisms had drifted from where they were sited: the client-side re-filter, and path-hashed ids.

**`expression` is dropped three hops above `shared/pages-access/`.** `tools/lib/page-query-shape.ts:99-109` and `shared/pages-query/src/ask.ts:203-213` each build a property definition from a hand-listed nine fields that omit it, so `file-property-defs.ts:88-100` is the third link rather than the break. Nothing parse-fails: `isComputed` reads false and the value passes through untouched. The successor sets `expression` at all three points or at none.

**A barrel cannot be edited, only deleted, and the tests mocking it are live.** `export-declared-here` refuses every forwarded export, so there is no repair path — but a removal is not judged for its body, so deleting works where editing does not. Before deleting one, find what mocks it: a test that awaits a barrel and calls `mock.module` on that specifier has Bun write the mock backwards through the re-export chain into the subpath modules the code under test imports, so the mock is live though nothing under test imports the barrel. Delete the barrel under such a test and its stub stops being reached — on `shared/pages-access` that turned one test into four live calls and an attempted write. Convert the tests onto subpath mocks first.

**A mock key bound to the real function is a trap, not a stub.** Bind every key a test does not exercise to a thrower naming the key.

**A file move can silently break a package build.** `shared/pages-access/tsconfig.json` hand-lists 98 cross-package paths and is not the only one — `shared/status-bar-access` lists 105, and nine app configs carry double-digit lists. Nothing on the write path reads them; only `bunx tsc -b` inside the package does.

**No service is needed for the reads.** `pages/` lands on a pod filesystem at its next start, so the six apps read pages from files rather than over a wire; the mechanism and its repair at `63911a51` are held on `astra-pages-system-service`.

**What `pages-system/query/` must gain before `shared/pages-query/` can go.** `askComposed` has 60 callers on `@shared/pages-query/ask`, and a third implementation at `tools/lib/page-query-client.ts:90` answers in process for 12 more. `ComposedQuery` (`shared/pages-query/src/ask.ts:33-44`) carries `sort-by`, `descending`, `limit`, `offset`, `count-by`, `function`, `target` and an object-predicate `where`; `Query` (`pages-system/query/query.ts:29-38`) now carries `pageType`, `expands`, `keys`, `where`, `sortBy`, `descending`, `limit`, `function` and `target`, with `where` a formula string. What is left of the difference is `offset`, `count-by` and an object-predicate `where`. `pages-system/query/` has zero production importers.
