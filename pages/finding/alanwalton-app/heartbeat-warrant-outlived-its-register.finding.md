---
id: fb64fb22-ab70-5b5d-8a0c-aba0111fecf6
page-type-slug: finding
title: "Heartbeat warrant outlived its register"
domain-slug: domain/alanwalton-app
---

# Claim

Two persona-points workers state their heartbeat interval's warrant as a consequence the estate withdrew four days after the interval was set. Each says a dropped event leaves the persona's relationship level — the register she speaks in — stale on her page, and that this buys the hour. `#17270` took register content off the ladder entirely, so being late no longer costs what either comment says, and neither interval has been re-derived against what a stale level now costs.

# Evidence

Measured 2026-08-08 at `~/code` on `main`, while emptying the quarantined zadi-points document.

The two comments. `packages/alanwalton/zadi-points/src/zadi-points.worker.ts:59-67`, above `PERIODIC_HEARTBEAT_INTERVAL_MS = 3_600_000`: "The cost of being one interval late inside that window: Alan finishes a Great Books reading and Zadi's relationship level — the register she speaks in — has not moved on her persona page. He notices within the day, which is the hourly rung." `packages/alanwalton/nimue-points/src/nimue-points.worker.ts:63-69`, above the same constant: "the level her register reads is one session stale on her page. Alan sees that within a day, and that is what buys the hour."

Two commits, four days apart. `e82913209b`, 2026-07-25, "set every worker timer from the cost of being late" — the commit that authored those warrants. `7bd88215ef`, 2026-07-29, "the composed persona register stops varying by relationship level, because all personas are work personas now and the ladder reaches reward imagery alone". Its message: the register content comes off the ladder — `registerLayer`, `BONDING_REGISTER_LAYER`, `composeRegister`, `renderRelationshipRegister` — and that this "is held by the type rather than a test: `level.registerLayer` no longer compiles".

Real removal, not a rename: `rg -uuu -l` over `packages/` returns nothing for any of `registerLayer`, `BONDING_REGISTER_LAYER`, `composeRegister`, `renderRelationshipRegister`. `Bonding` survives at `personas/core/src/ladder.ts:20,93,103` as a stage label for imagery, not register.

A wrong warrant rather than a dead one: `LevelImagery`, the six closeness/wardrobe/pose tiers, `levelForGreenDays` and `clampRewardLevel` all stay, so a stale level now costs stale reward imagery. Neither comment says that, and neither interval was re-derived against it.

Scope. Searching the persona-points workers for "register" returns exactly these two lines.

Not established: whether an hour is still right once the cost is restated — only that the stated reason is false.
