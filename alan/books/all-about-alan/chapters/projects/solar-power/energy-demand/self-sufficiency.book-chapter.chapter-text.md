
# Self-Sufficiency Implications

The annual energy budget in [totals.md](totals.book-chapter.md) is necessary but not sufficient — self-sufficiency is a *time-aligned* problem. Demand and PV production are misaligned across hours (gaming runs into the night) and seasons (heating peaks when PV troughs). This file works through the alignment math.

## Daily autonomy — battery sizing

Worst-month (January) daily demand: ~290 kWh/day average. Across a 24-hour winter day with no PV:

- 290 kWh ÷ 90% inverter round-trip × 95% DoD = **~340 kWh usable battery for 1 day of autonomy at planning demand**.

For a typical low-PV winter day (~30% of normal production), demand minus partial PV = ~200 kWh that battery must cover. So a realistic "1 day of winter autonomy" target is ~250–340 kWh usable.

| Autonomy goal | Usable kWh needed | Tesla Powerwall 3 (13.5 kWh ea.) | Franklin aPower 2 (15 kWh ea.) | LFP DIY rack (EG4, server-rack) |
|---|---|---|---|---|
| 12 hr (one winter overnight) | 150 | 11 PW3 | 10 aP2 | 30 kWh × 5 racks |
| 1 day | 290 | 22 PW3 | 19 aP2 | 300 kWh DIY (~$45k) |
| 3 days (cold-snap with cloud cover) | 870 | 65 PW3 | 58 aP2 | 900 kWh (~$130k DIY, $400k packaged) |
| 7 days (deep winter event) | 2,030 | 150 PW3 | 135 aP2 | $300k+ DIY, $1M+ packaged |

**Diminishing returns past ~1 day**. Past 3 days, batteries become an extremely expensive way to buy hours. Above ~5 days, no chemistry pays back vs. a generator that runs only when needed.

**Recommendation: 250–500 kWh usable battery** (~18–37 Powerwall 3 equivalents, or ~$50–100k DIY LFP). Covers a typical winter day with low PV; falls back to generator for sustained multi-day events.

## Winter shortfall — the core PV-sizing tension

Provo monthly GHI swing (from [efficiency-factors.md](../efficiency-factors.book-chapter.md)):

| Month | GHI (kWh/m²/day) | Relative to peak |
|---|---|---|
| Jun | 6.92 | 100% |
| Aug | 6.74 | 97% |
| Dec | 3.35 | 48% |
| Jan | 3.71 | 54% |

PV production tracks GHI plus seasonal cell-temperature efficiency gains (cold December cells produce ~5% more per unit GHI than hot August cells). Net production swing: **~2.0× summer:winter**.

Demand swing (from [totals.md](totals.book-chapter.md)): **~1.73× winter:summer**.

**Both peaks oppose each other.** Demand peaks when production troughs. Net annual production matching annual demand still leaves a winter deficit.

Per-month surplus/deficit at three PV sizing levels (assumes 30 kW system → ~52,500 kWh/yr in Provo, plus 50 kW → 87,500 kWh/yr, plus 80 kW → 140,000 kWh/yr):

| Month | Demand (kWh) | 30 kW PV | 30 kW Δ | 50 kW PV | 50 kW Δ | 80 kW PV | 80 kW Δ |
|---|---|---|---|---|---|---|---|
| Jan | 8,810 | 2,250 | **−6,560** | 3,750 | **−5,060** | 6,000 | **−2,810** |
| Feb | 7,775 | 2,800 | −4,975 | 4,700 | −3,075 | 7,520 | −255 |
| Mar | 6,845 | 4,200 | −2,645 | 7,000 | +155 | 11,200 | +4,355 |
| Apr | 5,730 | 5,400 | −330 | 9,000 | +3,270 | 14,400 | +8,670 |
| May | 5,105 | 6,300 | +1,195 | 10,500 | +5,395 | 16,800 | +11,695 |
| Jun | 5,185 | 6,800 | +1,615 | 11,300 | +6,115 | 18,100 | +12,915 |
| Jul | 5,575 | 6,800 | +1,225 | 11,300 | +5,725 | 18,100 | +12,525 |
| Aug | 5,525 | 6,400 | +875 | 10,700 | +5,175 | 17,100 | +11,575 |
| Sep | 5,190 | 5,200 | +10 | 8,700 | +3,510 | 13,900 | +8,710 |
| Oct | 5,585 | 4,300 | −1,285 | 7,200 | +1,615 | 11,500 | +5,915 |
| Nov | 7,040 | 2,800 | −4,240 | 4,700 | −2,340 | 7,520 | +480 |
| Dec | 8,380 | 2,150 | −6,230 | 3,600 | −4,780 | 5,750 | −2,630 |
| **Year** | **76,655** | **55,400** | −21,255 | **92,450** | +15,795 | **147,890** | +71,235 |

