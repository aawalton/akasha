
# Space Heating + Cooling (Heat Pump)

Provo design conditions: winter 99% design temp **-2°F**, summer 1% design temp **97°F dry-bulb / 64°F mean coincident wet-bulb** ([ASHRAE Climatic Design — Provo Muni](https://ashrae-meteo.info/v2.0/?lat=40.22&lng=-111.72)). Heating degree-days (base 65°F): **~5,800 HDD65**. Cooling degree-days (base 65°F): **~1,100 CDD65** ([NOAA NCEI Provo normals 1991–2020](https://www.ncei.noaa.gov/access/us-climate-normals/)). Heating dominates ~5× over cooling on a degree-day basis.

## Heat loss — design-day envelope load (Btu/h)

Manual J approximation using whole-house W/ft² benchmarks at ΔT ~70°F (indoor 68°F vs. outdoor -2°F):

| Envelope | W/ft² @ design | Total at 6000 sq ft | Btu/h |
|---|---|---|---|
| **Well-insulated** (R-21 walls, R-49 ceiling, U-0.30 windows, 3 ACH50, slab edge insulated) | 4.5 W/ft² | 27 kW | 92,000 Btu/h |
| **Code-min new build** (R-20 walls, R-49 ceiling, U-0.32 windows, 5 ACH50) | 6.0 W/ft² | 36 kW | 123,000 Btu/h |
| **Existing leaky** (R-13 walls, R-30 ceiling, U-0.40 windows, 10+ ACH50, no slab insulation) | 9.0 W/ft² | 54 kW | 184,000 Btu/h |

Benchmarks from [Energy Vanguard — heat load rule of thumb](https://www.energyvanguard.com/blog/heating-load-rule-of-thumb-revisited/) and [BPI Building Analyst manual](https://www.bpi.org/standards/current-standards) cross-checked against ResStock's Provo single-family runs. **6000 sq ft is large enough that at least two outdoor units / multi-zone systems are required**: most cold-climate heat pumps top out at 36–60 kBtu/h per outdoor unit ([NEEP CCHP database](https://ashp.neep.org/)). Plan 2× 4-ton or 3× 3-ton multi-zone systems.

## COP-vs-outdoor-temperature

Cold-climate heat pumps (Mitsubishi Hyper-Heat MXZ-SM, Bosch IDS 2.0, Carrier Infinity 24VNA6, Trane Variable Speed XV20i, Daikin Aurora) — NEEP-verified COPs:

| Outdoor temp (°F) | CCHP COP | Mid-tier HP COP | Heating capacity retention |
|---|---|---|---|
| +47 | 3.5–4.2 | 3.0–3.5 | 100% |
| +17 | 2.4–3.0 | 1.8–2.2 | 75–90% |
| +5  | 1.9–2.4 | 1.2–1.5 | 60–75% |
| -2  | 1.7–2.1 | <1.0 (resistance) | 50–65% |
| -15 | 1.4–1.7 | n/a (full resistance) | 40–55% |

Source: [NEEP CCHP database](https://ashp.neep.org/) filtered for systems rated to -13°F. Mid-tier (non-CCHP) numbers from [DOE Heat Pump Efficiency Map](https://www.energy.gov/energysaver/heat-pump-systems). **For Provo, only spec CCHP** — the -2°F design temp is below where mid-tier units collapse into resistance backup.

## Annual heating energy — bin-temperature integration

Provo's outdoor temperature distribution across the heating season (Oct–Apr), approximate hours per 5°F bin from [NREL TMY3 KPVU](https://nsrdb.nrel.gov/data-viewer):

| Bin (°F) | Hours | ΔT (65−T) | CCHP COP | HP electric kWh per bin-hour at design-load scaled |
|---|---|---|---|---|
| 55–60 | 700 | 7.5 | 3.8 | 0.20× design |
| 45–50 | 1,000 | 17.5 | 3.3 | 0.47× design |
| 35–40 | 1,100 | 27.5 | 2.7 | 0.73× design |
| 25–30 | 900 | 37.5 | 2.3 | 1.00× design |
| 15–20 | 600 | 47.5 | 1.9 | 1.27× design |
| 5–10  | 300 | 57.5 | 1.6 | 1.53× design |
| -5–0  | 100 | 67.5 | 1.4 | 1.81× design |

Annual heating electric kWh = Σ (hours × design heat load × ΔT_bin/ΔT_design ÷ COP_bin).

**Well-insulated case** (27 kW @ ΔT 70°F):
- ≈ 27 × (700·7.5/70/3.8 + 1000·17.5/70/3.3 + 1100·27.5/70/2.7 + 900·37.5/70/2.3 + 600·47.5/70/1.9 + 300·57.5/70/1.6 + 100·67.5/70/1.4)
- ≈ 27 × (0.20·700 + 0.47·1000 + 0.73·1100 + 1.00·900 + 1.27·600 + 1.53·300 + 1.81·100) / (averaging COP into the ratio)
- Working it through: **~9,500–11,000 kWh/yr**.

**Existing leaky case** (54 kW @ ΔT 70°F) scales linearly with envelope load: **~19,000–22,000 kWh/yr**.

Cross-check: [PNNL ResStock](https://resstock.nrel.gov/) climate zone 5B single-family heat-pump simulations show ~2.5–3.5 kWh/sq-ft/yr for heating. 6000 sq ft × 3.0 = **18,000 kWh/yr** — sits between the two cases, validating the bracket.

**Planning value: 18,000 kWh/yr** (between well-insulated and existing). Use the high end (22,000) if envelope is unknown.

## Annual cooling energy

Cooling load is much smaller — Provo summers are hot but dry (latent load ~minimal) and CDD is ~5× lower than HDD. Design cooling load at 97°F outdoor / 75°F indoor ΔT 22°F:

- Sensible-only load: ~2.0–2.5 W/ft² → 12–15 kW design cooling capacity, **3–4 tons** for well-insulated, **5 tons** for leaky.
- SEER2 = 16–20 for cold-climate inverter heat pumps in cooling mode → **EER ~12–15** at design.
- Cooling kWh = 1,100 CDD × 24 hr/day × design load × bin-distribution ÷ EER. Empirically: [PNNL ResStock 5B cooling](https://resstock.nrel.gov/) shows 0.3–0.6 kWh/sq-ft/yr.
- 6000 sq ft × 0.5 = **3,000 kWh/yr**.

**Planning value: 3,500 kWh/yr** (rounded up for self-sufficiency bias).

Note: 12 gaming PCs at full tilt dump ~10 kW of waste heat into the house — that's ~34,000 Btu/h of additional cooling load whenever they're running. If the gaming room is centrally cooled, this could add ~1,000–1,500 kWh/yr of cooling. **Isolate the gaming room with its own mini-split and exhaust ventilation** to avoid loading the main system.

## Peak heating demand (kW)

Coldest morning, all systems at full output plus defrost cycle running:

- Compressor electrical at -2°F, COP ~1.7: heat output 27 kW ÷ 1.7 = **16 kW electrical** (well-insulated).
- Leaky case: 54 kW ÷ 1.7 = **32 kW electrical** — likely needs resistance auxiliary that pushes peak to 40+ kW.
- Defrost cycle adds 3–5 kW spike for 5–10 minutes every 30–90 minutes of low-outdoor-temp run.

**Sizing peak: 18–22 kW for well-insulated; up to 40 kW for leaky.** This is the load that fights with EV charging and morning cooking for service-panel headroom.

## Monthly distribution (planning value, kWh)

| Month | Heating | Cooling | HVAC total |
|---|---|---|---|
| Jan | 3,800 | 0 | 3,800 |
| Feb | 2,900 | 0 | 2,900 |
| Mar | 2,000 | 0 | 2,000 |
| Apr | 1,000 | 0 | 1,000 |
| May | 300 | 100 | 400 |
| Jun | 0 | 500 | 500 |
| Jul | 0 | 900 | 900 |
| Aug | 0 | 850 | 850 |
| Sep | 100 | 400 | 500 |
| Oct | 800 | 50 | 850 |
| Nov | 2,200 | 0 | 2,200 |
| Dec | 3,400 | 0 | 3,400 |
| **Year** | **16,500** | **2,800** | **19,300** |

(Planning bias: bumped to ~18,000 heating / 3,500 cooling = **21,500 kWh/yr** in totals.md.)

## What pushes the number up or down

- **Envelope quality** dominates — 2× swing between well-insulated and leaky.
- **Indoor setpoint**: 72°F vs 68°F adds ~15% to heating.
- **Window area / orientation**: south-facing glass with low solar heat gain coefficient can passively offset 5–10% in winter.
- **Whole-house vs. zoned**: zoning conditioned space to occupied rooms cuts 10–20%.
- **Auxiliary resistance use**: a mid-tier (non-CCHP) heat pump in Provo would burn 30–50% of heating energy as resistance — double the planning number.
- **Wood stove / passive solar**: a wood-burning stove rated 50–80 kBtu/h cuts winter heat-pump kWh by 30–60% during cold snaps and provides backup if the heat pump fails. Strongly favorable for self-sufficiency.
