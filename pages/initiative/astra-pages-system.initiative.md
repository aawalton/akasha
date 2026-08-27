---
id: 1e0c0902-1f88-4d18-83c5-9d2c2ff07386
page-type-slug: initiative
slug: astra-pages-system
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: aine-global
---

# Intent

- A page's name is a computed property, worked out by the formula language.
- No code decides a page's name.
- A page's name is unique among the pages of its page type.
- `named-for` and `unique-key` no longer exist.
- A page can live where its domain lives, or under a folder named for its page type.
- No page lands carrying a name another page of its type already has.
- A page index file is named for one page.
- Each line of a page index file is one page location.
- Every file in the page index is an index file.
- The page index is made right by reconciling it, never by writing it again from nothing.
- No page index update drops what another wrote.
- No reader sees a half-written page index file.
- A reader trusts the page index without checking it.
- The page index is checked against the pages every day.
- Every file specific to the pages system domain lives under `pages-system/`.
- All users of the pages system call into `pages-system/`.
- Every entry point into the pages system is one Alan approved.

# Notes

Opened 2026-08-27. Intents are settled with Alan one at a time and written here as each is approved.

Settled with Alan on 2026-08-27, before any intent was written:

**The line between clean and unclean is a root `akasha/pages-system/` folder**, and Alan approves each entry point that moves through the door. Living in the folder is not by itself what makes a piece clean.

**The page index is a derived cache, never authoritative.** It can always be rebuilt from the pages, so it may be eventually consistent, and a torn write is a fault to detect and repair rather than one to prevent. A miss must never render as an absence.

**SQLite is refused deliberately.** Its decisive advantage was transactions, which a derived cache does not need. What is left is opacity to ripgrep and a schema to migrate, against File First and Search First.

**The index is one file per handle with a one-line body** — not sha1 buckets, and not the destination encoded in the filename. Measured on btrfs: 857 bytes for a one-line file against 1,007 for an empty file with a long name, because a filename is held twice and an inline body once.

**Directories name the index; the filename names the page.** A page type is an attribute of the thing indexed rather than a dimension of the index, so it belongs in the filename.

**A page lives where its domain lives**, rather than under a page-type folder. The domain dimension matters more than the page-type dimension.

**`named-for` and `unique-key` both go away.** One computed `name` replaces them, drawn from a formula the page type may state, and the indexes key on that name. `formula` is the word, over `expression`, because the pages system already carries it.

**The index validity strategy, settled 2026-08-27.** The index updates as part of every change that runs through the ops tools, and no change runs outside them. One command checks an index for validity without changing it, and another rebuilds one. The check runs daily as an audit, and a gap it finds is traced to its root cause. Validity is never checked when the index is queried.

**The formula language already carries the fallback the naming intents need.** `||` returns its left value where that value is truthy and its right otherwise, in both implementations, pinned against each other by the conformance suite. It is spelled `prop(slug) || prop(id)`, not `{slug} || {id}`, which is template notation.

**The expression language is rebuilt rather than patched, settled 2026-08-27.** One implementation, written from scratch under `pages-system/`, ported from neither evaluator now running. It is designed against `domain/language-design` and written down before an evaluator exists. This supersedes the earlier ruling that the write path would call the file-side evaluator directly for now.

**`unique-key` is a notation nothing implements.** No file-side code renders it, and four of the six stated values carry holes no naming regex can match, so nothing ever did. Removing it takes away a spelling rather than a behaviour.

**A dotted name cannot be written as a formula.** The file side refuses a path step whose head is not an object, and a page's frontmatter holds only text. Reaching another page's property is a `rollup`, which declares a relation and a target rather than a formula. No `named-for` value is dotted, so no naming translation needs this.

**A name formula is a property definition scoped to its page type, settled 2026-08-27.** A page type naming differently from the default declares its own `name` property definition, carrying the formula. A property definition already scopes to a page type, so naming takes no mechanism of its own. Thirty-six page types need one.

