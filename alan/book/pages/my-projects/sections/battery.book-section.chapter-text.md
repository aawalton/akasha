
# Battery Sizing

The grid carries the seasonal deficit per [scope.md](book-section/solar-power/scope), so the battery has two jobs:

1. **Daily smoothing** — shift midday PV surplus into evening load.
2. **Short-duration outage resilience** — ride a few hours to a couple of days, depending on what we're willing to spend.

Both are bounded by hours-to-days rather than months. That is a 20–40 kWh job.

The battery is **not part of the PV case**. It is priced as its own line and decided on its own, per [scope.md](book-section/solar-power/scope) and [pricing.md](book-section/solar-power/pricing); this file sizes it for whoever decides to buy it.

## What a shifted kWh is worth

Provo City Power residential has **no time-of-use option**: Schedule 1 is a three-tier inclining block ($0.07 / $0.11 / $0.13 per kWh plus an $18.00 monthly customer charge), and the published schedule list carries no residential TOU tariff ([customer-generation.md](book-section/solar-power/customer-generation)). The avoided-cost export credit under Schedule 1.1 (−$0.06742/kWh) is the load-bearing tariff here.

So a kWh the battery keeps at home rather than exporting is worth the retail rate it displaces less the export credit it forgoes, and nothing else. At this house's marginal tier that is **$0.13 − $0.06742 = $0.063/kWh**. No hour of the day pays better than another, and there is no arbitrage past that spread.

## Function 1 — Daily PV-to-evening shifting

Goal: capture midday PV surplus and discharge it during the evening / overnight loads that don't align with the solar curve.

Evening-and-overnight load shape on a typical day (planning case from [demand.md](book-section/sizing/demand)):

| Time | Load | Source |
|---|---|---|
| 7 AM peak | ~25 kW | Heat + DHW + cook + 6 PCs idle |
| 9 AM–4 PM | 8–15 kW | PCs + DHW + cooling, mostly served by PV directly |
| 5 PM–11 PM | 12–18 kW | Heavy gaming + DHW + cook + lighting |
| 11 PM–7 AM | 6–10 kW | EVs scheduled charge + always-on baseline + heat |

kWh in the "needs to come from solar via battery, not from grid" window (roughly 6 PM–10 PM, ignoring overnight EV charging which is best served by net-metered grid pull at off-peak or PV-following daytime mode):

- Gaming PCs evening: ~50 kWh (12 PCs × ~700 W × 6 hr)
- Heat / cool, DHW, cook evening: ~30 kWh
- Total typical evening shift opportunity: **~50–80 kWh**

But not all of this needs battery — much can be supplied by PV during shoulder hours (4–7 PM with low-angle sun). Realistic battery throughput per evening: **30–40 kWh**.

