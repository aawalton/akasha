---
id: 61f67d66-6923-555e-92bd-68ce6f344b6e
page-type-slug: finding
title: "Reasons emitted by nothing"
domain-slug: domain/seat-turn-end
---

# Claim

`tools/lib/turn-end-reasons.ts` declares thirty-nine turn end reasons and the decider emits fifteen of them, so twenty-four names are carried by four hand-kept tables that nothing produces or consults.

# Evidence

Counted 2026-08-15 against the tree at c4b96dbf.

`TURN_END_REASONS` holds thirty-nine names. Every reason written comes from `tools/lib/turn-end-decide.ts`, whose `allow(` and `refuse(` calls carry thirteen distinct names, or from the hooks: `block-headless-halt.sh` records `no-agent-id` and `interactive-recorded`, `block-interactive-stall.sh` records `no-agent-id` and `not-interactive`, and `turn-end-decide-call.sh` records `verb-unavailable`. Fifteen distinct names between them.

The twenty-four emitted by nothing: `announce-sent`, `attended-wake-pending`, `awaiting-reply`, `command-wake`, `custodian-dead`, `headless-unassigned-idle`, `headless-unassigned-waking`, `headless-unfinished`, `headless-wake-pending`, `held-wake`, `held-wake-blocked-on`, `holder-dead`, `interactive`, `interactive-launch`, `live-child`, `no-binding`, `no-wake-source`, `open-question`, `own-act-next`, `session-cron`, `stall-refused`, `task-running`, `tool-wake`, `work-complete`.

Each is spelled four more times, in `VERDICT_BY_REASON`, `HELD_WAKE_BY_REASON` and `MODE_BY_REASON`, each `satisfies Record<TurnEndReason, …>`. That constraint holds the tables level with the list and says nothing about whether the list is level with the decider, so adding an arm is caught and retiring one is not.

They went dead on 2026-08-14 at bc150b293, which inlined the decision and retired the rules engine. Before it a reason was a rule's slug and the rule set was the population; nothing took that role over.

Not measured: whether a census over `~/agents/hook-decisions/*.jsonl` still needs the retired names to read records written before the inline.
