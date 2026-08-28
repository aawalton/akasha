---
id: 01a04666-b699-7cdc-9286-a6ffe53b3f7e
page-type-slug: initiative
slug: astra-pages-system-core
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: astra-pages-system
---

# Intent

- `pages-system/` answers what a caller needs of a page index, so nothing reaches `page/index/` to get it.
- `pages-system/` answers what a caller needs of caching, so nothing reaches `tools/lib/deriver-hold.ts` to get it.
- A page the store answers says which repository and path it came from.
- A query over an expanded set of page types can ask for a subset of keys.
- A page type's globs, property registry and extends chain are resolved when a caller first asks for that page type, not when a deriver is built.
- A deriver reading rows answers something re-iterable, and holds no row it has handed back.

# Notes

Opened 2026-08-28 to hold the positive half of the parent's first intent. `astra-pages-system-ablation` removes the old; this builds what has to exist before the old can go, and the Ablation rule says that order is not optional.

**Indexing and caching are wholly absent from the clean core.** `page/index/` holds the index and `during-call/during-call.ts` with `tools/lib/deriver-hold.ts` holds the caching, and neither has a counterpart under `pages-system/`. Every other piece of the parent's first intent has somewhere to live; these two have nowhere.

**The purity split is what makes this hard and is not negotiable.** `formula/`, `page-type/`, `name/` and `query/` do no I/O at all. `store/` is the one impure seam. An index and a cache are both about I/O and about what may be held across it, so both press directly on the line, and the question of which side each falls on is the design rather than a detail of it.

**`runQuery` accepts only a `Checked` that `checkQuery` produced, and that class is not exported.** Nothing added here may widen that, because it is the whole reason an unchecked query cannot reach the store.

**The first real caller is the editor's domain tree**, which reads 45 page types beneath one supertype. It cannot move off `page-query` until the store says `<repo>:<relPath>` for a page and a query can project keys across an expanded set — those are the third and fourth intents here, and they are wanted by a caller that exists rather than by a case that might.

**Two measurements bound the caching intent.** 45 page types in one call build 45 separate derivers because `carriesFor` puts the page type into the cache key: 2138ms of build against 1105ms of actual work. One shared deriver does the same build in 275ms. Resolving a page type on first ask rather than at build makes the one-kind case cost one kind and the 45-kind case cost 45, which is what both callers wanted and neither could have.

**`log-line` is the shape that breaks things.** 3.6M rows, and the old deriver materialised them into an array at 6,924 MB retained for the process lifetime. Streaming holds flat at about 500 MB from the first half-million rows to the last. The property that matters is that the working set does not grow with rows read.

**A generator satisfies `Iterable` and is exhausted after one pass.** A caller that loops twice over a once-iterable value sees nothing the second time and reads it as an empty answer rather than an error, so whatever answers rows must give a fresh walk on each `[Symbol.iterator]`.

**Two files are at their length ceiling**: `pages-system/store/store.ts` at 14,198 bytes and `page/index/build.ts` at 14,878, against 15,000. The next thing either needs goes in a new file.
