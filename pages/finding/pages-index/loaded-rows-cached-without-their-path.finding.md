---
page-type-slug: finding
slug: loaded-rows-cached-without-their-path
title: "The cache in loadPages is keyed on mtime and size alone, so it does not distinguish one pages.jsonl from another"
domain-slug: domain/pages-index
---

# Claim

`loadPages` in `page/index/store/store.ts` caches the rows it read, and keys that cache on the file's modification time and size alone — not on which file it read. The path is recomputed on every call, from `indexRoot()`, so the cache can be asked about one `pages.jsonl` and answer from another whose stat happens to match.

Until now the path could not move inside a process, so the key could not be wrong. `indexRoot` was made to follow `AKASHA_ROOT` at `dda0dad`, so that a test can anchor an index of its own; from that commit on, two different `pages.jsonl` files can be read by one process, and the key is the only thing standing between them.

Nothing observed has gone wrong, and a collision needs two index files of identical size written in the same sub-millisecond tick. It is recorded because the cache's key no longer identifies what the cache holds, which is a property a reader would assume rather than check.

# Evidence

Read on 2026-08-28 at `page/index/store/store.ts`.

`stampOf` at lines 262-269 returns `` `${one.mtimeMs}:${one.size}` `` and carries no path. `heldPages` at line 260 holds `{ stamp, pages }`. `loadPages` at lines 399-415 opens with

```
const at = pagesAt()
const stamp = stampOf(at)
if (heldPages !== null && heldPages.stamp === stamp) return heldPages.pages
```

`pagesAt()` at lines 271-273 is `join(indexRoot(), PAGES)`, so the path is worked out afresh each call while the comparison that decides whether to re-read is only over mtime and size.

Two paths that make the guard hold are the failure: the first branch returns before `existsSync(at)` at line 403 is reached, so nothing downstream notices the rows came from elsewhere.

One case is closed by construction: `heldPages` is only ever assigned where a body was read (line 413) or written (line 396), so its `stamp` is never the empty string `stampOf` returns for a missing file, and a root with no index therefore always falls through to the read.

What made this reachable: `page/index/place/place.ts` held `indexRoot`'s answer for the life of the process before `dda0dad`, so `pagesAt()` returned one path throughout. It now holds the answer against the root it was worked out for, and returns a different path when `AKASHA_ROOT` moves.

Not fixed here: adding the path to the key is a change to the index's read path made for a case nothing has yet hit, and the judgement of whether that earns its place belongs with the domain rather than with the change that made it reachable.
