---
id: 0d9e8776-60c8-5dd9-a6ee-d037afcf97a3
page-type-slug: finding
title: "Default effort auto not in accepted set"
domain-slug: domain/agent-harness
---

# Claim

Alan ruled on 2026-07-30 that the global default reasoning effort should change from `max` to `auto`, but `resolveAgentEffortLevel`'s accepted set does not admit `auto` — it gates on `low`/`medium`/`high`/`xhigh`/`max` — so setting the DB row alone would be silently rejected and fall back to `max`.

# Evidence

Project #17361, domain `agent-harness`.

Alan's call, 2026-07-30: change the global default reasoning effort from `max` to `auto`. `auto` is not a ladder tier — Claude Code resolves `CLAUDE_CODE_EFFORT_LEVEL=auto` to no launch override, leaving each model's own default effort in force.

Two changes are both required: `resolveAgentEffortLevel`'s accepted set must admit `auto` (today it gates on `low`/`medium`/`high`/`xhigh`/`max`, so the DB row alone would be rejected and silently fall back to `max`), and `DEFAULT_AGENT_EFFORT_LEVEL` must flip to `auto`.

This reverses the standing "Effort stays at peak, by choice" ruling, so the system prompt prose that states that ruling changes with it.

Row carried no objective; text moved off the row's retired `notes` attribute on 2026-08-15.