Key reads:
- **30 kW** = "annual net negative" — deep deficit Nov–Mar, near-balance year-round. Needs grid or huge generator.
- **50 kW** = "annual net zero" — Nov–Feb still deficit; Mar–Oct surplus. Needs ~3 winter months of generator support unless battery can move surplus across seasons (it can't).
- **80 kW** = "winter break-even" — Feb just barely breaks even; Dec/Jan still need ~2,700 kWh/mo of supplemental (generator). Massive summer curtailment (~70% of summer kWh wasted unless export-paid).

**No PV-only configuration achieves winter-month self-sufficiency without either (a) ~5–10× oversize or (b) seasonal storage that doesn't exist at residential scale.**

## The three architectures

### A. Oversize PV + battery + grid-tie (financial sweet spot, not self-sufficient)

50 kW PV + 50 kWh battery + grid as buffer. Achieves annual net-zero, lets the grid handle winter shortfall and absorb summer surplus. **Cheapest per kWh produced**, but grid-dependent → fails the goal.

### B. Massive PV + large battery + generator (defensible self-sufficiency)

80 kW PV + 300 kWh battery + 24 kW propane standby generator with buried 1,000 gal tank. Architecture:
- PV covers Apr–Oct fully; surplus curtailed (no grid export needed).
- Battery handles daily cycling year-round and 1–2 day cold-snap autonomy.
- Generator runs ~2–4 weeks/yr cumulative during deep winter events, fed from buried propane.
- Annual propane use: ~400–800 gallons (a 1000-gal tank refills annually).

**Cost rough order**: $150–200k PV + $80–120k battery + $25–40k generator install = ~$250–360k. Provides genuine grid-independence with a single fossil-fuel touchpoint (propane).

### C. Extreme PV + extreme battery (no fossil, very expensive)

160 kW PV + 1,500 kWh battery, no generator. Theoretical no-fossil-fuel self-sufficiency. Practical issues:
- Rooftop area unlikely to accommodate 160 kW (would need ~10,000 sq ft of array — roof + ground-mount + outbuildings).
- Battery cost ~$400–800k.
- Still vulnerable to a once-a-decade 14-day snow-cover-plus-cloud event.

**Cost rough order**: $700k–$1M+. Not recommended unless cost is no object and propane is unacceptable.

## Recommended architecture (working assumption)

**Option B with two tweaks**:

1. **Wood-burning backup heater** (high-efficiency wood stove, ~70k Btu/h, EPA Phase 2): cuts winter heat-pump load by ~30–50% during cold snaps, doubles as resilience if both heat pump and generator fail. Wood is locally sourced; eliminates the "single propane dependency" criticism somewhat.
2. **Aggressive load-shedding hierarchy** (next section): generator runs less because load drops first.

## Load-shedding hierarchy (when battery hits 30%)

Drop loads in this order:

| Priority | Load | Why this order |
|---|---|---|
| 1 (shed first) | EV charging | Easiest — cars hold days of range; can defer for 24–48 hr |
| 2 | Gaming PC cluster | Discretionary; alert occupants and shut down |
| 3 | Clothes dryer | Defer to next solar day; line-dry indoor if needed |
| 4 | Dishwasher | Defer |
| 5 | DHW (resistance), drop one tank | Half capacity; still functional |
| 6 | Cooking (induction) | Can use propane backup burner if extended |
| 7 | Hot tub / pool / humidifier (flag-loads) | Drop entirely |
| 8 (shed last) | Refrigeration | Must keep; ~1,100 kWh/yr is non-negotiable |
| 9 (never shed) | Heat pumps + air handler + DHW basic recovery | Plumbing freeze risk + habitability |
| 10 (never shed) | Networking, lighting, security | Always-on essentials |

This hierarchy is implementable in any of SPAN, Lumin, or a custom Home Assistant + ESPHome smart-contactor setup. The savings: at 30% SoC, the protected load drops from ~12 kW to ~3–4 kW, multiplying battery hours by ~3×.

## Generator sizing

Worst-case protected-load draw during sustained outage (gaming + EVs shed, heat full, DHW recovering, cooking, refrigeration, lights, networking): **~18 kW continuous**.

- **24 kW standby (Generac Guardian, Kohler 24RCL, Cummins QuietConnect)**: covers protected load with margin. 240 V split-phase, propane-fueled, ~1.5 gph at 50% load.
- **48 hr/week of cumulative runtime in Dec–Jan = ~95 gal/month propane = ~300 gal annual planning.**

Mount the generator outside (NFPA 37 setbacks), with a **propane buried tank ~1,000 gal** (~1-year supply at planning use, ~3 months at heavy use). Auto-transfer switch (already part of any whole-house standby package).

## What pushes the analysis up or down

- **Roof area / available PV mounting**: if rooftop limits production to ~30 kW, must add ground-mount, carport, or outbuilding roof. Without ~50 kW minimum, the architecture collapses to grid-dependent.
- **Battery price trajectory**: LFP residential prices dropping ~10%/yr; the 300 kWh battery that costs $100k today may cost $60k in 2030. Phased install (start at 100 kWh, expand) is reasonable.
- **Generator fuel choice**: diesel offers higher energy density per gallon (~38 kWh/gal vs ~26 kWh/gal for propane) but worse cold-start behavior in Provo winters. Propane wins for residential.
- **Local code / zoning**: Provo permits residential standby generators (UDC §14.34) and rooftop PV broadly; ground-mount may require setbacks.
- **Future EV V2H**: if both cars are V2H-capable, the household gains ~150 kWh of additional storage at no incremental cost — shifts the battery sizing target downward by ~25%.

## Summary recommendation

**Plan for**:
- **~60 kW PV** (rooftop + carport / ground-mount as needed, ~3,500 sq ft array area).
- **~300 kWh usable battery** (LFP, phased: 150 kWh day 1, expand to 300 kWh as budget allows).
- **24 kW propane standby generator + 1,000 gal buried tank**.
- **Wood stove** as additional winter heat backup.
- **SPAN or Lumin load-shedding panel** controlling EV charging, gaming subpanel, dryer, dishwasher.
- **400 A service** (overkill for production-side, headroom for the unmanaged peak).

This architecture meets the **self-sufficiency goal**: house operates indefinitely without grid, with a single annual propane refill (~500 gal/yr planning) and wood for redundancy. It does **not** meet the financial-efficiency goal — a grid-tied 30 kW + 30 kWh battery would produce more $/year saved. Per Alan's brief, self-sufficiency wins.
