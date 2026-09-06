
# Customer Generation — Provo Power

1350 Apple Ave, Provo, UT 84604 is served by **Provo City Power** (the municipal utility, branded "Provo Power"), not Rocky Mountain Power. Provo Power is **not** regulated by the Utah Public Service Commission. Net-metering policy is set by the Provo Municipal Council (ordinance) and the Energy Department (standards and rate schedules); changes go through council vote rather than a PSC docket.

## Program and governing authority

- **Program name:** *Rate Schedule No. 1.1 — Net Metering Residential* (billing rate code `E1`). Defined in the Provo Energy Department rate book.
- **Enabling ordinance:** [Provo City Code 12.03.080(5)](https://provo.municipal.codes/Code/12.03.080(5)) — "Generation or Transmission of Electricity by Entities Other than Provo City". Generation under 25 kW is conditioned on signing the standard **Net Metering Agreement** and following the **Net Metering Standards** adopted by the Department.
- **Standards document:** [Provo City Utilities Net Metering Standards](https://www.provo.gov/DocumentCenter/View/4187/Net-Metering-Standards) — original adoption 8-13-2009, current revision 4-13-2010.
- **Current rate sheet:** [FY26 Energy Rate Summary](https://www.provo.gov/DocumentCenter/View/4687/2026-Rate-Summary-Billing-Codes-Energy-PDF), effective **September 1, 2025** (last revised 5-8-2025).

## Compensation mechanism

**Avoided-cost export credit, not 1:1 net metering.**

- **Active rate (Schedule 1.1, billing code `E1`):** Electricity generated and exported is credited at **−$0.06742 / kWh** (a flat avoided-cost-style rate set by ordinance, not the retail tier the kWh would have offset).
- **Legacy 1:1 rate (`NETR`):** Marked **Closed Rate** in the FY26 summary — no longer offered to new customers. Old `NETR` customers were credited at the matching retail block ($0.07 / $0.11 / $0.13 per kWh).
- **Retail rate (Schedule 1, what imports cost):** $0.07 / kWh first 500 kWh, $0.11 / kWh 501–1000 kWh, $0.13 / kWh above 1000 kWh, plus an $18.00 / month customer service charge.

The Q&A page frames it: Provo Power buys wholesale solar on the market at <$0.03 / kWh, so the $0.06742 export credit is described as already paying a "higher premium" than market — that framing is what they use to justify the no-rollover annual reset (see below).

A residential TOU option exists (Schedule 1.2, on-peak $0.15 / off-peak $0.07; with EV variant adding super-off-peak $0.045), but it is a separate retail tariff, not a net-metering compensation change. The 1.1 export credit is a single flat number regardless of when exported.

## Credit accumulation and annual reset

- Monthly billing: imports billed at retail tiers; exports credited at $0.06742 / kWh. Net excess on a month carries over to the next month as a kWh credit on the bill.
- **Annual reset: February of each year.** Any remaining credit balance is **zeroed out, not cashed out**.
- Provo's own [Rooftop Solar Q&A](https://www.provo.gov/DocumentCenter/View/4176/Rooftop-Solar-QA-PDF): "credits are zeroed out annually in February of each year with no exceptions … because we are already paying a higher premium for generated power."

**Implication for sizing:** the seasonal-battery effect (oversize the array, bank summer credits, draw them through winter) **does not work here**. The 12-month banking window ends in February — exactly when winter heating load is still high — and forfeits anything left. The cost-effective design point is *annual production ≈ annual consumption*, with the February reset acting as a hard cap on how much summer surplus can be carried into winter. Pre-buying winter kWh via the bank is fine *within* an annual window; over-sizing past it is pure giveback.

## System size cap

- **Threshold in ordinance:** [12.03.080(5)](https://provo.municipal.codes/Code/12.03.080(5)) classifies licenses under 25 kW as standard net-metering (Agreement + Standards). 25 kW and above falls under a separate licensing path generally available to industrial / commercial accounts. The ordinance does not state the basis (DC nameplate vs AC inverter) explicitly; the Standards document and License Application use **inverter AC nameplate (kW)** as the size field, consistent with NEC Article 705 practice.
- **Practical implication for ~50 kWp DC array:** at typical 1.1–1.3 DC/AC ratios this is ~38–45 kW AC, well above the 25 kW residential threshold. **It does not fit standard residential net metering.** Two paths:
  1. Reduce inverter AC capacity below 25 kW (oversized DC / clipped AC) and accept the inverter as the cap.
  2. Apply under the 25 kW-and-above generation license — a separate license path under 12.03.080, intended for commercial / industrial accounts. The compensation mechanism on this path is the **Commercial Net Metering rate (`NTCR`) at −$0.0453 / kWh** (lower export credit than residential), and the application is reviewed individually by the Energy Department rather than under the standard residential workflow.

This is a real constraint to bring back to scope. Either de-rate the AC side to stay under 25 kW (and use batteries / direct load to absorb the DC oversizing), or accept the commercial rate on the >25 kW path.

## Interconnection process and equipment

Application path (residential, under 25 kW):

1. Submit through the Permit Application Portal: Net Metering Application Form, signed License Agreement, system diagram (one-line or schematic), acknowledgment checklist.
2. Provo Power engineering review of the diagram and protection plan.
3. Electrical permit + city inspection.
4. Provo Power field test and meter installation (net meter + separate utility-provided production meter).
5. Permission to operate.

Provo Power describes end-to-end timeline as "a few months" excluding the installer's build time. The Standards do not publish a fixed application fee; the published rate sheet does not list a net-metering interconnection fee separate from the standard $18.00 / month service charge. Customer pays for the disconnect switch and meter base hardware; Provo Power supplies the meters.

**Required equipment** ([Net Metering Standards §B](https://www.provo.gov/DocumentCenter/View/4187/Net-Metering-Standards)):

- NEC Articles 690 and 705 compliance, plus current IEEE 1547 for parallel operation.
- **UL 1741** inverter (synchronous, anti-islanding). UL 1703 modules. IEEE 1262 / 929 compliance for PV.
- **Anti-islanding behavior (spec'd numerically):** disconnect within 6 cycles if voltage falls below 60 V rms on any phase; within 2 seconds if voltage rises above 132 V or falls below 104 V on any phase (nominal 120 V base); within 3 cycles on reverse power flow; 5-minute hold-off before reconnection after grid restoration.
- **UL-listed visible-break safety disconnect switch** in a padlockable metal enclosure, adjacent to the Provo meter, accessible to utility personnel at all times.
- **Production meter base** installed adjacent to the utility meter base; Provo Power supplies the production meter itself.
- Labeling: meter and transformer labeled for back-feed potential; service-panel over-current device labeled with source / connection. (Provo supplies the labels.)
- NEC 690.12 rapid shutdown is required under NEC compliance even though the 2009/2010 Standards document predates the 690.12 rule; the "latest applicable NEC" clause in §B.1 imports it.

## Battery + solar interaction

The Standards document was written before behind-the-meter storage was common and **does not call out batteries as a separate category**. §D mentions "battery banks, transfer or bypass switches, backup generators" only as items that must appear on the system diagram and require "more custom" review. Operationally:

- Hybrid inverters are allowed in principle (no prohibition in code or standards) provided the inverter is UL 1741-listed for grid-interactive operation and the anti-islanding spec in §B.6 is met. A modern UL 1741-SB inverter that islands the loads off-grid satisfies this.
- No published prohibition on grid-charging the battery and no published export-only / no-export-from-battery rule. The metering point measures net export at the service entrance; the inverter's internal energy flow is not separately metered.
- Practical interaction with the February reset: storage **shifts** energy intra-day and across short stretches but cannot solve the annual giveback — once seasonal banked credits are forfeited in February, no battery topology recovers them. Storage's value here is reducing exports (which are credited at $0.06742) in favor of self-consumption (which displaces $0.07–$0.13 retail) — i.e. arbitrage against the export-vs-retail spread — plus outage backup.

## Recent and pending program changes

- **Closure of 1:1 rate (`NETR`):** already done in a prior tariff revision — `NETR` is marked **Closed Rate** on the FY26 summary. All new residential interconnections go onto the $0.06742 `E1` Schedule 1.1 rate.
- **FY26 budget (May 2026 Daily Herald):** Mayor Judkins' proposed FY26-27 budget includes commercial / industrial power increases of 4–7 % but **no residential power rate increase**. Net-metering credit rate not flagged for change.
- **Energy Cost Adjustment (ECA):** the Energy Department may set an ECA roughly every 6 months (typical March / September) to true up wholesale costs. This applies on top of retail energy charges, not on the export credit.
- **Direction vs RMP:** RMP's NEM → Transition → Customer Generation Program migration in the IOU world has compressed export credits toward avoided-cost. Provo has already taken that step (closing `NETR`); the live question is whether the council will revisit the $0.06742 / kWh credit downward if wholesale market prices stay around $0.03. No agenda item currently on the public council calendar proposes that, but the Q&A's framing ("we are already paying a higher premium") signals the direction of any future change.

## State and federal incentives stack (residential PV, May 2026)

- **Federal Section 25D residential ITC: expired for systems placed in service after December 31, 2025.** The One Big Beautiful Bill Act (signed July 4, 2025) terminated the 25D credit on that date. A 2026 install of a customer-owned PV system at this address receives **no federal residential ITC**. (Third-party-owned systems under a lease or PPA can still capture the business-side ITC through the developer until end of 2027, but that is the lessor's credit, not the homeowner's.)
- **Utah Renewable Energy Systems Tax Credit (RESTC) — residential PV:** Utah residential PV is **not eligible** for the state RESTC for systems installed in 2024 or later. The credit remains available for non-PV residential renewables (wind, geothermal, hydro, thermal) at 25 % up to $2,000, but that is irrelevant here. The whole RESTC program sunsets January 1, 2028 (HB 264, 2025 session).
- **Utah County / Provo-specific:** Provo Power offers **SharedSolar** (Schedule 22.1, $0.1062 / kWh for 200 kWh subscription blocks) as an alternative for customers who can't or don't want to install rooftop, but it is a *substitute* for owned solar, not a stack-able rebate. No municipal-utility rebate for rooftop PV. No Utah County–specific rooftop PV credit.

**Net stack for a 2026 owned install at this site: $0 in incentives.** Project economics rest entirely on the import vs export rate spread under Schedule 1 / 1.1, the February reset boundary, and whatever self-consumption the design captures with storage.
