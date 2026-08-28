---
id: a9bfcb1e-5af3-5655-869a-3baa4ce219f9
slug: owner-slug-cannot-name-the-user-id-key
page-type-slug: finding
title: "Owner slug cannot name the user id key"
domain-slug: domain/page-storage
---

# Claim

`owner-slug` cannot name a key that camelizes to `userId`. `askableNarrow` rewrites a `userId` narrow to `camelizeKey(owner-slug)`, so `owner-slug: user-id` yields `userId` again — the column `buildRawPageRows` stamps to the universal user. The in-process filter then compares the caller's id against `ffffffff-…` and answers 0 for every owner, including the right one. A per-person type whose file states its owner under `user-id` cannot be repaired by declaring that key.

# Evidence

Measured 2026-08-20 through `getPages` against the live page query service.

`notification-feed` states `user-id: 9ba554f7-cb18-48bb-a709-ec935a895ca7` on `memory:pages/notification-feed/alan.notification-feed.md`. `getPages` with `select: ["userId"]` returns `ffffffff-ffff-ffff-ffff-ffffffffffff`. The stated value does not survive the read.

The rewrite is `file-narrow.ts:86` — `ownerSlug === null ? null : { ...condition, key: camelizeKey(ownerSlug) }` — and `camelizeKey("user-id")` is `"userId"`. `file-read.ts:337` replaces `args.where` with the rewritten narrow, and `wholePopulation` at `:323-326` runs `matches()` over that, testing `page.userId`, the stamped constant.

The working shape is a key that does not collide. `temper-account` declares `owner-slug: title` and its `title` carries the user uuid: Alan n=1, a wrong-but-valid uuid n=0, `not-a-uuid-at-all` n=0. `idle-persona-card` declares `owner-slug: player-id` over 140 cards and 3 player-ids: Alan n=48, wrong n=0, garbage n=0.

Where no key is declared the narrow is dropped rather than answered false, and the read returns the whole population — `persona` 41/41/41/41, `value` 6/6/6/6, `daily-tracking` 121/121/121/121, `question` 435/435/435/435 across no narrow, Alan, a wrong uuid and a garbage string. That is intended for a single-owner type under `properties/page-type-owner-slug.md:23`.

Not measured: whether anything wants `notification-feed` narrowed by user through `getPages`. Its one live reader, `feedNameFor` at `notify.ts:42-48`, uses `askComposed` with the kebab key and binds — Alan n=1, a user with no feed n=0, both controls n=0.
