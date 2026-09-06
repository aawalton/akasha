
# Provo-Specific Anchor Numbers

The headline number a residential solar bid implicitly promises is **specific yield** — kWh produced per year per kW of DC nameplate. This file pins that number for Provo and shows how sensitive it is to roof choices Alan will need to measure.

## Optimal install (anchor case)

Configuration:

- Location: 1350 Apple Ave, Provo, UT 84604 (lat 40.27°N, elev ~4,550 ft).
- Tilt: **30°** (close to optimal, matches a 7:12 pitch).
- Azimuth: **180°** (true south).
- Module type: Premium tier-1, mono-Si, ~21% efficient.
- Array type: Fixed roof mount with 4″ standoff.
- DC/AC ratio: 1.20.
- Inverter: 97% CEC microinverters OR 98% CEC string + optimizers.
- System losses (PVWatts): 14.08% default, but adjusted to ~12–14% if MLPE used (mismatch → 0%) and Provo-specific snow (~2%) added.
- Shading: <5% (unobstructed roof face).

**Expected annual specific yield: ~1,650–1,750 kWh/kWp/year.**

Anchor breakdown (rough mental model):
- POA at latitude tilt south: 2,051 kWh/m²/yr.
- Module nameplate efficiency × POA / 1000 = STC kWh per nameplate kW.
- Less ~10% temperature derate (annualized): → ~1,846 kWh/kWp/yr at the DC bus.
- Less ~10% system losses (MLPE adjusted) and inverter: → **~1,660 kWh/kWp/yr** at meter year 1.

Sanity check against [Solar Energy Local — 84604](https://www.solarenergylocal.com/states/utah/84604/) and aggregated PVWatts runs for Wasatch Front sites: residential systems report **1,500–1,750 kWh/kWp/yr** with the upper end matching premium-module, well-oriented installs.

### Authoritative re-run

When Alan has roof measurements, plug into PVWatts directly:

1. Open [PVWatts Calculator](https://pvwatts.nlr.gov/).
2. Address: `1350 Apple Ave, Provo, UT 84604` → "Go". Confirms NSRDB cell.
3. System parameters (anchor case):
   - DC System Size (kW): test with 1 kW for cleanly reading kWh/kWp.
   - Module Type: Premium.
   - Array Type: Fixed (roof mount).
   - System Losses (%): 14.08 (default) or replace with site-specific.
   - Tilt (deg): 30.
   - Azimuth (deg): 180.
   - DC to AC Size Ratio: 1.20.
   - Inverter Efficiency (%): 97.
4. Results page returns "Annual AC Energy (kWh)" — divide by your DC kW input to get specific yield.

## Sensitivity to roof choice

Year-1 production retained relative to anchor (~1,700 kWh/kWp/yr), for a Provo site:

| Roof scenario | Specific yield (kWh/kWp/yr) | % of anchor |
|---|---|---|
| **30° tilt, S, unshaded, premium** (anchor) | 1,700 | 100% |
| 30° tilt, S, 10% shaded, string inverter | 1,500 | 88% |
| 30° tilt, S, 10% shaded, MLPE | 1,615 | 95% |
| 30° tilt, SW (225°), unshaded | 1,580 | 93% |
| 30° tilt, W (270°), unshaded | 1,400 | 82% |
| 30° tilt, E (90°), unshaded | 1,400 | 82% |
| 30° tilt, N (0°), unshaded | 850 | 50% |
| 18° (4:12) tilt, S, unshaded | 1,650 | 97% |
| 34° (8:12) tilt, S, unshaded | 1,700 | 100% |
| 45° (12:12) tilt, S, unshaded | 1,665 | 98% |
| 0° (flat) roof, unshaded | 1,500 | 88% |
| 30° tilt, S, 25% heavy shading, string | 1,250 | 74% |
| 30° tilt, S, 25% heavy shading, MLPE | 1,450 | 85% |

Two practical takeaways:

1. **Azimuth dominates orientation losses.** Going from S to W on the same pitch costs ~18%; going from 30° to 18° tilt on south costs ~3%.
2. **Shading × inverter topology is the largest variable lever.** A 25%-shaded roof on a plain string inverter loses 26%; the same roof on MLPE loses 15%. MLPE pays for itself on any roof with material shading.

## 25-year cumulative energy

For sizing a financial model:

- Year 1: anchor 1,700 kWh/kWp.
- Linear 0.5%/yr degradation: cumulative 25-yr ≈ year 1 × 22.6 = **38,400 kWh/kWp**.
- Premium tier-1 at 0.35%/yr: cumulative ≈ year 1 × 23.5 = **39,950 kWh/kWp**.

At Provo City Power residential rate ~$0.085–0.11/kWh (verify current tariff, [Provo Electric Rates](https://www.provo.gov/1178/Electric-Rates)), 25-yr lifetime value is ~$3,300–$4,400/kWp before any net-metering credit math, time-value discounting, or escalation.

## Highest-impact measurements Alan needs

Ranked by sensitivity of the headline number to the measurement's precision:

1. **Azimuth of each candidate roof face** (true bearing, declination-adjusted). 15° error → ~3% energy error.
2. **Shaded fraction across the year** via Solar Pathfinder or Aurora Solar shade study. 5% error → ~5% energy error.
3. **Usable area per face** (after fire setbacks, vents, obstructions). Sets system size in kW.
4. **Tilt of each face** (pitch). Less sensitive — even 10° tilt error is <2%.
5. **Tree maturity within 50 ft of roof** (any tall trees south/east/west of the array). Future-shading projection over 25 years.

## What to ask installer bids

For apples-to-apples comparison:

- "Show me the PVWatts run you used. What System Losses % did you specify, and what's in/out of that?"
- "What's the modeled Total Solar Resource Fraction (TSRF) for each roof face? Below 85% is a yellow flag."
- "What's the DC/AC ratio? At 1.20–1.25 in Provo, expected clipping?"
- "String inverter, optimizers, or microinverters? Justify based on shading and module count per face."
- "Modules: brand, model, datasheet temperature coefficient, performance warranty curve, backsheet type."
- "Year-1 production estimate (kWh) and assumed annual degradation rate. Anything below 0.5%/yr should cite the manufacturer warranty curve, not marketing."

## Sources

- [NREL PVWatts Calculator](https://pvwatts.nlr.gov/) — site-specific year-1 model.
- [Solar Energy Local — 84604 Provo](https://www.solarenergylocal.com/states/utah/84604/) — NSRDB-derived monthly summary.
- [Provo City Power Electric Rates](https://www.provo.gov/1178/Electric-Rates) — residential tariff and net-metering policy.
- [PVWatts v5 Manual](https://pvwatts.nrel.gov/downloads/pvwattsv5.pdf) — algorithm documentation, still substantively current for v8.
- See sibling files: [resource.md](resource.book-chapter.md), [orientation.md](orientation.book-chapter.md), [losses.md](losses.book-chapter.md), [degradation-system.md](degradation-system.book-chapter.md).
