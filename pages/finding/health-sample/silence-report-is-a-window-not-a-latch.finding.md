---
id: 09bea167-df94-5883-a556-06b4fd17ec69
slug: silence-report-is-a-window-not-a-latch
page-type-slug: finding
title: "Silence report is a window not a latch"
domain-slug: page-type/health-sample
---

# Claim

The health-sample stream report is a window rather than a latch: a day's silence stops being reported the moment a late post lands, so the automation Alan's mornings depend on can fail every day and be visible on none of them.

# Evidence

`decideStreamArrival` in `packages/alanwalton/health-samples/arrival/src/arrival-freshness.ts` answers `posting` as soon as any arrival lands at or after the current ESO day began, and its verdict is about that day alone. Nothing carries a day's silence forward once it ends.

2026-08-10 is the worked case, and the instants are production's. The ESO day began 10:00 UTC. The grace stands the verdict up at 14:00 UTC. The post Alan triggered by hand after exercising landed at 17:30 UTC. So the report raised for three and a half hours and was quiet on both sides of them — `early` before, `posting` after. It is read at the boot of an Amy seat rather than on a clock, so whether anyone ever saw it turned on a seat happening to boot inside that window.

The condition Alan actually stated is a standing one. His words, 2026-08-10: the posting "runs automatically once in the morning at 4:05 and then I trigger it after exercising periodically throughout the day", and of the 4:05 automation, "we had bugs that blocked it this morning." An automation that stops firing altogether is masked on every day he exercises, because his manual post arrives and answers the only question being asked. What survives is a report that catches the days he neither exercises nor notices — which is the population least likely to have a seat booting in the window at all.

The record is thin on purpose and worth stating: three and a half days of stream, one healthy morning. A latch — a silence stays reported until somebody clears it, or the verdict names yesterday as well as today — is the obvious shape, and it was not built because the criteria did not reach it.

#18520 passed on its criteria, which asked for a report over the mornings the stream missed and got one. This is the gap between those criteria and the end state they serve.
