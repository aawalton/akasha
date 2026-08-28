---
id: becdd58a-bf5d-4c40-8591-c54b7e02d2f7
page-type-slug: finding
slug: the-answer-caches-grow-without-bound
title: "The answer caches grow without bound and nothing prunes them"
domain-slug: domain/pages-system
---

# Claim

The caches the pages system answers out of grow without bound. `.git/pages-answers/` stands at 1.0 GB over 8,582 files and `.git/pages/resolved/` at 44 MB, and nothing in the repository removes an entry either has stopped needing. Every landing that touches the answering code re-keys every entry at once, so what a day's work leaves behind is a whole generation of entries filed under keys nothing will ask for again.

# Evidence

Measured 2026-08-28 at `9c56bde6` with `du -sh` and a file count over `.git/pages-answers/`.

`keyFor` at `page/property/type-cache.ts:153-163` hashes a ground built from the tree oid of each folder in `CODE_AT`, and `CODE_AT` at `:24-33` names `page` — which covers every file beneath it, `page/property/value.ts` included. So a commit anywhere under `page/` re-keys the whole cache rather than the entries it bears on. Six such commits landed in one seat's night. A search of the repository turns up no code that removes a cache entry, and no command named for it.

A SECOND THING WORTH RUNNING FROM HERE, recorded because the shape of it is dangerous rather than because it was observed. During this measurement a run of the type machinery answered "`json` is a type this states no rule for" while a later run in the same session armed `json` correctly. I chased it: my own commit adding that rule landed between the two runs, and the audit is deterministic across repeated runs at HEAD, so I believe the tree moved under the measurement and the cache was right both times.

But a gate that judges a value differently on a cold cache than a warm one would refuse a write intermittently, and that is the kind of fault someone rediscovers at three in the morning with less patience than this. The experiment: land a rule that changes one type's verdict, then with the tree still at that commit remove `.git/pages-answers/` and `.git/pages/resolved/` and run `pages-hold-properties` twice, comparing the unjudged count cold against warm. Equal counts settle it.

Not measured: how much of the 1.0 GB is reachable under the current ground, and whether the growth is bounded in practice by anything outside the repository.
