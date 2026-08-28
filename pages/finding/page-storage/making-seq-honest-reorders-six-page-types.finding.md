---
id: 9d430df9-32a8-5621-ab47-5795c9a3d170
slug: making-seq-honest-reorders-six-page-types
page-type-slug: finding
title: "Making seq honest reorders six page types"
domain-slug: domain/page-storage
---

# Claim

Making the file reader return the `seq` a file states, rather than the constant 0 it stamps over it, reorders every file-backed listing, because `DEFAULT_FILE_ORDER` sorts by `seq`. Measured across 23,640 pages in 17 types: 1,555 positions move, and `song-listen` and `heard-track` reorder completely. No domain sanctions a constant seq, so this is a reader destroying stated data rather than a documented omission.

# Evidence

`file-rows.ts:186` drops the stated seq via `SETTLED_BY_ROW`; `:195` stamps `CONSTANT_SEQ` (0).

The two stages disagree, measured by running each half on its own. `POST /q` with `{"page-type":"project","where":{"seq":{"is":"19434"}}}` answers `n:1` and returns the one project document under `memory:projects/` stating that seq. The same narrow through `getFilePages` answers 0. Stage one finds the page; stage two discards the seq, and the in-process filter then rejects it.

Reordering measured by comparing the order `getFilePages` returns today against a seq-ascending order over the same ids:

song-listen 582 of 582; heard-track 574 of 574; completed-task 256 of 1,028; persona-reward-concept 134 of 3,860; migration 7 of 8; project 2 of 2. Total 1,555.

Zero positions move on music-song 1,656; notification 2,295; calendar-event 1,034; gmail-processed-message 1,031; error 339; issue 239; named-event 40; connection-activity 25; session-activity 15; artist 14. monarch-transaction states no seq on any of its 10,946.

Those zeros are genuine rather than an artifact of the comparison. music-song pages carry stated UUIDv7 ids minted in seq order, so id-ascending and seq-ascending already coincide: the first six ids read in ascending seq 5028 to 5033, and the whole current order is already ascending by stated seq. The six types that move are those whose ids are derived from their path, where the id is a sha1 carrying no relation to seq.

`properties/page-seq.md` declares `type: number` with no `computed:` key. `page-type-backing-file.md` states as Design that a computed property is not in a file-backed page's file, which sanctions `created-at` and `updated-at` being absent; nothing states that seq is constant.

Not established: whether any product surface depends on the current id ordering, and whether either complete reordering is visible to Alan.