A 40 kWh usable battery cycles ~1 cycle/day in summer, ~0.5 cycle/day in winter (winter PV doesn't fill it). Lifecycle math: 4,000+ cycles at 80% DoD across all current LFP chemistry — 10+ year warranty across all Powerwall 3 / IQ Battery 5P / Franklin aPower products per [pricing/components.md](book-section/pricing/components#battery--separate-line-item).

## Function 2 — Outage resilience

Two bracket cases.

### Case A — typical Provo outage (a few hours)

Per Rocky Mountain Power historical reliability, Utah Valley SAIDI is ~90–110 min/yr with most events under 4 hours ([RMP reliability reports](https://www.rockymountainpower.net/about/reliability.html) — verify with current data). Critical-loads-only continuous draw if the load-shedder cuts gaming + EVs:

- HVAC critical (heat pump on, defrost cycles): ~8 kW
- DHW (intermittent recovery): avg 0.5 kW
- Refrigeration: 0.3 kW
- Networking + lights + a few outlets: 1.0 kW
- **Critical-loads draw: ~10 kW average, 5 kWh/hr × ~5 hours = ~25 kWh**

A 30–40 kWh usable bank rides this case clean.

### Case B — worst-case multi-day winter outage with heat full bore

Winter day at design temp without load shedding, planning value from [hvac.md](book-section/energy-demand/hvac#peak-heating-demand-kw): heat pump ~18 kW peak, ~10 kW average across 24 hours including defrost. Full house load floor:

- Heat (mid-envelope @ -2°F design): 240 kWh/day if HP runs hard
- DHW: 13 kWh/day
- Fridge + lights + networking + always-on: 12 kWh/day
- Gaming + EVs assumed load-shed
- **Critical-loads winter day, full-bore heat: ~265 kWh/day**

With load-shedding heat to setback temps (62°F instead of 70°F, leaving frost-safe but cool): ~150 kWh/day.

Riding 2 days: **300 kWh usable**. Riding 3 days: 450 kWh. That's a $300k–$450k battery bank — disproportionate.

| Outage ride-through | Usable kWh | $ at $1,000/kWh installed |
|---|---|---|
| 4-hour critical-loads | 25 | $25,000 |
| 12-hour critical-loads | 60 | $60,000 |
| 1-day winter with load-shedding | 150 | $150,000 |
| 2-day winter with load-shedding | 300 | $300,000 |

The economic break is clearly between 12-hour and 1-day. Spend $25–40k to cover the realistic outage case, or nothing; rely on grid restoration for the rare multi-day winter event, with a small propane standby gen as a separate decision if that event matters enough.

## Battery cost per [pricing/components.md](book-section/pricing/components#battery--separate-line-item)

| Product | Usable kWh per unit | Typical installed $ | $/kWh |
|---|---|---|---|
| Tesla Powerwall 3 | 13.5 | $12,000–$15,000 | $890–$1,110 |
| Enphase IQ Battery 5P | 5.0 | $6,000–$8,000 | $1,200–$1,600 |
| Franklin aPower | 13.6 | $13,000–$16,000 | $960–$1,180 |
| SolArk L3-15K paired with rack | 15.4 | $12,000–$14,000 | $780–$910 |

Planning anchor: **$1,000/kWh installed** for a 30–40 kWh bank in 2026, before any ITC.

## Recommendation — an optional line of its own

**The battery does not pay for itself.** At $0.063/kWh of spread, ~35 kWh shifted on a summer day and ~0.5 cycle/day through winter, self-consumption is worth **$600–$800/yr**. Against $40,000 installed on a bank warranted 4,000 cycles — 10 to 11 years at one cycle a day — lifetime arbitrage returns **$6,600 to $8,800**. The bank wears out long before it pays back, so roughly 80% of the price is buying outage resilience and a hedge against a future tariff change.

That is what [scope.md](book-section/solar-power/scope) means by the battery decision being decoupled from solar ROI, and why [pricing.md](book-section/solar-power/pricing) says skip it on the first install. Three buys, all defensible:

| Buy | $ | What it gets |
|---|---|---|
| **Nothing** (first-install default) | $0 | The grid. Add a bank later without rework; battery $/kWh falls ~10%/yr |
| **27 kWh** (2× Powerwall 3) | $27,000 | 4-hour critical-loads outage, most of the daily shift |
| **40 kWh** (3× Powerwall 3, 8× IQ Battery 5P, or a SolArk-paired rack) | $40,000 | 12-hour critical-loads outage, daily shift covered with headroom |

Going past 40 kWh is the wrong lever — the marginal kWh past 40 buys outage hours already ruled out above. If more is wanted, spend it on envelope, to shrink consumption, or on PV, to match annual load more closely.

## What gets traded away (explicitly)

- **Multi-day winter ride-through** — not budgeted. A 2-day December outage at full heat is on the grid, not the battery. Critical-loads load-shedding stretches a 40 kWh bank to ~36 hours of frost-safe (low setback) operation, but no longer.
- **EV charging during outage** — not budgeted. The two L2 chargers are load-shed first. (Mitigation: bidirectional-capable BEVs like Lightning / Cybertruck can flip into V2H — see [vehicles.md](book-section/energy-demand/vehicles#failure-modes--resilience-tradeoff).)
- **Sustained inference workload during outage** — explicitly not protected. The PCs go to the load-shed bucket.

## Carry-forward

Battery sizing closes at **$0 in the PV case, with 27 or 40 kWh as an optional line priced on its own**. The inverter should still be hybrid — capable of charging a bank from PV and discharging it to AC loads — so the option stays open without rework; see [topology.md](book-section/sizing/topology). Cost lands in [cost.md](book-section/sizing/cost).
