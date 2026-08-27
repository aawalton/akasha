---
id: 790ccc11-3e63-5e23-a06b-9ee6ac86ea37
page-type-slug: finding
title: "Dispatched seats die unresumed"
domain-slug: domain/agent-harness
---

# Claim

A dispatched seat holding unfinished work dies without a clean-exit stamp, nothing resumes it, and the work stands still until a person happens to ask. Five such deaths across three narrative-engine seats inside eighty minutes produced two exit records, so neither the stall nor most of its causes are visible from any read. Every restart was a hand respawn by the principal, prompted by Alan asking whether the seats were alive.

# Evidence

Observed 2026-08-16 between 16:03 and 17:30 across one initiative's dispatched seats.

Three seats were spawned onto live projects: a manager on #19282, a developer on #19283, a worker on #19286. All three are now absent, and all three projects stand non-terminal at `implementation`, with #19284 and #19285 parked at `awaiting_manager_deployment` behind the dead manager for roughly fifty minutes with nothing in either row saying so.

**The deaths, as probed rather than reported.** `ops seat alive` answered `dead — spawn-state wrapper pid dead (kill -0 ESRCH). Its spawn state carries no clean-exit stamp` for the manager and the developer at roughly 17:05, and again for their replacements at roughly 17:30. #19286's worker was listed `running / live / advancing` at 17:05 and is absent from `ops seat list` now. Five deaths across three seats, each with unfinished work on its row.

**What the record holds.** `ops seat exits --since 16:00` reports `recorded=3 · coverage=complete`, of which two are these seats: the manager `crash-reaped` at 16:46:28 and the developer at 17:18:51, both `reaper=none`. Its own header states the limit — "recorded, not occurred: a death no exit site observed leaves no record" — so `coverage=complete` describes the read rather than the population. Three of the five left nothing.

**Nothing resumed any of them.** `domains/seat-presence.md` states as Intent that every absent seat holding an unfinished assignment has something that will resume it. Across five deaths that held zero times. Both restarts were hand respawns by the principal, and both happened only because Alan asked whether the seats were alive.

**Not verified.** No cause of death was established; `crash-reaped` names how the record was written, not what killed the process. Whether the three unrecorded deaths share a cause with the two recorded was not investigated, and host memory pressure was not measured.
