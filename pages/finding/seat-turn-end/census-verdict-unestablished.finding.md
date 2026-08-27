---
id: e16321ff-304a-5204-bb05-4e23940e4840
slug: census-verdict-unestablished
page-type-slug: finding
title: "Census verdict unestablished"
domain-slug: domain/seat-turn-end
---

# Claim

`ops seat halt-census` cannot render a verdict on the fleet, and reports `unestablished` rather than clean, because the Stop hook exits above the inbound question on a share of stops it can neither settle nor skip.

# Evidence

Run over a seven-day window on 2026-08-09, the census returns `verdict unestablished` against 1035 turn-ends, 0 halts, and 111 stops it could settle neither way — `no_hook_record=0`, `hook_unanswered=110`, `ambiguous=1`.

The instrument is behaving as designed. Its own help says that reporting an unmeasured stop as a judged one in either direction is the defect, and `no_hook_record=0` shows the window is not reaching back before the hook log begins. The 110 are stops where the hook wrote a record at one of its early exits and so never asked `ops seat held-wake`, which is the only carrier for the one legal ending no transcript holds. `HELD_WAKE_BY_REASON` at `packages/agents/shared/hook-decision-core.ts:168-196` maps those reasons to `unanswered`, and the exits are at `tools/hooks/block-headless-halt.sh` lines 160, 187, 191, 194, 201, 210 and 211.

What this costs is the last step of the strategy on the `athena-consistent-seats` initiative. An instrument whose verdict is `unestablished` cannot be wired to raise an alert on recurrence: it has no clean state to depart from. The halt figure it does report is 0 in 1035, against a declared baseline of 32 in 307 taken before the prompt-regime boundary, so the reading is good news standing on a denominator that is a tenth short of the population.

Which early exit accounts for the bulk of the 110 is not established here. Across the same window the hook logged `interactive-recorded` 4344 times, `task-running` 506, `continuation` 129, `live-child` 54, `open-question` 13, `no-agent-id` 6, `no-wake-source` 2 and `session-cron` 1 — but the census population is filtered to spawned seats at `packages/agents/cli/src/agent/halt-census-core.ts:292`, and the mapping from that log to the 110 was not traced.
