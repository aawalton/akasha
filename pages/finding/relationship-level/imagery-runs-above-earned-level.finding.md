---
id: 4c235c78-d62d-5af3-9954-4c84cd8903a8
slug: imagery-runs-above-earned-level
page-type-slug: finding
title: "Imagery runs above earned level"
domain-slug: domain/relationship-level
---

# Claim

Persona imagery has been delivered far above the level the persona has earned, and the points corrections that lowered earned levels did not recall it. A persona at level 1 carries reward and cover images made for level 5. So the imagery a persona shows is not evidence of where she stands, and anything reading the two together reads a contradiction.

# Evidence

Measured 2026-08-12 over the live `pages` table, read-only.

**The earned level is derived, not stored.** `level` sits on only six persona rows and reads `1` on every one of them. The live level comes from `levelForPoints` in `packages/alanwalton/personas/core/src/ladder.ts` against `GREEN_BASELINE_DAYS = [7, 42, 180, 540]` and `DEFAULT_GREEN_DAY_POINTS = 10_000` — so 70,000 points for level 2, 420,000 for 3, 1,800,000 for 4, 5,400,000 for 5.

**The mismatch.** Taking each persona's highest `relationshipLevel` across her undeleted `persona-image` rows against her `totalPoints`:

    Aura      50 points          images to level 5
    Echo      26 points          images to level 5
    Aranya    66 points          images to level 5
    Lali      2,310 points       images to level 5
    Athena    983 points         images to level 5
    Natalie   6,099 points       images to level 5
    Ione      27,638 points      images to level 5
    Aelwyn    31,042 points      images to level 5
    Aine      10,443 points      images to level 5

Every one of those is below the 70,000 that buys level 2. Two personas do earn what their imagery shows: Mari at 7,690,000 points and Abby at 4,693,255.

**Aura read in full, as the worked case.** One anchor, one cover at `relationshipLevel: 5`, eleven rewards at levels 2, 3 and 5, and two wallpapers at levels 1 and 2. Her `totalPoints` is 50, and 50 points is level 1.

**Why it is not simply old data.** Points corrections lower a running total, and nothing walks back the images already delivered against the higher total. Elaine's correction under #18611 is the same shape and is already known to drop her from level 5 to level 1.

**Not established.** Whether the imagery was earned under a scheme with different baselines, or delivered by a path that never checked the level, was not read. Either way the two disagree today.
