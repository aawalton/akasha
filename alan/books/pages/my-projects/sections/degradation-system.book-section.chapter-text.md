
# Degradation, ILR, Albedo, Structural, UV

These factors don't fit cleanly into the energy-flow chain; they're system-level design choices and time-dependent derates.

## Module degradation (year-over-year)

### What it is

Modules lose nameplate capacity over time from UV-induced encapsulant browning, micro-cracks from thermal cycling, potential-induced degradation (PID), and slow electrochemical corrosion.

### Typical rates

- Industry average (NREL studies): **0.5%/yr linear** after year 1.
- Premium tier-1 modules (LG, SunPower Maxeon, Q.CELLS, Panasonic): **0.25–0.40%/yr**.
- Budget tier-1: **0.55–0.70%/yr**.
- Light-induced degradation (LID) in year 1: 1.5–2% one-time, then linear ([SolarPanelsNetwork — Degradation Rates](https://us.solarpanelsnetwork.com/blog/solar-panel-degradation-rate/)).

### What 0.5%/yr looks like over 25 years

| Year | % of nameplate |
|---|---|
| 1 (post-LID) | 98.5% |
| 5 | 96.5% |
| 10 | 94.0% |
| 15 | 91.6% |
| 20 | 89.1% |
| 25 | 86.7% |

Tier-1 with 0.35%/yr retains ~91% at year 25. Modern performance warranties guarantee ≥85% at year 25; premium warranties guarantee ≥92%.

### Lever

Tier choice. Premium modules cost ~20–30% more per W; over 25 years the extra ~3% retained output recoups maybe half the premium. Real reason to pay up: warranty terms and longevity tail beyond year 25.

## DC/AC ratio (Inverter Loading Ratio)

### What it is

ILR = DC nameplate kW / AC inverter rating kW. A 6 kW DC array on a 5 kW AC inverter has ILR = 1.20.

### Mechanism

Modules rarely produce nameplate output. Even at solar noon in Provo summer, real DC output is typically 80–85% of STC nameplate due to temperature, soiling, and atmosphere. Sizing the inverter to match the DC nameplate would leave it under-utilized 99% of the time. Oversizing DC moves the system into the inverter's high-efficiency operating band more often, **at the cost of clipping** during the few brightest-clearest hours.

### Typical residential ILRs

- 1.10–1.20: Conservative; minimal clipping.
- **1.20–1.30: Sweet spot for residential.** Clipping <2% of annual production; significantly more energy in shoulder hours.
- 1.30–1.50: Aggressive; clipping 3–6%; usually only justified in low-irradiance climates.

PVWatts defaults to ILR 1.10 in the basic mode but allows specifying separately. For Provo's clear-sky climate, **1.15–1.20** is the right range — clear summer days push closer to clipping than cloudy climates.

### Provo clipping budget

At ILR 1.20 in Provo: expect ~1.5–2.5% clipping loss on the hottest cleanest summer days. Acceptable; recovered by ~5% gain in shoulder hours. Net: ILR 1.20 produces ~3% more annual kWh than ILR 1.00 with the same DC nameplate ([SolarPowerWorld — DC/AC Ratio](https://www.solarpowerworldonline.com/2016/07/solar-inverters-clipping-dcac-inverter-load-ratio-ideal/)).

## Albedo (ground reflectance)

### What it is

Diffuse light reflected from surroundings back onto the panel's underside-facing or low-angle front face.

### Typical contribution to rooftop POA

- Asphalt shingle roof, grass yard: 1–3% additional POA vs. no albedo model.
- Fresh snow on the ground: 5–10% bonus for the days it's clean and bright (concentrated in Provo Dec–Feb).
- Light-colored roof, concrete patios: 3–5%.

PVWatts applies a default ground albedo of 0.2 (grass/dirt) or seasonal snow albedo. Not part of the 14.08% loss bucket — it adds to POA. Implication: a Provo system gets a small winter snow-albedo bonus that partially offsets snow-on-panel losses.

### Lever

Bifacial modules (active rear surface) capture far more albedo. On a typical residential pitched roof, bifacial gain is only 3–5% because the rear surface is close to the roof deck. On ground-mount or flat roof with white membrane, bifacial gain is 8–15%. **Probably not worth it for a residential pitched roof.**

## Snow load (structural)

### What it is

Roof structural capacity vs. snow weight, plus the dead load of the array itself.

### Provo numbers

- Utah State Construction Code IBC amendment §15A-3-107: Pg (ground snow load) minimum 28 psf below 4,239 ft elevation. **Above 4,239 ft, use the [USU Utah Snow Load Map](https://www.usu.edu/utahsnowload/).** Provo at 4,550 ft typically reports Pg ≈ 30–40 psf for the valley floor, climbing rapidly with elevation toward the bench.
- Design roof snow load (Pf) = 0.7 × Cs × Ct × Ce × I × Pg per ASCE 7-16. For a typical residential pitched roof, Pf ≈ 20–30 psf.
- Module dead load: 3–5 psf for the array including racking. Negligible compared to snow.

### Risk

The structural concern is **not** the static panel weight — it's that panels can prevent snow from sliding off, allowing accumulation that exceeds the unloaded roof's design assumption. Also, snow guards above the array (to protect downstream pedestrians) add point loads.

### Lever

Structural engineer review during install (required by Provo permit process). For a 1960s-or-newer Utah home built to IBC standards, retrofit reinforcement is rarely needed. For older homes with sagging trusses, an engineer's review may demand sistering rafters.

## High-altitude UV exposure

### What it is

Provo at 4,550 ft (1,387 m) receives ~10–15% more UV-B than sea level under clear skies.

### Effect on modules

- **Encapsulant yellowing** (EVA browning): accelerated UV exposure increases the degradation rate of cheap EVA encapsulants. Premium modules use UV-stabilized EVA or polyolefin (POE) encapsulants that resist browning.
- **Backsheet embrittlement**: polyamide backsheets crack under sustained UV; PVDF and Tedlar resist.
- **Junction box gaskets**: degrade faster at altitude.

Net: at Provo's altitude, **avoid bargain-tier modules.** Pay for IEC 61215 + IEC 61730 certified premium-tier modules with PVDF/Tedlar backsheet and POE/UV-stabilized EVA. Premium modules degrade ~0.35%/yr regardless of altitude; bargain modules might degrade 0.7%/yr at sea level and 0.9%/yr at Provo's altitude.

### Bonus: cooler air

Provo's ambient temperature at altitude is ~3–5°C cooler than a sea-level site at the same latitude (lapse rate × 1,387 m). This slightly offsets the UV penalty by reducing cell temperatures. Net altitude effect on annual energy: **+5–8% favorable** (more irradiance + cooler ops > UV-driven faster degradation, assuming premium modules).

## Combining the multi-year derates

For a 25-year financial model, layer:

1. PVWatts year-1 production (already includes 14.08% bucket + temperature).
2. Linear degradation: year N production = year 1 × (1 − 0.005)^(N−1) for industry standard; substitute 0.0035 for premium tier-1.
3. Mid-life inverter replacement: budget one inverter swap around year 12–15 (string) or count on 25-year microinverter warranty.

Total 25-year energy ≈ year-1 production × 22.5 (for 0.5%/yr linear) or × 23.5 (for 0.35%/yr).

## Sources

- [NREL — Compendium of Photovoltaic Degradation Rates](https://www.nrel.gov/docs/fy16osti/65040.pdf) — meta-analysis of degradation across module generations.
- [SolarPanelsNetwork — Degradation Rates](https://us.solarpanelsnetwork.com/blog/solar-panel-degradation-rate/) — tier-1 vs tier-2 breakdown.
- [SolarPowerWorld — DC/AC Ratio](https://www.solarpowerworldonline.com/2016/07/solar-inverters-clipping-dcac-inverter-load-ratio-ideal/) — ILR economics.
- [USU Utah Snow Load Map](https://www.usu.edu/utahsnowload/) — Pg by exact coordinates.
- [Utah State Construction Code §15A-3-107](https://le.utah.gov/xcode/Title15A/Chapter3/15A-3-S107.html) — IBC Ch. 16 amendments.
- [Stanford EFMH — Tilt and Altitude Effects](https://web.stanford.edu/group/efmh/jacobson/Articles/I/TiltAngles.pdf)
