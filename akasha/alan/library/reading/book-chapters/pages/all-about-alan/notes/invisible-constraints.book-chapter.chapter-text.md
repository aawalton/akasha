
# Invisible constraints

> Invisible-constraints synthesis audit — the layered dependency cascade (US citizenship → Utah residency → Utah County / Provo → 1350 Apple Ave). Each layer is exitable only at high cost and only by addressing the layer above first. Surfaces conditional grading (Utah-C-given-US ≠ Utah-C absolute), home-ownership-as-outcome rather than -constraint, and the anchored-by-design vs anchored-by-default distinction.

The synthesis audit — the load-bearing dependencies named in [audit-scope.md → invisible constraints](audit-scope.book-chapter.md#invisible-constraints--the-load-bearing-bucket) treated together rather than scattered across the visible-category audits, because their structure is **layered.** Each constraint sits inside the constraint above it, and each can only be remediated by first addressing the one above.

## The constraint cascade

The invisible constraints stack in a dependency hierarchy:

```
US Citizenship (D)
  └── Utah Residency (C, conditional on citizenship)
        └── Utah County / Provo (C, conditional on Utah)
              └── Home ownership at 1350 Apple Ave (B, conditional on Provo)
```

To remediate a layer, the layer above must be addressable. To change county, I can stay in Utah; to leave Utah, I must stay US-bound; to leave the US requires expatriation. The cascade is a dependency DAG, not a parallel set.

## Inventory and grades

### US Citizenship — D overall

Composite from the federal-side entries in [government-services.md](government-services.book-chapter.md):

- **IRS** — D (would be F if exit were voluntary; full discussion there).
- **Selective Service** — pseudo-F per [grading-scale.md → pseudo-F](grading-scale.book-chapter.md#involuntary-dependencies--the-pseudo-f-grade) (no exit even with expatriation for prior registration obligation).
- **Passport / State Department** — D.
- **Federal compliance generally** — D.

Exit option is **expatriation.** Cost is extreme: expatriation tax (mark-to-market on assets, triggered at >$2M net worth or $190k+ avg income, both applicable here), family disruption, loss of return-option, loss of access to the US-tier financial system, retrospective Selective Service registration obligation persists.

### Utah residency — C, conditional on US citizenship

Within the constraint of US residency, Utah is C — relatively favorable. Composite from:

- **Utah state income tax** — D (~4.85% flat rate, mandatory; see [government-services.md](government-services.book-chapter.md#utah-state-income-tax)).
- **DMV** — D (standard government-friction; see [government-services.md](government-services.book-chapter.md#dmv--drivers-license-vehicle-registration)).
- **Homeschool registration framework** — **B** per [government-services.md → Homeschool registration](government-services.book-chapter.md#homeschool-registration--utah-state-board-of-education). The single load-bearing positive at this layer.
- **State regulatory frameworks generally** — C.

The B-grade homeschool framework specifically **lifts the conditional Utah grade from D to C.** Without it, Utah at this layer would likely be D. Other states with friendlier tax codes (no-income-tax states) would offset against losing the homeschool friendliness.

Exit option is **move out of state.** Cost is high — community, schools, B-tier local relationships per [cultivating-local-relationships.md](cultivating-local-relationships.book-chapter.md), garden infrastructure investment per [food.md](food.book-chapter.md#home-garden-plus-8-fruit-trees).

### Utah County / Provo — C, conditional on Utah residency

Within Utah, Provo is C. Composite from:

- **Utah County property tax** — D, the canonical invisible-constraint example per [government-services.md → Utah County property tax](government-services.book-chapter.md#utah-county-property-tax).
- **Provo City government** — C (well-managed for a city of this size; see [government-services.md](government-services.book-chapter.md#provo-city--overall)).
- **Provo Power** — C (government-as-utility municipal; see [utilities.md → Provo Power](utilities.book-chapter.md#provo-power-municipal-electric)).
- **Provo City water / sewer / trash** — C (see [utilities.md](utilities.book-chapter.md)).
- **Google Fiber availability** — C (legacy iProvo network; not available in most US locations; see [utilities.md → Google Fiber](utilities.book-chapter.md#google-fiber-isp)).
- **Local-B-tier relationship cluster** — B. Dr. Robinson, Edgemont Auto, the pediatric dentist — the household's most-leveraged trust-aligned dependencies. Cross-link [cultivating-local-relationships.md](cultivating-local-relationships.book-chapter.md).

Exit option is **move within state.** Cost is high — the B-tier relationship cluster resets, community ties, garden infrastructure, kids' social anchors.

### Home ownership at 1350 Apple Ave — B, conditional on Provo

The only B-tier invisible constraint. Structurally aligned with household goals:

- **Shelter security** — owned, not landlord-dependent.
- **Food production infrastructure** — 8 raised beds (4×8) plus 8 fruit trees per [food.md](food.book-chapter.md#home-garden-plus-8-fruit-trees); ~$500k+ equity contribution to the self-reliance trajectory.
- **Workshop space** — garage not used for parking, available for tools / GlowForge / future projects.
- **Geographic anchor** for the local-B-tier relationship cluster.
- **Capital allocation discipline** — ~$1.2M valuation (optimistic top), ~$500k mortgage, **~$500k equity** planned-against ($700k assumes the top valuation holds). Significant fraction of household net worth tied up here, but it's *productive* capital not pure consumption.

Reservations: BSI mortgage-servicer (D, structural lock-in per [banking.md → BSI](banking.book-chapter.md#bsi-financial-services)); home insurance via State Farm (D, single-vendor bundle per [insurance.md → Homeowners insurance](insurance.book-chapter.md#homeowners-insurance--state-farm)); housing-market exposure (valuation may drop with the broader market).

Exit option is **sell.** Cost: transaction costs, loss of garden investment, family disruption — but feasible within Provo if a different house better matched needs.

## Strategy

The strategy respects the cascade — don't remediate inner layers without first deciding the outer ones.

- **Current strategy: accept the cascade and remediate within each layer.**
  - US citizenship D is accepted as a stable assumption (no near-term expatriation plan).
  - Utah residency C is accepted — the homeschool advantage outweighs the state-income-tax cost.
  - Provo specifically is accepted — relationship cluster plus garden infrastructure plus community plus Google Fiber.
  - 1350 Apple Ave B is the *output* of accepting the layers above — the home is the productive end-state of choices made at each layer.

### Monitoring triggers that would re-open the cascade

- **US citizenship layer.** Federal-level escalation: IRS politicization, Selective Service rule changes, passport politicization, expatriation tax law changes that significantly alter the cost-benefit. Composes with the federal-monitoring TODO item.
- **Utah residency layer.** Homeschool law erosion (would remove the load-bearing positive that lifts Utah from D to C); state income tax increases past a tolerable threshold; other states adopting homeschool-friendly frameworks that match Utah's. Composes with the Utah-homeschool-monitoring TODO item.
- **Provo layer.** Local-B-tier relationship attrition (Dr. Robinson retires, Edgemont Auto closes, pediatric dentist leaves); property tax increases; Google Fiber sold to a non-aligned successor. Composes with the cultivating-local-relationships periodic review TODO item.
- **Home layer.** Family needs change (kids leaving home means a smaller footprint becomes useful); housing-market shifts that change the equity calculus.

**Strategic implication.** The household is structurally anchored in Provo by the choices made at each layer. This is *intentional, not accidental* — it represents the realized state of personal-freedom strategy at the current life stage. The remediation roadmap addresses dependencies *within* this anchor, not against it.

## Framework patterns surfaced

- **Constraint cascade as a layered DAG.** Each invisible-constraint layer is conditional on the layer above. Remediation requires resolving outer layers first. Same strategy-and-sequencing pattern surfaced in [transportation.md → framework patterns](transportation.book-chapter.md#framework-patterns-surfaced) and the [Anthropic remediation plan](anthropic-remediation.book-chapter.md) — applied here at the invisible-constraint scale.
- **Conditional grading.** Grades for nested constraints are *relative to the assumed outer constraints*, not absolute. Utah residency = C *given* US citizenship is different from Utah residency = C absolute. Landed as a subsection in [grading-scale.md → Conditional grading](grading-scale.book-chapter.md#conditional-grading) — this audit is the worked example.
- **Home ownership as outcome, not constraint.** 1350 Apple Ave's B grade is the *productive end-state* of the layer cascade. Accepting US → Utah → Provo → Home as the chain produces a B at the leaf. If any outer layer were different, the leaf grade would differ too. The framework's third-party-org framing doesn't capture this — it treats every dependency as parallel; the cascade view recovers the structure.
- **Anchored-by-design vs anchored-by-default.** The household's anchoring in Provo is intentional. This distinguishes it from accidental anchoring (defaults nobody chose). Some "constraints" are willingly accepted; others are unwillingly inherited. The framework should make space for this. Composes with the hobby-vs-dependency carve-out from [food.md → framework patterns](food.book-chapter.md#framework-patterns-surfaced) — both are "chosen-because-meaningful" carve-outs from the grade-driven optimization.

## Open audit gaps

- **Specific expatriation cost-benefit analysis** (if ever revisited). Mark-to-market tax on ~$1.7M liquid stock plus the ~10% illiquid Latitude stake; foreign-residence option research; family-bound considerations.
- **Alternative-state cost-benefit analysis** (if Utah's homeschool advantage erodes). Which states match the friendliness and at what state-tax cost.
- **Family-of-5 commitment as a meta-constraint.** Partner plus 3 kids is a constraint on every other choice, but it's a chosen-because-meaningful commitment (parallel to Jenny's foodie-hobby carve-out from [food.md](food.book-chapter.md#restaurants-category-level)). Worth a future framework note on chosen-because-meaningful constraints — flagged but not graded.
