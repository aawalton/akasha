
# Rooftop Solar Pricing

Decomposition of residential rooftop solar pricing for Provo, Utah, in 2026. Four sub-files cover the dimensions; this file is the index plus the bottom-line numbers Future-Alan needs at a glance.

## Headline Numbers (mid-2026)

- **Utah median quoted price:** $2.65/W cash, before incentives ([EnergySage Utah](https://www.energysage.com/local-data/solar-panel-cost/ut/), 2026). Average system 12.88 kW → $34,128 gross.
- **US national median:** $2.50/W cash (H2 2024) — lowest ever recorded since EnergySage began tracking in 2014, when it was $3.75/W. Wood Mackenzie cites a 30% YoY drop in panel prices for 2024 ([pv-magazine USA](https://pv-magazine-usa.com/2025/04/29/u-s-residential-solar-falls-to-lowest-ever-2-50-per-watt-said-energysage/)).
- **NREL Q1 2024 benchmark (modeled, 8 kW residential):** $3.15/W modeled market price; $2.74/W minimum sustainable price. EnergySage's $2.50/W is below NREL because EnergySage's marketplace pre-filters competitive online bids — those installers carry lower customer-acquisition cost than the door-to-door / in-home channel NREL models ([NREL Q1 2024](https://data.nrel.gov/submissions/307)).
- **Cash vs financed gap:** financed systems run 22% higher on average — typical dealer fee is 15–30% of cash price, embedded in loan principal, undisclosed in APR ([CFPB, Aug 2024](https://files.consumerfinance.gov/f/documents/cfpb_solar-financing-issue-spotlight_2024-08.pdf)).
- **Federal ITC:** 30% credit was the dominant Utah lever. Trump's "One Big Beautiful Bill" (July 2025) **phased out the residential ITC for cash/loan systems installed after Dec 31, 2025** ([Utah Office of Energy Development](https://energy.utah.gov/homepage/tax-credits/renewable-energy-systems-tax-credit/)). For a 2026 Utah installation: assume no federal credit unless under a TPO/lease structure that retains commercial-side ITC. Verify currency before committing.
- **Utah state credit:** ended for systems installed in 2024+ ([Utah OED](https://energy.utah.gov/homepage/tax-credits/renewable-energy-systems-tax-credit/)).

## Top Three Levers in Alan's Control

1. **Get 3+ bids via EnergySage** — multi-bid competition reduces price ~20% vs single-installer quotes; saves $3k–$10k on a typical system ([EnergySage](https://www.energysage.com/solar/why-compare-solar-quotes/)).
2. **Pay cash, not financed** — eliminates the 15–30% dealer fee baked into "0.99% APR" loans ([CFPB](https://www.consumerfinance.gov/about-us/newsroom/cfpb-report-finds-lenders-cramming-markup-fees-and-confusing-terms-into-solar-energy-loans/)).
3. **Avoid door-to-door / in-home sales channel** — customer acquisition cost is $0.48–$0.69/W; an online-quote installer prices below the national benchmark for this reason alone.

Additional high-impact decisions: skip the battery on first install (residential batteries still run $681–$1,600/kWh installed and Utah net billing math may not justify them), size the system to fit on a single roof plane, and verify the existing service panel is 200A so no $2–5k panel upgrade is needed.

## Sub-Files

- [pricing/total-retail.md](pricing/total-retail.book-chapter.md) — National and Utah $/W, cash vs financed, sources.
- [pricing/components.md](pricing/components.book-chapter.md) — NREL 2024 benchmark component table; what fraction goes to each piece.
- [pricing/levers.md](pricing/levers.book-chapter.md) — Levers that move the price up or down for a specific quote.
- [pricing/cost-curve.md](pricing/cost-curve.book-chapter.md) — Year-by-year cost-curve history; modules, inverters, batteries, soft costs.

## Two Cost-Curve Facts to Anchor Expectations

1. **Hardware is no longer the lever.** Wholesale modules are ~$0.10–0.28/W (US tier-1) and lithium cells are $108/kWh ([BloombergNEF Dec 2025](https://about.bnef.com/insights/clean-transport/new-record-lows-for-battery-prices/)). Further hardware deflation barely moves the installed price. The remaining cost is soft costs — labor, sales, permitting, overhead, profit — and the US runs **2–4× higher soft costs than Germany** ($1.22/W US vs $0.33/W Germany) ([RMI](https://rmi.org/blog_2013_12_05_can_usa_solar_cost_compete_with_germany/)). The single biggest variable you can affect is which installer you hire, not which panel you pick.
2. **The 2025 tariff stack inflated US module pricing 15%+ from Apr–Aug 2024**, pushing US module prices to ~$0.25–0.28/W vs $0.087/W Chinese FOB — a ~3× premium for the same hardware ([pv-tech](https://www.pv-tech.org/how-us-trade-measures-are-reshaping-solar-supply-chains/)). Watch for tariff news before signing; ask installers when they last repriced module supply.
