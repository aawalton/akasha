
# Scope

## Site

- Address: 1350 Apple Ave, Provo, UT 84604.
- House: 6000 sq ft, ~50 years old. Envelope quality unknown — will need a blower-door / insulation assessment before final heat-pump sizing.
- Water: city. No well pump in the load.
- Utility: **Provo City Power** — municipal utility, not Rocky Mountain Power. Not regulated by the Utah Public Service Commission. Solar interconnection governed by Provo City Code 12.03.080(5) and Provo Power Rate Schedule 1.1. Details in [customer-generation.md](customer-generation.book-chapter.md).

## Loads in scope

- Heat pumps for space heating + cooling.
- Electric water heater(s).
- All-electric appliances — induction cooktop, electric clothes dryer, refrigeration, etc.
- 12 gaming computers. This count *includes* the home lab — there is no separate always-on compute infrastructure beyond these 12 machines.
- Two electric vehicles. Future planning only (no current EVs); annual mileage will be on the low end of the typical-household range.
- No natural gas anywhere in the energy system.

## Loads explicitly out of scope

- Hot tub, pool, spa.
- Separate server room or rack of always-on GPU compute.
- Well pump (city water).

## Future load uncertainty

The 12 PCs will eventually host "significant inference" workloads. The system architecture should accommodate a meaningful upward step in the computer-load line without requiring rework of the PV / interconnection / service-panel sizing. The current planning case uses the heavier end of the gaming-PC range in [energy-demand/computers.md](energy-demand/computers.book-chapter.md) as a hedge against this.

## Utility constraints (the corrections)

The initial framing of "grid as seasonal battery via net metering" was wrong for Provo Power's current rules. Three hard constraints from [customer-generation.md](customer-generation.book-chapter.md) shape every downstream sizing decision:

1. **Net billing, not net metering.** Provo Power closed the legacy 1:1 NETR rate to new customers in 2025. Exports credit at a flat **$0.06742/kWh**; imports cost retail-tier rates ($0.07 / $0.11 / $0.13 across the 500 / 1500 kWh/mo block boundaries) plus an $18/month fixed service charge. Excess production is worth roughly half what it costs to import.
2. **Annual February reset, credits zeroed, no rollover, no cashout.** This eliminates the seasonal-battery mechanic. Oversizing PV beyond annual load is forfeited.
3. **25 kW residential cap.** Provo City Code 12.03.080(5). Anything larger pushes the project onto a commercial path with worse export terms (−$0.0453/kWh).

The federal residential ITC (Section 25D) was also terminated Dec 31 2025 under the July 2025 OBBBA. **A 2026 owned install carries zero federal credit.** Utah state RESTC closed for residential PV in 2024.

## Revised target

The project no longer chases "annual net-zero via grid as seasonal battery." The revised target:

- **PV sized to roughly annual load** — not oversized. Excess is forfeited at reset or exported at the cheap rate.
- **System at or below the 25 kW AC residential cap**, unless the commercial path is explicitly chosen. With 1.20 ILR this is ~30 kWp DC, which conveniently matches what fits on the working-assumption 1,500 sq ft of usable roof using premium high-efficiency modules.
- **Battery decision is decoupled from solar ROI.** Adding a battery does not improve simple-payback under the current rate structure (avoided-cost export means the marginal kWh shifted from export to self-consumption only captures ~$0.06/kWh of additional value). A battery only makes sense for outage resilience or as a hedge against future tariff changes.
- **Envelope retrofit is the primary lever** to shrink load before sizing PV. See [envelope.md](envelope.book-chapter.md).

The previous self-sufficiency-island analysis in [energy-demand/self-sufficiency.md](energy-demand/self-sufficiency.book-chapter.md) is reference only — over-scoped for both the original "grid as seasonal battery" goal and the revised "sized-to-annual-load" goal.

## Open assessment items

- House envelope quality — primary load-shrink lever. See [envelope.md](envelope.book-chapter.md).
- Roof measurements (azimuth per face, tilt, usable area, shading) — gates the bid stage. Working assumption: ~1,500 sq ft usable.
- Provo Power tariff trajectory — export credit is a candidate for further reduction by council vote. Grandfathering rules at signing date need verification at bid time.
- Provo Power-specific energy-efficiency rebates — Rocky Mountain Power Wattsmart references in [envelope/incentives.md](envelope/incentives.book-chapter.md) do **not** apply to a Provo Power customer; Provo Power's own efficiency-rebate offerings need separate research.
