---
id: 2ccb64ab-cee0-557d-b33c-10a7d7f48959
slug: faucet-coherence-drift-denied
page-type-slug: finding
title: "Faucet coherence drift denied"
domain-slug: domain/alanwalton-app
---

# Claim

Two code comments about the same arrangement contradict each other, and the one a reader is likelier to meet is the false one. `faucet-engine.ts:122` says `PERSONA_FAUCET_COHERENCE_RULES` is "the same shared rule set the write-boundary guard enforces (one source of truth — the two cannot drift on what 'incomplete' means)". `faucet-coherence.ts`'s own header says the opposite: the deployed guard reads the persona page-type row, not the constant, and the constant must be kept equal to it by hand.

# Evidence

`packages/alanwalton/personas/core/src/faucet-coherence.ts`, header comment: "The deployed guard reads the persona page-type ROW, not this constant, and the row is authoritative: page-types are data, so its `coherenceRules` are maintained through `bun ops page-type update` and carry rules beyond the faucet ones (the `role` taxonomy). This constant is the engine's own copy of the faucet subset — keep it equal to the faucet rules ON the row, and expect the row to be a superset."

`packages/alanwalton/daily-tracking/src/faucet-engine.ts` lines 122-124, inside `parseFaucetRecipeInner`: "Coherence first, through the same shared rule set the write-boundary guard enforces (one source of truth — the two cannot drift on what 'incomplete' means)."

They cannot both hold. The rule set is hand-copied, so the two can drift, and the second comment tells its reader they cannot.

Nothing detects a difference. `PERSONA_FAUCET_COHERENCE_RULES` has three consumers besides its own export: `faucet-engine.ts:125` evaluates it, `faucet-coherence.unit.test.ts` exercises the constant against `CoherenceRulesSchema` and a table of attribute cases without reading any row, and `faucet-coherence-guard.database.test.ts:43` seeds a page-type row with `CoherenceRulesSchema.parse(PERSONA_FAUCET_COHERENCE_RULES)` before asserting the guard rejects — it constructs the row from the constant, so it is green whatever the deployed row carries.

The observation is about the comments rather than about a live incoherence: I did not read the deployed persona page-type row, so whether the two are equal today is unmeasured. What is measured is that no instrument would say.
