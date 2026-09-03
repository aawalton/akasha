
# Insurance

> Insurance audit — every non-auto, non-medical insurance dependency I currently lean on, plus the structural gaps. Grades per `grading-scale.md`. Surfaces sector-grade-inheritance (life insurance as the canonical sector-D example), bundled-vendor coupling (State Farm holds both home + auto), the gap-vs-fix distinction (umbrella and LTC as gaps, not existing dependencies), and self-insurance via the asset base as a first-class alternative.

Every non-auto, non-medical insurance dependency I currently lean on. Auto insurance lives in [transportation.md → State Farm](transportation.book-chapter.md#state-farm); medical insurance lives in [healthcare.md → Select Health](healthcare.book-chapter.md#select-health). This file covers home, life, umbrella / liability, long-term care, disability, specialty riders, and renters — both the active dependencies and the structural gaps.

Grades per [grading-scale.md](grading-scale.book-chapter.md). One section per dependency or named gap; the strategy section frames the umbrella addition as the high-leverage move and the State Farm bundling as a lower-priority diversification target.

## Inventory

### Homeowners insurance — State Farm

- **Service.** Dwelling, personal-property, and homeowner-liability coverage for the house.
- **Grade.** **D.**
- **Reservations.** Standard for-profit-insurance posture — large publicly-traded-equivalent (mutual on paper, operates at corporate scale with similar profit-pressure dynamics) carrier with the structural ethics concerns of the US insurance category. No State-Farm-specific bad acts I'm tracking beyond the standard category. The D comes from the structural category, not a singular incident — same shape as the [State Farm auto entry](transportation.book-chapter.md#state-farm).
- **Criticality.** Load-bearing — lender-required while the mortgage is active, and the price-rationing gate on any post-loss outcome.
- **Notes.** **Bundled-vendor coupling** — State Farm holds both home and auto, so a capture or behavior-failure event here lands with 2x the impact of a single-product vendor. The mechanism, the cross-domain parallel (Cloudflare bundling), and the case for promoting it to its own framework note are developed under [Framework patterns surfaced](#framework-patterns-surfaced) below; the remediation is [strategy step 2](#2-diversify-away-from-the-state-farm-bundle--lower-priority).

### Life insurance on Alan — $4M total face value across two policies

- **Banner Life** — **D.** One of the two policies. Term policy (assumed; confirm in a future cycle).
- **Second carrier — name not currently remembered** — **D.** Other policy. Term assumed. Face-value split between the two policies also not currently remembered.
- **Service.** Term life coverage on Alan, payable to Jenny / the household if Alan dies during the term. Sized for the current 3-kids-at-home life stage.
- **Grade.** **D** on each carrier, by **sector-grade inheritance** — see framework patterns below. Life insurance as a sector has structural issues: fee opacity, agent-commission incentives, deliberately complex products that resist consumer evaluation, mortality-table actuarial cynicism. Individual carriers inherit the sector-D default unless they specifically demonstrate above-industry behavior. Neither Banner nor the second carrier earns above the sector default in the evidence I currently have.
- **Criticality.** Load-bearing during the kids-at-home window. Drops as the kids reach independence.
- **Notes.** Term face value is appropriate-sized for now but will need re-evaluation as the kids approach independence (Lizzy 17 → likely independent within 5-7 years; Joseph 14 → 7-9 years; Katara 11 → 10+ years). The face value can shrink as the life-coverage need shrinks. Term expiration and renewal / re-rate windows are open gaps below.

### Umbrella / personal-liability insurance

**None.** Gap, not a deliberate negative. Standard advice for households with >$2M net worth (~$500k home equity + ~$1.7M liquid stock investments per [personal-context.md](personal-context.book-chapter.md)) is $1-5M umbrella coverage. Cheap and structural — protects against tail liability events where the underlying home or auto policy's per-incident cap is exceeded.

Worth adding regardless of State Farm's D grade — see the strategy section.

### Long-term care insurance

**None.** Gap. Less urgent at age 40 / 37 but eventually material as Alan and Jenny approach 60+. LTC insurance has its own sector-grade-D issues — premium hikes, denial-of-claim history, the same fee-opacity / agent-commission pattern as life insurance. The alternative is **self-insurance via the asset base**, which is the implicit current strategy and a first-class option given the household's asset shape.

Re-evaluation cadence is the relevant action, not immediate purchase — see strategy.

### Disability insurance

**N/A.** Not needed given retired status — no employment income to replace.

### Specialty riders (valuable items, jewelry, electronics, firearms, etc.)

**None.** Not currently used. No high-value items that exceed the homeowner-policy personal-property scheduled limits to the point of needing a rider.

### Renters insurance

**N/A.** Own the home.

## Strategy

The non-auto-non-medical insurance strategy is **add the umbrella, periodically re-evaluate the rest, defer LTC.** Not a category-wide overhaul.

### 1. Add umbrella insurance — high-leverage, low-cost

A $1-2M umbrella policy from the existing State Farm relationship is the highest-leverage move available in this domain. Inexpensive (typically $200-500/year) relative to the tail liability it covers — the reachable loss surface it protects is **~$2.2M**: ~$500k of reachable home equity plus ~$1.7M in liquid stock investments (dossier figures in [personal-context.md](personal-context.book-chapter.md)). The ~10% of net worth held as illiquid Latitude stock — the startup Alan cofounded — sits outside that surface: a creditor can't readily reach it, so it isn't part of what the umbrella needs to cover.

**Add this regardless of the State Farm D grade.** The umbrella increases the loss-mitigation envelope rather than creating new vendor dependency — the underlying carrier dependency on State Farm already exists for home and auto. Adding the umbrella to the same carrier is the cheaper / easier path; adding it to a separate carrier diversifies the bundled-vendor exposure but at higher cost and complexity. Default to State Farm unless a B-tier carrier is available, in which case the diversification value flips the call.

### 2. Diversify away from the State Farm bundle — lower priority

Auto plus home plus (future) umbrella on a single D-grade vendor is a concentration risk that the bundled-vendor-coupling framework note will formalize. Remediation is lower priority because the insurance sector overall is D-default and switching to a peer (Allstate, Liberty Mutual, Travelers, Farmers) doesn't improve the grade. The only path that improves the grade is a structurally different option — USAA for military-eligible (not applicable here), some mutual-insurance carriers, or a regional / local independent if one earns above the sector default.

Only act if a B-tier insurance option becomes available. Otherwise hold and revisit on capture-event signals.

### 3. Term life — periodic re-evaluation

Set a periodic review cadence (annual is the obvious default) to re-evaluate face value as the kids approach independence. Shrink coverage as the life-coverage need shrinks. Check term expiration dates and renewal / re-rate windows so the policies don't drop off unexpectedly.

The sector-D inheritance doesn't change the answer here — every carrier in the category is D by default, and the term-policy structure already minimizes the fee-opacity and commission exposure that drags the sector down. The remediation lever is sizing, not switching.

### 4. LTC — defer; self-insurance is the implicit strategy

Self-insurance via the asset base is the implicit current LTC strategy. With ~$1.7M+ of liquid stock investments at age 40 / 37 compounding for 20+ years before LTC becomes likely, the math will likely favor self-insurance over the sector-D LTC-insurance carriers indefinitely. Re-evaluate at 55-60 when the cost-benefit becomes worth re-running.

Self-insurance as a first-class alternative is itself a framework concept — see patterns below.

## Framework patterns surfaced

- **Sector-grade inheritance.** When an industry as a whole has structural issues, individual companies inherit the sector default grade unless they specifically demonstrate above-industry behavior. Life insurance is the canonical example — every carrier in the sector defaults to D until proven otherwise. Landed as a subsection in [grading-scale.md → Sector-grade inheritance](grading-scale.book-chapter.md#sector-grade-inheritance).
- **Bundled-vendor coupling.** State Farm holds both home and auto. A capture event or behavior failure at State Farm has 2x impact compared to a single-product-line vendor. Same structural shape as the Cloudflare bundling (registrar + DNS + Tunnel + ACME) from [personal-context.md](personal-context.book-chapter.md). Worth its own framework note — flagged in `/abby`'s backlog.
- **Gap items vs current dependencies.** Umbrella and LTC are *gaps* (no current dependency to remediate) rather than *fixes* (existing D-grade dependency to remediate). The framework treats these differently — gaps are additions to consider against the cost-benefit shape; fixes are existing dependencies to evaluate for exit or substitution. Sibling distinction to the audit-vs-plan boundary in `CLAUDE.md`.
- **Self-insurance as a first-class alternative.** LTC self-insurance via the asset base is the implicit current strategy. Parallel to the [medication-independence direction in healthcare](healthcare.book-chapter.md#strategy--medication-independence-direction), the [rooftop-solar transport-autonomy step in transportation](transportation.book-chapter.md#strategy--vehicle-replacement-plus-transport-autonomy), and the [garden productivity ramp in food](food.book-chapter.md#1-garden-plus-fruit-tree-productivity-ramp) — the answer to a D-grade vendor is sometimes "build or hold sufficient personal capability to not need a vendor at all." Composes with [alternatives.md → self-reliance as not-needing](alternatives.book-chapter.md#self-reliance-as-not-needing) — self-insurance is the financial-asset-base instance of the not-needing pattern.

## Open audit gaps

- **Second life insurance carrier name and face-value distribution.** Currently $4M total across two policies; the split and the second carrier's name are unconfirmed.
- **Term-policy expiration dates and renewal / re-rate windows.** Both policies — when does each expire, what's the renewal-vs-re-rate behavior, and what's the lead time for a re-evaluation decision before each window.
- **State Farm homeowner-policy specifics.** Deductibles, dwelling-coverage limit, personal-property limit, replacement-cost vs ACV on the dwelling, scheduled personal-property limits (would inform whether any specialty riders are needed for high-value items).
- **State Farm auto-policy bundling discount.** Quantify the discount the bundle currently provides — informs the cost-benefit on the diversification-vs-stay decision in strategy step 2.
- **Umbrella quotes.** Concrete $1M and $2M quotes from State Farm and from one or two alternatives — operationalizes strategy step 1.
