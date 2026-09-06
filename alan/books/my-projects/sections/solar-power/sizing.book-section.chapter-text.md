
# Sizing

Annual-net-zero PV sizing for 1350 Apple Ave, Provo, against Provo City Power's Schedule 1.1 net-metering program. The grid is the seasonal battery: twelve-month production ≥ twelve-month consumption is the target, December-specific parity is not. See [scope.md](scope.book-chapter.md) for the architectural pivot away from the pure-island case.

This file is the index plus the headline planning case. Math is split into six sub-files (each ≤200 lines) under sizing/, one per dimension.

## Files

| # | File | Covers |
|---|------|--------|
| 1 | [demand.md](sizing/demand.book-chapter.md) | Iteration-2 revised annual demand: flag-loads removed, low-end EV miles applied, inference upside flagged but excluded from base case. |
| 2 | [pv.md](sizing/pv.book-chapter.md) | DC kWp from specific yield × real-roof derate × mid-life degradation × ILR; demand × yield sensitivity table. |
| 3 | [battery.md](sizing/battery.book-chapter.md) | Daily PV → evening shifting plus outage resilience. Recommendation, cost, what gets traded away. |
| 4 | [topology.md](sizing/topology.book-chapter.md) | Inverter topology (microinverter vs string + optimizers vs hybrid string + battery) and service-panel decision (200 A + SPAN vs 400 A). |
| 5 | [cost.md](sizing/cost.book-chapter.md) | Total cost stack at low / nominal / high demand, pre-ITC and post-ITC, with the ITC status uncertainty called out. |
| 6 | [recommendation.md](sizing/recommendation.book-chapter.md) | Sensitivity levers ranked by leverage and the single planning case that the next iteration evaluates bids against. |

## Headline numbers (revised, iteration 2)

Flag-loads (hot tub, separate server room, well pump) removed per [scope.md](scope.book-chapter.md). Home lab is the 12 PCs already in the load — no extra line. EV miles reduced to the low end of the household range (22,000 mi/yr combined). Future significant-inference workload on the PCs is noted as upside, not in the base case.

| Scenario | Annual kWh | Drivers |
|---|---|---|
| Low | **~48,000** | Well-insulated envelope post-retrofit, HPWH, moderate gaming, 22k EV mi |
| Nominal (planning) | **~73,000** | Mid envelope, resistance DHW, heavy gaming planning value, 22k EV mi |
| High | **~87,000** | Leaky envelope, resistance DHW, heavy gaming, 22k EV mi, future inference not yet active |

Full derivation: [demand.md](sizing/demand.book-chapter.md).

## Headline PV sizing

Provo anchor specific yield: ~1,700 kWh/kWp/yr at 30° tilt, true south, premium modules, MLPE, year 1 ([provo.md](efficiency-factors/provo.book-chapter.md)). Realistic real-roof derate for a SSW-tilted ~25° roof with 5–10% shading on MLPE plus snow plus mid-life (~15-year average) degradation: **~1,500 kWh/kWp/yr**. Range 1,400 (pessimistic) to 1,650 (well-oriented, minimal shading).

DC kWp at nominal yield 1,500 kWh/kWp/yr:

| Demand | DC kWp | AC inverter @ ILR 1.20 |
|---|---|---|
| Low (48k) | **32 kWp** | 27 kW |
| Nominal (73k) | **49 kWp** | 41 kW |
| High (87k) | **58 kWp** | 48 kW |

Full sensitivity: [pv.md](sizing/pv.book-chapter.md).

## Headline battery sizing

Grid is the seasonal battery, so battery sizing covers (a) daily PV-to-evening shifting and (b) short-duration outage resilience.

- Daily shift: ~30–40 kWh — covers gaming PCs (~50 kWh/evening) and DHW/cook through the post-sunset window.
- Outage resilience (load-shedded critical-loads only — HVAC + DHW + fridge + lights, ~120 kWh/day): 30–40 kWh rides a single Provo evening outage clean; 2-day winter ride-through needs 240 kWh, which is disproportionate. Accept that edge case and rely on grid + (optional, separate) gen.

