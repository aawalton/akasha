---
id: 01a045bf-7cd3-7597-a70e-125199440789
page-type-slug: initiative
slug: astra-page-index
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: astra-pages-system
---

# Intent

- A page index file is named for one page.
- Each line of a page index file is one page location.
- Every file in the page index is an index file.
- The page index is made right by reconciling it, never by writing it again from nothing.
- No page index update drops what another wrote.
- A reader trusts the page index without checking it.
- The page index is checked against the pages every day.

# Notes

**The page index is a derived cache, never authoritative.** It can always be rebuilt from the pages, so it may be eventually consistent, and a torn write is a fault to detect and repair rather than one to prevent. A miss must never render as an absence.

**SQLite is refused deliberately.** Its decisive advantage was transactions, which a derived cache does not need; what is left is opacity to ripgrep and a schema to migrate, against File First and Search First.

**The index is one file per handle with a one-line body** — not sha1 buckets, and not the destination in the filename. Measured on btrfs: 857 bytes for a one-line file against 1,007 for an empty one with a long name, because a filename is held twice and an inline body once.

**Directories name the index; the filename names the page.** A page type is an attribute of the thing indexed rather than a dimension of the index, so it belongs in the filename.

**The index validity strategy.** The index updates as part of every change running through the ops tools, and no change runs outside them. One command checks an index without changing it, another rebuilds one, the check runs daily as an audit, and validity is never checked when the index is queried.

**No reader sees a half-written index file, and that intent is met.** Every index write goes through `write-whole`, which writes a temp beside its target and renames it into position, so nothing is ever opened in place. Two faults are easily mistaken for it and are not it: the index-wide gap a rebuild opens by emptying the root before refilling it, and a missing file answering as an empty result rather than as a miss.

**What the index is, measured 2026-08-27.** Identity is 256 sha1 buckets per word rather than one file per handle, averaging 231 pages a file, and the bucket is hashed over the handle value so the filename names neither the page nor the handle. Of 9,641 relation files, 5,705 are named for a file path and only 3,936 for a page, because a file relation's target is `repo/path` and a path nests. Three standing files at the root name no page at all: `pages.jsonl` at 18 MB over 59,037 lines, `relations.json`, and `built-from.json`.

relations.json drift is filed as `pages-index-relation/relations-json-is-rewritten-only-by-a-full-rebuild`.

The remaining lost-update site is filed as `pages-index/the-landing-mark-is-read-and-written-outside-the-index-lock`.

**The order settled 2026-08-27.** Close the rebuild's window and make a failed landing refuse first, since neither needs a design decision and both make later measurement mean something. Then take the first three intents and the lost-update intent as one change rather than four: one file per handle makes a file name one page, lets a line drop its third field, retires `pages.jsonl`, and turns an absent file into "no page carries this handle" — which is what a reconcile and a trusting reader both need. `relations.json` does not block it: it is the declaration schema the reverse index is built by, not index data, and none of the four intents reach it. The reconcile comes after the shape, needs a per-row git oid to be affordable at 250 ms rather than 5.6 s, and the daily audit is that same compare run in report-only mode.

**Fixtures carry their own index rather than being cut off from it — ruled by astra 2026-08-28, and landed.** This is a coordinator's ruling under this initiative, not Alan's approval, and it is written here rather than on a finding so that nothing reads it as approved. Both halves went together at `8d2ae2772c`: `place.ts` holds its answer against the root it was worked out for, and `tools/tests/fixture.ts:102-117` states every other repository as checked out nowhere. Measured over `tools/tests`: 141 failing before at `3eb9299f9` and 105 after, with the 36 anchor refusals gone.

The alternative — fixture-backed tests reaching no index at all — costs more than it looks, because `page/property/registry.ts:20-27` builds every page type out of `loadPages()`, so taking the index away leaves that testable against nothing but the live repository. That is the same defect wearing a different face.

**Keying `indexRoot` by its root and giving fixtures an index are one change, not two.** `place.ts:50-59` memoises its answer without memoising what it was an answer to, while `akashaStands()` re-reads `AKASHA_ROOT` on every call — so the input can move while the output cannot. Keying it is what makes `AKASHA_ROOT` mean anything to the index; fixtures carrying an index is what makes that meaning survivable. Landed alone the first is a regression: measured, it trades 36 honest failures for 41 different ones and moves a protected refusal from 3 occurrences to 93. It reads as an obvious win and is not one.

Filed as `pages-index/two-caches-over-index-answers-are-keyed-by-page-shape-alone`.
