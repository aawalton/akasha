
# Solar Resource at Provo

This is the energy density of sunlight reaching the ground at the site, before any roof geometry or module loss. Everything downstream is a derate on this number.

## What it is

Three irradiance measurements anchor solar resource:

- **GHI (Global Horizontal Irradiance)** — total sun energy hitting a flat horizontal surface, in kWh/m²/day or W/m². Includes direct beam + diffuse sky + ground-reflected. Used for flat-mounted estimates and as the input to plane-of-array (POA) calculations.
- **DNI (Direct Normal Irradiance)** — beam component only, measured perpendicular to the sun's rays. Higher at high altitude, lower under haze. Relevant for trackers and concentrators; less so for fixed rooftop.
- **DHI (Diffuse Horizontal Irradiance)** — scattered sky-light component. GHI = DNI × cos(zenith) + DHI.

**Peak sun hours (PSH) per day** = GHI in kWh/m²/day. A PSH of 5.51 means the day's actual irradiance delivers the same energy as 5.51 hours at 1,000 W/m² (the STC reference).

## Mechanism

Sunlight hits the top of the atmosphere at ~1,361 W/m² (the solar constant). Atmospheric attenuation removes ~25–30% by the time it reaches sea level at noon with clear sky. Provo sits at ~4,550 ft (1,387 m) elevation — about 14% shorter atmospheric column than sea level, with correspondingly cleaner direct beam. Clear-sky surface irradiance increases roughly 6–10% per 1,000 m of elevation for direct beam ([CLOU GLOBAL — Solar at High Altitudes](https://clouglobal.com/higher-ground-the-efficiency-of-solar-power-at-high-altitudes/), [ScienceDirect — UV with altitude](https://www.sciencedirect.com/science/article/abs/pii/S1011134496000188)). At Provo's 1.4 km elevation, expect ~8–10% more direct-beam irradiance vs. a sea-level site at the same latitude.

The NSRDB ingests this site-by-site from satellite-derived GOES-East data plus ground stations and publishes typical meteorological year (TMY) and historical hourly time-series at ~4 km resolution. PVWatts uses NSRDB as its irradiance input.

## Provo numbers (ZIP 84604)

Annual averages from NSRDB via [Solar Energy Local — 84604](https://www.solarenergylocal.com/states/utah/84604/):

| Surface | Annual avg (kWh/m²/day) |
|---|---|
| Horizontal (GHI) | **5.51** |
| Tilted at latitude (~40°) | **5.62** |
| 2-axis tracker (DNI-driven) | ~7.2 (estimated for reference) |

Annual POA at latitude tilt: 5.62 × 365 ≈ **2,051 kWh/m²/yr**. This is the irradiance reaching the module surface before any losses.

### Monthly variation

Strong Wasatch Front seasonal swing. Summer high ~2× winter low:

| Month | GHI (kWh/m²/day) | % of summer peak |
|---|---|---|
| Jan | 3.56 | 53% |
| Feb | 4.55 | 68% |
| Mar | 5.63 | 84% |
| Apr | 6.43 | 95% |
| May | 6.55 | 97% |
| Jun | 6.69 | 99% |
| Jul | 6.72 | 100% |
| **Aug** | **6.74** | **100%** |
| Sep | 6.04 | 90% |
| Oct | 4.93 | 73% |
| Nov | 4.37 | 65% |
| Dec | 3.35 | 50% |

Why August beats July: July has higher midday DNI but more afternoon thunderstorms; August averages slightly clearer afternoons. Net: ~50% of the year's production lands in May–August.

### Implication for billing

A grid-tied system in Provo over-produces summer months and under-produces winter. Net metering (or its successor program) is what makes the seasonal swing financially neutral; without it, sizing must account for the winter trough as a hard floor. Confirm Provo City Power's current export tariff before sizing — Provo runs its own municipal utility, separate from Rocky Mountain Power.

## Levers vs. fixed

| Factor | Type | Notes |
|---|---|---|
| Latitude | Fixed | 40.27°N — sets seasonal swing and optimal tilt |
| Elevation | Fixed | +5–10% direct-beam bonus vs. sea-level at same latitude |
| Cloud climatology | Fixed | Wasatch Front has clear summer skies; winter inversion (PM2.5) is the main resource killer in Dec–Feb |
| Inversion-event soiling | Partial | Affects soiling, not resource (see [losses.md](losses.book-chapter.md)) |

Nothing about resource is in Alan's control. It's the boundary condition.

## Alan's value (when measurements arrive)

Roof measurements don't change resource — but to confirm:

1. Run [PVWatts](https://pvwatts.nlr.gov/) with ZIP 84604 → "Get DAILY solar resource data" output. Confirms ~5.51 kWh/m²/day GHI and 5.62 at latitude tilt.
2. The "Solar Resource Data" panel on the PVWatts result page returns site-specific monthly GHI/DNI/DHI. Save this for downstream computations.
3. Optional cross-check: [NSRDB Viewer](https://nsrdb.nrel.gov/data-viewer) for the exact 1350 Apple Ave coordinates (40.2693°N, -111.6597°W approximately) — gives the hourly TMY file that PVWatts uses internally.

## Sources

- [NREL NSRDB](https://nsrdb.nrel.gov/) — primary solar resource database.
- [NREL PVWatts](https://pvwatts.nlr.gov/) — calculator with ZIP-based NSRDB query.
- [Solar Energy Local — 84604](https://www.solarenergylocal.com/states/utah/84604/) — ZIP-level monthly summary; derived from NSRDB.
- [ScienceDirect — UV irradiance with altitude](https://www.sciencedirect.com/science/article/abs/pii/S1011134496000188) — quantifies altitude bonus.
- [CLOU GLOBAL — Solar at High Altitudes](https://clouglobal.com/higher-ground-the-efficiency-of-solar-power-at-high-altitudes/) — 6–10% per 1,000 m direct-beam.
