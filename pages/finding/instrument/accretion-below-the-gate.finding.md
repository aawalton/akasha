---
id: 15bc2f77-50bf-57a3-a6fd-c8f0a6f1bbc0
slug: accretion-below-the-gate
page-type-slug: finding
title: "Accretion below the gate"
domain-slug: domain/instrument
---

# Claim

A failure small enough to pass every check accumulates into one nothing checks for. Each instance is within tolerance, so the per-instance gate is right every time it admits one; what is out of tolerance is the sum, and no instrument holds the sum. The gate is green across the whole span in which the thing happens, and its greenness is what makes the span invisible.

# Evidence

The instance, in the words of the lead who wrote it. `dirty/skills/narrative-game-engine/rulings.md`, emptied 2026-08-07: "Canon changing the protagonist into someone the player does not want to spend time with … canon accreting a character nobody authored, slowly enough that no single turn is worth objecting to."

The per-instance gate. `ops awen gate-turn` records "a per-turn quality-gate verdict onto a DRAFT game-turn", checked against the `gateDimensions` census the GM doctrine pack carries. Read from the live pack via `ops awen gm-load --game the-tower` rather than from `GATE_DIMENSIONS_SEED` in code: one dimension is `[setting-coherence]` — "the narrative does not contradict landed canon". A turn that CONTRADICTS canon is caught. A turn that ADDS to canon, in character, consistent with every prior turn, and one degree further from the person the player wanted, contradicts nothing. It passes, and so does the next.

The cross-turn instrument does not close it. `ops awen tally` tallies published turns "against the doctrine's cross-turn tally catalog — voice-distinctness template hits, let-verb rate, greppable telling proxies, and length/turn-length stats", and its own help says "The raw count is a SCREEN, never a finding". Those are surface counts; a protagonist becoming somebody else is semantic and hits no template. So the cross-turn reading spans the failure and cannot see it either.

Against `domains/instrument.md`. **Negative Control**'s repair is to show the instrument the case it must catch while you build it. That does not reach this: no single instance IS that case, so the control passes honestly on every specimen anyone could show it.

Nothing carries it. A sweep of `findings/narrative-engine/` and `findings/awen/` for `per-turn|accret|drift|below the threshold|no single turn` returns zero lines. `design-audit-cannot-see-an-absent-row.md` is the nearest and is a different gap: that instrument cannot see a row that does not exist, where this one sees every instance and each is fine.
