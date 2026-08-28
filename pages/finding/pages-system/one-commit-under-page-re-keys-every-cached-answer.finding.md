---
id: b91cb1c9-9526-57e0-b5d7-2d252b6da567
page-type-slug: finding
slug: one-commit-under-page-re-keys-every-cached-answer
title: "One commit under page re-keys every cached answer"
domain-slug: domain/pages-system
---

# Claim

Every cached answer the pages system holds is filed under a key derived from the tree oid of eight code folders, one of which is `page`. A commit touching any file beneath `page/` therefore re-keys the whole cache at once rather than the entries it bears on, and the work of rebuilding it falls on whoever asks next. 89 commits touched `page/` on 2026-08-27. The cache is swept correctly and is not leaking; it is rebuilt wholesale, many times a day, and nothing reports the cost.

# Evidence

Measured 2026-08-28 at `045c94449`.

`.git/pages-answers/` stands at 1.7 GB over 10,973 files, and `.git/pages/resolved/` at 44 MB over 2,905 files. Both spans are inside one day: the oldest answer is stamped 2026-08-27 06:40:23 and the newest 2026-08-28 00:32:00.

`keyFor` at `page/property/type-cache.ts:152-165` hashes `ground.base` together with a blob oid per name in the chain. `groundOver` at `:124-139` builds `base` from `recordedFor(root, named)`, where `named` carries `codeIn(root)` — the folders of `CODE_AT`. `CODE_AT` at `:24-34` names eight: `cache`, `checks-system/refusal`, `during-call`, `exclusive`, `page`, `pages-system/page-type`, `repo`, `write-whole`. The docblock at `:21` states the granularity outright: a folder there covers everything under it, because the ground takes the folder tree oid. One commit under `page/` moves that oid, which moves `base`, which moves every key derived from it.

`git log --since=2026-08-27 --until=2026-08-28 -- page/` gives 89 commits, against 7,226 commits in the tree that day. So the whole answer cache was discarded and rebuilt at least 89 times in twenty-four hours, and 1.7 GB is what one day of that leaves on disk.

The cache is swept. `services/sweep-page-answers.ts` deletes from both `.git/pages-answers/` (`:28`) and `.git/pages/resolved/page-type` (`:30`) anything whose mtime is older than `DAY_MS` (`:32`), and `pages/workstation-service/sweep-page-answers.workstation-service.md` declares it `enabled: true` on `*-*-* *:23:00`. `systemctl --user list-timers` shows it running hourly. An earlier finding, `the-answer-caches-grow-without-bound`, claimed nothing removed a cache entry and was deleted as wrong, the sweeper having landed at `b8fdd57f0`.

Not measured: how many entries a `page/` commit re-keys whose answers it could not have changed; what a rebuild costs in wall time to the command that triggers it; whether a narrower ground, naming files rather than folders, would key correctly.