**Recommendation: 27–40 kWh usable (2–3× Powerwall 3-class units).** Full math: [battery.md](sizing/battery.book-chapter.md).

## Headline topology and service

- **Inverter**: hybrid string with DC optimizers (e.g., 2× SolArk 15K-2P or equivalent), or Enphase IQ8 + IQ Battery if microinverter preferred. Hybrid string + optimizers wins on $/W at this size, accommodates the eventual inference upside without rework, and pairs cleanly with one battery stack. See [topology.md](sizing/topology.book-chapter.md).
- **Service panel**: **400 A service**. Realistic managed peak (25–35 kW) and unmanaged worst case (~55 kW) both blow past 200 A; the SPAN-on-200A path saves ~$3k but turns the load-shedder into load-bearing infrastructure. The 400 A panel keeps the load-shedder as additive optimization rather than a single point of failure. See [topology.md](sizing/topology.book-chapter.md).

## Headline roof area

At ~5.5 m²/kWp planning anchor (~20 W/sq ft for ~21% modules with mounting gaps), the 49 kWp nominal case needs **~270 m² (≈2,900 sq ft)** of unshaded roof. A 6000 sq ft 2-story house has a first-floor footprint typically in the 2,800–3,500 sq ft range; after hips, vents, fire setbacks, shaded edges, and multi-face derate, **the nominal case is tight on roof alone and the high case will not fit.** Plan a **detached-garage roof + ground-mount or pergola supplement** as the architectural release valve. Full: [pv.md](sizing/pv.book-chapter.md#roof-area-feasibility).

## Headline cost (planning case, nominal demand)

At Utah $/W for a 50 kWp system (volume discount off the $2.65/W EnergySage median — [total-retail.md](pricing/total-retail.book-chapter.md)): **~$2.40/W blended.**

| Line | $ |
|---|---|
| PV (49 kWp @ $2.40/W) | $118,000 |
| Battery (40 kWh, ~$1,000/kWh installed) | $40,000 |
| 400 A service upgrade | $6,000 |
| Subpanels + load management | $4,000 |
| Two L2 EVSEs (48 A, installed) | $4,000 |
| **Pre-ITC total** | **~$172,000** |
| Post-ITC @ 30% (if ITC survives 2026) | **~$120,000** |
| Post-ITC @ 0% (ITC expired) | $172,000 |

ITC status for residential cash/loan installs after Dec 31, 2025 is **uncertain** per [pricing.md](pricing.book-chapter.md) — verify currency before signing. Full table for all three scenarios: [cost.md](sizing/cost.book-chapter.md).

## Planning-case recommendation

One case for the next iteration to evaluate bids against:

| Dimension | Target |
|---|---|
| PV (DC) | **49 kWp** (~120 modules @ 410 W) |
| Inverter (AC) | **40 kW** hybrid string + DC optimizers, ILR ~1.22 |
| Battery (usable) | **40 kWh** (3× Powerwall 3 or equivalent) |
| Service panel | **400 A** main with 4× subpanels (gaming, EV, HVAC/DHW critical, general) |
| Roof | Primary house roof + detached-garage roof; ground-mount/pergola if measured area shorts |
| All-in net of 30% ITC | **~$120,000** |
| All-in without ITC | **~$172,000** |

Rationale and what would move this number: [recommendation.md](sizing/recommendation.book-chapter.md).

## Sources

This file synthesizes the four prior research files; cited inline above and in each sub-file. Primary anchors: [provo.md](efficiency-factors/provo.book-chapter.md) (specific yield), [totals.md](energy-demand/totals.book-chapter.md) (load roll-up), [scope.md](scope.book-chapter.md) (architecture pivot), [pricing.md](pricing.book-chapter.md) ($/W).
