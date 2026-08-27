---
id: 7af2193b-66dd-5c15-9f21-87453f2a13bc
page-type-slug: finding
title: "Agent chain docs stale"
domain-slug: domain/dispatch
---

# Claim

The instruction tree still describes an obsolete agent layer chain — `domain-first-agents.md`, `agent-roles.md`, the agent-harness domain skill and `active.md` describe lead as spawning managers, rather than Alan spawning intake, intake spawning lead, and lead spawning managers — and `domain-lead-engagement.md`'s escalation guidance (lines 19-21) assumes an attended lead, which a headless one cannot satisfy since `ops seat alert` refuses under `AGENT_HEADLESS=1`.

# Evidence

Project #17266 (domain: dispatch, status: someday_maybe, live-on: commit), captured 2026-07-29T11:29:20.522Z from athena-intake's headless/interactive audit; never defined with an objective — moved off the row's retired `notes` attribute on 2026-08-15.

Two docs carry a four-layer chain (lead-manage-deliver-subagents, lead at top) now wrong: `domain-first-agents.md` and `agent-roles.md` (intake as a subordinate spawned by a principal). The agent-harness domain skill and `active.md` also describe lead as holding the proactive half. Correct chain: Alan spawns intake, intake spawns lead, lead spawns managers, managers dispatch deliver workers.

`domain-lead-engagement.md:19-21`: "Interactive sessions only. A headless seat has no human terminal, so the verb refuses rather than alerting nobody — a worker that needs Alan escalates to its principal, who alerts from its own session." `ops seat alert` correctly refuses when `AGENT_HEADLESS=1` (`packages/agents/cli/src/agent/alert.ts:35`; writes an OSC escape to `/proc/$SUPERVISOR_PID/fd/1`, a log file for a spawned seat), so with the lead headless the doc's stated recovery cannot be performed. Not in the root routing table (verified against all 97 entries), it reaches leads only via the lead skill's routing. Its recovery also assumes the principal is ATTENDED, not merely interactive: a lead Alan started and walked away from tints a pane nobody watches, yet the doc reports the escalation as resolved.

No surface in the tree should still attribute the define-front to lead; the planned instrument was a one-time search, not proof none remains.

Ordering (parent's Safety principle): the classifier is code, live on deploy; the skills are instructions, live on commit. A fix relying on `ask-alan` or a seat rename must land and deploy the classifier first — deliberately not a `dependsOn` edge, per finding #17201: an intra-tree dependency releases only on a status the manage contract forbids a child reaching pre-deploy.
