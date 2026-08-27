---
id: 1e0c0902-1f88-4d18-83c5-9d2c2ff07386
page-type-slug: initiative
slug: astra-pages-system
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: aine-global
---

# Intent

- A page's name is worked out by the formula language, from a formula its page type states.
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

**The write path calls the file-side formula evaluator directly for now, settled 2026-08-27.** `tools/lib/page-expression.ts` is the evaluator naming can reach, being the file-side one. That evaluator belongs under `pages-system/` in the end, so this edge is a stage rather than where it comes to rest.

**Loose ends, found 2026-08-27.** Taken as they block an intent or come up alongside one.

- Naming runs on templates rather than on the formula language. Four hole-renderers behave four different ways on an unfilled hole, twenty hyphenated holes parse as subtraction rather than as references, and `{id}` is out of scope where a new page is named.
- `vocabulary` and `rows-homes` are cached under a mark taken over the page shape alone, while both read the registry, which reads the index. Only `registry` carries an index stamp.
- `page/shape/mark.ts` names `checks/refusal` where the folder is `checks-system/refusal`, so `ownCodeParts` finds one folder short and answers nothing. `page/shape/mark.unit.test.ts` fails on main for this. Whether the answers cache is thereby dead is unsettled: answers landed today carrying whole shape marks.
- 2,633 pages exist byte-identically in both `akasha` and `books`, which is why `page-name-unique` meets collisions it cannot explain.
- The unique-name intent costs 24,518 renames across eight page types. Four are clear: `persona-day`, `persona-craft-day`, `idle-persona-card` and `story-turn`, 2,301 pages between them, at most one call site each.
- `finding` cannot take a flat name while `tools/audits/findings-sorted.ts` refuses a name of one segment, which would refuse all 3,456 findings. Three refusal pages spell the old shape.
- `story-chapter-royal-road` is written by `services/royal-road-sync.ts` as a raw path rather than through the pages API, so a formula reaches none of it until that writer is rebuilt.
- `book-chapter` is not a rename: 5,622 markdown links across 362 files address chapters by name, and no property tells the colliders apart. Its sections want modelling as pages first.
- `keepNamedIn` removes an emptied identity file but never its directory.

**The graph answer cache under `.git/answers` is out of scope**, being the graph system's rather than the pages system's.

**The uniqueness intent came off `page-name`'s Design section on 2026-08-27**, where it was written as an invariant that holds. It does not: 391 names collide across 2,851 pages, each collision inside one repository.
