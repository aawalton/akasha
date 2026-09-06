
# Perfect knowledge — the two oracles, the tick, and scale-freedom

> The perfect-knowledge scaffolding of the Axiomatic Ethics framework — the two oracles (perfect state-value measurement and multiversal Shapley attribution), the discrete canonical tick that supplies an unambiguous atomic harm, and scale-freedom (an action is an action at any extent). Axioms 1, 2, 7, 11. Captured as the framework's epistemic premises, articulated through the "System" but reasoned by Alan.

The framework's central move is to **grant the idealized agent perfect knowledge** and ask what ethics follows. This removes the two objections that do most of the work against utilitarianism — that we can't predict consequences, and that we judge states rather than agents — and lets the remaining structure be examined cleanly. (Provenance and the provisional status: [axiomatic-ethics.md](../axiomatic-ethics.book-chapter.md).)

## Axiom 1 — the oracle of value

The System has a black-box oracle that perfectly measures the **probability-weighted state value** of every possible state of the world. State value is **non-negative**: the total realized value present in a state, including the probability-weighted value of all potential future life.

*Effect:* eliminates the epistemic objection to utilitarianism. The idealized agent never errs about consequences. (For a real agent without the oracle, this is the premise that is *false* — which is exactly the seam between the System's ethics and a usable human ethics.)

## Axiom 2 — multiversal Shapley attribution

Combined with Axiom 1, multiversal simulation data lets the System perfectly compute the **Shapley value** of every agent's contribution to changes in state value. This solves the *attribution* problem: the System can fairly assign credit and responsibility to individual agents, not only judge states.

The Shapley value is the unique credit-allocation satisfying four properties, all of which the framework leans on downstream:

- **Efficiency** — attributed contributions sum exactly to the total payoff (full coalition minus empty coalition).
- **Symmetry** — two agents who contribute identically to every coalition get equal attribution (so attribution is identity-independent).
- **Null player (dummy)** — an agent who adds nothing to any coalition gets zero.
- **Linearity (additivity)** — attribution for a sum of games equals the sum of the attributions (so credit decomposes and recomposes across sub-games freely).

## Axiom 7 — the discrete canonical tick

The universe is taken to be **fundamentally discrete** (Planck-grained time, distance, energy). This hands the framework a *canonical event* for free: the atomic harm is the drop in an individual's probability-weighted expected value across a single tick, `t → t+1`. The sub-game for that harm is every agent's Shapley contribution to that specific per-tick drop, summed across all of history and all branches continuous with that instant.

Four consequences:

- **No carving ambiguity.** The tick is the finest possible grain; a harm cannot be sub-divided below it, so every actor judged against a harm sees the *same* sub-game. Consent-scoring (see [consent-weighting.md](consent-weighting.book-chapter.md)) is therefore actor-independent.
- **Scale-free by Linearity.** A harm spanning many ticks is the linear sum of per-tick sub-games; aggregating or decomposing over any interval gives identical results.
- **A present reduction in expected future value is a present harm.** The harm is dated to the tick on which the *probability resolves*, not the tick of physical impact — so authorship tracks whoever moved the odds, possibly long before the physical event. Distant harm is *lighter*, only because the future still holds other options (including the individual dying of other causes first); the lightness is pure probability-weighting, not time-discounting.
- **Observation is multiverse-global; causation is not.** The oracle observes across branches for accurate measurement, but no causal mechanism crosses branches beyond standard QM. An agent in one branch cannot harm an individual in another; cross-branch Shapley attribution is structurally zero wherever there is no causal pathway. (This is what keeps consent from being launderable across branches — see [identity-as-tapestry.md](identity-as-tapestry.book-chapter.md).)

## Axiom 11 — scale-freedom and composition

Because the oracle and the attribution are global, ethical evaluation is **scale-free**: an action is an action at any extent. A Planck-tick push, a valley-altering project, and the founding of a centuries-long regime are all evaluated by the same operations — there is no privileged scale. A regime is just a very large, multi-agent, long-duration action.

So verdicts at different scales **need not agree**, and the disagreement is not a contradiction: a single decision can be permissible in isolation while the larger regime that produces such decisions is impermissible (e.g. a regime that *domain-traps* a group — forecloses their agency across whole domains — is a concentrated, low-consent harm condemned at the regime scale even where each decision it spawns passes at the decision scale). Two rules make this coherent:

1. **Each agent is bound at the scale of what they actually authored.** Shapley already assigns every agent a share of every object at every scale. The agent who carries out one decision has a large share of that decision and a negligible share of the regime; the architects have the reverse. "Which verdict binds whom" is read off the attribution, not chosen.
2. **Attributions from different-scale games are never summed.** Each game is its own closed accounting. A harm appearing in both a decision-game and the enclosing regime-game is *not* counted twice — in each game it is attributed to a different set of authors, and Efficiency holds within each game separately. Summing an agent's shares across nested games is exactly what Shapley does not license.

*Effect:* "fractal ethics." The framework operates at every level, and the ethical status of a part never guarantees the status of the whole or vice versa. The slippery "chain of individually-fair steps" worry is diagnosed as a *scale-confusion* — judging a large authored object by the verdicts on its small parts.

> *Edge case:* a regime architect who *also* personally carries out a decision is charged in both games, correctly, because they authored two distinct objects. The test is always *distinct authored objects*, never distinct scales; where scale and authorship diverge, authorship governs.

## Cross-references

- [axiomatic-ethics.md](../axiomatic-ethics.book-chapter.md) — folder index, provenance, and the System-vs-Alan distinction these premises sit inside.
- [value-quantities.md](value-quantities.book-chapter.md) — what the oracle measures (state value) and the three quantities built on it.
- [consent-weighting.md](consent-weighting.book-chapter.md) — Agency is the Shapley attribution of Axiom 2 normalized; the tick of Axiom 7 supplies the actor-independent sub-game it is computed over.
- [absolute-truth-and-ethics.md → ethics as lossy approximations](../absolute-truth-and-ethics.book-chapter.md#ethics-as-lossy-approximations-of-a-compact-generator) — Alan's hypothesis that ethics is a compact generator; the oracle is the device that lets this framework *be* the generator rather than an approximation.
