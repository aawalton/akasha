
# Retrofit Packages — Leverage Ranking

For the [1970s 6000 sq ft baseline](baseline.book-chapter.md), here are the standard retrofit measures with current Utah-market pricing, expected heating-load reduction, and dollars-per-percent. **Cost per % reduction is the ranking metric** — lower is better.

## Leverage table

Cost ranges from [Rocky Mountain Power Wattsmart contractor pricing](https://wattsmarthomes.com/rebates/insulation-ut/), [GreenHome Specialties published rates](https://greenhomespecialties.com/), and aggregated 2025–2026 Utah-market quotes; reduction percentages from [BPA Regional Technical Forum measure savings](https://rtf.nwcouncil.org/measures-list/) and the [DOE Building America retrofit performance database](https://www.energy.gov/eere/buildings/building-america-publications).

| # | Measure | Typical cost (6000 sq ft house) | Heating-load reduction | $ / % reduction | Notes |
|---|---|---|---|---|---|
| 1 | **Comprehensive air sealing** | $1,500–4,000 | 10–25% | **$100–250** | Attic top-plates, cans, chases, rim, duct boots, plumbing, electrical, top plates. Verify with post-blower-door (target 50% leak reduction). |
| 2 | **Duct sealing + insulation** (attic-routed) | $1,500–4,000 | 8–20% delivered-Btu | **$120–300** | Only relevant if ducts stay in attic. Mastic + AeroSeal. The delivered-Btu lift is multiplicative with the air-sealing line, not additive. |
| 3 | **Attic insulation top-up to R-60** | $2,000–4,000 | 5–10% | **$300–500** | Blown cellulose at ~$1.50–2.50/sq ft over the 1,500–2,500 sq ft ceiling area. Always *after* air sealing — never blow over unsealed top-plate penetrations. |
| 4 | **Rim joist insulation (closed-cell spray foam)** | $1,500–3,500 | 3–6% | **$400–700** | Combines air-sealing + R-value at the perimeter band. Often subsumed into the air-sealing line if scoped together. |
| 5 | **Wall cavity dense-pack cellulose** | $4,000–10,000 | 10–20% | **$400–700** | Drill-and-fill through siding or interior drywall. Adds ~R-13 effective; densifies any settled R-11 batts. Disruption: low if exterior, moderate if interior. |
| 6 | **Basement wall insulation** | $3,000–8,000 | 5–10% | **$600–1,200** | R-15 closed-cell or R-13 batts on framed walls inside foundation. Higher in daylight basements with substantial above-grade exposure. |
| 7 | **Continuous exterior insulation during re-side** | $20,000–60,000+ | 15–25% | **$1,500–3,500** | Only economic when siding is already being replaced; the incremental cost over re-side alone is $5,000–15,000 for ~R-7 to R-10 of mineral wool or polyiso. |
| 8 | **Whole-house window replacement** | $25,000–60,000 | 5–12% | **$3,000–10,000** | Worst $/%, full stop. Do for comfort, sound, aesthetics, or rot replacement — not for energy economics. |

## Why air sealing dominates

The first row's leverage comes from three multipliers:

1. **Infiltration is 40–60% of the heating load** in a 10 ACH50 house ([LBNL infiltration model](https://homes.lbl.gov/sites/default/files/lbnl-1004196.pdf)). Halving it removes 20–30% of the entire heating load.
2. **Marginal cost of air sealing is mostly labor on penetrations Alan already has** — no material-cost scaling with house size, just a 2-person crew for 2–3 days.
3. **It unlocks the next measure.** Blown attic insulation over unsealed top plates is worse than nothing — convective loops form inside the loose-fill and degrade R-value by 20–40%. Air sealing makes every subsequent layer perform at spec.

## Why windows lose on energy alone

A 1970s house with 300 sq ft of glass at U-0.55 has a window heat-loss coefficient of ~165 Btu/h·°F. Replacing with U-0.27 ENERGY STAR windows brings that to ~81, saving ~84 Btu/h·°F. Over the heating season (≈140,000 °F·hr at -2°F design / 5,800 HDD65), that's ~12 MMBtu, or **~1,100 kWh/yr** at a CCHP COP of 3. At ~$50,000 for the work, **$45,000 per 1,000 kWh/yr saved** — versus **~$1,500 per 1,000 kWh/yr** for air sealing. Windows are 30× worse on the energy metric.

(The non-energy reasons to replace windows are real: condensation, drafts at the perimeter, sound, frame rot, aesthetics. Score those separately, don't justify them on kWh.)

## Why duct sealing is special

It doesn't reduce the *envelope* heat-loss number — it reduces the *delivered* loss between the air handler and the room. If 25% of conditioned air leaks into the attic before reaching a register, the heat pump runs 33% longer than the envelope load requires. Sealing ducts to <6% leakage-to-outside ([ENERGY STAR duct standard](https://www.energystar.gov/products/heating_cooling/ducts)) multiplies through every other measure. **Include it whenever the duct system stays in unconditioned space.** Skip it (and use the budget elsewhere) only if the heat pump goes ductless or the ducts get pulled inside the conditioned envelope.

## Recommended package

The high-leverage four — rows 1, 2, 3, 4 — totaling **$8,000–15,000** delivers **30–45% heating-load reduction** without disturbing siding, drywall, or windows. This is the package the [math.md](math.book-chapter.md) economics are built around.

Optional row 5 (wall dense-pack) adds another 10–20% reduction at **$4,000–10,000** and is the right next move if the audit shows the existing wall batts have severely degraded. It pushes the total retrofit toward the "code-min new build" envelope row in [hvac.md](../energy-demand/hvac.book-chapter.md#heat-loss--design-day-envelope-load-btuh).

Defer rows 6, 7, 8 unless they're triggered by an unrelated need (basement finish, siding replacement, window failure).
