---
id: 1d996eb1-c284-558d-ac88-4cd967a37296
page-type-slug: finding
title: "read what is required now judges subagents, and the seat backlog is what is left"
domain-slug: domain/checks-system
slug: subagents-now-judged-the-seat-backlog-remains
---

# Claim

Re-measured at `c3a1e2a5c` on 2026-08-27 21:52 MDT. The subagent half of the earlier reading is now false: a subagent owed 0 warrants and now owes 23 or 29, and 6 of 12 would be refused. The seat half is intact; no seat moved. Turned on as it stands the check would refuse 11 of 13 seats and 6 of 12 subagents, on 310 refusals. Nine agents carry 261 of them, and one `ops read --seat` each clears those. The check no longer measures the wrong agent; what is left is a backlog and a churn tax.

# Evidence

Both versions driven over one disk snapshot in one process, a synthetic act per agent, full refusal strings compared. The harness stood outside the tree and nothing was switched on.

The pre-`7f97bd80f` check on tonight's disk gives byte-identical refusal strings for all 13 seats, and 0 warrants for all 12 subagents. The seat claim is untouched by both commits; the subagent claim is false only because `7f97bd80f` changed it.

304 refusals never read, 6 changed since read. Seats, refused of owed: thea 0/38, athena 0/31, dalla 1/37, astra 9/32, amy 9/32, alan 25/30, ki 28/28, aine 30/30, vera 31/31, ryn 31/31, aranya 31/31, nimue 31/31, abby 33/33. Subagents owe 23 under astra and 29 under thea; six pass, four refuse one changed page, two refuse all 23.

261 of the 310 belong to 9 agents refused on their whole set. Six seats — aine, aranya, ki, nimue, ryn, vera — have no `*.seat.readings.uncommitted.attachment.json`. The attachment does not exist, so every warrant is unread by construction.

A subagent's writer id is `<seat-uuid>--<subagent-id>`, from `ACTING_AGENT_ID`, while its page is named `<persona>--<subagent-id>`. Only the `subagentPageWith` fallback at `agent/read-record.ts:127`, rescanning on subagent-id, bridges the two. Measuring with the page stem refuses all 12 with agent-page-absent. Neither the check page nor its test names this.

The 6 changed refusals came off 2 pages and 4 edits. `41a35eab5` added a Design line to `pages/page-type/check.page-type.md`; `4743110f0`, `b02d37202` and `1a2d7abd3` replaced a Design line and added a Rule to `pages/domain/pages-system.domain.md`. Every one of the six followed a material edit, so the tax was honest here. But the check compares whole bodies, and `1a2d7abd3` alone only reworded two aid lines — standing on its own it would have refused four agents for a plainer wording of the same claim.
