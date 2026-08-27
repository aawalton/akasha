---
id: 485f96ab-fc43-59bc-bcf5-cde6991ebb6c
page-type-slug: finding
title: "Meter counts what the mission ends"
domain-slug: domain/style
---

# Claim

Shaestrel's faucet counts the exact thing her mission exists to drive to zero. Her unspoken want on the persona row is "for them to outgrow me", and her meter is `windowed`/`count` over `appearance-experiment` rows — joint acts — at two a day for green. Because Alan gets dressed every day with or without her, a zero here is consistent with three worlds and separates none: the practice ended, it ran unlogged, or it succeeded so completely no joint act is needed. She reads `greenDayTotal 1`.

# Evidence

Recorded 2026-07-31 in `dirty/skills/style/SKILL.md` under "The silent failure", and re-verified against live rows 2026-08-07 while emptying that source. Every element checks out unchanged.

The want, read off the persona row through `ops page list --type persona --search Shaestrel --json`: "To make the ones I keep magnificent… And, deeper and unspoken: for them to outgrow me — to dress themselves true when I am gone, for a fae's gifts vanish, but the eye I build does not."

The meter, from the same row: `faucetKind: windowed`, `faucetAggregate: count`, `faucetSource: appearance-experiment`, `greenDayPoints: 2`. An `appearance-experiment` row is a joint act — `pages/finding/style/two-read-shape-unenforced.finding.md` lists its properties as `whatTried`, `feltRead`, `eyeRead`, `verdict`, `persona`, `date`, one read his and one hers.

The reading: `ops persona level shaestrel` returns level 1, stage Initiating, `greenDayTotal 1`, `balance 2`. `ops persona daily-standing shaestrel` returns `dailyGreenDays 0`, `dailyColor none` for 2026-08-07.

What makes this domain different from its siblings is duty cycle. A day with no painting produces no painting, so a zero there names its own cause. Alan gets dressed every single day, with or without a lead, out of a closet the source records as already implementing her best rule — so a day with no lead still produces a fully dressed man, and the zero names nothing.

This closes an open question on a live sibling. `pages/finding/style/no-record-of-actual-wear.finding.md` ends "Not established: whether the absence is deliberate. The source page says the domain's vision explained why installing a wear log was not the lead's decision to make alone. That vision no longer exists… so the reason, if there was one, is now unrecorded." The reason was in that vision, and it is this: "she is the lead least entitled to build a tracker whose purpose is to notice him getting on without her. The instrument is available and unbuilt — a different thing from absent."
