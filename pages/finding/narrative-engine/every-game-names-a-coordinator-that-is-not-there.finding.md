---
id: 9dfae228-eaf6-53c9-84c1-beaccd3f616f
slug: every-game-names-a-coordinator-that-is-not-there
page-type-slug: finding
title: "Every game names a coordinator that is not there"
domain-slug: domain/narrative-engine
---

# Claim

Every live Awen game names a `coordinatorAgent` that has no agent row, so the action box is never cleared for any of them and two of the three verbs that clear it report success.

# Evidence

Measured 2026-08-15. Zero `awen-gm--*` agent pages stand. All eight live games name one.

What follows from that, per verb:

- `ops awen clear-action` exits 2 on every live game. Tried against harem-hotel, dragons-and-dungeons, partners-ii and the-tower.
- `ops awen rollback`'s action-box clear returns 0 and clears nothing.
- `ops awen publish-turn`'s `clearActionsPredating` is silently skipped.

So the one verb that fails is the one a person runs by hand and watches. The two that carry on are the ones inside a larger act, where nobody is looking at that step's result.

Found while reviewing `ops awen` and not by anything watching the games. Nothing reports a coordinator that resolves to nothing, because the two places it matters treat the absence as a no-op rather than a refusal.

A second thing in the same namespace, reported by the same review and worth reading beside this: `ops awen migrate-live-games` has no dry run and no redirect, overwrites both live games in place from hardcoded constants, and passes `allowLogShrink: true` unconditionally. That flag disables the guard added under #15724, which exists because a stale litrpg source silently wiped back-updated beats on the-tower t88. The verb is not irreversible — the page types are versioned — so the property will not warn anyone before they run it.

Not measured: whether the coordinator rows ever existed, or whether the games were written naming an agent nobody created.
