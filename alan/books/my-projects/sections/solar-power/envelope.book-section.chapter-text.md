
# Envelope Retrofit Decision

The PV system has to cover whatever heating-load survives the envelope. For a 1970s 6000 sq ft house in Provo with [-2°F design temp and ~5,800 HDD65](energy-demand/hvac.book-chapter.md), heating dominates annual electric load and the envelope dominates heating load. Shrinking the envelope load before sizing the heat pump and the PV is the single largest controllable lever on system cost.

The math, summarized: an $8,000–15,000 retrofit on a 1970s house cuts heating load 30–45%, saves ~6,000–9,000 kWh/yr, removes ~3.5–5.3 kWp of required PV (~$9,000–13,000 in PV at ~$2.50/W), and likely shrinks the heat pump by one outdoor unit ($5,000–15,000 in HVAC). Net: envelope-first pays for itself **before** counting any kWh saved over the building's life. See [math.md](envelope/math.book-chapter.md) for the worked numbers.

## Sections

- **[Baseline — what a 1970s Utah house typically has](envelope/baseline.book-chapter.md).** Walls R-11 in 2x4, attic R-19 settled, uninsulated rim and basement, single-pane or early double-pane windows, 5–10 ACH50 air leakage, attic-routed leaky ducts. Sets the starting envelope load.
- **[Assessment options and pricing](envelope/assessment.book-chapter.md).** Blower door, IR thermography, Manual J, BPI/RESNET audits, and Rocky Mountain Power's free-audit offering.
- **[Retrofit packages ranked by leverage](envelope/retrofits.book-chapter.md).** Cost-per-percent-heating-reduction table. Air sealing > attic top-up > duct sealing > rim joist > wall dense-pack > basement walls > windows > continuous exterior. Windows lose on energy alone.
- **[Heating-load reduction math + PV / HVAC savings](envelope/math.book-chapter.md).** Retrofit % → kWh/yr → kWp → dollars. Compares solar-first, envelope-first, and parallel-project orderings.
- **[Recommended sequence](envelope/sequence.book-chapter.md).** Audit → air seal + attic + rim + ducts → post-retrofit Manual J + blower door → heat pump + PV in parallel.
- **[Incentives and Utah contractors](envelope/incentives.book-chapter.md).** Federal 25C is dead post-OBBBA (2026+). Utah HOMES/HEAR pending (~end of 2026). Rocky Mountain Power Wattsmart pays up to $1,100 for insulation/air-sealing and offers a free audit. Local: GreenHome Specialties (Provo, BPI-certified), Griffin Energy Audits (Salt Lake), Utah Energy Conservation Coalition (RESNET).

## Verdict

For this house, **envelope-first** dominates solar-first on dollars and downstream optionality, and **parallel** beats sequential only if Alan can coordinate the audit → retrofit → heat-pump → PV contractor chain inside a single calendar quarter without losing the post-retrofit Manual J as the heat-pump sizing input. The high-leverage retrofit package costs less than the PV oversize it avoids, even before counting lifetime kWh, HVAC right-sizing savings, comfort, and resilience during cold snaps when CCHP COP collapses below 1.7.
