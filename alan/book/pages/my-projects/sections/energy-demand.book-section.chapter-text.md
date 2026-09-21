
# Annual Energy Demand (1350 Apple Ave, Provo, UT)

Site anchor: 6000 sq ft single-family residence, Provo (climate zone 5B, ASHRAE design temps +97°F / -2°F, ~5,800 HDD65 / ~1,100 CDD65 — [ASHRAE Climatic Design Conditions for Provo Muni](https://ashrae-meteo.info/v2.0/?lat=40.22&lng=-111.72), [NOAA NCEI Provo normals](https://www.ncei.noaa.gov/access/us-climate-normals/)). All-electric: cold-climate heat pumps for heat + cool, heat-pump or resistance water heater, induction cooktop, electric dryer. 12 high-end gaming PCs as a near-continuous load. Two long-range BEVs. Zero natural gas. Sizing target: **PV matched to annual load** under Provo Power's net-billing rules ([scope.md](book-section/solar-power/scope)) — every estimate biases toward higher demand so the system is not undersized.

This document feeds [pricing.md](book-section/solar-power/pricing) (system sizing dollars) and [efficiency-factors.md](book-section/solar-power/efficiency-factors) (production side). Generation matching is in [sizing.md](book-section/solar-power/sizing).

## Files

Split into six sub-files, each ≤200 lines, one per load family plus totals. Each sub-file shows the math, not just the result.

| # | File | Covers |
|---|------|--------|
| 1 | [hvac.md](book-section/energy-demand/hvac) | Space heating + cooling: heat-loss math, COP curves, bin-temperature integration, well-insulated vs. existing-house cases |
| 2 | [water-and-appliances.md](book-section/energy-demand/water-and-appliances) | Domestic hot water (HPWH vs. resistance), induction range, refrigeration, dryer, dishwasher, misc kitchen |
| 3 | [lights-and-plugs.md](book-section/energy-demand/lights-and-plugs) | Lighting, non-gaming plug loads, outdoor lighting, garage, networking, home-lab and pool/hot-tub flags |
| 4 | [computers.md](book-section/energy-demand/computers) | 12 gaming PCs: TDP breakdown, moderate vs. heavy usage scenarios, peak coincident draw, year-round flatness |
| 5 | [vehicles.md](book-section/energy-demand/vehicles) | Two BEVs: miles × efficiency, cold-weather penalty, L2 charging peak draw, scheduling implications |
| 6 | [totals.md](book-section/energy-demand/totals) | Annual roll-up, monthly distribution table, peak-demand stack, service-panel sizing |

## Headline numbers

| Scenario | Annual kWh | Notes |
|---|---|---|
| Low (well-insulated envelope, moderate gaming, average EV miles, HPWH) | **~52,000** | Lower-bound — used to size minimum production |
| Nominal (conservative middle) | **~70,000** | Planning target |
| High (leakier envelope, heavy gaming, more EV miles, resistance DHW) | **~92,000** | Worst-case the system must still serve |

For comparison, the average US single-family home uses ~10,500 kWh/yr ([EIA — average annual electricity consumption](https://www.eia.gov/tools/faqs/faq.php?id=97&t=3)). This site is ~5–9× that, driven primarily by the gaming cluster, two EVs, and all-electric heat in a cold climate.

## Top three load drivers

1. **Gaming PCs (12 units)** — 17,500–31,500 kWh/yr. Largest single line item in the heavy case, second-largest in the moderate case. Year-round flat — does not align with the solar curve, so battery and overnight production matter more than for a typical house.
2. **Space heating (heat pump)** — 9,500–22,000 kWh/yr depending on envelope. Drives the worst-month total (January) and the worst-case morning peak (cold-snap defrost cycle).
3. **EV charging (two cars)** — 8,000–12,000 kWh/yr. Modest as an annual figure, but Level-2 charging dominates instantaneous peak demand (14–22 kW with both cars plugged in).

Hot water, cooking, refrigeration, lighting, and miscellaneous plug loads together add another ~8,000–14,000 kWh/yr — non-trivial but not architectural drivers.

## Realistic peak demand

Coincident peaks decide service-panel and inverter sizing, not annual energy.

| Combination | Peak (kW) | Notes |
|---|---|---|
| Gaming PCs all at full load | ~10–11 | 12 × ~900 W |
| Both EVs L2 charging | 14–22 | Two 48 A or 80 A circuits |
| Heat pumps + air handler at design temp, defrost cycle | 12–20 | 6000 sq ft, -2°F outdoor |
| Water heater + induction range + dryer concurrent | 10–15 | Worst-case kitchen + laundry |
| **Worst-case coincident (no management)** | **~50–60** | Winter morning: heat full + breakfast cooking + EVs still charging + PCs on |
| **Realistic with EV scheduling + load shedding** | **~25–35** | EVs off-peak, range/dryer not concurrent |

A standard 200 A / 240 V residential service tops out at ~48 kW continuous (~38 kW per NEC 80% rule). The unmanaged worst case exceeds that. **Plan a 400 A service or a load-shedding controller** (SPAN panel, Lumin LM, Schneider Square D Energy Center, or Emporia Vue + smart contactors). Details: [totals.md](book-section/energy-demand/totals).

## Winter shortfall

Demand peaks when production troughs. The demand swing is ~1.73× winter:summer ([totals.md](book-section/energy-demand/totals)); the Provo production swing is ~2.0× summer:winter. PV matched to annual load therefore still runs a deficit Nov–Mar and a surplus Mar–Oct, and net-zero annual sizing strands ~25–30% of winter demand.

**The grid carries that deficit.** Closing it with PV instead is not available: Provo Power zeroes credits at the February reset with no rollover and no cashout, so summer kWh are forfeited rather than spent in January, and the 25 kW residential cap bounds the overbuild anyway ([scope.md](book-section/solar-power/scope)). Seasonal storage does not exist at residential scale — battery economics break down past about a day of autonomy. Battery sizing is a daily-shift and outage-resilience decision, not a seasonal one: [sizing.md](book-section/solar-power/sizing).

## Load-shedding hierarchy

On a 400 A service the load shedder is additive optimization rather than load-bearing, but the order matters whenever it runs — during an outage on battery, or to hold the unmanaged peak down. Drop loads in this order:

| Priority | Load | Why this order |
|---|---|---|
| 1 (shed first) | EV charging | Easiest — cars hold days of range; can defer for 24–48 hr |
| 2 | Gaming PC cluster | Discretionary; alert occupants and shut down |
| 3 | Clothes dryer | Defer to next solar day; line-dry indoor if needed |
| 4 | Dishwasher | Defer |
| 5 | DHW (resistance), drop one tank | Half capacity; still functional |
| 6 | Cooking (induction) | Defer; the range is the largest kitchen draw |
| 7 (shed last) | Refrigeration | Must keep; ~1,100 kWh/yr is non-negotiable |
| 8 (never shed) | Heat pumps + air handler + DHW basic recovery | Plumbing freeze risk + habitability |
| 9 (never shed) | Networking, lighting, security | Always-on essentials |

At 30% state of charge the protected load drops from ~12 kW to ~3–4 kW, roughly tripling battery hours. Implementable in SPAN, Lumin, or Home Assistant + ESPHome smart contactors.

## Sources (recurring)

- [EIA Residential Energy Consumption Survey (RECS) 2020](https://www.eia.gov/consumption/residential/) — baseline end-use distributions.
- [NEEP Cold Climate Air Source Heat Pump Specification](https://ashp.neep.org/) — verified COP-vs-outdoor-temp curves for cold-climate heat pumps.
- [ENERGY STAR Most Efficient — Heat Pump Water Heaters](https://www.energystar.gov/products/most_efficient/heat_pump_water_heaters) — HPWH UEF / annual kWh labels.
- [ENERGY STAR Refrigerator / Dishwasher / Clothes Dryer Product Finders](https://www.energystar.gov/productfinder/) — current-model kWh/yr.
- [DOE FuelEconomy.gov — EV efficiency database](https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2024&year2=2025&vtype=Electric) — mi/kWh by model.
- [TechPowerUp GPU Database](https://www.techpowerup.com/gpu-specs/) — verified board power (TBP) for current GPUs.
- [ASHRAE Climatic Design Conditions — Provo Muni](https://ashrae-meteo.info/v2.0/?lat=40.22&lng=-111.72) — design temps, HDD/CDD.
- [PNNL ResStock](https://resstock.nrel.gov/) — modeled per-end-use kWh by climate zone and house size.
