---
id: 0fc366c0-3bd6-5df0-9921-d1eab3fc1230
slug: rapport-denominator-fixed
page-type-slug: finding
title: "Rapport denominator fixed"
domain-slug: domain/temper
---

# Claim

The Companion Rapport summary card's denominator is a hard-coded 8 × 4000 = 32000 regardless of whether any character was ever synced, while its numerator is character-sourced with no measurement guard, so an account with no measured characters renders a confident 0/32000 rather than showing no data; three UI guards written to hide the card when there is nothing to show are permanently unreachable as a result.

# Evidence

Filed as project #15964 (domain temper), out of #15951 by agreement with #15942, which declined to bolt it onto either row. A fabricated denominator, not numerator, plus three dead guards it keeps alive.

Does not fire on any account either row could observe: Alan is fully measured (companion-rapport 32000/32000 genuine, traced in #15951 — 19/20 character rows carry companionRapport, Erin Solstice carries all eight defIds above the 4000 clamp). Invisible on both known-bads, hence filed rather than fixed.

Mechanism: `completion-summary-companion.ts:70-71` does `rapportTotal += MAX_COMPANION_RAPPORT` once per entry of `compTotals`, seeded from `transformCompanionProgress`, which walks the static companion catalog — denominator is a hard 8×4000=32000 regardless of what synced. Numerator is character-sourced (`maxRapportByCompanion`, `completion-companion-progress.ts:44-55`) with no measurement guard: #15942 added `isCharacterMeasured` to `transformCharacterCompanionRapport` (~line 135, character-scope card) but not to this loop (companion-scope card). Consequence: an account with no measured characters renders a confident 0/32000.

Why not a one-line guard: adding it alone leaves 0/32000; honesty requires the denominator to also collapse when no character was measured — a per-card design decision, the same per-fact-vs-per-entity call #15951 made for companion-level (#15942's reason for filing rather than taking it).

Three dead guards this constant keeps alive (never fire while total is constant 32000): `companions-summary-panel-card.tsx:31-32`, `overall-summary-panel-card.tsx:59-66`, `companion-rapport-panel-card.tsx:31`. Fixing the denominator revives all three at once.

Ownership: character-sourced, belongs with character-measurement gating (#15942's read).

Second fact from #15951: temper-account is pre-created by four unconditional call sites before any data-dependent branch, in import-companions.ts, import-characters.ts, import-completion.ts, import-sales.ts.
