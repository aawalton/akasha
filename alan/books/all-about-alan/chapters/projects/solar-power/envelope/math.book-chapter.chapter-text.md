
# Heating-Load Reduction → PV Sizing Math

This file converts the retrofit-leverage table from [retrofits.md](retrofits.book-chapter.md) into PV-sizing and HVAC-equipment-sizing deltas, then compares the three project orderings.

## Inputs (anchors)

- **Baseline heating load (1970s envelope, leaky case):** 22,000 kWh/yr electric on a CCHP, from [hvac.md "Existing leaky case"](../energy-demand/hvac.book-chapter.md#annual-heating-energy--bin-temperature-integration).
- **Provo specific yield (anchor case):** 1,700 kWh/kWp/yr, from [provo.md](../efficiency-factors/provo.book-chapter.md#optimal-install-anchor-case).
- **PV installed cost:** ~$2.50/W ≡ $2,500/kWp, from [pricing.md](../pricing.book-chapter.md) (consult that file for current bracket).
- **Heat pump equipment cost step:** ~$8,000–12,000 per outdoor unit installed for a 4–5-ton CCHP multi-zone, $5,000–15,000 step between a 2-outdoor-unit and 1-outdoor-unit configuration at the 6000 sq ft scale ([NEEP CCHP installed-cost survey](https://neep.org/heating-electrification/ccashp-specification-product-list)).

## Retrofit → kWh saved

Each row stacks on the prior (with diminishing returns — air-sealing first means duct-sealing's "delivered" lift applies to a smaller heating load):

| Cumulative measure | Cumulative heating-load reduction | Heating kWh/yr (from 22,000) | kWh saved |
|---|---|---|---|
| None (baseline) | 0% | 22,000 | 0 |
| + air sealing | 20% | 17,600 | 4,400 |
| + duct sealing (15% of remaining) | 32% | 14,960 | 7,040 |
| + attic insulation R-60 | 38% | 13,640 | 8,360 |
| + rim joist | 41% | 12,980 | 9,020 |
| + wall dense-pack | 53% | 10,340 | 11,660 |

The "high-leverage four" stack (air seal + duct + attic + rim) lands at **~40% reduction, ~9,000 kWh/yr saved.** Adding wall dense-pack pushes toward 50% / 11,000–12,000 kWh saved.

## kWh saved → PV size avoided → dollars

At 1,700 kWh/kWp/yr:

| Retrofit package | kWh saved | PV kWp avoided | PV $ avoided (at $2,500/kWp) | Retrofit cost | Net (PV $ saved − retrofit) |
|---|---|---|---|---|---|
| Air seal only | 4,400 | 2.6 | $6,500 | $1,500–4,000 | **+$2,500 to +$5,000** |
| + duct + attic + rim (the four) | 9,020 | 5.3 | **$13,250** | **$8,000–15,000** | **−$1,750 to +$5,250** |
| + wall dense-pack (five) | 11,660 | 6.9 | $17,150 | $12,000–25,000 | **−$7,850 to +$5,150** |

Reading the "the four" row: even taking the PV-savings number alone (ignoring kWh saved on the bill and HVAC equipment savings), the retrofit is roughly **dollar-for-dollar with the avoided PV** at the high end of the cost bracket, and net-positive at the low end. The case strengthens dramatically once the next two lines are added.

## Plus: HVAC equipment right-sizing

The 22,000 → 13,000 kWh/yr load reduction also cuts the **design heat load** roughly proportionally: from 54 kW (184,000 Btu/h) toward 36 kW (123,000 Btu/h). At 6000 sq ft and CCHP units that top out at 60 kBtu/h per outdoor unit ([NEEP CCHP database](https://ashp.neep.org/)), this is the difference between **3 outdoor units and 2 outdoor units** in a multi-zone configuration. That step is worth **$5,000–15,000 in installed HVAC cost.**

## Plus: lifetime kWh on the bill

The 9,000 kWh/yr saved doesn't disappear once the PV is sized to match — under [Provo City Power's Schedule 1.1 net-metering program](../scope.book-chapter.md#utility-constraints-the-corrections), each kWh that doesn't leave the array as winter draw stays as summer export credit, which has real value at the net-metering reset. Even if the credit value compresses to wholesale, 9,000 kWh/yr × 25 yr × $0.04/kWh ≈ **$9,000 over the system life** in raw export value, with upside if retail net-metering survives.

## Three-way ordering comparison

| Ordering | PV size | Up-front cost | Lifetime kWh | HVAC right-sized | Coordination risk |
|---|---|---|---|---|---|
| **A. Solar-first, envelope as-is** | ~30 kWp to cover 22,000 kWh heating + everything else | High PV + full HVAC | High ongoing | No — HVAC oversized to leaky envelope | Lowest |
| **B. Envelope-first, then PV** | ~25 kWp post-retrofit | Retrofit $10k + lower PV + smaller HVAC | Low ongoing | Yes | Highest — sequencing delays |
| **C. Parallel (single project)** | ~25 kWp | Same as B, possibly bundled-contractor discount | Low ongoing | Yes, **if** Manual J input gets updated mid-project | Moderate |

**Option A is the lazy answer.** Net-metering masks the ongoing kWh penalty on the bill, but the up-front PV oversize is ~$13k worse than B/C, the HVAC is ~$5–15k worse, and the house has higher peak winter draw (which fights with EV charging and morning cooking for service-panel headroom, per [hvac.md "Peak heating demand"](../energy-demand/hvac.book-chapter.md#peak-heating-demand-kw)).

**Option B is the safe sequential play.** Cost-optimal but slowest. Audit and retrofit run Q1–Q2; post-retrofit Manual J lands Q3; HVAC and PV bid in Q3–Q4 against the verified load. Calendar risk: 6–9 months from kickoff to PV-on-roof.

**Option C is what to actually do** if Alan can run two contractor tracks in parallel — envelope/retrofit and HVAC/PV. The single constraint: the **post-retrofit Manual J must complete before the heat-pump equipment order is placed.** PV design can run fully in parallel with envelope, since PV sizing depends on the annual kWh number (which Alan can model from the audit's projected post-retrofit ACH50 well before the retrofit is physically done).

## Summary numbers

- Recommended retrofit package cost: **$8,000–15,000.**
- Heating-load reduction: **30–45%** (9,000 kWh/yr).
- Avoided PV: **3.5–5.3 kWp ≈ $9,000–13,000.**
- Avoided HVAC step: **$5,000–15,000.**
- Lifetime export value of saved kWh: **~$9,000+ over 25 years.**
- **Net effect of envelope-first: $15,000–30,000 better than solar-first, plus comfort and resilience benefits not priced here.**
