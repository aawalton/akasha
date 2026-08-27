---
id: be763f08-2bad-55f5-9c3c-2f5763433a28
slug: delete-game-proves-nothing-it-did-not-already-assume
page-type-slug: finding
title: "Delete game proves nothing it did not already assume"
domain-slug: domain/narrative-engine
---

# Claim

`ops awen delete-game` prints `LIVE-ROWS: 0` while the game's roll rows are still live. The proof re-runs the same predicate as the deletion, so it structurally cannot see what the deletion missed.

# Evidence

Verified 2026-08-15 by a review delegate that created a scratch game (`b35-scratch-review`), put `roll` and `resolve` through it, then ran `delete-game --apply`.

The verb printed `LIVE-ROWS: 0`. Nine `game-roll` rows written by `roll` and `resolve` were still live and still readable through `ops awen roll-log`.

The cause is stated in the code itself, at `packages/alanwalton/awen/src/awen/roll-access.ts:9-11`: roll rows carry no relation to their game, only a `gameExternalId` scalar. The tree scope the deletion walks follows relations, so it cannot reach them.

What makes this worse than a plain miss is that the survivor check re-runs the same predicate the deletion used. A proof drawn from the query that did the work can only ever report success — it is not measuring whether the rows are gone, it is measuring whether the query that already ran matches anything, which it never will.

The delegate cleaned the nine rows by hand with `ops page delete`; the scratch game now reports `(no live rows)` and its roll log is empty.

Not measured: how many live games have orphaned roll rows from earlier deletions. Nothing would have reported them, because the only instrument over them is the one that cannot see them.
