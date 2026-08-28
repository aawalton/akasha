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
- A deriver reading rows holds no row it has handed back, and `d.rows("log-line")` costs what its live set costs.

# Notes

This holds the positive half of the parent's first intent. `astra-pages-system-ablation` removes the old; this builds what must exist before the old can go, and the Ablation rule makes that order mandatory.

**The index answers three questions, not one, and the clean core has only the cheapest.** Enumeration — which files match these page-type globs — is answered under `pages-system/read/files.ts`, where `pagesUnder` walks once and keys by kind, so a caller asking about many kinds pays one walk rather than one per glob. Neither of the other two has a counterpart: **forward identity resolution**, which page carries this id, slug, name, seq, extension, ending or heading, and **the reverse relation map**, which pages point a given relation at a given target.

**The reverse map is why the index exists.** Answering it from files means parsing every page's frontmatter and resolving each relation value through the identity map first. Measured: 0.01 ms from the index against 485 ms and 418 MB of text merely to read the 59,061 akasha page files with a warm cache, before any parsing. `relation/` is 9,694 of the index's 10,729 files. Forward identity resolution costs the same walk and is global: it resolves across page types, so no local read shortcuts it.

**Three things not to carry across.** `pageTargetOf` and `fileTargetOf` are string formatting. `relations.json` is derived and could be recomputed in the read that loads declarations. `builtFrom`, `indexReaches` and `indexFreshFor` guard staleness — the price of the index being a separate artifact.

**The purity split is what makes this hard and is not negotiable.** `formula/`, `page-type/`, `name/` and `query/` do no I/O at all; `read/` is the one impure seam. An index and a cache are both about I/O and what may be held across it, so which side each falls on is the design rather than a detail of it.

**`runQuery` accepts only a `Checked` that `checkQuery` produced, and that class is not exported.** Nothing added here may widen that: it is the whole reason an unchecked query cannot reach the store.

**The first real caller is the editor's domain tree**, which reads 45 page types beneath one supertype.

**What tied a deriver to one page type was the narrow, and nothing else.** `narrowing` returned the key set only for the matching kind and `null` otherwise, and `null` means derive every key, so a deriver keyed without its kind silently un-narrowed the other 44. A narrow now names keys and never a page type.

**`log-line` is the shape that breaks things.** 3.6M rows, and the old deriver materialised them into an array at 6,924 MB. Streaming holds flat at about 500 MB. The property that matters is that the working set does not grow with rows read.

**A generator satisfies `Iterable` and is exhausted after one pass**, so a caller looping twice reads the second pass as empty rather than as an error; whatever answers rows gives a fresh walk on each `[Symbol.iterator]`.

**`link/link.ts` does not come over on its own.** It imports `proseOnly` from `page/markdown/markdown.ts`, which `composite: true` refuses across packages, and a second copy of that module stands at `tools/lib/markdown.ts`. Its external callers are three, not one.

**Answer Or Refuse stands on `pages/domain/pages-system.domain.md`, and its siting is an open question for Alan.** Three of the nine instances it came off sit under `pages-system` and the rest do not — `test` sits under `domain/instrument-kind` and `test-file` under `file-kind-domain/file-kind-ts`, siblings rather than descendants. Either it is cited from its own three, with the rest as corroboration, or it moves to a craft domain wide enough to reach all nine, at what a line on a widely-read domain costs every reader at every boot. The answer to Dilution is that the corpus arrived at this rule sixty-six times before any page wrote it down: the phrase two checks use, "reads exactly like", stands 66 times across eight top-level areas, 49 of them in `pages/`, canonically on `pages/refusal/command-surface-unread.refusal.md:14`.

**The question owed to Alan and never asked**, refused by an outage rather than declined: whether Answer Or Refuse moves to `code-quality`, where `Real Path` and `Bounded Wait` already do the same work, cross-domain and not Global. The wrinkle goes with it — `code-quality`'s Definition is about how a body of code is organized, and none of its three rules is.

**A second rule is inside this set and must not be folded into the first.** `seatWarrantsFor` against `subagentWarrantsFor` and against `seatWarrantsWithDefaults`, and `replacedAt` resolving the writer's own page where `tools/lib/seat-record.ts:19` resolves the seat's: not an absence read as an emptiness, but one question with two spellings that drift apart. Folding it in would make the wider rule look like it covers ground it does not.
