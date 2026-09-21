
# Sensitivity and Recommendation

The final dimension. Rank the levers that move system size and cost, then propose one planning case.

## Sensitivity — ranked by leverage on the nominal case

1. **House envelope retrofit** — the single biggest controllable lever, and the cheapest thing in this file. Per [hvac.md](book-section/energy-demand/hvac), moving from mid-tier envelope (16,500 kWh heating) to well-insulated (9,500 kWh) saves ~7,000 kWh/yr. That's ~4.7 kWp of PV at planning yield = **~$11,000 in PV** plus possibly the entire supplement-structure line item ($22,500). Combined PV-side savings: **~$30,000+**. The energy-scope retrofit — air sealing, duct sealing, rim-joist foam, attic to R-60 — costs **$8,000–15,000** per [retrofits.md](book-section/envelope/retrofits), so it returns **2–4× on the PV line alone**, before any comfort or resilience gain. It is the best buy in the whole thread. **Window replacement is not in that scope**: [retrofits.md](book-section/envelope/retrofits) grades it worst-$/%-full-stop at $25,000–60,000 and defers it, so windows are a comfort, sound and rot decision scored on their own and never on kWh. Do the envelope work before final PV sizing.

2. **Demand scenario itself (low → high)** — the demand spread (48k–87k kWh/yr) is itself a 26 kWp / $80,000 PV swing. The envelope retrofit, gaming-intensity assumption, and inference-activation question collectively determine which row of the demand table the project actually lands on.

3. **Specific yield (1,400–1,650 kWh/kWp/yr)** — a 100 kWh/kWp/yr move is ~3.3 kWp at 49 kWp planning. Driven by roof study findings: azimuth, tilt, shading study, tree maturity projection. **Measure before committing to a final PV number.**

4. **Roof area available for primary PV vs. supplement structure** — if the measured-roof study lands above 2,900 sq ft of usable high-yield area, the $22,500 supplement-structure line vanishes. **Get the roof study early.**

5. **ITC status in 2026** — **±$60,000** on the nominal post-ITC number. Out of buyer control. Plan against pre-ITC; treat restoration as upside.

6. **Inverter topology (microinverter vs. hybrid string + optimizers)** — **±$5,000–$10,000** at this scale. Driven by roof-face count and shading; resolves at bid stage.

7. **Battery, if any** — **$0 / $27,000 / $40,000**, and outside the totals. Provo has no residential time-of-use rate, so a shifted kWh earns only the $0.063 export-versus-retail spread and the bank wears out before it pays back. Buy it for outage resilience or not at all; revisit if Provo Power ever introduces TOU pricing. See [battery.md](book-section/sizing/battery).

8. **Service-panel scope (200 A + SPAN vs. 400 A)** — **±$4,000**. The 400 A path keeps the load-shedder additive; the 200 A path makes it load-bearing. The recommendation is 400 A; the cost gap is small relative to the project total.

9. **$/W bid outcome** — **±$5,000 per $0.10/W**. Bid stage closes this.

## The envelope-retrofit decision tree (called out explicitly)

The scope file flags envelope quality as a known unknown ("50-year-old construction; will need a blower-door / insulation assessment"). The sizing math is sensitive enough to this that **the envelope assessment should run before PV bid finalization**, not after. The decision tree:

| Envelope finding | PV implication |
|---|---|
| Already well-insulated (rare for 1970s) | Plan against low demand (~48,000 kWh/yr) → 32 kWp PV. |
| Mid-tier (planning assumption) | Plan against nominal (~73,000) → 49 kWp PV. Retrofit becomes a separate optimization. |
| Leaky and retrofit-deferred | Plan against high (~87,000) → 58 kWp PV. Larger supplement structure. |
| Leaky and retrofit-funded | Cuts demand toward low (~50,000) post-retrofit. Plan PV against the post-retrofit demand if retrofit timing is firm. |

**The retrofit timing is settled in [sequence.md](book-section/envelope/sequence):** audit, then retrofit, then verification, with the heat-pump and PV bids running in parallel after it and one hard constraint — the post-retrofit Manual J lands before any heat-pump equipment order. So plan PV against the post-retrofit demand. Where PV somehow lands first anyway, plan against pre-retrofit demand and accept a slightly oversized system afterwards (annual net-export rather than a match, which under net billing is forfeited at the February reset — a small recurring loss against the lifetime risk of an undersized system).

## Planning case — the single bid-anchor

