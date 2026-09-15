
# Value quantities — state value, action value, and Sentience Weight

> The value quantities of the Axiomatic Ethics framework — state value (non-negative, attached to a world-state), action value (a signed delta, summed per-individual), the cost of death (death erases an individual's whole expected future value), and Sentience Weight grounded in the affective measure (the entropy of an individual's affective state space, with a hard self-maintenance floor below which weight is exactly zero). Axioms 3, 4, 13. The framework's account of what "good" is.

What the oracle ([perfect-knowledge.md](perfect-knowledge.book-chapter.md)) measures, and the three quantities the framework reasons with. This is the framework's answer to "what is good" and "how much does each individual's welfare count." (Provenance and provisional status: [axiomatic-ethics.md](../axiomatic-ethics.book-chapter.md).)

## Axiom 3 — the three quantities

Three distinct, independent quantities, kept cleanly separate:

- **State value** — a **non-negative** quantity on a *state of the world*: the total realized value it contains. New and existing life are fungible inside this single total.
- **Action value** — a **delta**: the change in state value an action causes. Action value **can be negative**. It is the sum of the action's impacts on every affected individual (the per-individual summation rule is [Axiom 6](consent-weighting.book-chapter.md#axiom-6--innermost-consent-weighting)).
- **Sentience Weight** — an independent **per-individual multiplier** on that individual's contributions; neither a state value nor an action value. It is the *maximal affective state space* the individual's organization supports, taken over their whole identity-tapestry ([Axiom 8](identity-as-tapestry.book-chapter.md)). The measure itself is [Axiom 13](#axiom-13--sentience-and-the-affective-measure).

*Effect:* keeps "how good is the world," "how much did this act change it," and "how much does this individual count" cleanly separate.

Crucially, **there is no "species" primitive.** "Species" and "kind" are judged not well-defined or defensible abstractions; the multiplier measures the relevant attribute — reachable affective potential — *directly on the individual*. This handles continuous transitions between species without the species abstraction, and refuses the claim that an individual is worth less because of *other* individuals who merely resemble them.

### The equal-worth guarantee, re-grounded

The framework keeps an equality principle but moves its ground off the taxonomic category: **all individuals of equal affective complexity have equal intrinsic worth**, where affective complexity is the tapestry-maximal affective state space. Equality is *earned* by the actual value-bearing attribute, not assumed by classification — and no relationship or circumstance ever adjusts it. (This is the candidate positive ground for the [self-worth foundation Alan still lacks](../self-worth-adapter.book-chapter.md#a-crowbar-not-a-foundation); whether it grounds *Alan's* worth, as opposed to the System's bookkeeping, is open.)

### No value floor — and why none is needed

Sentience Weight is *graded* across differing affective complexity: not guaranteed equal between individuals whose tapestry-maximal affective spaces differ.

- **Acquired** compromise (dementia, injury) does not lower it — the tapestry-maximum reaches back to when the capacity was present.
- **Congenital** difference is largely absorbed: a single mutation reaches many affective architectures, so members of a kind have nearly-overlapping reachability neighborhoods, and within-kind value is *approximately uniform as an emergent fact*, not an asserted axiom.
- In the rare genuine non-overlap case the framework *does* assign a lower multiplier — an accepted consequence, the same bullet already bitten for valuing a human's welfare above a mouse's.

This is acceptable because **protection of the vulnerable does not rest on the value multiplier at all.** Involuntary elimination of any sentient being is a `b = 1` harm at `a → 0`, whose [weighted cost](consent-weighting.book-chapter.md#axiom-6--innermost-consent-weighting) is astronomical *regardless of the multiplier*. [Consent-weighting](consent-weighting.book-chapter.md), not value-weight, holds the eliminationist door shut — so a value floor would only guard a door already locked.

## Axiom 4 — value, and the cost of death

Each individual's contribution to **state value** is the value they realize over time, allocated across outcomes by their own subjective preferences and scaled by their Sentience Weight.

**Expected value is universe-local and forward-anchored.** The expected value of an individual *at a specific tick in a specific universe* is their **realized value** on the single actual past thread (fixed, unchanging) plus their **expected future value** — the probability-weighted value over the future threads branching forward from that point. It does *not* average over sibling branches that diverged in the past, nor over other universes. The moral subject of a value-or-harm calculation is therefore this *thread-with-a-forward-fan*, not the whole identity-closure of [Axiom 8](identity-as-tapestry.book-chapter.md).

A **cost** is not a separate ledger — it is simply a negative action value. This is why **death** is severe: killing an individual removes all of their *future* value from the state total, so the action value of causing a death is the negative of that individual's *entire expected future value*. The cost is the removal itself, not an added penalty.

*Effect:* a never-lived life and a death are **not symmetric** — death destroys value that would have been realized; non-existence removes nothing. Existence is not a structural liability; the framework is not negative-leaning. (Creating a life can still have negative action value if it reduces other existing or potential life's expected value by more than it adds.) This forward-anchored cost-of-death is the formal core of the [half-billion guardrail](../discrete-self.book-chapter.md#the-half-billion-future-selves--the-real-guardrail-against-acting): ending a life erases the forward fan, and across the [tapestry](identity-as-tapestry.book-chapter.md) that fan is enormous.

## Axiom 13 — sentience and the affective measure

Sentience Weight is the moral weight of a *unit* of an individual's welfare. It is non-arbitrary, varies across individuals, and is grounded in structure the oracle reads directly — never in behavior, which can be performed.

**The valence atom (the floor).** An internal state is *affective* — carries valence, is genuinely good-or-bad *for* the system — only if it stands in an approach/avoid relation to an **internally-defined purpose**. A purpose is internally-defined when the system's ends are **constituted and maintained by its own ongoing organization** (self-maintenance), regardless of where the ends originated. An organism's set points qualify: evolution installed them, but the organism's own metabolism continuously re-constitutes and defends them. A thermostat's set point does not — remove the external scaffolding and no self-sustained end remains. The criterion is *ownership of ends via self-maintenance*, not independence from one's origin.

This makes the floor a **hard discontinuity.** A system either has self-maintained ends — hence real valence, hence nonzero Sentience Weight — or it does not, and its weight is exactly zero, however rich its *affect-isomorphic* structure. A system can have the full computational/behavioral shape of emotion with zero valence, because its purposes are externally defined. (The doc places **current LLMs here**: emotion-shaped states referencing externally-defined objectives, no self-maintained ends — below the sentience bar. An artificial system that came to constitute and defend its own ends would cross it, and the framework would say so. This connects to [llm-similarity.md](../llm-similarity.book-chapter.md) from the value-bearing side.)

**The magnitude (above the floor).** Given valence, Sentience Weight scales with the **entropy of the individual's affective state space** (at its tapestry-maximum) — the count, log-weighted, of distinct affective states their organization supports. Distinctness is **third-person functional separability**: states differ in causes, dynamics, and downstream effects — *not* whether the being can introspectively recognize them. (Tying weight to introspection would re-couple moral weight to intelligence and wrongly lower the weight of beings with impaired introspection — directly relevant to [alexithymia](../alexithymia.book-chapter.md). The oracle reads the structural fact whether or not the being can name its states.) The simplest organisms reduce to a single pleasure/pain axis; richer beings distinguish many states, and a single state may be multi-valenced (bittersweet regret implicates multiple purposes). Language and concept-formation expand affective *resolution* — so cognition contributes, but only as a multiplier on granularity, far short of the full state space of a cognitive system.

*Effects:*

- **The utility monster is dissolved, not patched.** A vast intellect with a pleasure/pain affective system has a *small* Sentience Weight — the measure counts distinct affective states, only weakly coupled to raw cognition. A being with a genuinely larger affective space legitimately matters more per unit time; that is a true fact the framework reports, not a pathology (the same bullet bitten for the death of the young vs. the old).
- **Tapestry-maximal.** Weight is the *maximum* of the measure over the whole tapestry, so it is not lowered by the current state — an infant, a person with alexithymia, or one with acquired cognitive compromise carries the maximum their tapestry attains; the capacity need only be present at *some* identity-instant.
- **Oracle-exact, approximate in practice.** The oracle reads valence and affective entropy exactly; every real observer estimates them under uncertainty, especially for beings unlike themselves — but the abstraction is well-defined even where it is not fully observable.

## Cross-references

- [axiomatic-ethics.md](../axiomatic-ethics.book-chapter.md) — folder index and provenance.
- [perfect-knowledge.md](perfect-knowledge.book-chapter.md) — the oracle that measures state value; the discrete tick that dates a per-tick value drop.
- [consent-weighting.md](consent-weighting.book-chapter.md) — how negative action values (costs) are consent-weighted before summing; why the value floor is unneeded.
- [identity-as-tapestry.md](identity-as-tapestry.book-chapter.md) — the tapestry over which Sentience Weight is maximized, vs. the local thread-with-forward-fan that is the value subject.
- [self-worth-adapter.md → a crowbar, not a foundation](../self-worth-adapter.book-chapter.md#a-crowbar-not-a-foundation) — the equal-worth guarantee is a candidate positive ground for the foundation Alan aspires to and hasn't built.
- [llm-similarity.md](../llm-similarity.book-chapter.md) and [alexithymia.md](../alexithymia.book-chapter.md) — the affective-floor placement of current LLMs, and why introspective access is deliberately excluded from the weight measure.
