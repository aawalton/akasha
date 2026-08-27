---
id: 31f03bb1-b9f1-5b5f-83bb-f833721ed19a
page-type-slug: finding
title: "Acquire discards requested name"
domain-slug: domain/agent-harness
---

# Claim

`ops seat acquire` accepts a name matching a declared shape, then binds the row under the default name and attributes instead, so the seat the caller asked for by name is addressable only as `claude-global-worker`.

# Evidence

Measured on this workstation on 2026-08-15, driving the three seat boot paths after porting the supervisor's seat-spawn decisions.

`ops seat acquire port-19170-acquire-probe --prompt … --json` is refused, and the refusal is `setAgentName`'s: `undeclared-shape: 'port-19170-acquire-probe' matches no declared agent-name shape`. So the name a caller passes does reach the name grammar, and a name outside it stops the acquire.

`ops seat acquire claude-agent-harness-developer-flex-8-19170 --prompt … --json` then returns `{"agent_id":"01a00541-6098-7dea-a7f2-67b06ed596ab","name":"claude-agent-harness-developer-flex-8-19170","pid":648560,"status":"spawned"}` — the name echoed back is the one asked for.

The row is not. Read directly from `public.pages` where `page_type_slug = 'agent'`, that id carries `title` and `attributes->>'name'` both `claude-global-worker`, with `persona: claude`, `domain: global`, `role: worker`. The stated domain `agent-harness`, role `developer`, flex `flex-8` and seq `19170` are all absent. `ops seat stop` on that id likewise resolves the name to `claude-global-worker`.

The seat booted and reached a real turn, so nothing failed loudly. What drove that turn was not the `--prompt` seeded at acquire: a channel message addressed to the generic name drained into the fresh session and the seat answered that instead. The seeded prompt appears nowhere in the transcript.

A caller cannot tell any of this from the acquire result, which echoes the requested name back. The two seats acquired under different requested names collide on one generic name, and traffic queued to it reaches whichever holds it.

Contrast the same boot on `ops seat start`: that path bound `claude-agent-harness-developer-flex-9-19170` as both title and name, with `persona: claude`, `domain: agent-harness`, `role: developer` all present on the row.
