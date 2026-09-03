
# Tilt and Azimuth (POA Irradiance)

GHI is the sun's energy on a horizontal surface. A tilted south-facing panel intercepts more in winter and less in summer relative to horizontal; an east- or west-tilted panel intercepts a shifted morning- or afternoon-weighted slice. The roof's geometry sets a fixed multiplier on annual energy that you cannot recover downstream.

## Tilt angle

### What it is

Angle from horizontal (0° = flat, 90° = vertical). Rooftop pitch in run-over-rise:

| Pitch (run:rise) | Tilt (degrees) |
|---|---|
| 2:12 | 9.5° |
| 4:12 | 18.4° |
| 5:12 | 22.6° |
| 6:12 | 26.6° |
| 7:12 | 30.3° |
| 8:12 | 33.7° |
| 9:12 | 36.9° |
| 10:12 | 39.8° |
| 12:12 | 45.0° |

### Mechanism

The cosine relationship between surface-normal and sun-vector. At noon on equinox at 40°N, the sun is at 50° elevation. A panel tilted at 40° (latitude) sees the sun ~10° off normal, intercepting cos(10°) = 98% of the available direct beam. A flat (0°) panel sees the sun at 40° off normal, intercepting cos(40°) = 77%.

But annual energy isn't a single noon-equinox calculation. The sun's elevation varies from 26° (winter solstice noon) to 73° (summer solstice noon) at Provo's latitude. Integrating over the year:

- **Optimum annual tilt ≈ latitude − 5–10°.** For Provo, ~30–35° maximizes annual energy. Reasoning: weighting toward summer (higher GHI months) pulls the optimum below latitude.
- **Optimum winter-only tilt** ≈ latitude + 15° = ~55°. Catches low winter sun.
- **Optimum summer-only tilt** ≈ latitude − 15° = ~25°. Catches high summer sun.

### Provo loss table (south-facing, varying tilt)

Approximate annual production vs. optimum tilt (~33°), south-facing, derived from PVWatts methodology and [Stanford EFMH — World Tilt Angles](https://web.stanford.edu/group/efmh/jacobson/Articles/I/TiltAngles.pdf):

| Tilt | Annual production (relative to optimum) |
|---|---|
| 0° (flat) | 88% |
| 10° | 93% |
| 18° (4:12) | 97% |
| 23° (5:12) | 99% |
| 27° (6:12) | 99.7% |
| 30° (7:12) | 100% |
| 34° (8:12) | 99.8% |
| 40° (latitude) | 99% |
| 50° | 96% |
| 60° | 91% |
| 90° (vertical) | 64% |

**Common Utah residential pitches 4:12 to 8:12 (18° to 34°) lose at most 3% vs. optimum.** Tilt is forgiving.

## Azimuth (orientation)

### What it is

Compass bearing the panel faces, measured clockwise from north. PVWatts convention: 0° = north, 90° = east, 180° = south, 270° = west.

### Mechanism

In the northern hemisphere, south-facing (180°) maximizes annual energy because the sun is always in the southern half of the sky. East-facing peaks in the morning, west in the afternoon. The penalty for non-south orientation grows with tilt — a steep east roof loses more than a shallow east roof, because the steep tilt amplifies the eastward bias.

### Provo azimuth loss table (latitude tilt ~30°)

| Azimuth | Direction | Annual production (vs. 180° south) |
|---|---|---|
| 180° | S | 100% |
| 195°/165° | SSW/SSE | 99% |
| 210°/150° | SW/SE | 96–98% |
| 225°/135° | WSW/ESE | 92–95% |
| 240°/120° | WSW+/ESE+ | 88–91% |
| 270°/90° | W/E | 80–85% |
| 315°/45° | NW/NE | 60–70% |
| 0°/360° | N | 45–55% |

Sources: [SolarTech Online — PVWatts Guide](https://solartechonline.com/blog/pvwatts-calculator-complete-guide/), [Stanford EFMH](https://web.stanford.edu/group/efmh/jacobson/Articles/I/TiltAngles.pdf), aggregated PVWatts runs.

### West-facing TOU consideration

In time-of-use (TOU) markets, west-facing panels shift peak production into late afternoon when grid demand and export prices are highest. Net annual energy is 10–20% lower than south, but per-kWh revenue can be 10–30% higher in markets with steep TOU price differentials. **Provo City Power's residential rate is currently flat-rate (no TOU)**, so this lever doesn't apply in 2026 — confirm before sizing if the utility changes tariffs ([Provo Electric Rates](https://www.provo.gov/1178/Electric-Rates)).

## Combined tilt × azimuth derate

Approximate annual energy retention (vs. 30° tilt, 180° azimuth = 100%):

| Tilt ↓ / Az → | S (180°) | SW (225°) | W (270°) | E (90°) | NE (45°) | N (0°) |
|---|---|---|---|---|---|---|
| 0° (flat) | 88% | 88% | 88% | 88% | 88% | 88% |
| 18° (4:12) | 97% | 93% | 84% | 84% | 75% | 65% |
| 27° (6:12) | 99.7% | 94% | 82% | 82% | 70% | 58% |
| 34° (8:12) | 99.8% | 93% | 80% | 80% | 65% | 50% |
| 45° (12:12) | 98% | 91% | 77% | 77% | 60% | 42% |

Flat roofs are azimuth-insensitive (sun sees them the same regardless of which way the building points). Steep + off-south compounds badly.

## Levers vs. fixed

| Factor | Type | Notes |
|---|---|---|
| Roof tilt | Fixed (roof) | Or use tilt legs on a flat section (+install cost) |
| Roof azimuth | Fixed (roof) | Multiple roof faces → choose the best face, or split array |
| Ground-mount tilt | **Free** | Allows tilt-leg optimization, but costs land/foundation |
| Tilt legs on rooftop | Optional | Adds ~$500–$1,500/array, gains 2–5% production if roof is shallow |
| East+West dual-roof | Tradeoff | Captures more morning+afternoon hours but each face is ~80% south-equivalent |

## Alan's value (when measurements arrive)

Three measurements convert this section into a number:

1. **Roof pitch** in run-over-rise. Use a digital level on a rafter, or a smartphone level app on the roof deck. Convert with the table above.
2. **Roof azimuth** for each candidate face. Smartphone compass app held parallel to the eave, *adjusted for magnetic declination* (Provo's declination is ~10°E in 2026, so subtract 10° from a magnetic compass reading to get true bearing).
3. **Usable area per face** in ft² — usable means clear of vents, chimneys, skylights, with 18″ fire-code setback at the ridge per IRC R324.6.

Plug all three into PVWatts as Tilt, Azimuth, and System Size (after converting area to kW at ~17–22 W/ft² for modern modules).

## Sources

- [PVWatts Calculator](https://pvwatts.nlr.gov/) — runs the combined model with site-specific NSRDB data.
- [Stanford EFMH — World PV Optimal Tilt Angles](https://web.stanford.edu/group/efmh/jacobson/Articles/I/TiltAngles.pdf) — global derate tables by latitude.
- [SolarTech Online — PVWatts Complete Guide](https://solartechonline.com/blog/pvwatts-calculator-complete-guide/) — azimuth and tilt loss summaries.
- [Provo City Power Electric Rates](https://www.provo.gov/1178/Electric-Rates) — TOU vs. flat tariff status.
