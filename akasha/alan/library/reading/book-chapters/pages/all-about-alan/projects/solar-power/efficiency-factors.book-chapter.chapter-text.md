
# Rooftop Solar Efficiency Factors (Provo, UT)

Energy flows: sun → atmosphere → plane-of-array → DC at module → DC at inverter → AC at meter. Every step loses something. This document decomposes the chain mechanically so once Alan has roof measurements (pitch, azimuth, shaded fraction, available area) he can plug them in and produce a defensible annual-energy estimate.

Site anchor: 1350 Apple Ave, Provo, UT 84604. Latitude ~40.27°N, elevation ~4,550 ft (1,387 m). ZIP 84604 has an annual GHI of 5.51 kWh/m²/day, with summer peak ~6.74 kWh/m²/day (August) and winter trough ~3.35 kWh/m²/day (December) — a ~2× seasonal swing ([Solar Energy Local — 84604](https://www.solarenergylocal.com/states/utah/84604/)).

Split into five sub-files; each is capped at 200 lines and covers one band of the energy chain.

| # | File | Covers |
|---|------|--------|
| 1 | [resource.md](efficiency-factors/resource.book-chapter.md) | Solar resource at location: GHI, DNI, peak sun hours, monthly variation, altitude bonus |
| 2 | [orientation.md](efficiency-factors/orientation.book-chapter.md) | Plane-of-array irradiance: tilt, azimuth, combined derate tables |
| 3 | [losses.md](efficiency-factors/losses.book-chapter.md) | Shading, soiling, snow, temperature, mismatch, DC/AC wiring, inverter, availability |
| 4 | [degradation-system.md](efficiency-factors/degradation-system.book-chapter.md) | Module degradation, DC/AC ratio (ILR) & clipping, albedo, snow load, UV/altitude |
| 5 | [provo.md](efficiency-factors/provo.book-chapter.md) | Provo-specific anchor numbers, PVWatts inputs, sensitivity ranges |

## How the factors combine

PVWatts v8 separates losses into three buckets, applied in series:

1. **Resource × orientation** — annual POA irradiance (kWh/m²/yr) is derived from NSRDB GHI/DNI/DHI plus the roof's tilt and azimuth. Captures the optical geometry of sun-to-panel.
2. **Temperature derate** — applied hour-by-hour based on modeled cell temperature; not a flat percentage.
3. **System losses** — a bundled scalar (PVWatts default **14.08%**) that subsumes soiling, shading, snow, mismatch, wiring, connections, light-induced degradation (LID), nameplate tolerance, age, and availability. Default breakdown ([PVWatts v5 manual](https://pvwatts.nrel.gov/downloads/pvwattsv5.pdf), still in use for v8 defaults; [Aurora Solar — System Losses](https://help.aurorasolar.com/hc/en-us/articles/220450107-System-Losses)):

| Component | PVWatts default | Notes |
|---|---|---|
| Soiling | 2.0% | Climate-dependent; Provo arid-ish, likely 1–3% before snow |
| Shading | 3.0% | Site-specific; replace with measured fraction |
| Snow | 0.0% | Default — but Provo winters need ~1–3% |
| Mismatch | 2.0% | Microinverters/optimizers → ~0% |
| Wiring (DC) | 2.0% | Sized by installer; usually conservative |
| Connections | 0.5% | Crimps, MC4s, terminal blocks |
| Light-induced degradation | 1.5% | First-year only; baked in for v8 default |
| Nameplate rating | 1.0% | Manufacturing tolerance vs. STC label |
| Age | 0.0% | Default 0 — apply separately as linear degradation |
| Availability | 3.0% | Inverter faults, comms outages, utility curtailment |
| **Total (1 − ∏(1 − xi))** | **~14.08%** | Multiplicative, not additive |

What is **not** in the 14.08%: tilt/azimuth (resource step), temperature derate (separate model), DC:AC clipping (separate model), albedo (separate model), and year-over-year degradation past year 1 (apply per-year linear).

The system AC energy formula PVWatts uses (simplified):

```
E_AC = POA_kWh/m²/yr × η_module × A_module × (1 − temp_derate) × (1 − sys_losses) × η_inverter × (1 − clip_loss) × (1 − wiring_AC)
```

For quick mental math: **specific yield (kWh/kWp/yr)** = total AC kWh ÷ DC nameplate kW. Provo, optimal install: ~1,650–1,750 kWh/kWp/yr (see [provo.md](efficiency-factors/provo.book-chapter.md)).

## Reading order

If skimming: start with [provo.md](efficiency-factors/provo.book-chapter.md) for the headline number and sensitivities. If sizing: read in order 1→5; each section's "Alan's value" sub-section tells you what to measure or look up when the time comes.

## Sources (recurring)

- [NREL PVWatts Calculator](https://pvwatts.nlr.gov/) — v8, NSRDB-backed, run with ZIP 84604 for site-specific output.
- [NREL National Solar Radiation Database (NSRDB)](https://nsrdb.nrel.gov/) — raw GHI/DNI/DHI hourly data underlying PVWatts.
- [PVWatts v5 manual](https://pvwatts.nrel.gov/downloads/pvwattsv5.pdf) — algorithms still describe v8's loss accounting.
- [Aurora Solar — System Losses](https://help.aurorasolar.com/hc/en-us/articles/220450107-System-Losses) — annotates each PVWatts default.
- [Utah State University Snow Load Map](https://www.usu.edu/utahsnowload/) — ground snow load for Provo's elevation band.
- [Utah State Construction Code §15A-3-107](https://le.utah.gov/xcode/Title15A/Chapter3/15A-3-S107.html) — IBC Chapter 16 amendments and Pg requirements.
- [PVEducation — Nominal Operating Cell Temperature](https://www.pveducation.org/pvcdrom/modules-and-arrays/nominal-operating-cell-temperature) — NOCT and temperature derate physics.
