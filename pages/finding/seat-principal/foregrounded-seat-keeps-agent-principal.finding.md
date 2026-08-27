---
id: 39e93f3e-a448-5784-8cb4-3f19620681ba
slug: foregrounded-seat-keeps-agent-principal
page-type-slug: finding
title: "Foregrounded seat keeps agent principal"
domain-slug: domain/seat-principal
---

# Claim

A seat foregrounded into an attended session keeps the `principal: agent` it was spawned with, so its name goes on spelling every attribute and assignment and the Agents panel goes on nesting it under the seat that spawned it. Nothing about it says who is reading it now.

The rule and the writers below it do not fail: the seat verb writes a principal whenever it is handed one, and the launch fronts hand it one. What foregrounds an existing headless seat states nothing at all.

# Evidence

Measured 2026-08-12 on `amy-alan-harness-lead-define-project-18790` (`019ff22f`), the one live seat in the fleet reading `mode: interactive` beside `principal: agent`.

Its store records the principal at 2026-08-11T18:56:53Z, its spawn, and never again; the mode moved to `interactive` at 19:08:11Z and an availability was stated 2026-08-12T16:34:44Z, so two other writers reached the seat after the spawn and neither carried a principal. The row still names `parent_agent_id` 019fe8af, which is what the panel nests it under.

`bun tools/seat.ts --name --persona amy --domain alan-harness --role lead --task define-project --principal alan` spells `amy-lead`, and no row live or stopped holds that name — so the rename this is missing has nothing standing in its way.

The write path was run rather than read. The payload `an`/`ar` emit — `{"agent":…,"default":true,"mode":"interactive","principal":"alan"}` through `tools/seat-call.ts` — was put against a scratch seat holding `mode: headless, principal: agent`. The principal moved to `alan`; the mode stood, `default` writing only where nothing is held. So the verb does this correctly when a caller states it.

What foregrounds this seat is the extension, which now stands at `editor-extension/src/features/agent-tree/seat-acts.ts:147`, running `ops seat resume --start-mode interactive`; Alan has deferred the fix until it moves. `cr` in `tools/aw/init/bash-launchers.ts` shares the gap — it takes over, materializes the transcript and launches the supervisor with no seat statement — but it is not what was run here.
