
# Grading scale

> The A-F grading scale I apply to organizations after the trust criterion has been evaluated. Bands have stated semantics, each anchored to a concrete example. Trust is composite — financial resiliency, ethics, political ideology, ownership structure — and the worst component drives the grade.

The A-F letter grades I assign to organizations once I have applied [trust-criterion.md](trust-criterion.book-chapter.md) and [capture-events.md](capture-events.book-chapter.md) to them. The grade is the shorthand the audit and plan use to communicate trust state at a glance.

## What the grade is

A single letter summarizing how much I trust an organization right now. It is the output of the trust assessment, not the input.

The bands are qualitative. Score-to-grade mapping is not yet rigorously specified — see the methodology section below for what is still open.

## The scale

### A — trusted unreservedly

Structurally aligned ownership that prevents future capture (e.g., irrevocable purpose trust, mission-locked governance), long demonstrated track record, active resistance under pressure, no current reservations on any component dimension.

The structural-insulation requirement is what makes A different from B — the trust doesn't depend on the ongoing virtue of current leadership.

**Example: Patagonia.** Yvon Chouinard's 2022 transfer of ownership to the Patagonia Purpose Trust and the Holdfast Collective structurally locks the mission against future capture. The governance change converts an aligned-but-capturable organization into a structurally insulated one.

### B — trusted with reservations

Strong track record and good current alignment, but at least one specific reservation prevents A. The reservation can be on any component dimension — financial resiliency, ethics, political ideology, ownership-structure capture-risk, or a specific product-line concern.

**Example: Costco.** B because of a specific reservation — Costco does not require third-party testing for the supplements they sell. Costco also carries structural capture-risk by virtue of being publicly traded, which is its own separate reservation. Strong on most dimensions, but the reservations are real and stop the grade at B.

### C — acceptable for now

No clear bad acts, no information either way — the assume-neutral default, not a positive assessment. Default tier for organizations I have not researched and have no reason to actively distrust. Includes "no alternative available, no concerning signal" cases.

### D — clear misalignment, but tolerable

Concrete concerns exist — financial-resiliency risk, ethics history, mission misalignment, ideology misalignment — and I am consciously accepting the cost of staying. Currently used because either (a) the dependency is low-stakes, (b) no alternative exists, or (c) switching cost exceeds the harm of staying.

**Examples from my current banking inventory:**

- **Intuit / TurboTax.** Concerns about Intuit's lobbying record blocking IRS free-file, plus the dark-pattern history. Cost is under $100 and about 30 minutes per year, so not urgent to exit despite the grade.
- **Citi, Chase, Synchrony, BSI, Venmo.** All carry concrete concerns — publicly-traded consumer-finance, fines history, profit-driven cobrand structure, or structural lock-in.
- **UCCU.** Downgraded to D specifically because of small-bank stability concerns post-SVB. Member-ownership alignment is strong on its own merits but doesn't offset the stability reservation.

### F — actively avoiding

Demonstrated bad actor to the point I can't tolerate using their products at all. Exit ASAP regardless of switching cost; never start a new dependency here.

**Example: OpenAI.** Textbook capture event. Non-profit foundation converted to a for-profit operating company, board drama in 2023, safety and alignment team departures, visible mission abandonment. Composes directly with [capture-events.md](capture-events.book-chapter.md) — trust resets to zero on capture, and OpenAI's post-capture behavior has been bad enough to push the grade all the way to F rather than back to C.

An F can also be a **wound** rather than a trust verdict: a company that once caused me immense personal pain past a breaking point, where any later association is a trauma trigger and the connection itself is a net loss regardless of utility. That tier — the flip criterion, why it runs opposite to dependency depth (Google D, Tesla F), and how it differs from the bad-actor F above — is treated in [grading-scale/wound-f.md](grading-scale/wound-f.book-chapter.md).

## Involuntary dependencies — the pseudo-F grade

The standard F grade prescribes "exit ASAP regardless of switching cost." When the dependency has no exit mechanism at all, that prescription is unactionable — the grade still needs to communicate "this is F-worthy behavior," but the action it implies has to change.

**Pseudo-F** marks a dependency where the *behavior* earns F but *toleration is not voluntary*. The grade indicates what I would do if I could; the strategy is constrained to **minimize exposure + monitor for escalation** rather than exit.

**Distinct from D-with-F-disposition.** When the holder rates the dependency F-worthy but tolerates it because the exit option is expensive-but-real, that's D-with-F-disposition, not pseudo-F. The IRS is the worked example — the behavior earns F (deliberate enshittification of taxpayer services, decades of underfunding, politicization signals), but expatriation is a real exit at an expensive-but-finite price, so the grade lands at D. Selective Service is the worked pseudo-F example — even expatriation doesn't undo prior registration obligation, so no exit exists at any price.

