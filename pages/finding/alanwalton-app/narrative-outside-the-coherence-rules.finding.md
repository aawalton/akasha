---
id: 14eac2d5-9acd-5352-8833-9b22db62acd4
slug: narrative-outside-the-coherence-rules
page-type-slug: finding
title: "Narrative outside the coherence rules"
domain-slug: domain/alanwalton-app
---

# Claim

No coherence rule governs a persona's `earningNarrative`, so her prose account of how she earns can contradict her declared faucet recipe with nothing detecting it. `PERSONA_FAUCET_COHERENCE_RULES` covers `faucetKind`, `faucetAggregate`, `faucetSource`, `faucetPointField` and `pointsPathPrefix(es)`, and not the narrative. Measured live today: four of the fourteen personas declaring `owned-project-completions` carry narratives describing committed bytes instead, and two carry no narrative.

# Evidence

Measured 2026-08-07 against the live database and `~/code`, while emptying `dirty/skills/persona-craft/economy-family-completions.md`, whose closing section names the same four personas and is queued for removal.

The rule set. `packages/alanwalton/personas/core/src/faucet-coherence.ts` declares `PERSONA_FAUCET_COHERENCE_RULES` in forty-two lines: two `valueIn` rules over `faucetKind` and `faucetAggregate`, and four `requires` rules keying `faucetAggregate` to `pointsPathPrefix`/`pointsPathPrefixes`, `faucetSource` and `faucetPointField`. No rule names `earningNarrative`. Its header says the deployed guard reads the page-type ROW and expects a superset carrying the `role` taxonomy — so the deployed set may hold more, but a rule shaped like these can only relate declared keys to each other, and a narrative is free prose.

The population. `ops page list --type persona --properties slug,earningNarrative,faucetSource,faucetKind --limit 200 --json` returns 42 persona rows. Fourteen declare `faucetSource = owned-project-completions`. Four carry an `earningNarrative` matching /byte|committed bytes|git/i: Astra, Athena, Awen and Ember. Nimue declares that source and carries no narrative; Aura carries none either, at `faucetKind = delta` with no source. The other ten read consistent with their recipe.

So the drift is four rows in fourteen, all migrated off a byte faucet with the machine-readable half updated and the prose left, none reachable by the guard that runs on every write.

What this adds. `alanwalton-app/faucet-coherence-drift-denied.md` records a different drift — the engine's copy of the rule set against the authoritative row — and says nothing about which keys are covered. `alanwalton-app/persona-row-promises-a-retired-value-split.md` records one contradicting narrative, and closes by declaring the same thing unmeasured: whether anything reads `earningNarrative`.

Not established: whether the deployed page-type row carries a rule the constant lacks.
