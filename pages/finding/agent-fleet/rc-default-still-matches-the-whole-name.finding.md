---
id: cefeee46-63ab-5a7e-b297-e8db006812c4
slug: rc-default-still-matches-the-whole-name
page-type-slug: finding
title: "Rc default still matches the whole name"
domain-slug: domain/agent-fleet
---

# Claim

The Remote Control startup default still matches a headless seat's WHOLE claimed name against a persona page slug, so a persona seated under a composed name resolves RC off. It is the last consumer with this shape: the declared-model resolver and wake-arming, the two it was found beside, have both moved to resolving the persona out of the seat, and its own docstring still points at the first as the pattern it mirrors.

# Evidence

Read 2026-08-07 against `~/code` at `ecf5f9518f`, while ingesting a quarantined findings cluster that recorded this beside two siblings.

`resolveRemoteControlAtStartup` (`packages/agents/supervisor/src/supervisor-remote-control-default.ts:116-139`) takes the headless arm through `deps.getClaimedName(agentId)` and hands that string to `deps.getPersonaRemoteControl(name)`. `readClaimedName` at `:85-86` returns the row's `name` trimmed, nothing more. The lookup at `:89-105` queries `pageTypeSlug: PERSONA_PAGE_TYPE_SLUG` keyed on `slug`, and `:127` returns `false` on a miss. No `splitSeatName`, no persona slot read.

The population is live and named. Running seats carrying a persona whose name is not that persona's bare slug: `amy-handler` and `amy-monarch` (persona `amy`), and `abby-all-about-alan-recorder` (persona `abby`). Each row carries the `persona` attribute — the slot the sibling resolver switched to — so the repair is available on the row already being read. The three personas declare no `remoteControlAtStartup`, so a match would default ON (`match.raw ?? true` at `:131`); the miss is what makes it OFF.

Not measured: whether those three were spawned headless. `opts.headless` is a spawn argument and the rows store no `mode` or `sessionKind`, so which of them has actually resolved OFF is not recoverable from the data. What is established is that the whole population able to produce it is non-empty.

Two things make it quiet. Interactive spawns return `true` structurally at `:122` before the name is read, so the same seat is in the app by hand and absent when spawned headless. And the docstring at `:48-50` says this "reads the name off the agent row … (mirrors `resolveDeclaredAgentModel`)" — which is now false: that resolver reads `getStoredPersona(agentId)`, and its own header says the tier follows the stored persona and not the spelling of a handle. The comment points at the repaired sibling as justification for the unrepaired shape.
