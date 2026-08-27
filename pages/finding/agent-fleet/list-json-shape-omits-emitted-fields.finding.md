---
id: 1b97dc0e-ac64-5b39-a1a6-d1bd57889281
page-type-slug: finding
title: "List JSON shape omits emitted fields"
domain-slug: domain/agent-fleet
---

# Claim

`ops seat list --help` prints its `--json` field list under the words "stable shape — callers may depend on field names", and that list omits four fields the verb actually emits: `io_blocked_holder`, `io_blocked_since`, `parent_agent_id` and `launch`. The same help discusses all four in prose further down, so a reader who stops at the shape block is told the contract is closed and handed a set that is not the one.

# Evidence

The enumeration in `ops seat list --help` runs `{ id, name, title, status, live, live_reason, live_subject, live_scope, live_observed_at, live_expires_at, live_state_entered_at, io, io_observed_at, io_last_advance_at, io_subject_role, io_custody_read, persona, total_cost_usd, context_percent, pod_name, created_at, updated_at }`.

`packages/agents/cli/src/agent/list-render.ts` declares `io_blocked_holder` at line 108 and `io_blocked_since` beneath it, both populated in `buildListRow` from `wedge?.evidence.blockedOn`, and `parent_agent_id` and `launch` at lines 44-45 and again at 130-134. `list-render.unit.test.ts` pins them.

The two `io_blocked_*` fields are the ones that make a `blocked-on` row actionable, and the same help says a `blocked-on` seat means "someone needs chasing" without naming the field that says who. The field's own comment in `list-render.ts` states the cost of not having it: "a reader who then has to open the project row to learn which person is back to noticing-and-going-to-look, which is the whole thing this reading replaces."

Found while ingesting `dirty/code/packages-agents-cli-claude.md`, whose `list` paragraph names `io_blocked_holder` and `io_blocked_since` among the `--json` fields. I probed to falsify the quarantined document and found the live help was the incomplete one.
