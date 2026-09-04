
# Utilities

> Utilities audit — inventory of every utility-side dependency I currently lean on, with a trust grade per `grading-scale.md`. Surfaces the grade-can-vary-by-product-line refinement (Google Fiber C vs Gmail D under one parent), the cross-domain remediation leverage of rooftop solar (one capital project remediates electric + gas + EV-charging simultaneously), and the government-as-utility default-C pattern.

Every utility-side dependency I currently lean on — grid electricity, natural gas, water and sewer, trash and recycling, household internet. Grades per [grading-scale.md](grading-scale.book-chapter.md). One section per dependency; the strategy section at the bottom names the rooftop solar plan from the [transportation audit](transportation.book-chapter.md#3-rooftop-solar) as the highest-leverage remediation pattern surfaced in the audit so far, because the same capital investment cascades across three of the utility categories listed here plus the transportation category.

## Inventory

### Provo Power (municipal electric)

- **Service.** Grid electricity to the home.
- **Grade.** **C.**
- **Reservations.** Default tier — not actively aligned, not actively bad. Government-as-utility, municipally owned. The reservation worth tracking is exposure to local political shifts: a municipal utility is only as good as the city's current governance, and Utah-level political shifts can change what "municipal" means in practice.
- **Criticality.** Load-bearing for everything plugged into a wall, currently including heating and hot-water systems via electric-resistance backups, all household compute, refrigeration, and (eventually) EV charging.
- **Notes.** The default-C is approximately what the framework expects for a structurally-neutral local-government dependency. See the framework patterns section below.

### Dominion Energy (natural gas)

- **Service.** Natural gas to the home — heating, hot water, cooking.
- **Grade.** **D.**
- **Reservations.** Large publicly-traded utility with the structural profit pressure that comes with that shape, plus regulatory-capture concerns (regulated monopolies sit in a captured relationship with their regulator by default), plus fossil-fuel-industry exposure on the supply side. No Dominion-specific singular incident driving the grade; the D comes from the structural category.
- **Criticality.** Load-bearing for heating and hot water in the current configuration. Gas cooking is the residual that would remain even after a heat-pump conversion.
- **Notes.** Of the three core utility-billing relationships, this is the only one rated below C — and the only one that lives in a fully private corporate structure. The contrast is informative.

### Provo City (water + sewer)

- **Service.** Municipal water supply and sewer service.
- **Grade.** **C.**
- **Reservations.** Same shape as Provo Power — government-as-utility default. Municipally owned, locally accountable on paper, exposed to local political shifts in practice.
- **Criticality.** Life-critical. Water is non-substitutable in the short term; sewer is non-substitutable without significant capital investment in alternative onsite systems.
- **Notes.** Default-C. Periodic re-evaluation worth doing when the framework runs its review pass — see open gaps.

### Provo City (trash + recycling)

- **Service.** Weekly trash and recycling pickup.
- **Grade.** **C.**
- **Reservations.** Same shape as the water/sewer entry — government-as-utility, municipal.
- **Criticality.** Medium. Substitutable with friction (private haulers exist) but at higher cost and lower convenience.

### Google Fiber (ISP)

- **Service.** Household internet — symmetric gigabit, primary connectivity for every other dependency that touches the network (cloud SaaS, banking, healthcare-portal access, communications, the entire stack of remote work).
- **Grade.** **C.**
- **Reservations.** Notable case. Same corporate parent (Google) as Gmail, Google Drive, YouTube Premium — all of which grade D per the [software-and-SaaS audit](software-and-saas.book-chapter.md). Google Fiber lands at C rather than D because the framework grades behavior over structure, and Google's behavior on the Fiber product line is materially different from its behavior on the consumer-data-extraction product lines: stable pricing, no in-service ads, no aggressive data extraction observed in the connectivity product, predictable service.
- **Criticality.** Load-bearing for every household member's work, school, communications, and entertainment. Failure window cascades into a long downstream of dependent services.
- **Notes.** **Grade can vary by product line within one parent company** — Fiber's C follows the product-line behavior (stable pricing, no in-service ads, no aggressive data extraction), not the Google parent's D behavior on its consumer-data-extraction lines. The Google-parent reservations still inform the watch posture (enshittification of one line is a leading indicator for the others). The mechanism and its composition with the healthcare individual-vs-institutional shape are developed under [Framework patterns surfaced](#framework-patterns-surfaced) below.

## Strategy — rooftop solar as cross-domain remediation

The rooftop solar plan named at [transportation.md → step 3](transportation.book-chapter.md#3-rooftop-solar) connects directly into the utilities audit and is the highest-leverage single remediation surfaced so far. One infrastructure investment cascades across multiple utility dependencies simultaneously.

- **Grid electricity (Provo Power C).** Reduced or eliminated dependency once solar generation plus battery storage cover household load. The C-grade dependency on Provo Power doesn't go away entirely — grid-tied is still the safest topology — but the load shifts to self-generation and the relationship becomes a backup rather than a primary.
- **Natural gas (Dominion D).** Near-eliminated dependency if solar plus a heat pump replace gas heating and gas hot water. Gas cooking is the residual; an induction cooktop would close it. This step replaces the audit's only D-grade utility entry with self-supplied infrastructure.
- **EV charging infrastructure.** Self-supplied from the same solar capacity. Eliminates dependence on public charging networks, removes the cascading-dependency shape flagged at [transportation.md → open gaps](transportation.book-chapter.md#open-audit-gaps) where the EV transition trades a gas-infrastructure dependency for a grid-electricity dependency.

Three utility categories plus the transportation category remediated by one capital project. The cost amortizes across all four, which is what makes this the highest-priority remediation candidate in the audit to date.

## Framework patterns surfaced

- **Grade can vary by product line within one parent company.** Google Fiber at C versus Gmail at D, despite a shared corporate parent, is the cleanest worked example the audit has produced. The grade tracks the organization's behavior on the specific product, not the parent across its entire portfolio. Composes with the [individual-vs-institutional trust pattern from healthcare](healthcare.book-chapter.md#framework-patterns-surfaced) — Dr. Robinson at B inside Grandview at C — both shapes recognize that the unit of trust assessment is not always the top-level org. Cross-link from [grading-scale.md → grade can vary by product line](grading-scale.book-chapter.md#grade-can-vary-by-product-line-within-one-parent-company).
- **Cross-domain remediation leverage.** Some infrastructure investments remediate dependencies across multiple audit categories at once. Rooftop solar is the densest example — three utility categories plus transportation. Other instances visible in the audit so far: household local compute via the Mac Studio remediates AI dependency plus a cluster of cloud-SaaS habits (see [anthropic-remediation.md](anthropic-remediation.book-chapter.md)); a home garden remediates a slice of the grocery dependency. These are the highest-priority capital investments in the remediation plan because the cost amortizes across many remediations.
- **Government-as-utility default C.** Municipal services (Provo Power, Provo water/sewer, Provo trash/recycling) consistently land at C — not aligned, not bad, default-tier government-as-utility. Worth naming that "C" for municipal services is approximately what the framework expects for a structurally-neutral local-government dependency, and that the same band would apply by default to other municipal services I don't currently consume. Composes with [alternatives.md → government-as-utility](alternatives.book-chapter.md#6-government-as-utility).

## Open audit gaps

- **Solar installer / equipment selection.** The cross-domain remediation strategy depends on a specific installer, panels, battery, and inverter — each its own future audit item against [trust-criterion.md](trust-criterion.book-chapter.md). Lands when the planning step picks up the rooftop solar entry on the TODO.
- **Heat pump and induction-cooktop equipment trust.** Second-stage gas-elimination move once solar is in place. Equipment selection is itself a trust assessment — manufacturer behavior, software-lock-in surface (the [durability-and-maintainability criterion from transportation](transportation.book-chapter.md#framework-patterns-surfaced) applies to household-energy equipment too), parts and repair availability.
- **Provo City municipal alignment review.** The C-grade for municipal services assumes the current city governance. Worth periodic re-evaluation given state-level political shifts in Utah — a municipal utility is only as good as the city behind it, and that backing can change.
