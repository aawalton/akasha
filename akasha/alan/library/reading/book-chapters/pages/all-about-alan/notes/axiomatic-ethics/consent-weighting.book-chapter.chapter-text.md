
# Consent-weighting — the keystone

> The keystone of the Axiomatic Ethics framework — Agency (an agent's normalized Shapley share of causal magnitude), innermost consent-weighting (the cost formula C = M·(1/a)^b, computed per-individual before summing), and harm-weighted agency for groups (the divisor Ā that makes minority protection structural). Axioms 5, 6, 10. The machinery that holds the eliminationist door shut and protects the maximally innocent most strongly.

This is the part that does the moral protecting. State value ([value-quantities.md](value-quantities.book-chapter.md)) says how good the world is; consent-weighting says which value-increasing acts are *forbidden anyway* because of how they fall on non-consenting individuals. It is what makes the framework refuse organ-harvest and Omelas at the root rather than by patch. (Provenance: [axiomatic-ethics.md](../axiomatic-ethics.book-chapter.md).)

## Axiom 5 — Agency

For any individual *P*, treat *P*'s realized value stream as the payoff of a cooperative game whose players are all agents in the universe. By [Axiom 2](perfect-knowledge.book-chapter.md#axiom-2--multiversal-shapley-attribution) the System computes the Shapley attribution `φ_i` of every agent *i*. **Agency** is *P*'s share of the total causal *magnitude*:

```plain text
Agency_P = |φ_P| / Σ |φ_i|        Agency_P ∈ [0, 1]
```

By **Linearity**, Agency evaluates over any linear sub-game — a life domain, an event, or a single harm — not just the whole life. By **Null-player**, an agent who alters *P*'s value under no coalition has zero attribution. By **Symmetry**, Agency is identity-independent. By **Efficiency**, attributions sum exactly to the stream's total.

**Sentient beings always have strictly positive agency** — derived, not assumed. By [Axiom 13](value-quantities.book-chapter.md#axiom-13--sentience-and-the-affective-measure), sentience *is* self-maintained organization — organization whose own states causally govern its persistence. Anything that can causally maintain its existence can causally fail to — so every sentient being had, prior to any harm, a nonzero-probability causal path (its own cessation) on which the harm does not reach it. It is therefore never a Null player in the sub-game for its own harm. The agency may be infinitesimal (a newborn has few such paths; an adult many) but it is strictly positive. The domain of consent-weighting is genuinely `(0, 1]`; `Agency = 0` is reserved for **non-players** — non-sentient entities — and is never occupied by a weighted victim.

**Why magnitude, not signed share.** Shapley attributions are signed, and negative attributions to *P*'s own stream are normal in any life containing harm (from malicious agents, antagonistic interactions, opportunity-cost crowding — not only *P*'s self-destructive choices). Normalizing by the signed total would not yield a bounded fraction; normalizing by total *magnitude* does. The consequence: Agency does not distinguish *P* authoring their own flourishing from *P* authoring their own ruin — both are high agency. This is intended. Valence belongs to the value calculation; **Agency measures only authorship.**

## Axiom 6 — innermost consent-weighting

An action's impact is computed **per individual first, then summed.** For each affected individual *P*, the System:

1. measures the **base harm** `M` on *P*'s expected value (positive magnitude of a negative impact);
2. if the impact is negative, multiplies `M` by the consent weight to get the **weighted cost** `C`;
3. **only then** sums all individuals' weighted costs (and *un*-weighted benefits) into the action's total action value.

The weighted cost:

```plain text
C = M · (1 / a)^b
```

- `a` = **ConsentScore** = `Agency_P` evaluated on the linear sub-game of *that harm* — *P*'s share of the causal magnitude of their own harm. `a ∈ (0, 1]` for any sentient victim.
- `b` = the harm as a **fraction of *P*'s total lifetime expected value**, `b = M / V_total`, `b ∈ (0, 1]`. `b = 1` for death (entire remaining value erased); `b ≈ 0` for a trivial harm.

**Benefits are not consent-weighted.** The weighting applies to action value only, never to state value. **Non-sentient entities take no weighting** — `a` is undefined rather than zero, and a harm to them is the bare state-change `M`.

**Why the exponent.** Harm-severity `b` sits in the *exponent*, not the base, so the *rate* of divergence as `a → 0` is itself severity-dependent. This dissolves the bounded/unbounded dilemma — it is not one function but a family indexed by `b`:

- **Trivial harm to an innocent** (`b ≈ 0`, small `a`): `(1/a)^b ≈ 1` for any realistic agency — the harm costs ≈ `M`, tiny, **tradeable** against ordinary benefits. A small harm to an innocent does not outweigh unbounded benefit.
- **Severe harm to an innocent** (`b = 1`, small `a`): `(1/a)^1 = M/a` — astronomically large, **effectively untradeable.** Organ-harvest and Omelas fail at the root.
- **At `a = 1`** (fully self-authored harm): `(1/1)^b = 1`, so `C = M` for any `b`. Self-harm costs its full magnitude — not forbidden (the agency is the victim's own) but scored as a real net-negative, hence unethical. Intended, not an artifact.
- **No infinity is ever realized:** `a` is strictly positive for every sentient victim, so `C` is always finite. Self-defense stays finite and comparable; the System can always adjudicate between two non-consensual harms by magnitude. The `a = 0` singularity sits only in the formula's closure, never its occupied domain.

**Maximal innocence, maximal protection.** A less-empowered being has a smaller agency floor (a newborn has fewer paths to self-cessation than an adult), so an identical harm yields a smaller `a`, hence a larger `C`. The framework protects the maximally innocent *most strongly* — the thing that makes consent-weighting *mean* something. **Solidarity is safe:** a rescuer's attribution sits in *P*'s denominator but only reshapes how *P*'s residual harm is weighted, and a successful rescue leaves little residual to weight; benevolence is never penalized.

## Axiom 10 — harm-weighted agency (the general consent divisor)

Axiom 6 weights one individual's harm by their own ConsentScore. For a decision harming many individuals unequally:

1. For each harmed individual *i*, take their agency `a_i` over the harm and their **share of the total utility harm** `w_i`, with `Σ w_i = 1`. Harm shares are in **utility**, never financial or material units.
2. Form the **harm-weighted agency** of the affected group: `Ā = Σ w_i · a_i`.
3. The decision is permissible only if `total_benefit > total_harm / Ā`. A group with `Ā = 0.5` requires benefit ≥ 2× cost; `Ā = 0.1` requires ≥ 10×.

The single-individual case is just `w_i = 1`, `Ā = a_i`. Weighting agency by *share of harm* **prevents laundering**: a severe harm to one low-agency person cannot be offset by padding the group with barely-harmed high-agency participants — their tiny `w_i` gives them tiny weight.

*Derived results:*

- **Minority protection is structural.** A harm falling on a group with little authorship over it has low `Ā` and demands a proportionally larger benefit — not because the group was counted and found few, but because their authorship was low. No headcount, no "who should be involved" stake function (both [tried and found circular](dilemmas-and-open-questions.book-chapter.md#abandoned-and-retired-machinery) under a perfect oracle); only realized agency shares, which are structural.
- **Redistribution is a democratic act, priced in utility.** Because harms are denominated in utility, the diminishing marginal utility of money is *already inside* the magnitude — taking a sum from the wealthy is a *small* utility harm, the same sum from the poor a *large* one. A transfer can clear `total_harm / Ā` even at low payer-agency, because the payer's utility harm was small to begin with. The framework reads utility and authorship, never dollars.
- **Concentrated influence erodes its own shield.** Agency is attributed over *all* causal channels — lobbying, media, agenda-setting, control of employment — not just votes. The more a wealthy class shapes a society's decisions, the higher their authorship of those decisions, including the decision to tax them — raising `Ā` for that harm and *lowering* the protection the multiplier extends to them. Concentrated power is self-eroding as a consent shield.
- **The willing donor.** A donor funding a public good bears a real utility cost at high agency: high `a`, and a `w` reflecting only the (often small) utility harm. Easily permissible. The identical financial gift *extracted* from someone for whom it is a large utility harm at low agency is an entirely different calculation.

## Cross-references

- [axiomatic-ethics.md](../axiomatic-ethics.book-chapter.md) — folder index and provenance.
- [perfect-knowledge.md](perfect-knowledge.book-chapter.md) — Shapley attribution (Axiom 2) that Agency normalizes; the actor-independent per-tick sub-game (Axiom 7) it is computed over.
- [value-quantities.md](value-quantities.book-chapter.md) — the base harm `M` is a negative action value; why the vulnerable are protected by consent-weighting rather than by a value floor.
- [identity-as-tapestry.md](identity-as-tapestry.book-chapter.md) — the commission/omission asymmetry that turns on whether this `(1/a)^b` factor is applied; partiality as consent-weighted harm to the bystander-intimate.
- [discrete-self.md → the half-billion future selves](../discrete-self.book-chapter.md#the-half-billion-future-selves--the-real-guardrail-against-acting) — the felt-side guardrail this machinery formalizes: ending a life is a `b = 1`, low-`a` harm summed over an enormous tapestry of forward fans.
