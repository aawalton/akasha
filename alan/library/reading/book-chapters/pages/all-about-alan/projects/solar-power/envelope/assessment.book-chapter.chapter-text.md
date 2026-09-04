
# Envelope Assessment Options

Assessment is the cheap step that prevents expensive guessing on retrofit and equipment sizing. Five options, ranked by completeness:

## Single-instrument tests

| Test | Cost (2026) | Resolves | Stand-alone use |
|---|---|---|---|
| **Blower door (CFM50, ACH50)** | $200–500 | Whole-house air-leakage rate | Verification before/after air-sealing; pre-Manual J input |
| **Infrared thermography** | $300–800 paired | Specific bypass locations, missing/compressed insulation, thermal bridges | Targets the air-sealing crew; identifies framing voids |
| **Manual J load calculation** | $300–800 | Room-by-room design heating + cooling load (Btu/h) | **Required** for correctly sizing the heat pump |
| **Duct leakage test (Duct Blaster)** | $200–400 | CFM25 leakage to outside vs. total | Pre/post duct-sealing verification |

Sources: [Building Performance Institute pricing guidelines](https://www.bpi.org/standards/current-standards), [RESNET HERS standards](https://www.resnet.us/about/standards/), aggregated 2025–2026 Utah-market quotes via [HomeAdvisor — Utah energy audit cost](https://www.homeadvisor.com/cost/inspectors-and-appraisers/get-a-home-energy-audit/).

## Bundled audits

| Audit type | Cost (2026) | Includes |
|---|---|---|
| **HERS rating (RESNET)** | $400–800 | Blower door, basic IR, insulation survey, duct test, HERS index report |
| **BPI Building Analyst audit** | $600–1,200 | Above + combustion safety, CAZ depressurization, full envelope mapping, retrofit prioritization |
| **Comprehensive energy audit + Manual J** | $800–1,500 | BPI audit + room-by-room Manual J for equipment sizing |

The BPI/RESNET audits are the right level for this project. A standalone Manual J without a blower door is worse than useless — the air-leakage component dominates the heating-load number and Manual J defaults will overstate the load by 20–40% if leakage is assumed at a code-construction baseline rather than measured. **Always pair Manual J with a blower door run.**

## Utility-subsidized audit — Rocky Mountain Power Wattsmart

Rocky Mountain Power offers a **free home energy assessment** through the [Wattsmart Homes program](https://www.rockymountainpower.net/savings-energy-choices/home.html) for residential customers in Utah. The assessment includes a basic envelope walk-through, no-cost direct-install of LEDs and low-flow fixtures, and recommendations — but **not** a blower-door test or Manual J. Treat it as a triage tool, not a substitute for the paid BPI audit. The current program-administrator contractors include GreenHome Specialties and a handful of others; they often upsell the paid blower-door / IR scan after the free assessment.

## Combustion safety (skip for all-electric)

BPI audits standardly include combustion-appliance-zone depressurization testing for atmospheric-vent gas appliances. Since the project is all-electric (no gas furnace, no gas water heater, no gas range), this portion is irrelevant — but auditors still go through the motions because the certification protocol requires it. Don't pay extra for it; ensure the scope of work prices it at zero or omits it.

## What to ask the auditor

Apples-to-apples bid specification:

1. **Blower door:** report CFM50, ACH50, and a leakage map by sub-floor / location from the IR pass.
2. **Insulation survey:** R-value estimates by assembly (attic flat, attic slopes, walls by orientation, basement walls, rim joist) plus a visible-defects list.
3. **Duct test:** CFM25 total leakage, CFM25 leakage-to-outside, leakage as % of nominal air-handler CFM.
4. **Manual J:** room-by-room sensible + latent loads at the [Provo design conditions in hvac.md](../energy-demand/hvac.book-chapter.md) (-2°F winter, 97°F/64°F MCWB summer). Report the assumed ACH50 input — should match the measured value, not a code default.
5. **Retrofit prioritization:** list of measures with estimated cost, estimated heating-load reduction, and dollars-per-percent-reduction. Reject auditors who can't produce this table.
6. **Post-retrofit verification:** quote upfront for a second blower door + duct test after the retrofit, so the heat-pump installer has a measured post-retrofit ACH50 to feed back into Manual J.

## Recommended path

A single comprehensive BPI audit + Manual J at **$800–1,500** resolves enough to design the retrofit, size the heat pump, and size the PV. Pair with a **post-retrofit verification blower door + duct test at $400–600** to capture the actual delivered envelope quality before the HVAC and PV installers commit to capacity. Total assessment spend: **$1,200–2,100** across two visits.

Skip the free utility audit unless it's used as no-cost reconnaissance ahead of the paid BPI audit. The information density is too low to drive the retrofit decision on its own.
