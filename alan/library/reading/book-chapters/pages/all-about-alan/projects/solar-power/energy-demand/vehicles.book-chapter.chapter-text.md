
# Two Electric Vehicles

Both cars assumed long-range BEVs charged at home on Level 2 (240 V) EVSEs. No public DCFC reliance for daily driving. Provo winters add a real but bounded cold-weather penalty.

## Annual miles

US household average per vehicle is ~12,000–13,500 mi/yr ([FHWA Highway Statistics — Table VM-1](https://www.fhwa.dot.gov/policyinformation/statistics.cfm)). Two-driver households average a combined ~22,000–28,000 mi/yr. For self-sufficiency planning, **bias to the high end**:

| Scenario | Combined mi/yr |
|---|---|
| Low | 22,000 |
| Nominal | 27,000 |
| High (long commute, road trips, side car for kids) | 33,000 |

**Planning value: 28,000 combined mi/yr.** Ask Alan to confirm — actual usage often lands well above or below US average.

## Vehicle efficiency

DC battery-to-wheel efficiency per [DOE FuelEconomy.gov EV ratings](https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2024&year2=2025&vtype=Electric) (combined-cycle EPA, AC pulled from wall after charging losses):

| Vehicle | Combined mi/kWh (battery) | Combined mi/kWh (wall, ~10% loss) |
|---|---|---|
| Tesla Model 3 Long Range AWD 2025 | 4.2 | 3.8 |
| Tesla Model Y Long Range 2025 | 4.0 | 3.6 |
| Hyundai Ioniq 6 SE | 4.3 | 3.9 |
| Hyundai Ioniq 5 SE-RWD | 3.6 | 3.2 |
| Kia EV6 RWD | 3.7 | 3.3 |
| Ford F-150 Lightning ER | 2.0 | 1.8 |
| Rivian R1S | 2.2 | 2.0 |
| Rivian R1T | 2.4 | 2.2 |
| GMC Hummer EV | 1.5 | 1.35 |
| Tesla Cybertruck | 2.3 | 2.05 |

Two-vehicle mix scenarios:

| Mix | Avg wall mi/kWh |
|---|---|
| Two efficient sedans (Model 3 + Model Y) | 3.7 |
| One sedan + one mid-size SUV (Model Y + Ioniq 5) | 3.4 |
| One sedan + one truck (Model Y + Lightning) | 2.7 |
| Two trucks (Lightning + R1T) | 2.0 |
| Two large trucks (Hummer + Cybertruck) | 1.7 |

**Planning value: 3.0 mi/kWh** (conservative — assumes a sedan-plus-SUV mix or one truck, with biases toward worse-case efficiency including some weather and freeway weighting).

## Base annual energy

28,000 mi ÷ 3.0 mi/kWh = **9,330 kWh/yr at the wall**.

## Cold-weather penalty

BEV range drops 20–40% in deep cold ([AAA cold-weather range study](https://www.aaa.com/AAA/common/AAR/files/AAA-Electric-Vehicle-Range-Testing-Report.pdf), [Recurrent Auto winter range data](https://www.recurrentauto.com/research/winter-range-loss)). Causes: cabin heat, battery preconditioning, increased rolling resistance from cold tires, denser air.

Provo's distribution of cold days:
- ~30 days/yr below 20°F (heavy penalty, ~30% range loss).
- ~60 days/yr between 20–35°F (moderate, ~15% loss).
- ~275 days/yr above 35°F (negligible penalty, ~0–5%).

Annual-average penalty:
- 30/365 × 30% + 60/365 × 15% + 275/365 × 3% = 2.5% + 2.5% + 2.3% = **~7%**.

Apply 10% buffer for safety. Annual energy with cold weather: 9,330 × 1.10 = **~10,300 kWh/yr**.

## Charging losses

Already partially baked into the wall mi/kWh figure (10% AC-to-DC loss). Heat-pump-equipped BEVs (most modern Hyundai/Kia, all Tesla models 2021+, Ford Lightning, Rivian) keep this loss at ~10%. Older resistance-heat BEVs can hit 15–18% in winter, but those are not in the long-range new-purchase consideration set.

## Planning value

| Scenario | Annual kWh |
|---|---|
| Low (22,000 mi, 3.7 mi/kWh, light winter) | 6,200 |
| Nominal (28,000 mi, 3.0 mi/kWh, +10% cold) | **10,300** |
| High (33,000 mi, 2.5 mi/kWh, +12% cold) | 14,800 |

**Planning value used in totals.md: 11,000 kWh/yr.**

## Monthly distribution

Driving is fairly flat year-round. Cold-weather penalty concentrates in Nov–Mar:

| Month | kWh (planning, 11,000/yr) |
|---|---|
| Jan | 1,050 |
| Feb | 1,000 |
| Mar | 950 |
| Apr | 880 |
| May | 870 |
| Jun | 870 |
| Jul | 870 |
| Aug | 870 |
| Sep | 870 |
| Oct | 880 |
| Nov | 950 |
| Dec | 1,040 |
| **Year** | **11,000** |

Slight winter weighting (~12% Dec vs ~8% Jun) from cold-weather efficiency loss.

## Charging peak draw

Home Level 2 EVSEs:

| EVSE / vehicle pair | Continuous current | Peak kW @ 240 V |
|---|---|---|
| Tesla Wall Connector 48 A | 48 A | 11.5 kW |
| Tesla Wall Connector 80 A (Cybertruck / older Model S) | 80 A | 19.2 kW |
| ChargePoint Home Flex 50 A | 40 A | 9.6 kW |
| Emporia Level 2 40 A | 32 A | 7.7 kW |
| Wallbox Pulsar Plus 48 A | 48 A | 11.5 kW |
| Ford Charge Station Pro 80 A (Lightning) | 80 A | 19.2 kW |

**Both cars charging simultaneously**:

| Config | Combined peak kW |
|---|---|
| Two 40 A EVSEs | 19.2 |
| Two 48 A EVSEs | 23.0 |
| One 48 A + one 80 A | 30.7 |
| Two 80 A EVSEs | 38.4 |

**Planning value: 22 kW combined peak** (two 48 A EVSEs, both at full).

This is the single largest peak load on the property. **Mandatory mitigation**: scheduled charging (overnight, ~11 PM start) to de-conflict with morning heat-pump peak, evening gaming-PC peak, and cooking. Either:

1. **Time-of-use scheduling** in the vehicle and EVSE — set both cars to start charging at 11 PM, finish by 6 AM. Free; works for most use patterns.
2. **Load-managed EVSE** (Wallbox PowerBoost, Tesla Powershare, SPAN drive) — automatically reduces charge rate when other loads spike, preventing service overload.
3. **PV-following daytime charging** — charge at the PV-surplus rate when batteries are full and panels overproducing. Maximizes self-consumption; both Wallbox Pulsar Plus and Tesla Wall Connector support this via app integration.

For self-sufficiency, the third option matters: any summer day with PV surplus and one EV home should preferentially charge from solar, not bank into the battery and then discharge through an inverter (round-trip loss ~10–12%).

## Failure modes / self-sufficiency tradeoff

- **EVSE failure**: a wall connector or breaker faults → fall back to portable Level 1 (12 A × 120 V = 1.4 kW, ~5 mi/hr added). 28,000 mi/yr ÷ 5 mi/hr = 5,600 hr/yr of L1 charging — not viable for two cars. Plan a spare EVSE or a portable L2 mobile connector as backup.
- **Grid + battery failure**: both cars become storage-bound. A long winter outage without grid → use vehicle DC fast charging at public stations or burn generator hours to charge them. Plug-in-hybrid backup vehicles avoid this but add a fossil-fuel dependency.
- **Bidirectional charging (V2H / V2L)**: Lightning, Cybertruck, and some Hyundai/Kia models can discharge into the house. A 131 kWh F-150 Lightning serves as ~2 days of additional whole-house backup. Strong self-sufficiency multiplier — worth weighting purchase decisions toward V2H-capable models.

## Summary

| Item | Value |
|---|---|
| Combined annual miles (planning) | 28,000 |
| Combined wall mi/kWh (planning) | 3.0 |
| Annual kWh (base) | 9,330 |
| Cold-weather penalty | +10% |
| **Planning annual kWh** | **11,000** |
| Peak simultaneous L2 charging | 22 kW |
| Recommended mitigation | Scheduled overnight charging + load-managed EVSEs |

## What pushes the number up or down

- **Truck vs sedan**: a Hummer EV + Cybertruck combo at 1.7 mi/kWh moves planning from 11,000 to 19,000 kWh/yr.
- **Annual miles**: each extra 5,000 mi/yr = ~1,700 kWh/yr at the planning efficiency.
- **DC fast charging usage**: road trips charged at public DCFC don't show up in home kWh — biases the actual house number low.
- **Battery preconditioning**: regular use of cabin/battery preconditioning while plugged in shifts heating energy from driving to charging — net slight increase but better range stability.
- **V2H discharging**: if a vehicle is used as house backup, annual through-the-meter kWh stays similar but the daily peak draw profile changes (vehicle becomes a load *and* a source).