| Dimension | Value | Rationale |
|---|---|---|
| Annual demand | **73,000 kWh/yr** | Nominal from [demand.md](book-section/sizing/demand) — mid-envelope, heavy gaming, 22k EV mi |
| PV (DC) | **49 kWp** | At 1,500 kWh/kWp/yr realistic specific yield, ILR 1.20 → 40 kW AC |
| Battery (usable) | **none in the base case** | Optional $27k/$40k line decided on its own — it buys outage resilience, not payback |
| Inverter | **Hybrid string + DC optimizers** (e.g., 2× SolArk 15K-2P or equivalent) | Best at 49 kWp with future inference upside, and keeps a battery addable later without rework, per [topology.md](book-section/sizing/topology) |
| Service panel | **400 A main + 4 subpanels + monitoring (not load-shedding)** | Load-shedder stays additive rather than load-bearing |
| Roof + supplements | **House primary + detached-garage roof + pergola or ground-mount supplement (~15 kWp)** | Per [pv.md](book-section/sizing/pv#roof-area-feasibility), 49 kWp does not fit on house roof alone |
| EV chargers | **2× 48 A hardwired EVSE** with PV-following daytime mode | Per [vehicles.md](book-section/energy-demand/vehicles#charging-peak-draw) |
| **All-in pre-ITC** | **~$166,000** (with one supplement structure) or ~$142k (no supplement) | Per [cost.md](book-section/sizing/cost); battery excluded |
| **All-in post-ITC @ 30%** | **~$116,000** (with) / ~$99k (without) | If ITC restored; uncertain |
| **All-in if ITC expires** | **~$166,000** | Plan against this |
| **Optional battery on top** | +$27,000 (27 kWh) or +$40,000 (40 kWh) | Bought for outage resilience, decided on its own |

## Why this case

Three things this case optimizes for:

1. **Robustness to envelope outcome** — sized at the mid-envelope assumption with the supplement structure budgeted. If envelope retrofits before PV, ~7 kWp comes out of the design and one supplement structure may go away (net cost down). If envelope retrofit is deferred, the system was sized correctly the first time.

2. **Robustness to inference-load activation** — the 73,000 kWh number already includes the heavy-gaming planning value (30,000 kWh from 12 PCs). Activating 4 of 12 PCs to sustained inference adds ~15,600 kWh — within the high-scenario envelope. The 400 A service and hybrid inverter both absorb this growth without rework, matching the scope-file requirement.

3. **Robustness to ITC outcome** — plan against pre-ITC budget; treat ITC as upside. Decision-quality doesn't depend on which way the political coin lands.

What this case **does not** optimize for:

- **Off-grid self-sufficiency** — out of scope per [scope.md](book-section/solar-power/scope); the grid carries the winter deficit.
- **Multi-day winter outage ride-through** — explicitly traded away in [battery.md](book-section/sizing/battery); rely on grid restoration or a separate propane standby gen decided on its own.
- **All-12-PCs-inference workload** — would push demand to ~120,000 kWh/yr and require either oversized PV or scoped-out inference plan; flag for a future re-architecture.

## Open assessment items (carry forward from [scope.md](book-section/solar-power/scope))

These must close before bid finalization, in roughly this priority order:

1. **Roof study** (azimuth + tilt + shading + usable area per face). Gates whether 49 kWp fits the roof and whether the supplement structure is needed. **Highest priority.**
2. **Envelope assessment** (blower-door + insulation audit). Gates whether to plan against low or nominal demand. **Second priority.**
3. **Provo City Power Schedule 1.1 net-metering details** (current export-credit rate, annual reset date, system-size cap, interconnection requirements). Gates the financial case and may impose a cap that re-sizes the project. **Third priority.**
4. **ITC status reverification** (federal residential cash/loan eligibility for 2026 installs). Gates the headline post-ITC number but not the decision. **Fourth priority.**

## What the next iteration does

1. Resolve the four open assessment items above.
2. Send the planning case (49 kWp / 400 A / hybrid string, battery quoted separately) to three competitive Utah installer bids via EnergySage.
3. Compare bids against the cost table in [cost.md](book-section/sizing/cost) — flag any quote above $2.65/W cash blended.
4. Re-run the sizing math against actuals (measured roof, post-retrofit demand if envelope retrofit goes first, confirmed Provo Power program terms).
5. Lock the system size against the worst case the family is willing to plan for, then sign.

The current sizing math is good enough to anchor the bid stage. It is not good enough to sign a contract on without resolving the four open assessment items.
