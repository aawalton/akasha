---
id: 2489ae5a-10b8-59ea-bc89-601384a7b70d
slug: tech-tree-mechanics-settled
page-type-slug: finding
title: "Tech tree mechanics settled"
domain-slug: page-type/idle-game
---

# Claim

The idle-game tech tree's mechanics are fully settled — an account-level Ascension Points resource (renamed from legacyStars) that is slotted rather than spent, committed with no v1 respec, and that keeps feeding the passive rate multiplier while slotted — with only the node-graph content draft left, parked pending Alan's taste-verify.

# Evidence

Alan capture (alanNotes batch, intake 2026-07-15): tech tree with permanent unlocks that cost resources, distinct from achievements (#15559) by acquisition path (spend vs earn). Settled (2026-07-16T05:16:28Z, same as #15559): two design-side systems, one shared technical bonus/unlock shape.

COST MODEL (Alan, 2026-07-16T05:25:04Z, floated as 'maybe'): research costs ASCENSION STARS but SLOTTED, NOT SPENT — slotting a star does not reduce ascension rank; stars stay owned, never burned.

RE-SLOT POLICY (Alan, 2026-07-16T05:27:04Z): COMMIT for now — a slotted star stays there; growth comes from new stars, not rearranging old. No respec in v1.

STAR SUPPLY (research settled, 2026-07-16T05:31:09Z): ascension is ACCOUNT-LEVEL, confirmed in code — legacyStars sits on GameState; ascend grants floor(sumOwnedRanks/ASCEND_DIVISOR) over all unlocked personas' ranks; tech tree draws from this one account-wide pool. Naming flag: GachaGirl.stars (per-girl 0-5 dupe stars) differs — tech-tree surfaces must say ASCENSION stars.

MULTIPLIER FORK (Alan, 2026-07-16T05:39:50Z): a slotted star KEEPS feeding the permanent rate multiplier (legacyStars x STAR_VALUE); slotting never costs power.

RENAME (Alan, 2026-07-16T06:00:53Z): the ascension currency is 'ASCENSION POINTS'; gacha girls keep conventional 0-5 stars. When the tech tree builds, rename legacyStars and every UI/doc together; until then legacyStars stays as-is.

Settled: account-level supply, slotted-not-spent, committed slots, multiplier keeps feeding, currency named Ascension Points. Only the node-graph content (effects, AP costs, pacing — auto-rank from #15556 is a confirmed node) remained, as aura design work with no Alan gate until taste-verify.

Parked someday_maybe (2026-07-17T16:59:10Z, via Áine). Un-park trigger: Aura's design-content draft ready for taste-verify.

Project #15560, domain idle-game, someday_maybe. Carried no objective; captured, never defined. Moved off the retired notes attribute 2026-08-15.
