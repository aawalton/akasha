
# System Losses

These are the cumulative derates applied between POA irradiance and AC energy at the meter, ordered roughly along the energy chain.

## Shading

### What it is

Anything that blocks direct beam from reaching cells: trees, neighboring rooflines, chimneys, plumbing vent stacks, parapets, satellite dishes, other panels in the array casting on each other.

### Mechanism

A solar cell shaded below ~10% of its area can drop to ~10% of its output. In a series string, the lowest-current cell limits the entire string's current — so one shaded cell can cut string output by 50%+ if no bypass diode trips, or by ~33% per bypassed sub-string when diodes do trip. Modern modules have 3 bypass diodes (one per ~20-cell sub-string).

**Mitigation:** module-level power electronics (MLPE) — microinverters (Enphase) or DC optimizers (SolarEdge) — make each module independent. Shading on one module only costs that module's output. Recovery factor vs. plain string inverter: 2–5% in unshaded conditions (overhead cost), 12–25% with partial shading, up to 35% in heavily shaded arrays ([CleanTechnica — Optimizers vs Microinverters](https://cleantechnica.com/2025/03/06/comparative-analyses-between-dc-power-optimizers-microinverters/)).

### Typical loss

- Unshaded suburban Utah roof: 1–3% (some morning/evening edge shading is unavoidable).
- Moderate tree shading (one mature deciduous tree ~30 ft away): 5–15%.
- Heavy shading (multiple obstructions, chimneys mid-roof): 20%+.

PVWatts default: 3% (assumes light shading).

### Levers vs. fixed

| Factor | Type |
|---|---|
| Tree trimming/removal | Lever — Alan controls trees on his lot |
| Neighbor trees | Partial — Utah has limited solar-access law; negotiation only |
| Chimney/vent placement | Fixed (existing) — usually not worth relocating |
| MLPE vs. string inverter | Lever — adds ~$0.10–0.15/W upfront, recovers shaded production |

### Alan's value

Use one of:
- **Solar Pathfinder** ($300 mechanical instrument) — manual roof survey with a reflective dome traces shade horizon onto a sunpath chart. Hour-by-hour shade fraction by month.
- **Aurora Solar / HelioScope** (installer-grade software) — installer pulls lidar/imagery and reports a Total Solar Resource Fraction (TSRF) per roof face. Above 85% is good, above 90% is excellent.
- **Drone + photogrammetry** — proprietary installer tools; comparable accuracy to Pathfinder, faster.
- **SunEye** (handheld) — discontinued but units circulate; same output as Pathfinder.

## Soiling

### What it is

Dust, pollen, bird droppings, atmospheric particulate accumulating on the glass.

### Mechanism

A thin uniform film scatters and absorbs incoming light. Effect is roughly linear with deposition mass at low coverage. Heavy localized soiling (bird droppings) acts like partial shading and triggers the same mismatch problem.

### Typical loss

