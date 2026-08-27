---
id: 09de3299-cfc8-5cbc-bbc3-d2c22e16f90b
slug: the-session-has-two-writable-homes
page-type-slug: finding
title: "The session has two writable homes"
domain-slug: domain/global
---

# Claim

The Tower's session stands in two homes that are both written — a save file on disk and a page in the store — and nothing says which one wins.

# Evidence

Measured 2026-08-15, running `review-command` on `ops tower archive`.

`~/agents/iris/litrpg/display/state.json` is the save the game is played from. `ops tower import-save` reads it, together with `sheets/*.json`, `floors/*.json` and `rolls.jsonl`, and upserts a `tower-session` page plus `game-character` and `tower-floor` pages into the store. That direction on its own would make the store a projection, which is what `File First` asks for.

Three verbs write the store copy directly instead. `ops tower commit` parses a TowerState JSON and upserts the `tower-session` page under its slug, and names `ops tower snapshot` as its inverse; the two call themselves the read half and the write half of a turn, and the worked example in `commit`'s own help is `ops tower snapshot | jq '.turn += 1' | ops tower commit --state -`. That round trip never touches the disk save. `ops tower turn` appends its roll to `tower.roll` events, also store-side, while `import-save` treats `rolls.jsonl` as the disk-side home for the same rolls.

Meanwhile `ops tower archive` and `ops tower retrofit-system-cards` both read `state.json` on disk as their source, and `archive` rewrites it. So the disk file is authoritative for archiving while the store page is authoritative for turns, and a turn taken through `snapshot` and `commit` leaves the disk save behind.

Both homes are live today. `ops tower state` returns a session from the store, and `state.json` stands on disk at 100,613 bytes, last written 2026-07-03. `domains/the-tower.md` names neither home.

Not measured: whether anything exports the store session back to disk, and whether `rolls.jsonl` is still appended by whatever plays the game.
