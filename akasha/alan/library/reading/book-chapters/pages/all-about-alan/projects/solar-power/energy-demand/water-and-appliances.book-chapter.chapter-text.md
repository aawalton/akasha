
# Domestic Hot Water + Appliances

All values are conservative — biased toward higher demand for self-sufficiency sizing.

## Domestic hot water (DHW)

Assumption: 4-person household-equivalent water use (Alan + spouse + visitors / occasional housemates, dishwasher + laundry). Baseline: **70 gallons/day** of 120°F mixed water ([DOE Energy Saver — Sizing a New Water Heater](https://www.energy.gov/energysaver/sizing-new-water-heater), [ASHRAE 90.2 hot water use](https://www.ashrae.org/technical-resources/standards-and-guidelines)).

Energy to heat 70 gal/day from 50°F (Provo cold-water inlet, annual avg) to 120°F:
- ΔT = 70°F. 70 gal × 8.34 lb/gal = 584 lb/day. × 70°F = 40,870 Btu/day = **11.99 kWh thermal/day**.
- Annual thermal: **~4,375 kWh thermal/yr**.

### Option A — Heat pump water heater (HPWH)

Modern HPWH (Rheem ProTerra, AO Smith Voltex, State Premier HPX) UEF 3.5–3.9 (year-round average COP ~3.0 in conditioned space, ~2.2 in unconditioned garage in Provo winters).

- Annual electric (in conditioned space, COP ~3.0): 4,375 ÷ 3.0 = **~1,460 kWh/yr**.
- Annual electric (in garage / cold space, COP ~2.2 winter / ~3.0 summer = ~2.5 avg): **~1,750 kWh/yr**.
- ENERGY STAR labels for 80-gal HPWHs land at 1,200–1,900 kWh/yr ([ENERGY STAR HPWH product finder](https://www.energystar.gov/productfinder/product/certified-water-heaters/details/)).

Peak electric: compressor only, ~500–600 W. Resistance backup elements activate during high-draw events: 4,500 W.

### Option B — Resistance water heater

Plain 80-gal electric tank, EF ~0.95.
- Annual electric: 4,375 ÷ 0.95 = **~4,600 kWh/yr**.
- Peak: dual 4,500 W elements, non-simultaneous = 4,500 W; some models simultaneous = 9,000 W.

### Tradeoff (self-sufficiency lens)

| Factor | HPWH | Resistance |
|---|---|---|
| Annual kWh | 1,500–1,800 | 4,600 |
| Peak draw | 0.6 kW typ / 4.5 kW backup | 4.5 kW |
| Failure modes | Compressor, refrigerant leak, condensate drain, expansion valve, control board | Heating element, thermostat |
| MTBF (consumer reports) | ~10–12 yr | ~15–20 yr |
| Repair complexity | Refrigeration tech | Homeowner-replaceable element |
| Side effects | Cools and dehumidifies surrounding space (~3,000 Btu/h winter heat penalty if conditioned) | None |
| Compatible with solar dump load | Yes (any solar-aware controller) | Excellent — purely resistive |

**Recommendation for self-sufficiency**: **two resistance tanks in series-staged (or one large tank + tempering)**. Adds ~3,000 kWh/yr vs. HPWH but eliminates the compressor as a failure point, doubles as a solar dump load when batteries are full, and a heating element can be hand-swapped without a refrigeration tech.

**Planning value: 4,800 kWh/yr** (resistance with bias toward higher use).

### Monthly distribution

Cold-water inlet swings from ~40°F (Jan) to ~65°F (Aug) → ΔT swings 80°F to 55°F:

| Month | DHW kWh (resistance) | DHW kWh (HPWH) |
|---|---|---|
| Jan | 470 | 155 |
| Feb | 430 | 145 |
| Mar | 430 | 150 |
| Apr | 400 | 145 |
| May | 380 | 145 |
| Jun | 360 | 150 |
| Jul | 350 | 160 |
| Aug | 350 | 160 |
| Sep | 370 | 150 |
| Oct | 400 | 150 |
| Nov | 430 | 145 |
| Dec | 460 | 155 |
| **Year** | **4,830** | **1,810** |

Note HPWH summer kWh slightly higher than winter because COP drops modestly with warmer air *and* compressor runs more frequently to keep up with high ambient cold-water replenishment. Resistance is purely a function of ΔT and daily volume.

## Induction range

12 hr/wk total burner-on time at ~2.0 kW average (induction is ~85% efficient — actual energy to pan is faster, but pan idling between stir cycles brings average down). 12 × 2.0 × 52 = **~1,250 kWh/yr**.

Oven adds: ~3 hr/wk at 2.5 kW average × 52 = ~390 kWh/yr.

**Planning value: 1,700 kWh/yr.** Peak: 7.2–11 kW with full burner + oven + air-fryer drawer (some ranges, e.g., Café CHS950P, hit 11 kW peak).

[ENERGY STAR estimated annual operating cost](https://www.energystar.gov/products/electric_storage_water_heaters) for induction ranges: 600–900 kWh/yr in typical households — bumped up here for higher cooking volume.

## Refrigeration

Two units assumed (main kitchen + secondary in pantry/garage):
- Main French-door 24 cu ft, ENERGY STAR: 550 kWh/yr ([ENERGY STAR refrigerator finder](https://www.energystar.gov/productfinder/product/certified-residential-refrigerators/results)).
- Secondary 21 cu ft top-freezer or chest freezer 15 cu ft: 400 kWh/yr.

**Planning value: 1,100 kWh/yr.** Peak: ~600 W per compressor on start; ~150 W run.

## Clothes dryer

Heavy use: 8 loads/wk × 3.5 kWh/load (vented electric resistance dryer, ~5,500 W × 40 min) = **~1,450 kWh/yr**.

Heat-pump dryer alternative (LG WashCombo, Miele T1) cuts this in half (~750 kWh/yr) but is slower and adds compressor failure mode. Self-sufficiency favors the simpler vented resistance dryer.

**Planning value: 1,500 kWh/yr.** Peak: 5.5 kW (240 V × 23 A).

## Dishwasher

10 cycles/wk × 1.2 kWh/cycle (ENERGY STAR Bosch 800 series) × 52 = **~625 kWh/yr**. Includes internal water heating (most modern dishwashers heat their own water, even on hot fill).

**Planning value: 650 kWh/yr.** Peak: 1.4 kW heating element + 0.1 kW pump.

## Washing machine

10 loads/wk × 0.3 kWh/load (front-load HE, cold-warm mix) × 52 = ~155 kWh/yr.

**Planning value: 200 kWh/yr.** Peak: 0.5 kW.

## Microwave, small appliances

Microwave (10 min/day × 1.2 kW = 0.2 kWh/day × 365 = 73 kWh/yr), countertop oven, air fryer, coffee maker (1 hr × 1.0 kW × 365 = 365 kWh), instant pot, electric kettle, blender:

**Planning value: 600 kWh/yr.** Peak: ~3 kW if all on simultaneously (rare).

## Summary

| Load | Annual kWh | Peak kW |
|---|---|---|
| DHW (resistance, planning) | 4,800 | 4.5 |
| Induction range + oven | 1,700 | 11 |
| Refrigeration (2 units) | 1,100 | 0.6 |
| Clothes dryer | 1,500 | 5.5 |
| Dishwasher | 650 | 1.5 |
| Washing machine | 200 | 0.5 |
| Microwave + small appliances | 600 | 3.0 |
| **Subtotal** | **10,550** | **~15 coincident worst-case** |

(If HPWH instead of resistance, subtract ~3,000 → **~7,500 kWh/yr**.)

## What pushes the number up or down

- **More occupants** → DHW scales nearly linearly. Each additional adult adds ~1,200 kWh/yr of resistance DHW.
- **Cooking style**: heavy home cooking (multiple hours/day) can push range to 3,000 kWh/yr.
- **Dryer alternative**: outdoor line-drying half the year cuts dryer by 30–50%.
- **HPWH location**: garage-sited HPWH in Provo winters drops to COP ~1.8–2.0 — losing most of the savings.
- **Solar dump load**: a resistance DHW tank with a smart diverter (Eddi, OPTI, custom Shelly relay) absorbs PV surplus when batteries are full — improves effective self-sufficiency without changing nameplate kWh.