- US national range: 0–7%/year ([Aurora Solar — Soiling](https://aurorasolar.com/blog/understanding-pv-system-losses-part-3-soiling-snow-system-degradation/)).
- Provo: ~1–3%/year. Wasatch Front has clear summer skies but winter PM2.5 inversions deposit ammonium nitrate and PM10 dust. Some natural cleaning from rain/snow.
- Daily accumulation: 0.03–0.15%/day in temperate climates, up to 0.5%/day in arid dusty regions ([IEA-PVPS Task 13 — Soiling](https://iea-pvps.org/wp-content/uploads/2023/01/IEA-PVPS-T13-21-2022-REPORT-Soiling-Losses-PV-Plants.pdf)).

PVWatts default: 2%.

### Levers

Cleaning ROI: at ~$0.10/kWh retail rate, a 10 kW system losing 3% to soiling loses ~450 kWh/yr = $45/yr. A $150 cleaning recovers maybe half that, so cleaning is marginal unless soiling exceeds ~5%. Rain handles most of it for free.

## Snow

### What it is

Snow accumulation blocks all light. Provo gets ~60 inches/year, mostly Nov–Mar.

### Mechanism

A panel at >25° tilt sheds snow within hours of sun exposure (glass is slippery, modules warm as soon as any light reaches them). At <20° tilt, snow can sit for days. Snow on the ground reflects light onto the panels (albedo bonus, ~5–10% on sunny snowy days), partially offsetting the production loss.

### Typical loss

- Provo annual: 1–3% production loss from snow (heaviest in Dec–Jan, which are already low-production months).
- A flat (0° tilt) panel can lose 5–8% to snow annually in Provo's climate.

PVWatts default: 0% (assumes snow sheds quickly). Override to 2% for Provo for a more realistic estimate.

### Levers

| Factor | Type |
|---|---|
| Tilt > 25° | Lever via tilt legs on shallow roofs |
| Manual snow removal | Lever (with risk — never use metal tools; soft brush on a pole) |
| Heating mats | Not cost-effective; consume more than they save |

## Temperature

### What it is

Modules lose efficiency as cell temperature rises above the 25°C STC reference.

### Mechanism

Silicon's bandgap shrinks slightly with temperature, raising current marginally but dropping voltage sharply. Net power loss: **-0.30 to -0.40 %/°C above 25°C** for modern mono-Si modules. Premium modules (e.g., LG NeON-R, SunPower Maxeon, Q.CELLS Q.PEAK DUO) push toward -0.27 to -0.30 %/°C.

Cell temperature ≈ ambient + (NOCT − 20°C) × (irradiance / 800). NOCT (Nominal Operating Cell Temperature) is typically 45–48°C. At Provo summer ambient of 35°C with 1000 W/m² irradiance and NOCT 45°C, cell temp ≈ 35 + (45−20) × (1000/800) = 35 + 31 = **66°C**. Derate at -0.38%/°C × (66−25) = **-15.6%** vs. STC ([PVEducation — NOCT](https://www.pveducation.org/pvcdrom/modules-and-arrays/nominal-operating-cell-temperature)).

### Typical annual energy loss

PVWatts applies this hour-by-hour, not as a single derate. Annual energy impact for Provo:

- Rooftop array (poor airflow under modules): **8–12% annual loss** vs. STC nameplate.
- Roof with elevated standoffs (4″+ airgap, decent airflow): **6–9%** annual loss.
- Ground-mount with full airflow: **5–7%** annual loss.

Already implicit in PVWatts output — not part of the 14.08% bucket.

### Levers

| Factor | Type |
|---|---|
| Module temp coefficient | Lever — premium modules save 2–3% annually |
| Standoff height | Lever — 4″+ vs. flush mount saves 1–3% |
| Ventilation around array | Fixed by roof geometry |
| Provo altitude | Bonus — cooler ambient at 4,550 ft saves ~1% vs. valley floor |

## Mismatch (string-level)

### What it is

Modules in a series string operate at the lowest-current module's current. Manufacturing tolerance, uneven soiling, partial shading, and uneven aging cause divergence.

### Typical loss

- Plain string inverter: 2% (PVWatts default).
- DC optimizer per module: ~0% (each module's MPP tracked independently).
- Microinverter per module: ~0%.

### Levers

MLPE eliminates this. For a clean unshaded south roof on a single plane, plain string inverter is fine. For mixed orientations, partial shading, or modules of different ages, MLPE earns its cost.

## DC wiring

PVWatts default: 2%. Composed of:
- Module-to-module homerun resistance.
- Combiner-to-inverter resistance (longest leg, biggest loss).
- Connection losses (MC4s, terminal blocks): 0.5% PVWatts default.

Installer sizes wire gauge to spec; if specced to ≤2% voltage drop, the loss matches default. Long roof runs (>50 ft from array to inverter) warrant upsized DC wire.

## Inverter efficiency

### Typical

- Modern string inverters (SMA Sunny Boy, Fronius Primo): 96–98% CEC weighted efficiency ([SurgePV — Microinverter vs String](https://www.surgepv.com/blog/microinverters-vs-string-inverters-vs-optimizers)).
- Microinverters (Enphase IQ8): 97.0–97.5% CEC.
- String inverter + DC optimizer (SolarEdge HD-Wave): up to 99% CEC (composite of optimizer + inverter, due to topology).
- Hybrid inverters with battery: ~95–96% CEC (extra bidirectional power flow path).

CEC weighted ≠ peak. PVWatts already factors in a typical inverter efficiency (96%) in its model; this is **not** part of the 14.08% bucket.

## AC wiring & transformer

Inverter → main panel → utility meter. Typically 0.5–1%. Not in PVWatts default loss bucket; usually absorbed into the rounding. Long inverter-to-panel runs warrant attention.

## Availability

Inverter faults, monitoring outages, utility-side curtailment. PVWatts default: 3%. Real-world: <1% for mainstream brands over the first 10 years; rises in years 11–20 as inverters approach end-of-life.

### Lever

- Inverter warranty: Enphase microinverters carry 25-year warranty; SMA string inverters typically 10 years (extendable to 25); SolarEdge 12 years (extendable). Longer warranty = lower lifetime availability risk.

## Sources

- [Aurora Solar — System Losses](https://help.aurorasolar.com/hc/en-us/articles/220450107-System-Losses)
- [Aurora — Soiling, Snow, Degradation](https://aurorasolar.com/blog/understanding-pv-system-losses-part-3-soiling-snow-system-degradation/)
- [PVEducation — NOCT](https://www.pveducation.org/pvcdrom/modules-and-arrays/nominal-operating-cell-temperature)
- [CleanTechnica — Optimizers vs Microinverters](https://cleantechnica.com/2025/03/06/comparative-analyses-between-dc-power-optimizers-microinverters/)
- [IEA-PVPS Task 13 — Soiling Losses](https://iea-pvps.org/wp-content/uploads/2023/01/IEA-PVPS-T13-21-2022-REPORT-Soiling-Losses-PV-Plants.pdf)
- [SurgePV — Microinverters vs String Inverters](https://www.surgepv.com/blog/microinverters-vs-string-inverters-vs-optimizers)
