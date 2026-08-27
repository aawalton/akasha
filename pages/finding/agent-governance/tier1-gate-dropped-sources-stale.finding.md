---
id: c504d8b5-b79e-560e-89bc-46b0d6148390
slug: tier1-gate-dropped-sources-stale
page-type-slug: finding
title: "Tier1 gate dropped sources stale"
domain-slug: domain/global
---

# Claim

Alan ruled on 2026-07-25 (via ask-alan) that editing Tier 1 Global Principles (`~/.claude/CLAUDE.md`) no longer needs his approval — "Gate dropped — proceed without asking" — settling a contradiction three sources disagreed on that agents had rediscovered three times, but only one of the three (`.claude/docs/context-tiers.md:43`) had been confirmed to match the ruling; the other two still needed their wording verified before editing.

# Evidence

Project #16318 (domain: agent-governance, status: someday_maybe, live-on: commit). No objective written: row captured, never defined; this is its capture, moved off the row's retired `notes` attribute on 2026-08-15.

Alan's ruling, 2026-07-25, via ask-alan: "Does editing the Tier 1 Global Principles (~/.claude/CLAUDE.md) still need your approval?" Answer: "Gate dropped — proceed without asking."

Contradiction this settles: three sources disagreed and agents kept rediscovering it — #16279's worker hit it as the third instance, triggering the ask.
- `.claude/docs/context-tiers.md:43` — "No approval gate (dropped by Alan 2026-07-09), but changes here reach every agent — edit with corresponding care." Correct, matches the ruling; leave it.
- `.claude/docs/backlog-management.md` — reported as still requiring approval, not confirmed: a grep found general Approvals-gate language at lines 13, 92, 107, 125 but nothing unambiguously asserting a Tier-1-edit gate. Possibly the reporting worker read a general clause; needs confirming before editing.
- A helper row's `workLoop` (reported as seq 11) — reported to say "ask Alan to approve." Data, not a tracked file, so no repo grep reaches it; `bun ops page show 11` returned nothing, so the seq may be wrong and the row needs locating.

Scope: bring every source into agreement with the ruling (no gate on Tier 1 edits), preserving the "edit with corresponding care" framing context-tiers.md already carries.

Why a row not an inline fix: the contradiction cost three agents time independently — the defect is in the sources, not one agent's reading.

Method note: two of the three sources were reported by a worker, unverified first-hand (one grep errored on unicode complexity, one page lookup returned empty). The ruling is solid; the inventory is not — treat "source X says ask Alan" as a claim to check, not a fact.

Not dispatched: fleet capacity gate closed at filing (deployment+verification 5, active-earlier 14).
