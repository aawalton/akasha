
# Transportation

> Transportation audit — inventory of every transportation-side dependency I currently lean on, with a trust grade per `grading-scale.md`. Surfaces the multi-stage strategy for vehicle replacement (wait → buy used EV → rooftop solar for full transport autonomy), the durability-and-maintainability selection criterion as a personal-freedom strategy, the capital-asset-coupling failure mode, and adds Edgemont Auto and Costco Gas to the cultivating-local-B-tier-relationships pattern.

Every transportation-side dependency I currently lean on — the vehicle itself, auto insurance, repair, fuel, roadside service. Grades per [grading-scale.md](grading-scale.book-chapter.md). One section per dependency; the multi-stage strategy for vehicle replacement and the framework patterns that surface from it sit at the bottom because they reshape the audit (full transport autonomy via rooftop solar eliminates the gas and grid-charging dependencies rather than diversifying them).

## Inventory

### 2015 Honda Odyssey (the vehicle itself)

- **Service.** Single household vehicle. Family of 5 — high coupling on this one asset, no second vehicle to absorb a failure window. 11 years old.
- **Grade.** N/A. This is owned capital, not a current vendor dependency. Honda-as-org is informational only at the audit level — relevant for parts supply, service manuals, and recalls, but I am not currently in an ongoing trust relationship with Honda the way I am with Edgemont Auto or State Farm.
- **Criticality.** Load-bearing as the single vehicle. Failure mode is the whole household losing road transport at once.
- **Notes.** The single-vehicle coupling is itself a single-point-of-failure shape. The framework so far has focused on third-party-org dependencies; capital-asset coupling is a parallel concern worth its own framework treatment in a future cycle.

### State Farm

- **Service.** Auto insurance carrier for the household.
- **Grade.** **D.**
- **Reservations.** Large publicly-traded-equivalent (mutual structure on paper, but operates at corporate scale with similar profit-pressure dynamics) insurance carrier with the standard ethics concerns of the US for-profit auto-insurance category — claim-denial patterns, premium-creep, dispute friction. No State-Farm-specific bad acts I'm tracking; the D comes from the structural category, not from a singular incident.
- **Criticality.** Load-bearing — statutorily required to operate the vehicle, and the price-rationing gate on any post-incident outcome.
- **Notes.** The auto-insurance category overall has the same shape as health insurance: a profit-pressured intermediary sitting between me and the actual cost of a low-probability high-cost event.

### Edgemont Auto

- **Service.** Primary repair shop for the Odyssey. Local independent.
- **Grade.** **B.**
- **Reservations.** Individual-business-level trust carries the same structural-fragility caveat as Dr. Robinson at Grandview — the practitioner-level relationship is what earns the B, and a business sale, succession event, or owner retirement could invalidate the trust without warning. The B is for the shop as I currently experience it; the residual fallback is whatever alternative independent or dealership I'd fall back to, and I have not pre-selected one.
- **Criticality.** Medium. The Odyssey is currently dependent on this relationship for repair; the dependency goes up sharply as the vehicle ages.
- **Notes.** Same individual-vs-institutional trust shape that healthcare surfaced. Adds to the cultivating-local-B-tier-relationships pattern — see the framework illustrations section below.

### Costco Gas

