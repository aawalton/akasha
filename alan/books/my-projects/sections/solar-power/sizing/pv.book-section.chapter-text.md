
# PV Sizing for Annual Net-Zero

The DC kWp the system needs equals annual demand ÷ effective specific yield. Pick the specific yield by stacking Provo's anchor against the real-roof derates we expect at this site. Mid-life (year ~15) is the right horizon because credit-banking value compounds over the credit-program lifetime, not just year 1.

## Specific-yield derive

Anchor: **1,700 kWh/kWp/yr** at 30° tilt, true south, premium modules, MLPE, year 1 ([provo.md](../efficiency-factors/provo.book-chapter.md#optimal-install-anchor-case)).

Real-roof derate stack for this site (assumptions are placeholders until the roof study; refresh once measurements land):

| Factor | Derate | Source |
|---|---|---|
| Azimuth: SSW (~210°) at ~25° tilt vs. due-S 30° | × 0.96 | [orientation.md](../efficiency-factors/orientation.book-chapter.md#combined-tilt--azimuth-derate) |
| Shading: 5–10% with MLPE (per-module MPPT recovers most of it) | × 0.97 | [losses.md](../efficiency-factors/losses.book-chapter.md#shading) |
| Snow: Provo override (~2% vs. PVWatts 0%) | × 0.98 | [losses.md](../efficiency-factors/losses.book-chapter.md#snow) |
| Mid-life degradation (year ~15 avg, premium tier-1 0.35%/yr) | × 0.94 | [degradation-system.md](../efficiency-factors/degradation-system.book-chapter.md#module-degradation-year-over-year) |
| Module premium tier vs. anchor (already at anchor) | × 1.00 | — |

Effective specific yield = 1,700 × 0.96 × 0.97 × 0.98 × 0.94 = **~1,460 kWh/kWp/yr** at mid-life on the realistic-roof case.

Bracket for sensitivity:

| Scenario | Effective yield (mid-life) | Stack |
|---|---|---|
| Pessimistic (W-facing, 15% shading, leaky retrofit timeline) | **1,400** | 1,700 × 0.85 × 0.94 |
| Realistic (SSW, 10% shading on MLPE, mid-life) | **1,500** | The stack above, rounded |
| Optimistic (S-facing, ≤5% shading, premium tier-1 0.30%/yr) | **1,650** | 1,700 × 0.99 × 0.99 × 0.97 |

Round numbers to 1,400 / 1,500 / 1,650. The realistic case is the planning number.

## DC kWp at each demand × yield cell

DC kWp = annual kWh ÷ specific yield. Rows are demand scenarios; columns are yields.

| Demand (kWh/yr) | At 1,400 | At 1,500 (plan) | At 1,650 |
|---|---|---|---|
| Low (48,000) | 34.3 | **32.0** | 29.1 |
| Nominal (73,000) | 52.1 | **48.7** | 44.2 |
| High (87,000) | 62.1 | **58.0** | 52.7 |
| High + 4-of-12 inference (~103,000) | 73.6 | **68.7** | 62.4 |

Planning column (1,500 kWh/kWp/yr): low → 32 kWp, nominal → **49 kWp**, high → 58 kWp.

## Inverter Loading Ratio (ILR)

Per [degradation-system.md](../efficiency-factors/degradation-system.book-chapter.md#dcac-ratio-inverter-loading-ratio): residential sweet spot is ILR 1.15–1.25, ~1.5–2.5% clipping in Provo's clear-sky climate, net positive on annual kWh vs. ILR 1.00.

For the 49 kWp DC planning case at **ILR 1.20**: AC inverter rating = 49 ÷ 1.20 = **41 kW AC**. Round to 40 kW. Slight under-sizing on AC saves inverter $$ at the cost of a couple percent of summer-noon energy — acceptable.

| DC kWp | ILR | AC kW |
|---|---|---|
| 32 | 1.20 | 27 |
| 49 | 1.20 | **41** |
| 58 | 1.20 | 48 |

## Roof area feasibility

Planning anchor: **5.5 m²/kWp** for ~21% premium modules with mounting gaps (matches ~20 W/sq ft, the standard residential rule-of-thumb).

| DC kWp | Roof area needed (m²) | (sq ft) |
|---|---|---|
| 32 | 176 | **1,895** |
| 49 | 270 | **2,905** |
| 58 | 319 | **3,435** |

### Comparison to the house footprint

A 6000 sq ft 2-story home typically has a first-floor footprint of **~2,800–3,500 sq ft** (depending on basement-finished, 2-story vs. 1.5-story, garage attached/detached). The whole footprint is not usable roof:

| Deduction | Typical loss |
|---|---|
| Hip roof faces other than south/west | -30 to -50% |
| Vents, plumbing stacks, chimneys, skylights, fire-code 18″ ridge setback | -15 to -25% |
| Shaded edges (trees, dormers casting on adjacent face) | -5 to -15% |
| **Effective usable south + SSW + west roof area** | **~30–50% of footprint** |

For a 3,000 sq ft footprint that maps to **~900–1,500 sq ft of high-yield roof** before any secondary structures. The math:

| Scenario | DC kWp | Roof sq ft needed | Footprint-derived available | Verdict |
|---|---|---|---|---|
| Low | 32 | 1,895 | 900–1,500 | Tight; needs garage roof or supplement |
| Nominal | 49 | 2,905 | 900–1,500 | **Will not fit on house roof alone** |
| High | 58 | 3,435 | 900–1,500 | Will not fit |

### Architectural release valves

Ranked by typical $/kWp and headache:

1. **Detached-garage roof** — if it exists or can be added. Best $/kWp; same inverter, same interconnect, modest extra labor.
2. **Solar pergola / covered patio** — purpose-built south-facing tilt-optimized structure. Adds shade where you might want it, ~$1.50–$2.50/W upcharge over rooftop, but a clean 30°-S orientation.
3. **Ground-mount array** — best per-panel yield (cooler, no shading, optimal tilt) but needs land, trench, conduit, perimeter fencing if HOA/permit demands it. Adds ~$0.40–$0.70/W vs. rooftop per [pricing/levers.md](../pricing/levers.book-chapter.md).
4. **Carport over driveway** — combines EV-charging shelter with PV; emerging architectural pattern.

**Recommendation**: assume the house roof alone hosts ~25–35 kWp at best. The remaining 15–25 kWp for the nominal case must come from one of the release valves above. The roof study will resolve this; until then, **budget for at least one supplement structure in the bid scope**.

## What the bids must report

Per [provo.md](../efficiency-factors/provo.book-chapter.md#what-to-ask-installer-bids), require each bid to state:

- PVWatts year-1 modeled kWh and the System Losses % used.
- Total Solar Resource Fraction (TSRF) per roof face.
- DC/AC ratio (ILR) and modeled clipping.
- Inverter topology and rationale for shading.
- Module brand/model, temp coefficient, performance warranty.
- Assumed degradation rate, citing the manufacturer warranty curve.

Bids that promise >1,650 kWh/kWp/yr at year 1 on a non-optimum roof should be challenged immediately — that exceeds the optimistic case for this site.

## Carry-forward

The 49 kWp DC / 40 kW AC nominal case feeds [battery.md](battery.book-chapter.md) (PV-to-evening daily shift), [topology.md](topology.book-chapter.md) (inverter platform sizing), and [cost.md](cost.book-chapter.md) ($/W × kWp). The roof-area gap motivates the supplement-structure line in [cost.md](cost.book-chapter.md).
