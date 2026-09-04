
# Battery Sizing

Architecture pivot per [scope.md](../scope.book-chapter.md): grid plays the seasonal-storage role. Battery's job is reduced to two functions:

1. **Daily smoothing** — shift midday PV surplus into evening load.
2. **Short-duration outage resilience** — ride a few hours to a couple of days, depending on what we're willing to spend.

Both functions are bounded by hours-to-days, not months. That's a 20–40 kWh job, not a 250–500 kWh job.

## TOU spread check (do we even need daily smoothing?)

Provo City Power residential is flat-rate today (per [orientation.md](../efficiency-factors/orientation.book-chapter.md#west-facing-tou-consideration)); the avoided-cost export credit under Schedule 1.1 (−$0.06742/kWh) is the load-bearing tariff for this project, not a TOU spread. **Material TOU price spread for arbitrage is not present in 2026** — confirm with the most-current Provo Power Schedule 1.1 / 1.2 rates before final sizing.

Without TOU spread, the dollar value of "daily shifting" is the difference between the export-credit rate and the retail rate (the avoided retail cost on the self-consumed kWh). If Provo Power's export credit is at or near retail, the dollar incentive is small — the battery is then mostly an outage-resilience asset, not an arbitrage asset.

## Function 1 — Daily PV-to-evening shifting

Goal: capture midday PV surplus and discharge it during the evening / overnight loads that don't align with the solar curve.

Evening-and-overnight load shape on a typical day (planning case from [demand.md](demand.book-chapter.md)):

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

A 40 kWh usable battery cycles ~1 cycle/day in summer, ~0.5 cycle/day in winter (winter PV doesn't fill it). Lifecycle math: 4,000+ cycles at 80% DoD across all current LFP chemistry — 10+ year warranty across all Powerwall 3 / IQ Battery 5P / Franklin aPower products per [pricing/components.md](../pricing/components.book-chapter.md#battery--separate-line-item).

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

Winter day at design temp without load shedding, planning value from [hvac.md](../energy-demand/hvac.book-chapter.md#peak-heating-demand-kw): heat pump ~18 kW peak, ~10 kW average across 24 hours including defrost. Full house load floor:

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

The economic break is clearly between 12-hour and 1-day. Spend $25–40k to cover the realistic outage case; rely on grid restoration or (separate decision) a small propane standby gen for the rare multi-day winter event. The standby gen is not load-bearing for energy self-sufficiency under the annual-net-zero architecture.

## Battery cost per [pricing/components.md](../pricing/components.book-chapter.md#battery--separate-line-item)

| Product | Usable kWh per unit | Typical installed $ | $/kWh |
|---|---|---|---|
| Tesla Powerwall 3 | 13.5 | $12,000–$15,000 | $890–$1,110 |
| Enphase IQ Battery 5P | 5.0 | $6,000–$8,000 | $1,200–$1,600 |
| Franklin aPower | 13.6 | $13,000–$16,000 | $960–$1,180 |
| SolArk L3-15K paired with rack | 15.4 | $12,000–$14,000 | $780–$910 |

Planning anchor: **$1,000/kWh installed** for a 30–40 kWh bank in 2026, before any ITC.

## Recommendation

**40 kWh usable** for the planning case.

- Daily shift covered (~35 kWh + headroom)
- 12-hour critical-loads outage ride-through covered
- Cleanly modular: 3× Powerwall 3 (40.5 kWh) or 8× IQ Battery 5P (40 kWh) or a SolArk-paired rack
- $40,000 installed
- Cycle life headroom: 4,000+ cycles → 11+ years at 1 cycle/day

Low-demand fallback: **27 kWh** (2× Powerwall 3). Sufficient if envelope retrofit is aggressive and gaming intensity is closer to moderate.

High-demand variant: keep **40 kWh** — the marginal kWh past 40 is buying outage hours we already decided not to buy. Adding battery beyond 40 kWh is the wrong axis; if more is wanted, spend on PV (to keep credit-banking ahead of consumption) and on envelope (to cut consumption).

## What gets traded away (explicitly)

- **Multi-day winter ride-through** — not budgeted. A 2-day December outage at full heat is on the grid, not the battery. Critical-loads load-shedding stretches a 40 kWh bank to ~36 hours of frost-safe (low setback) operation, but no longer.
- **EV charging during outage** — not budgeted. The two L2 chargers are load-shed first. (Mitigation: bidirectional-capable BEVs like Lightning / Cybertruck can flip into V2H — see [vehicles.md](../energy-demand/vehicles.book-chapter.md#failure-modes--self-sufficiency-tradeoff).)
- **Sustained inference workload during outage** — explicitly not protected. The PCs go to the load-shed bucket.

## Carry-forward

Battery sizing closes at **40 kWh usable / $40,000 installed**. The inverter must be hybrid (capable of charging the battery from PV and discharging to AC loads) — see [topology.md](topology.book-chapter.md). Cost lands in [cost.md](cost.book-chapter.md).