**The default name formula is `{slug} ?? {id}`, settled 2026-08-27.** No title arm: a title is not guaranteed to be a valid identifier. The 10,239 pages holding no slug take one from their filename instead, which is already a folded stem. Four are named by their id and stay so. Seven named by a case-carrying external identifier take a folded slug too, settled 2026-08-27: the identifier survives in `device-id` on a `device-secret` and in `token` on a `device-token`, so folding the filename loses nothing.

**Three spellings were approved in conversation and never written to the spec, recovered 2026-08-27.** A case is written `case(`, its rows separated by commas, then `)`, with `->` between a row's test and its value, and the bare word `otherwise` as the last row's test. There is no `end`. Parentheses group. A call is `name(a, b)`. Their absence left the corpus author and the evaluator's builder each guessing a different spelling, which is what `Meaning Outside Code` exists to prevent. They belong on `formula-language`.

**The conformance corpus landed at `3a27d27`, 2026-08-27.** 267 cases at `pages-system/formula/cases/cases.ts`, written from the spec pages alone by an author who read neither evaluator now running nor the new one being built. 143 answer a value, 33 answer absent, 91 are refused, and none expects a run-time failure.

**The formula package answers to the repo's folder and export checks.** `folder-matches-a-shape` admits three shapes and judges each subfolder separately, `export-declared-here` refuses a barrel, `import-reach` refuses an import resolving outside the repo, and `file-length` cuts at 15,000 bytes. A test sits beside the file it tests, named for it, suffixed `.unit.test.ts`. A whole-suite `bun test` is refused; one file is named by path. `folder-matches-a-shape` does not run on a patch, so a tree that fails it lands quietly and surfaces only under `ops akasha run-checks`.

**Loose ends, found 2026-08-27.** Taken as they block an intent or come up alongside one.

- Seventeen hyphenated holes, over twenty-three occurrences, parse as subtraction rather than as references unless every one is spelled `prop(...)`.
- A template refuses a write whose hole nothing fills; a formula renders that gap as nothing and answers a name that looks right. Eleven page types name pages from more than one part, and only those are exposed.
- Twenty-five pages carry a stem cut at the old ceiling of 71, so their rule now fills to more than their filename holds.
- `ops food log` names its own pages: its own stemmer at `tools/commands/food/log.ts:123`, its own `-2` suffix at `:146`, and a write through the query client rather than the naming path.
- `vocabulary` and `rows-homes` are cached under a mark taken over the page shape alone, while both read the registry, which reads the index. Only `registry` carries an index stamp.
- 2,633 pages exist byte-identically in both `akasha` and `books`, which is why `page-name-unique` meets collisions it cannot explain.
- The unique-name intent costs 24,518 renames across eight page types. Four are clear: `persona-day`, `persona-craft-day`, `idle-persona-card` and `story-turn`, 2,301 pages between them, at most one call site each.
- `finding` cannot take a flat name while `tools/audits/findings-sorted.ts` refuses a name of one segment, which would refuse all 3,456 findings. Three refusal pages spell the old shape.
- `story-chapter-royal-road` is written by `services/royal-road-sync.ts` as a raw path rather than through the pages API, so a formula reaches none of it until that writer is rebuilt.
- `book-chapter` is not a rename: 5,622 markdown links across 362 files address chapters by name, and no property tells the colliders apart. Its sections want modelling as pages first.
- `keepNamedIn` removes an emptied identity file but never its directory.
- A page landed through `ops write` reached disk and not the index. `formula-absent-value` committed at `0163fe9` carrying no identity entry, found only because a later write named it as required reading; nine pages landed the same session indexed correctly. `page/index/build.ts` was rewritten that afternoon.
- Four routes answer what page type a file is, and can disagree without saying so. Reported by Aine, 2026-08-27.
- `page-property-computed`'s Design line says the formula language has one test for text, a case-insensitive substring, and no way to match a whole word. That holds of the language now running and fails of the one replacing it, which carries `hasWord`. The line goes when the cutover lands.
- One device UUID names a `device-secret` under two different user folders, so both fold to the same slug and collide within their page type.

**The graph answer cache under `.git/answers` is out of scope**, being the graph system's rather than the pages system's.

**The uniqueness intent came off `page-name`'s Design section on 2026-08-27**, where it was written as an invariant that holds. It does not: 391 names collide across 2,851 pages, each collision inside one repository.
