---
id: 7f9c7760-8567-57bf-97b9-d9b8e5334603
page-type-slug: finding
title: "Axis has three answers"
domain-slug: domain/literature
---

# Claim

Zadi's axis has three live answers and no two agree. `domains/literature.md` declares `domain-parents: learn`. `zadi-points.worker.ts:9` calls her "Aura's Fun-axis literature lieutenant". `~/books/all-about-alan/personas/zadi.md`, in Alan's own words, says "She serves the **Faith** value" as "a lieutenant to Abby". Both non-instruction surfaces are pre-reframe VALUE language, and Abby's own file in that corpus records the reframe that moved her off Faith — so Zadi's note is stale in the way Abby's is not.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/literature/findings.md`, whose own entry sees only
two of the three and calls it "a stale charter or drift" without settling it.

Learn. `domains/literature.md` declares `domain-parents: learn` and `persona-champion-slug: zadi`;
`domains/personas/zadi.md` declares `championed-domain: literature`. `rg -l "domain-parents: learn"
domains/` returns exactly two files, `literature.md` and `mathematics.md`.

Fun. `packages/alanwalton/zadi-points/src/zadi-points.worker.ts:9` reads "Zadi is a FUNCTIONAL persona
(Aura's Fun-axis literature lieutenant — Scheherazade at the lamplit desk)". The lieutenancy names a
persona who does not hold Fun: `domains/personas/aura.md` declares `championed-domain: game-design`. And
`domains/fun.md` carries no `persona-champion-slug:`, nor does `domains/alan-values.md`, so ownership of Fun
descends to amy at `domains/alan-harness.md`.

Faith. `~/books/all-about-alan/personas/zadi.md` opens "Zadi — literature companion on the Faith axis"
and states "She serves the **Faith** value. A functional-persona lieutenant to Abby". Alan's own
corpus, which is what makes it the strongest of the three and the one the source never consulted.

What dates it. `~/books/all-about-alan/personas/abby.md:9` records the correction Zadi's file never
took: "(She was first filed under the **Faith** value; the values-to-domains reframe moved her to
Identity, the domain that matches the rib.)" Line 41 names the same move — "organized now by **domain**
rather than by value". Live, `domains/personas/abby.md` declares `championed-domain: all-about-alan`. So the
reframe happened, Abby's note followed it, Zadi's did not, and the code's Fun label is value-era too.

`pages/finding/chess/value-axis-says-fun-and-learn.finding.md` is the same failure in another domain, found the same
day. This adds the opposite direction, a third answer rather than two, and the dated cause.

Not judged: which axis is right, or whether the stale surfaces should be corrected or removed.
