
# 1970s Utah House — Envelope Baseline

A 1970s Wasatch Front house was built to the [pre-1978 IECC](https://www.energycodes.gov/sites/default/files/2021-07/Utah_2018_Residential.pdf) regime, before any meaningful air-tightness or insulation requirements. Construction-vintage assumptions Alan should treat as the prior before the blower-door / IR audit overwrites them:

## Assemblies

- **Walls.** 2x4 framing 16" o.c. with kraft-faced **R-11 fiberglass batts**, often settled or compressed by ~20–30% after 50 years ([BSI-005 — Building Science Corp on cavity insulation degradation](https://www.buildingscience.com/documents/insights/bsi-005-a-bridge-too-far)). Effective whole-wall R is closer to R-7 to R-9 after framing factor (~23% of wall is studs/plates/headers conducting around R-4) and settling. No exterior continuous insulation.
- **Attic.** Original blown fiberglass or batts targeted **R-19**; commonly reads R-11 to R-19 today after disturbance from HVAC work, wiring runs, recessed cans, and the can-light leakage Utah crawls give. Top-plate penetrations rarely sealed.
- **Rim joist / band joist.** Uninsulated 2x10 or 2x12 rim around the perimeter is the **single biggest convective bypass** in a vintage house ([BSI-002 — air barrier vs. vapor barrier](https://www.buildingscience.com/documents/insights/bsi-002-the-perfect-wall)). Direct conduction through ~10" of wood and direct air infiltration through poorly-sealed sill plates and rim-to-subfloor seams.
- **Basement walls.** Typically uninsulated concrete or block. Daylight basements get partial frame walls with R-11 batts above grade only.
- **Slab edge.** No perimeter insulation. Provo's frost depth (~30") means meaningful conductive loss for any below-grade slab edge in contact with cold soil.
- **Foundation type.** Provo housing stock from the 1970s is overwhelmingly full basement or daylight basement, not slab-on-grade.

## Windows

Three common scenarios in order of likelihood:

1. **Original aluminum-frame single-pane** (U ≈ 1.1, no thermal break) — worst case, increasingly rare after 50 years.
2. **Original double-hung wood single-pane** (U ≈ 0.9) with storm windows added later (composite U ≈ 0.5).
3. **One round of replacement to early double-pane** in the 1990s–2000s, builder-grade vinyl, clear glass, no low-e (U ≈ 0.50–0.55).

For comparison, [ENERGY STAR cold-climate windows](https://www.energystar.gov/products/residential_windows_doors_skylights/key_product_criteria) are U-0.27 or better. A 1970s house with 300 sq ft of glass at U-0.55 loses ~46% more conductive heat through windows than the same glass at U-0.27.

## Air leakage

The biggest single number. Utah housing-stock blower-door results from [LBNL's residential infiltration database](https://homes.lbl.gov/) cluster around:

- **Modern code (2018 IRC / IECC):** ≤ 3 ACH50.
- **1990s–2010s production homes:** 5–7 ACH50.
- **1970s Utah housing stock:** **8–15 ACH50** typical.
- **Passive House:** ≤ 0.6 ACH50.

A 6000 sq ft, 9-ft-ceiling house at 10 ACH50 leaks ~9,000 CFM50, which integrates over the heating season to **40–60% of total heating load** lost to infiltration alone (using the [ASHRAE 62.2 LBL infiltration model](https://www.energy.gov/eere/buildings/articles/ashrae-standard-622-ventilation-and-acceptable-indoor-air-quality)). Air sealing is therefore the dominant lever, not insulation.

## Ductwork

1970s HVAC was forced-air gas through sheet-metal trunks. Common configuration:

- Trunks run through the **unconditioned attic** or a **vented crawl space**.
- **Mastic-sealed joints are rare**; cloth-tape seals have failed; supply-side leakage of 15–30% is normal ([LBNL duct-leakage residential database](https://homes.lbl.gov/sites/default/files/lbnl-1004196.pdf)).
- Trunk insulation R-2 to R-4 (a thin foil-faced fiberglass wrap), much of which has slumped or torn.
- Return-side leakage pulls attic air (and the dust/insulation fibers in it) directly into the supply stream when the air handler runs.

**Why this matters for an all-electric retrofit:** duct losses don't go away when the heat source switches from gas furnace to heat pump. If Alan keeps the existing ductwork, every kWh the heat pump moves still loses 15–30% before it reaches conditioned space — and that loss multiplies the PV oversize required. Duct sealing or moving the duct system inside the conditioned envelope is one of the few items that **must** be evaluated alongside the heat pump install, not deferred.

## What this baseline implies for sizing

Plugging the 1970s defaults into the [hvac.md heat-loss table](../energy-demand/hvac.book-chapter.md#heat-loss--design-day-envelope-load-btuh):

- R-11 walls, R-19 attic, U-0.55 windows, 10 ACH50 puts the house at the **"Existing leaky" 9.0 W/ft²** row → 54 kW design heat load, 184,000 Btu/h, **19,000–22,000 kWh/yr** of heating electric on a CCHP.
- The "Well-insulated" row at 4.5 W/ft² (9,500–11,000 kWh/yr) is what a comprehensive retrofit can plausibly approach, though not fully reach without exterior continuous insulation.
- The realistic post-retrofit target is **~6.0 W/ft² ("code-min new build" row)** — 36 kW design, 123,000 Btu/h, **13,000–15,000 kWh/yr** — achievable with air seal + attic top-up + rim + duct seal + dense-pack walls, without touching windows or siding.

That 22,000 → 14,000 kWh/yr delta is the size of the prize for the retrofit-vs-PV-oversize tradeoff in [math.md](math.book-chapter.md).
