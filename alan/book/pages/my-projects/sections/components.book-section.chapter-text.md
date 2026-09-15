
# Component Breakdown

NREL publishes the annual residential PV cost benchmark with explicit categories. The Q1 2024 figures below are for the representative 8 kWdc system (400W modules, 21.1% efficiency, monofacial, US-assembled in a 1.5 GW/yr plant). Two columns: **MSP** (minimum sustainable price, hardware + minimum sustainable soft cost) and **MMP** (modeled market price, the actual market with distortions and channel-specific overhead).

Source: [NREL Q1 2024 Solar Cost Benchmarks](https://data.nrel.gov/submissions/307) via [data.nrel.gov/submissions/307](https://data.nrel.gov/submissions/307) and [Utility Dive coverage of the report](https://www.utilitydive.com/news/solar-costs-residential-utility-nrel-module-inverter/697937/).

## NREL Q1 2024 — 8 kW Residential System

| Category | Type | MSP ($) | MMP ($) | MSP $/W | MMP $/W | % of MMP |
|---|---|---|---|---|---|---|
| Module | Hardware | $887 | $887 | $0.111 | $0.111 | 3.5% |
| Inverter (string) | Hardware | $335 | $357 | $0.042 | $0.045 | 1.4% |
| Structural BOS (rails, flashings, mounts) | Hardware | $289 | $321 | $0.036 | $0.040 | 1.3% |
| Electrical BOS (wiring, conduit, disconnects) | Hardware | $206 | $206 | $0.026 | $0.026 | 0.8% |
| Fieldwork (install labor) | Soft | $162 | $358 | $0.020 | $0.045 | 1.4% |
| Office work (permitting, design, ops) | Soft | $259 | $281 | $0.032 | $0.035 | 1.1% |
| Other (sales, customer acquisition, profit, overhead) | Soft | $321 | $393 | $0.040 | $0.049 | 1.6% |
| **Subtotal — modeled** | | $2,459 | $2,803 | **$0.307** | **$0.350** | 11.1% |

The NREL line items above do not equal the headline $3.15/W MMP / $2.74/W MSP for the 8 kW system — the published table breaks out per-component intrinsic-unit costs first, with $/W roll-up applied after multiple structural and overhead multipliers. The headline $/W is the right number for compare-to-quote; the **shape** of the breakdown (relative shares) is the right takeaway from the table. The key shape facts ([NREL PVSCM methodology](https://www.energy.gov/eere/solar/solar-photovoltaic-system-cost-benchmarks)):

- **Hardware (module + inverter + SBOS + EBOS):** roughly **35–40%** of installed cost.
- **Soft costs (labor + permitting + sales + overhead + profit):** roughly **60–65%** — the majority.
- **Customer acquisition alone:** $0.48–$0.69/W ([NREL via search](https://docs.nrel.gov/docs/fy25osti/92536.pdf)) — bigger than the module line item.

## Approximate $/W Shape for a $2.65/W Utah Quote

Decomposed using NREL share ratios:

| Component | Share | $/W |
|---|---|---|
| Modules | ~10% | $0.27 |
| Inverter | ~5% | $0.13 |
| Racking / structural BOS | ~4% | $0.11 |
| Electrical BOS (wire, conduit, disconnects, breakers) | ~3% | $0.08 |
| Install labor | ~15% | $0.40 |
| Permitting / inspection / interconnection | ~3% | $0.08 |
| Sales & customer acquisition | ~18% | $0.48 |
| Overhead / G&A | ~7% | $0.19 |
| Installer profit margin | ~8% | $0.21 |
| Sales tax (on equipment, varies) | ~2% | $0.05 |
| Misc / contingency | residual | $0.20 |
| **Total** | 100% | $2.65 |

## Inverter Choice — Separate Line Item Impact

- **String inverter:** $0.60–$1.00/W system-level cost; cheaper, single point of failure, no per-panel optimization ([Electrical Trader](https://electricaltrader.com/blogs/news/string-inverters-vs-microinverters-cost-comparison)).
- **Microinverter (Enphase IQ8 series):** $1.10–$2.00/W system-level cost; per-panel MPPT, longer warranty (20–25 yr vs 10–15 yr for string), but ~$1,500–$2,500 premium on an 8 kW system over SolarEdge string + optimizers ([Boston Solar 2026 comparison](https://www.bostonsolar.us/solar-blog-resource-center/blog/string-inverters-vs-microinverters-which-solar-inverter-is-better-for-new-englan/)).
- **Net incremental:** microinverters add **~$0.15–0.30/W** over a comparable string setup. Worth it when (a) the roof has shading or multiple planes, (b) per-panel monitoring is wanted, (c) the roof is hard to access for the eventual inverter replacement on a string system.

## Battery — Separate Line Item

Batteries are quoted separately, not on the $/W rooftop number. Current installed pricing:

- **Tesla Powerwall 3 (13.5 kWh):** $12,000–$15,000 installed before incentives, ~$889–$1,111/kWh installed ([SolarReviews](https://www.solarreviews.com/blog/is-the-tesla-powerwall-the-best-solar-battery-available)). Some quotes go as low as $681/kWh ([A1 SolarStore](https://a1solarstore.com/blog/tesla-powerwall-cost-real-world-pricing-beyond-the-marketing.html)).
- **Enphase IQ Battery 5P:** $1,000–$1,600/kWh installed; three 5P units to match one Powerwall = $18k–$22k ([Boston Solar](https://www.bostonsolar.us/solar-blog-resource-center/blog/tesla-powerwall-3-vs-enphase-iq-battery-5p-which-solar-battery-is-better-for-con/)).
- **Wholesale lithium cell price (reference):** $108/kWh in 2025 ([BloombergNEF Dec 2025](https://about.bnef.com/insights/clean-transport/new-record-lows-for-battery-prices/)). The installed-vs-cell gap (~8–10×) is overhead, casing, BMS, install labor, profit — the same soft-cost story as PV.

## Service Panel Upgrade (Conditional Add)

If the existing main service panel is 100A or a 200A panel is at capacity, expect **$2,000–$5,000** added to the project for panel replacement and meter swap. Verify panel rating before getting quotes — it materially changes the bid.
