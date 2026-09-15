
# Inverter Topology and Service-Panel Decision

Two interconnected calls: which inverter platform manages PV + battery + future inference growth, and what amperage service handles the realistic peak demand.

## Inverter topology

Three viable architectures at this size class (49 kWp DC / 40 kW AC / 40 kWh battery / multi-face roof / multi-year inference upside):

### Option 1 — Microinverter (Enphase IQ8 + IQ Battery)

- One IQ8M-class microinverter per module; AC trunks home-run to the main panel.
- Battery: Enphase IQ Battery 5P stacked (8 units for 40 kWh).
- Per-module MPPT; per-module monitoring.
- Pros: best for shaded and multi-face roofs; no single point of failure; 25-year inverter warranty; clean AC-coupled architecture.
- Cons: ~$0.15–0.30/W premium over string per [pricing/components.md](../pricing/components.book-chapter.md#inverter-choice--separate-line-item-impact); 49 kWp × ~120 modules × 1 microinverter each adds up; IQ Battery 5P is the most expensive per-kWh option in [battery.md](battery.book-chapter.md).
- Scale at 49 kWp: 120+ microinverters is a large fleet. Reliable but the unit count is real.

### Option 2 — String + DC optimizers (SolarEdge HD-Wave)

- One or two central string inverters; one optimizer per module.
- Battery: SolarEdge Energy Bank or third-party AC-coupled.
- Per-module MPPT via optimizers; central inversion.
- Pros: ~$0.10–0.20/W cheaper than microinverter; handles per-module shading; central inverter is field-serviceable.
- Cons: central inverter is a single point of failure (12-year warranty, extendable); SolarEdge as a company has had financial stress in 2024–2025 — multi-decade serviceability is a question.

### Option 3 — Hybrid string + optimizers + integrated battery (SolArk / EG4 / Fortress)

- One or two hybrid string inverters that handle PV, battery, and grid-tie in one box. Add DC optimizers per module for shading.
- Battery: LFP rack-mount paired to the inverter's battery bus.
- Pros: cleanest battery integration (one vendor, one warranty path); islanding/backup logic native; pairs well with high-DC-coupled architectures; competitive $/W; future expansion (more PV strings, more battery modules) is straightforward; well-suited for someone who may later add inference compute on a critical-loads subpanel.
- Cons: hybrid inverter market is younger than Enphase / SolarEdge; vendor longevity varies; some sites need 2 units in parallel at 49 kWp DC.

### Recommendation: Option 3 (hybrid string + DC optimizers)

Rationale:

1. **Battery integration** — the planning case includes 40 kWh of battery. A hybrid inverter unifies the PV + battery + grid-tie + islanding logic into one platform with one warranty contact. Microinverter + AC-coupled battery means three vendors (Enphase PV + Enphase battery + utility interconnect) and two MPPT systems; serviceable but more interfaces to manage.
2. **Future inference upside** — the scope file requires the architecture to absorb a step in compute load without rework. Hybrid string + optimizers handles this by expanding the AC-side capacity at the inverter, not by re-wiring the module-level fleet. Per [computers.md](../energy-demand/computers.book-chapter.md), the gaming room needs its own 60–80 A subpanel anyway; the hybrid inverter feeding that subpanel through the critical-loads bus is the cleanest topology.
3. **Per-module optimization** — DC optimizers per module match microinverter's ability to handle multi-face roof and partial shading per [provo.md](../efficiency-factors/provo.book-chapter.md#sensitivity-to-roof-choice) (MLPE saves 10–15% on a shaded roof vs. plain string).
4. **Cost** — Option 3 lands ~$0.10/W cheaper than microinverters at this size, ~$5,000 saved on a 49 kWp system.

Two units in parallel (e.g., 2× SolArk 15K-2P giving 30 kW AC, or scale to 2× 20 kW class units for the full 40 kW AC) handles the planning case and gives N+1 resilience if one fails. Confirm specific product selection at bid stage — the market is moving quickly.

### When to flip to Option 1 (microinverter)

If the roof study reveals **>20% shading on the planned-array faces** or **more than 3 roof faces** in use, microinverter's per-module independence is worth the premium. Specifically: a hip-roof house with PV on 4+ small faces is the microinverter sweet spot. A multi-string hybrid setup on 4+ faces gets ugly fast.

### When to flip to Option 2 (SolarEdge string + optimizers)

If the chosen installer has deep SolarEdge experience and discounted inventory, and the buyer is willing to AC-couple the battery from a different vendor. Defensible but more vendor seams.

## Service panel decision

Restating peak demand from [demand.md](demand.book-chapter.md) (carried forward from [energy-demand/totals.md](../energy-demand/totals.book-chapter.md)):

- Realistic managed peak: **25–35 kW**
- Worst-case unmanaged coincident: **~55 kW**

200 A / 240 V continuous capacity is 38.4 kW at the NEC 80% rule. **The managed peak fits at the top of 200 A; the unmanaged peak does not.**

### Path A — Stay at 200 A with aggressive load management

- Cost: ~$2,000–$4,000 for SPAN Smart Panel or Schneider Square D Energy Center, plus the EVSE load-management subscription (some are free).
- Pros: cheapest hardware path; SPAN's per-circuit monitoring is genuinely useful.
- Cons: the load-shedder becomes load-bearing — a SPAN firmware fault or sensor failure can trip the whole house during a real load surge. The 200 A service-entry conductors and meter base also become the binding constraint for any future load growth (the inference workload, a third EV, future occupant additions).

### Path B — Upgrade to 400 A and skip aggressive management

- Cost: ~$5,000–$8,000 panel + meter + service-entry conductor upgrade (Provo City Power has interconnection rules and may require the utility to come out; local electrician quotes vary, get 2+ at bid stage).
- Pros: 400 A handles the unmanaged worst case (55 kW) with headroom; future load growth is absorbed without re-cutting service drops; inference activation doesn't trigger a second service upgrade in 5 years.
- Cons: more expensive than Path A; the entire service drop needs new conductors; some Provo permitting takes weeks for service upgrades.

### Path C — 400 A + lightweight load management

The recommended path: **400 A service + load monitoring (Emporia Vue or SPAN as monitoring only) without making the shedder load-bearing.**

- Panel: 400 A main, with 4 subpanels per the topology in [energy-demand/totals.md](../energy-demand/totals.book-chapter.md#subpanel-topology-suggestion):
  - 120 A gaming-room subpanel (PCs, mini-split, ventilation)
  - 80 A garage / EV subpanel (two EVSEs + workshop)
  - 100 A HVAC + DHW critical-loads subpanel (wired through the battery for outage islanding)
  - 100 A kitchen + laundry + general subpanel
- Monitoring layer: Emporia Vue clamp ammeters on each subpanel feeder → continuous per-subsystem metering, no actuation responsibility.
- Optional: EVSE-side load-managed charging (Wallbox Pulsar Plus or Tesla Wall Connector with site-aware mode) so the EVs back off if other loads spike. This is opportunistic, not load-bearing for safety.

### Recommendation: Path C

Rationale:

1. **Self-sufficiency principle** — a 400 A service tolerates the unmanaged worst case. The load-shedder becomes additive optimization. A single point of management failure (SPAN firmware bug, controller crash) doesn't trip a house full of CCHP recovery + EV charging + gaming.
2. **Inference upside** — the scope flags significant compute as future-likely. Path A's 200 A constraint binds first when inference activates, forcing a second service upgrade exactly when the financial appetite for it has faded.
3. **Cost** — Path C costs roughly Path A + $4,000. On a $170k all-in project, the marginal $4,000 buys headroom for the next 30+ years of household electrification growth.

## Inverter-to-panel topology

- Inverter outputs land on a **PV/battery subpanel** at the meter, which feeds the 400 A main through a back-fed breaker per NEC 705.12 (B)(2). At 40 kW AC / 240 V = 167 A back-fed, the main is sized at 250 A or larger on its busbar — fits within 400 A service.
- Critical-loads subpanel (HVAC + DHW) wires through the inverter's protected-loads output. During grid outage, this subpanel stays energized from battery; the rest of the house de-energizes.
- Gaming + EV subpanels are *not* on protected loads — they load-shed at grid outage.

## Carry-forward

- Inverter topology: hybrid string + DC optimizers, 40 kW AC, ILR ~1.22.
- Service: 400 A main + 4 subpanels + load monitoring.
- Costs land in [cost.md](cost.book-chapter.md).
