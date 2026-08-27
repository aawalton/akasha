---
id: 1e0c0902-1f88-4d18-83c5-9d2c2ff07386
page-type-slug: initiative
slug: astra-pages-system
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: aine-global
---

# Intent

- A page's name is computed from a formula, defaulting to `{slug} || {id}`.
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

**Loose ends, found 2026-08-27.** Taken as they block an intent or come up alongside one.

- `.git/pages-answers` and `.git/pages/resolved` were never reviewed: three cache roots under `.git`, three path conventions, three version schemes, and no eviction on two of them.
- `page/property/type-cache.ts` invalidates on `tools/page`, the pre-migration module, while the live resolver is `page/property/`. Its `VERSION = 4` is the hand-bumped cover for that.
- 2,633 pages exist byte-identically in both `akasha` and `books`, which is why `page-name-unique` meets collisions it cannot explain.
- The second intent costs 24,518 renames across eight page types, `story-chapter-royal-road` and `persona-day` being most of it.
- The formula language has no fallback operator, which the first intent's `{slug} || {id}` needs.
- `keepAt` removes an emptied relation file but never its directory; 11 relation directories hold no file at all.

**The graph answer cache under `.git/answers` is out of scope**, being the graph system's rather than the pages system's.

**The uniqueness intent came off `page-name`'s Design section on 2026-08-27**, where it was written as an invariant that holds. It does not: 391 names collide across 2,851 pages, each collision inside one repository.
