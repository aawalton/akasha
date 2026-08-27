---
id: ae06703f-4849-5111-a0cf-4a67a4e10ff9
page-type-slug: finding
title: "Subagent model launch mode"
domain-slug: page-type/subagent
---

# Claim

In supervisor-env.ts, `CLAUDE_CODE_SUBAGENT_MODEL` is emitted only when a seat is not headless, keying subagent model pinning to launch mode rather than to the resolved parent model computed in supervisor-interactive-spawn.ts:119-122. The defect is latent today because `defaultWorkerModel` and `defaultHeadlessModel` both resolve to `opus[1m]`, but it will fire for any persona with a premium `defaultModel` spawned headless.

# Evidence

Project #17290, domain `subagent`, status someday_maybe, live-on deploy. Captured, never defined (no objective was written).

`supervisor-env.ts:323` emits `CLAUDE_CODE_SUBAGENT_MODEL` only when `!headless`, justified as "a foreground Fable session bleeds Fable into every subagent." The real predicate should be the RESOLVED PARENT MODEL, which `supervisor-interactive-spawn.ts:119-122` computes three lines earlier and does not consult.

Currently latent: both `defaultWorkerModel` and `defaultHeadlessModel` are `opus` on the aawalton claude-account row, and `toCliAlias` appends `[1m]` from `extendedAvailable` alone, so nothing is bleeding right now. It fires the moment a persona carries a premium-tier `defaultModel` and is spawned headless — the direction the fleet is moving, since resident personas are headless by construction.

Sibling defect, same category: `resolveWorkerModel`'s `defaultHeadlessModel` arm (`supervisor-account-config.ts:135-138`) keys a cost/quality tier on launch shape. May be correct as policy (Alan's doctrine: headless agents run Opus) but should be keyed on what it means rather than inheriting the collapse by accident.

Success criteria the (never-run) definition act should weigh: (1) `CLAUDE_CODE_SUBAGENT_MODEL` decided by resolved parent model, not launch mode; (2) `resolveWorkerModel`'s headless arm either justified in place or re-keyed; (3) the latent case demonstrated (a persona with non-default `defaultModel`, spawned headless, observed pinning subagents correctly) rather than argued; (4) effort untouched — Alan's ruling is peak capability and peak burn, capacity pressure answered by account rotation, not by lowering effort.

Moved off the row's retired `notes` attribute on 2026-08-15.