- **Service.** Primary fuel vendor for the Odyssey.
- **Grade.** **B.**
- **Reservations.** Standard Costco-as-org reservations carry over from the [healthcare audit](healthcare.book-chapter.md#costco-pharmacy) and [grading-scale.md → B](grading-scale.book-chapter.md#b--trusted-with-reservations) — the no-third-party-testing concern is minimally relevant for fuel dispensing (fuel grade is regulated separately), but the institutional posture is the same. Strong on pricing and consumer alignment relative to other fuel vendors.
- **Criticality.** Medium. Substitutable with moderate friction — other gas stations exist.
- **Notes.** Cascading dependency — Costco Gas access is downstream of Costco membership which is downstream of the Citi cobrand. See the [banking audit](banking.book-chapter.md#citi) for the full chain.

### Roadside service

None. No AAA membership, no carrier-bundled roadside coverage active. Worth flagging in the gaps section below — low-cost insurance against roadside denial-of-service that I am currently not buying.

## Strategy — vehicle replacement plus transport autonomy

The strategic intent is not to find a B-grade gasoline vendor or to swap the State Farm relationship for a better-grade auto-insurance carrier. It's a multi-stage sequence that eventually eliminates both the gas and grid-charging dependencies entirely. This is a self-reliance move in the "not-needing" shape — see [alternatives.md → self-reliance as not-needing](alternatives.book-chapter.md#self-reliance-as-not-needing).

**Three steps, sequential with external waitstates.** Each step gates the next.

### 1. Wait

Wait for the surge of used electric vehicles hitting the secondary market as 3-year leases expire. The right action during this phase is to **keep the Odyssey running and prepare.** Blocker is used-EV-market timing; I have no acceleration path. Premature action — buying a new EV at full price, or a less-suitable used EV before the market shape clarifies — burns capital twice.

### 2. Buy

Buy a used EV selected for **durability and maintainability.** The selection criterion explicitly favors older simpler designs over newer feature-laden ones; favors vehicles with established repair-knowledge availability and parts supply; weights long-term self-reliance over new-feature appeal.

This selection criterion is itself a personal-freedom strategy. Newer-vehicle dependency on manufacturer software, over-the-air updates, and proprietary diagnostic tooling is a hidden lock-in surface — the manufacturer retains capability to disable, brick, or remotely modify the vehicle. Older simpler designs cut that surface back to mechanical fundamentals that an independent shop like Edgemont Auto can actually service.

### 3. Rooftop solar

Install enough rooftop solar to be independent of both gas infrastructure AND charging infrastructure. End state: full transport autonomy. The current Provo utility dependency on grid electricity for EV charging is itself replaced by household-owned generation capacity — without this step, the EV transition just trades a gas-infrastructure dependency for a grid-electricity dependency.

## Framework patterns surfaced

- **Strategy-and-sequencing in action.** Priority says "replace the Odyssey eventually." Strategy says "wait for the right used-EV window, then buy on a durability-and-maintainability criterion, then build the energy infrastructure that frees the vehicle from grid dependency." The three steps are sequential with external waitstates and compose into a single coherent direction. Same shape as the [Anthropic remediation](anthropic-remediation.book-chapter.md) plan — wait → buy → test → retire — and confirms that the strategy-and-sequencing pattern generalizes across domains. When the strategy lands as a plan note, cross-link this audit to it.
- **Self-reliance as not-needing.** The end state isn't a B-grade gasoline vendor or a B-grade charging-infrastructure vendor — it's eliminating both dependencies entirely. Same shape as the medication-independence direction in [healthcare](healthcare.book-chapter.md#strategy--medication-independence-direction). Adds to the worked examples for [alternatives.md → self-reliance as not-needing](alternatives.book-chapter.md#self-reliance-as-not-needing).
- **Durability and maintainability as a selection criterion.** Favoring older simpler designs over newer feature-laden ones cuts back the hidden lock-in surface that comes with manufacturer software, over-the-air updates, and proprietary diagnostic tooling. This is itself a personal-freedom strategy — newer-vehicle complexity expands the surface area on which the manufacturer can later capture me. Worth elevating to a framework note in a future cycle as a sibling to [enshittification.md](enshittification.book-chapter.md) — "feature-complexity as lock-in surface."
- **Cultivating local B-tier relationships as a remediation pattern.** Edgemont Auto adds to a growing pattern. The household's B-grade dependencies cluster in two places — local independents (Dr. Robinson, the pediatric dentist, Edgemont Auto) and Costco (Costco Pharmacy, Costco Gas). Almost every other dependency is D. The local + individual cluster is the result of deliberate selection, not luck. Cross-link to the dedicated framework essay at [cultivating-local-relationships.md](cultivating-local-relationships.book-chapter.md).
- **Capital-asset coupling as a single-point-of-failure shape.** The single Odyssey for a family of 5 is itself a structural failure mode that the third-party-org framing doesn't capture. The framework so far has focused on dependencies on outside organizations; capital-asset coupling — where the household owns a single instance of a critical asset with no backup — is a parallel concern. Worth a framework note in a future cycle.

## Open audit gaps

- **Tire and maintenance vendor.** Unclear whether Edgemont Auto handles tires and routine maintenance or whether a separate vendor relationship exists. Surface in a follow-up cycle.
- **Roadside service.** No AAA-equivalent active. Worth flagging as a potential add — low-cost insurance against roadside denial-of-service, even at a D-grade vendor.
- **Specific used-EV target list.** Which model years and brands actually match the durability-and-maintainability criterion? The criterion is named but not yet operationalized into a candidate list. Lands as a future TODO item.
- **Provo grid-electricity dependency.** Lurks behind the EV transition until rooftop solar is in place — this is a cascading dependency in the [banking audit](banking.book-chapter.md#venmo-paypal-holdings) shape: vehicle → grid power → utility. The cascade dissolves only at step 3 of the strategy, not at step 2.
