---
id: 1d996eb1-c284-558d-ac88-4cd967a37296
page-type-slug: finding
title: "read what is required now judges subagents, and the seat backlog is what is left"
domain-slug: domain/checks-system
slug: subagents-now-judged-the-seat-backlog-remains
---

# Claim

Re-measured at `c3a1e2a5c` on 2026-08-27 21:52 MDT. The subagent half of the earlier reading is now false: a subagent owed 0 warrants and now owes 23 or 29, and 6 of 12 would be refused. The seat half is intact; no seat moved. Turned on as it stands the check would refuse 11 of 13 seats and 6 of 12 subagents, on 310 refusals, 261 of them carried by 9 agents. The check no longer measures the wrong agent. What is left is unread documents, a churn tax, and an owed set a compaction refills whole.

# Evidence

Both versions driven over one snapshot in one process, a synthetic act per agent, refusal strings compared. The pre-`7f97bd80f` check gives byte-identical refusal strings for all 13 seats and 0 warrants for all 12 subagents: the seat claim is untouched by both commits, the subagent claim false only because `7f97bd80f` changed it.

304 refusals never read, 6 changed since read. Two seats pass; the rest refuse 1 to 33 of sets of 28 to 38. Of the subagents six pass, four refuse one changed page, two all 23. The 261 belong to 9 agents refused on their whole set. Six are seats — aine, aranya, ki, nimue, ryn, vera — with no `*.seat.readings.uncommitted.attachment.json`: it does not exist, so every warrant is unread by construction.

A reading also expires. `agent/read-record.ts:159-172` drops every entry not later than a `context-replaced` mark; `tools/lib/epoch.ts:16` writes it and `:26` waives it only for a resume. Four seats carry an active `compact` mark. An owed set is therefore not a debt that shrinks as it is paid: a compaction refills it whole, unscheduled. How much of the 304 is never-read and how much re-owed after compaction is not separable: the six with no attachment are the former, the rest unknown.

A subagent's writer id is `<seat-uuid>--<subagent-id>` from `ACTING_AGENT_ID`; its page is named `<persona>--<subagent-id>`. Only the `subagentPageWith` fallback at `agent/read-record.ts:127` bridges them; the page stem refuses all 12 as agent-page-absent.

The 6 changed refusals came off 2 pages and 4 edits. `41a35eab5` added a Design line to `pages/page-type/check.page-type.md`; `4743110f0`, `b02d37202` and `1a2d7abd3` replaced a Design line and added a Rule to `pages/domain/pages-system.domain.md`. Every one of the six followed a material edit, so the tax was honest here. But the check compares whole bodies, and `1a2d7abd3` alone only reworded two aid lines — standing on its own it would have refused four agents for a plainer wording of the same claim.
