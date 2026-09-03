
# Dilemmas, settled dials, and open questions

> How the Axiomatic Ethics framework resolves the classic utilitarian objections, the settled design dials (sum aggregation, no time-discount, no value floor, linear harm-weighting), the machinery the doc tried and abandoned (stake function, headcount, ConsentScore floor, benevolence credit, intent), and what the doc itself leaves open vs. what is genuinely open for Alan. Captured as the framework's own self-assessment plus the his-vs-the-System and adapter-reconciliation threads Alan and Abby are about to explore.

The framework's own scorecard — what it claims to resolve, the dials it sets, the machinery it discarded along the way — and the threads that are still open. (Provenance and provisional status: [axiomatic-ethics.md](../axiomatic-ethics.book-chapter.md).)

## The classic objections, by the framework's own tracker

The doc closes with a status table claiming **every** classic utilitarian objection resolved:

| # | Objection | Resolved by |
|---|---|---|
| 1 | Epistemic / can't predict consequences | [Axiom 1 — the oracle](perfect-knowledge.book-chapter.md#axiom-1--the-oracle-of-value) |
| 2 | Attribution / judges states not agents | [Axiom 2 — Shapley](perfect-knowledge.book-chapter.md#axiom-2--multiversal-shapley-attribution) |
| 3 | Interpersonal comparison of utility | [Axiom 3 — three quantities](value-quantities.book-chapter.md#axiom-3--the-three-quantities) |
| 4 | Separateness of persons / involuntary sacrifice | [Axioms 4–6](consent-weighting.book-chapter.md) |
| 5 | Single suffering child / Omelas | [Axiom 6 — innermost weighting](consent-weighting.book-chapter.md#axiom-6--innermost-consent-weighting) |
| 6 | Repugnant conclusion / population ethics | bounded-total view (design notes below) |
| 7 | Value gerrymandering (engineered preferences) | judge the act, not the state (Axioms 7/9) |
| 8 | Demandingness | [Axiom 9 — obligation = cost-to-act vs. shared harm prevented](identity-as-tapestry.book-chapter.md#axiom-9--commission-omission-and-obligation) |
| 9 | Direct/indirect/omission & negligence | [Axiom 9](identity-as-tapestry.book-chapter.md#axiom-9--commission-omission-and-obligation) |
| 10 | Acts vs. intent | intent has no independent weight (below) |
| 11 | Tyranny of majority / minority protection | [Axiom 10 — harm-weighted agency](consent-weighting.book-chapter.md#axiom-10--harm-weighted-agency-the-general-consent-divisor) |
| 12 | Utility monster | [Axioms 3 & 13 — affective-entropy weight](value-quantities.book-chapter.md#axiom-13--sentience-and-the-affective-measure) |
| 13 | Structural injustice / scale-confusion | [Axiom 11 — scale-freedom](perfect-knowledge.book-chapter.md#axiom-11--scale-freedom-and-composition) |
| 14 | Partiality / special obligations | [Axiom 12](identity-as-tapestry.book-chapter.md#axiom-12--partiality-without-unequal-value) |

The doc's own "Open Questions" section reads: *"None outstanding — all classic objections resolved."* This is the framework's **self-assessment**, not an external verdict — and is itself one of the things Alan flagged as under-resolved (a framework that declares itself complete is exactly the kind of claim his [all-beliefs-are-provisional-drafts](../absolute-truth-and-ethics.book-chapter.md#all-beliefs-are-provisional-drafts--including-that-one) stance holds open).

## Settled dials

Design choices the doc fixes (each is a place the framework *could* have gone another way and didn't):

- **Aggregation operator — SUM.** State value and the Axiom 10 comparison are unweighted sums. Required for the Shapley axioms; aligns with "equality of suffering" — every unit of harm counts the same regardless of whose it is. (The valley case is accepted as fair when applied as a general rule.)
- **Standing agency — FROM BEING AFFECTED.** Agency is the pure Shapley attribution; standing to be weighted comes from *being harmed*, not from consenting to the decision procedure. Procedure-consent is just more causal contribution, already counted. The "process- vs. outcome-consent" dial *dissolves* (consenting to a procedure typically raises one's agency, but only insofar as it genuinely shifted the causal structure).
- **Beneficial preference-engineering — GENUINELY FREE,** with a caveat: many preference-shaping methods carry high negative-potential externalities (abuse potential) that can make them unethical *regardless of realized effect*. Mind-control tech is unethical even if only ever used well — the abuse potential its existence creates is priced as forward-fan risk (Axiom 7).
- **Harm-weighting curve (Axiom 10) — LINEAR.** Clear, defensible, aligned with equality-of-suffering.
- **Future-value discounting — NONE beyond uncertainty.** A perfect oracle needs no time-discount; distant value is lighter only because less probable, already captured by probability-weighting.
- **Maintained-state harm — NO SEPARATE CLAUSE.** Holding a variable away from where it would spring (ongoing captivity, a held device) is captured automatically: each tick, the choice to keep holding is evaluated against releasing, and the gap is a real per-tick harm — leaning entirely on Axiom 9's omission machinery.

Resolved design notes worth keeping: **population composition** (a larger lower-resource population can be a legitimate optimum since marginal utility of resources is roughly logarithmic; the ecosystem-collapse limit self-guards because degrading existing trajectories is prohibitive negative action value).

## Abandoned and retired machinery

The doc records several constructs **tried and discarded** — useful because they show the framework's edges:

- **Stake function `s_j` / headcount `N` — abandoned.** Attempts to define the consent divisor via "how many *should* be involved" or "how much of each agent's value is at stake." Both circular under a perfect oracle: the oracle's expected values are equilibrium quantities already shaped by the consent machinery, so any stake measure is downstream of the function it would feed. Axiom 10 reads only realized agency shares, which are structural.
- **ConsentScore floor — resolved with no floor.** The old `C = M/a` forced a false dilemma (any unbounded function → infinite cost for a trivial harm; any bounded one permits organ-harvest). Putting severity `b` in the *exponent* dissolves it, and the `a = 0` singularity is shown unoccupied. No epsilon floor needed.
- **Benevolence credit — declined.** A bonus for the *act* of helping would value the gesture over the outcome ("wrong kind of reasons"). Help is encouraged because it produces value, not because helping is scored.
- **Intent — retired.** Intent has no independent moral weight; it enters *only* as a predictor of an agent's future action value. Bad outcome from good intent → uncertainty (a fair gamble lost), no culpability. Good outcome from bad intent → the act stays scored good, but persistent bad intent prices as negative expected value in others' forward fans. Purely-unrealized bad intent that never moves expected value scores neutral — the consequentialist's accepted bullet.
- **Path-dependence and trajectory worries — retired.** The framework never sums separate per-action magnitudes; the harm to *P* is a *single* cooperative game over all causally-prior agents, with Efficiency fixing the total and Shapley attributing it once. Different attributions across differently-ordered worlds correctly report that the agents *did different things*.

## Cross-references

- [axiomatic-ethics.md](../axiomatic-ethics.book-chapter.md) — folder index and provenance.
- [perfect-knowledge.md](perfect-knowledge.book-chapter.md), [value-quantities.md](value-quantities.book-chapter.md), [consent-weighting.md](consent-weighting.book-chapter.md), [identity-as-tapestry.md](identity-as-tapestry.book-chapter.md) — the axioms the resolutions above invoke.
- [absolute-truth-and-ethics.md](../absolute-truth-and-ethics.book-chapter.md) — the provisional-draft stance under which "all objections resolved" is held open, and the compact-generator hypothesis this framework attempts.