**Examples.** Selective Service per [government-services.md → Selective Service](government-services.book-chapter.md#selective-service) (mandatory federal registration, no exit even with expatriation for prior obligations). Other instances would include mandatory professional registrations in jurisdictions where practice cannot occur without them, and similar structural dependencies whose exit cost is infinite rather than merely high.

**Strategy implication.** Pseudo-F dependencies aren't remediation targets in the normal sense — they're constraints to operate within while monitoring for further degradation. The capture-event watch from [capture-events.md → government-services capture](capture-events.book-chapter.md#government-services-capture) applies with extra weight, because escalation is the only state change the framework can act on.

## Components of the trust dimension

Trust is composite. The grade reflects the worst-component effectively — a single bad component is enough to drag the grade down, even if the other components are strong.

1. **Financial resiliency** — likelihood of continued operation. Includes specific risk factors I track: mortgage-market exposure, commercial-real-estate exposure, AI shadow-loan / derivatives exposure, and any other major stability factors.
2. **Ethics** — behavioral track record. Measured by the scale of complaints and the scale of legal fines for unethical practices.
3. **Political ideology** — explicit values-alignment scale: Trumpist (0) at one end, Enlightenment humanist (100) at the other. Relevant as a proxy for whether the organization will cooperate with authoritarian pressure or resist it.
4. **Ownership structure** — named as significant. Not yet fully integrated into the score-to-grade mapping. Mutual / cooperative / purpose-trust / employee-owned ownership reduces capture risk; publicly-traded ownership introduces shareholder-pressure capture risk by structural default. Currently informs the grade qualitatively (e.g., Patagonia's A depends on the purpose-trust structure).

## Grade can vary by product line within one parent company

The grade attaches to the **organization's behavior on the specific product**, not to the organization as a monolith. A large parent with many product lines can earn different grades on different products, because the framework grades behavior over structure and behavior varies by product.

**Worked example.** Google is D-grade across the consumer-data-extraction product lines audited so far — Gmail, Google Drive, YouTube Premium — per [software-and-saas.md](software-and-saas.book-chapter.md). Google Fiber lands at C per [utilities.md → Google Fiber](utilities.book-chapter.md#google-fiber-isp): stable pricing, no in-service ads, no aggressive data extraction observed in the connectivity product. Same parent, different product-line behavior, different grade.

This is the same shape as the [individual-vs-institutional trust distinction from healthcare](healthcare.book-chapter.md#framework-patterns-surfaced) — Dr. Robinson at B inside Grandview Family Medicine at C. The unit of trust assessment is not always the top-level org. Sometimes it's the practitioner inside an institution; sometimes it's the product line inside a corporate parent.

**Caveat — parent behavior as leading indicator.** Behavior on other product lines from the same parent is informational and can be a yellow flag. If the parent enshittifies one product, the framework should treat that as a leading indicator for the other product lines under the same parent — not enough to drop the grade by itself, but enough to put the other products on a watch posture for capture-event-style behavior shifts. The Google Fiber C grade comes with that watch posture attached, because Google's behavior on its other consumer-facing products is the kind of behavior that predicts future erosion on Fiber.

## Sector-grade inheritance

When an industry as a whole has structural issues — fee opacity, perverse incentives, deliberately complex products that resist consumer evaluation, profit incentives misaligned with the customer — individual companies in that industry inherit the sector default grade unless they specifically demonstrate above-industry behavior.

**Life insurance is the canonical example.** Fee opacity, agent-commission incentives, deliberately complex products that resist consumer evaluation, mortality-table actuarial cynicism. Every carrier in the sector defaults to D. The two life-insurance carriers in [insurance.md](insurance.book-chapter.md) (Banner Life plus a second carrier) both grade D on this basis — neither earns above the sector default in the evidence I have, and the sector-D default carries until carrier-specific evidence overrides it.

**Sector-grade inheritance is the *prior* — the default before company-specific evidence is gathered.** Company-specific evidence can then move a company up (or further down) from the sector default. This is the same shape as the other priors the framework already uses:

- **Parent-company grade as leading indicator** — the caveat above. Other-product-line behavior from the same parent informs the prior for a new product-line grade.
- **Local-individual grade as leading indicator when no institution rating is available** — Dr. Robinson at Grandview (B) inside an unrated institution (C); see [healthcare.md](healthcare.book-chapter.md#framework-patterns-surfaced) and the residual-fallback discussion in [trust-criterion.md](trust-criterion.book-chapter.md). The individual-level grade sits on top of the institutional default.

**Caveat — don't let sector-grade inheritance become an excuse not to evaluate.** The default is a starting point, not a final assignment. The actual grade still requires company-specific behavior evidence. Sector-D as a starting prior keeps the audit from over-trusting an unevaluated carrier in a structurally-troubled industry; it does not exempt the audit from looking. A carrier in a sector-D industry that demonstrably operates differently — different ownership structure, different incentive shape, different track record under pressure — can earn above the sector default once the evidence is in.

## Conditional grading

Some dependencies are grade-able only relative to the constraints assumed above them. **Utah residency = C *given* US citizenship is not the same as Utah residency = C absolute.** The grade is conditional on an outer constraint being held fixed; changing the outer constraint changes what the inner grade means.

**Notation.** When grading a conditional dependency, name the assumed constraint explicitly — "Provo = C given Utah residency," not just "Provo = C." The conditional framing makes the dependency-graph shape visible at the grade level rather than only in narrative.

**Conditional grades cascade.** Each layer is graded relative to the layer above. The [invisible-constraints audit](invisible-constraints.book-chapter.md) is the canonical worked example — US Citizenship D → Utah-C-given-US → Provo-C-given-Utah → Home-B-given-Provo. The outer-layer grade can be reconstructed from the conditional-grade ladder by reading the cascade outward-in: each inner grade represents the household's posture *within* the outer layer's accepted constraint.

**Caveat — only useful when the outer constraint is stable.** Conditional grading is meaningful only when the outer constraint is stable (or intentionally accepted). For volatile outer constraints, the conditional grade is meaningless — the inner grade has no fixed frame of reference. The invisible-constraints cascade works because US citizenship, Utah residency, and Provo are all explicitly accepted at the current life stage; if any of them shifted into active reconsideration, the conditional grades of the layers below would need to be re-evaluated against the new outer assumption.

## Stability is part of trust, not a separate axis

The single most important framing on the component list: stability concerns land as **reservations on the trust dimension**, on equal footing with ethics or ideology reservations. They are not a separate scoring axis.

The rule: **if I can't trust an organization to survive, I can't trust them.** A bank with strong alignment but real failure risk is not a safe place to keep my money — the risk of the relationship ending unilaterally is itself a form of capture. So stability concerns route through the same trust grade rather than living in a separate "stability rating."

This is why UCCU drops to D despite member-ownership alignment. The SVB-collapse experience (see [personal-context.md](personal-context.book-chapter.md) for the lived context) made small-bank stability risk concrete to me, and that reservation alone is enough to override the structural-alignment positive on the ethics / ownership components.

## Research-pass methodology (current state — first draft, in flux)

I use an AI-assisted research prompt to evaluate candidate organizations. The first-draft prompt, kept verbatim as a working artifact for future refinement:

```
I would like you to investigate the six largest banks in the US and give each a score between 0-100 on each of the following dimensions.
1. Financial resiliency (include adjustments for exposure to the mortgage market, commercial real estate, and AI shadow loans derivatives, as well as any other major factors that could affect financial stability).
2. Ethics (based on the scale of complaints and legal fines due to unethical practices).
3. Political ideology (Trumpist is zero, enlightenment humanist is 100)
Banks
JPMorgan Chase – ~$4.42 trillion
Bank of America – ~$3.41 trillion
Citigroup – ~$2.65 trillion
Wells Fargo – ~$2.14 trillion
Goldman Sachs – ~$1.80 trillion
Morgan Stanley – ~$1.42 trillion
```

### Methodology caveats

Where this is rough, on purpose, and expected to evolve:

- The three-dimension prompt is a first attempt, not the final methodology.
- Score-to-grade mapping is undefined. Grades are currently qualitative judgments, not derived from a rigorous numerical aggregation of the per-dimension scores.
- The "worst-component-drives-the-grade" framing is consistent with how the existing grades work in practice (UCCU's stability reservation dragged the grade to D), but isn't formally specified as a rule yet.
- Ownership is named as significant but is not yet a fourth scored dimension in the research prompt. It currently informs the grade qualitatively.
- This is a working framework. Future iterations may add dimensions, change the scoring scale, or formalize the score-to-grade mapping.

## Applications

- The audit assigns a grade to every dependency using this scale.
- The plan uses grades together with [ranking-criterion.md](ranking-criterion.book-chapter.md) to decide which dependencies to remediate first. A D-tier dependency at high criticality and high switching cost is exactly the kind of item that lands at the top of the queue.
- [trust-criterion.md](trust-criterion.book-chapter.md) defines how trust is earned; this file defines how trust state is communicated once it has been assessed.

## Cross-references

- [grading-scale/wound-f.md](grading-scale/wound-f.book-chapter.md) — the wound-F: when the F is a trauma-trigger cost of connection rather than a trust verdict.
- [trust-criterion.md](trust-criterion.book-chapter.md) — how trust is earned, the input to the grade.
- [capture-events.md](capture-events.book-chapter.md) — the reset-to-zero events that drive grades down.
- [ranking-criterion.md](ranking-criterion.book-chapter.md) — how graded dependencies are ordered for remediation.
