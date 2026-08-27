---
id: f9b902c6-a165-52fa-b642-b9612a1ad5f5
slug: zero-reading-already-checked
page-type-slug: finding
title: "Zero reading already checked"
domain-slug: domain/instrument
---

# Claim

Agents already establish that an instrument could have returned something else before acting on its zero, on 78 of 103 measured occasions — 75.7%, CI 66.6–83.0. Three acted wrongly, of which two went uncaught. The behaviour is not absent enough to instruct, and this is the denominator a later run would otherwise re-sweep 776 transcripts to rebuild.

# Evidence

Measured 2026-08-07 for a `decide-principle-or-rule` run on a candidate reader-side rule. Athena declined the rule at stage 4 on this figure and asked that the figure be kept.

The instrument was a structural sweep matching `tool_use` to `tool_result` and classifying the payload as an absence, not a text filter over prose. A failure is an episode where an agent received an empty result and took a subsequent action premised on it.

- 776 transcripts, 218 of them nested two levels down.
- 71,533 tool results.
- 1,275 flagged episodes across 431 seats.
- Precision 138/152, so roughly 1,158 real zero-read episodes.
- 103 of 138 acted on the zero.
- CHECKED 78, SOUND 22, WRONG 3 — self-caught 1, uncaught 2.
- 489 of 1,275 (38.4%) are followed by a write within five tool calls.

Both bounds point worse rather than better. Filter recall measured at about 40% and is biased toward zeros the agent annotated, which is the population where checking is likeliest, so 75.7% is an upper estimate. The uncaught class is the one no detector can sweep for, being defined by nobody noticing, so 2 is a floor found by reading rather than a count.

Two qualifications that decide how the rate should be read. The checking clusters in seats operating under written doctrine, and all three failures were reading-time failures with both uncaught ones from seats outside it — so the rate measures the model under instruction it already has. And the measuring agent produced two false zeros while measuring: a detector reporting 38 where the truth was 485, from a `re.X` bug welding a string into one token, and a wait loop that exited having waited for nothing.

Horizon: one workstation, one day. Content spans 2026-08-03 to 2026-08-07 with 715 of 776 files beginning on 08-07. A zero here means not on this machine in the day swept. 1.6% of episodes come from sibling subagents of the measuring session and were not excluded.
