
# Recommended Sequence

A concrete plan that resolves the [math.md ordering tradeoffs](math.book-chapter.md#three-way-ordering-comparison) into Option C (parallel) with one hard sequencing constraint: post-retrofit Manual J before heat-pump equipment order.

## Step 1 — Comprehensive audit (~$800–1,500, ~2 weeks calendar)

- BPI Building Analyst or RESNET HERS audit with blower door + IR + duct test + room-by-room Manual J.
- Auditor delivers: ACH50, leak map, R-value-by-assembly survey, CFM25 duct leakage, Manual J at Provo design conditions, retrofit prioritization with $/% reduction.
- See [assessment.md "What to ask the auditor"](assessment.book-chapter.md#what-to-ask-the-auditor) for the bid specification.
- **Output:** baseline numbers + retrofit scope of work.

## Step 2 — High-leverage retrofit (~$8,000–15,000, ~4–8 weeks calendar)

Single combined contract or two coordinated contracts:

1. **Air sealing** crew first — top plates, recessed cans, attic penetrations, plumbing/electrical chases, rim joist, cantilever floors, attic-knee-wall connections. Verify with mid-project blower door if leakage was extreme (>12 ACH50).
2. **Duct sealing** — AeroSeal or manual mastic, plus replacement of any failed insulation wrap. Pre/post Duct Blaster.
3. **Rim joist closed-cell spray foam** — often bundled with air-sealing crew, sometimes the same applicator.
4. **Attic insulation top-up** to R-60 with blown cellulose. **After** all penetrations sealed.

Optional fifth measure (wall dense-pack) added here if the audit flagged severe wall-batt degradation. Otherwise defer.

## Step 3 — Post-retrofit verification (~$400–600, ~1 day)

- Second blower door — target ACH50 < 5 (down from baseline 8–15).
- Second duct test — target CFM25 leakage-to-outside < 6% of nominal CFM.
- Updated Manual J using measured post-retrofit ACH50 and the new R-values. This is the heat-pump sizing input.
- **Output:** verified post-retrofit design heat load (Btu/h), verified annual heating kWh (model output), updated PV target.

## Step 4 — Heat pump sizing and install (parallel with Step 5)

- Bid CCHP installers against the **post-retrofit Manual J**, not the pre-retrofit one. This is the load-bearing decision: a bid that ignores Step 3's Manual J and uses a rule-of-thumb is grounds for disqualifying that installer.
- Target equipment per [hvac.md COP table](../energy-demand/hvac.book-chapter.md#cop-vs-outdoor-temperature) — NEEP-listed CCHP only, capacity retention to -13°F or lower, COP at -2°F ≥ 1.7.
- Likely outcome at the 6000 sq ft scale with a retrofit envelope: **2 outdoor units** (e.g., 2× 4-ton CCHP multi-zones) where the un-retrofit case would have needed 3. Captures the [HVAC right-sizing $5–15k](math.book-chapter.md#plus-hvac-equipment-right-sizing).

## Step 5 — PV sizing and install (parallel with Step 4)

- PV designer sizes against post-retrofit **annual kWh** target, not design-day load. Annual kWh comes from the audit's energy-model run with post-retrofit inputs.
- PVWatts target uses the [provo.md anchor case](../efficiency-factors/provo.book-chapter.md#optimal-install-anchor-case) — 1,700 kWh/kWp/yr, 30° tilt, south azimuth, MLPE, premium modules.
- Net-zero sizing: total annual demand from [energy-demand/totals.md](../energy-demand/totals.book-chapter.md) divided by specific yield, rounded up to nearest available module count for the chosen roof faces.
- Bids per [provo.md "What to ask installer bids"](../efficiency-factors/provo.book-chapter.md#what-to-ask-installer-bids).

## Why Steps 4 and 5 parallelize

The two installers don't share equipment, schedule, roof penetrations, or service-panel work in a way that forces sequencing — and PV is mostly outside the conditioned envelope. The only real interlock is the service-panel sizing, which has to accommodate both the heat-pump peak draw (per [hvac.md "Peak heating demand"](../energy-demand/hvac.book-chapter.md#peak-heating-demand-kw)) and the PV interconnection. Both installers should bid against a single panel-loading worksheet; the electrical contractor on the heat-pump side typically also handles the PV-side panel work.

## Calendar

| Phase | Duration | Cumulative |
|---|---|---|
| Audit | 2 wk | 2 wk |
| Retrofit | 4–8 wk | 6–10 wk |
| Post-retrofit verification | 1 wk | 7–11 wk |
| Heat pump bid → install | 6–10 wk (parallel) | 13–21 wk |
| PV bid → install → interconnect | 8–14 wk (parallel) | 15–25 wk |

End-to-end: **4–6 months** from audit kickoff to PV interconnection, with the heat pump usually landing 2–4 weeks before PV due to PV interconnection lead times with Provo City Power. The retrofit + audit phase is the calendar critical path through week 11; HVAC/PV bid-and-permit dominates after that.

## Where this can go wrong

- **Auditor and retrofit contractor are the same firm with no fixed scope.** Misaligned incentive to over-scope retrofit. Mitigate by separating audit from retrofit bid, or by fixing the retrofit scope in the contract.
- **Heat-pump installer ignores the post-retrofit Manual J.** Common, because installers default to their stock sizing tools. Insist on the post-retrofit numbers in the bid documents and reject any installer who oversizes "for safety."
- **PV installer sizes off the previous 12-month utility bill.** That bill reflects the *pre-electrification, gas-heated* house and is irrelevant to the all-electric post-retrofit forward load. Sizing must come from the [totals.md](../energy-demand/totals.book-chapter.md) build-up, not the historical bill.
- **Retrofit done but not verified.** No second blower door means heat-pump bids fall back to pre-retrofit Manual J, which loses most of the right-sizing benefit. Don't skip Step 3.
