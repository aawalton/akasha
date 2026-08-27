---
id: a805e118-2056-56b3-939c-2dd4d4ac9ca0
page-type-slug: finding
title: "Prediction window untracked"
domain-slug: domain/self-care
---

# Claim

Self-care has no instrument of its own, so its claims are checkable only against a tracking record kept for another purpose; that record has no rows at all for 2026-07-09 through 2026-07-13, the five days holding a dated prediction Grace made and the check she named for it.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/self-care/findings.md`, which names the same gap.

The prediction. On 2026-07-12, the night before a twelve-day trip, Grace chose a falsifiable forecast over reassurance and named its check: "Now a prediction, so we can check it against reality instead of dread… Read yourself tomorrow evening and see if the prediction held. If it didn't, that's real information and we look again."

The hole, and that it is a hole in the data rather than in the query. `ops tracking status --date` returns sessions for 2026-07-07 (Sleep 22:45–04:00, s:4) and 2026-07-08 (Sleep 20:30–01:00, s:4), then NO session rows on 07-09, 07-10, 07-11, 07-12 or 07-13, then a full day on 07-14 — 00:30 to 07:40, opening at s:4 and closing at s:2. Both boundaries carry rows, so the five empty days are the answer.

Nothing read the prediction back. It survives in one file, `~/agents/grace/spawn.log`, raw terminal output; `~/agents/grace/notes.md` carries a single session heading and it is 2026-07-01; and no memory document, corpus note or row records it.

The shape that outlives the instance: this domain's only instrument for its own claims is a record kept for another purpose, and it goes dark exactly when Alan travels — which is also when the boost stack is stripped and his level is lowest, so the readings it misses are the ones the domain most needs.

Distinct from `pages/finding/alan-harness/tracking-stall-is-announced-once.finding.md`, which measures the hourly confirmation declining to ask across four days of 2026-07/08 because an answered question went unapplied. This is a different window, a different mechanism, and it is about what the absence costs self-care rather than why the emitter was quiet.
