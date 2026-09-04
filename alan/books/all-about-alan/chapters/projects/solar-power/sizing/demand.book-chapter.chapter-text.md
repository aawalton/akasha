
# Revised Annual Demand (Iteration 2)

The prior demand totals in [energy-demand/totals.md](../energy-demand/totals.book-chapter.md) carried four "if applicable" flag-loads: hot tub, separate server room / home lab, well pump, steam humidifier. The scope file resolves them; this file restates the totals with those answers applied.

## Iteration-2 scope answers

From [scope.md](../scope.book-chapter.md):

| Flag-load | Status | kWh adjustment |
|---|---|---|
| Hot tub / pool / spa | Out of scope | −0 (was not in the 77,950 nominal subtotal) |
| Separate home lab / GPU rack | Folded into the 12 PCs (no additional rack) | −0 |
| Well pump | Out of scope (city water) | −0 |
| Steam humidifier | Not flagged in scope; default out | −0 |
| EV mileage | **Low end of the household range** (22,000 mi/yr combined, not 28,000) | EV column down ~4,800 kWh from nominal |
| Future inference workload | **Upside only** — not in base case | Recorded as risk-up tail |

The first three were *not* in the original 77,950 nominal subtotal — they were the flag-loads asked about. Removing them changes nothing in the headline subtotal; the documentation just locks them down. The EV adjustment *is* a real cut.

## Recomputed annual kWh

Starting from [energy-demand/totals.md](../energy-demand/totals.book-chapter.md) confirmed-loads subtotals, adjusting EV miles per [energy-demand/vehicles.md](../energy-demand/vehicles.book-chapter.md) (low-mileage scenario is 22,000 mi × 3.7 mi/kWh wall = 5,900 kWh; round to 6,000 with light cold-weather buffer):

### Low scenario (~48,000 kWh/yr)

Drivers: well-insulated post-retrofit envelope, HPWH in conditioned space, moderate gaming (8 hr/day), 22k EV mi combined.

| Category | kWh |
|---|---|
| Heating (well-insulated CCHP) | 9,500 |
| Cooling | 2,800 |
| DHW (HPWH) | 1,800 |
| Cooking | 1,400 |
| Refrigeration | 1,000 |
| Dryer | 1,200 |
| Other appliances | 1,300 |
| Lighting | 1,000 |
| Networking / cameras | 1,600 |
| TVs / audio / charging | 1,000 |
| Garage / outdoor | 700 |
| 12 PCs (moderate, 8 hr/day) | 20,000 |
| 2 EVs (22k mi, light winter) | 6,200 |
| **Total** | **~48,500** |

### Nominal scenario — planning value (~73,000 kWh/yr)

Drivers: mid-tier envelope (between well-insulated and existing), resistance DHW (self-sufficiency-favored per [water-and-appliances.md](../energy-demand/water-and-appliances.book-chapter.md)), heavy gaming planning value (30,000 kWh/yr from [computers.md](../energy-demand/computers.book-chapter.md)), 22k EV mi.

| Category | kWh |
|---|---|
| Heating (mid envelope) | 16,500 |
| Cooling | 3,500 |
| DHW (resistance) | 4,800 |
| Cooking | 1,700 |
| Refrigeration | 1,100 |
| Dryer | 1,500 |
| Other appliances | 1,450 |
| Lighting | 1,200 |
| Networking / cameras | 1,800 |
| TVs / audio | 700 |
| Phone / device charging | 400 |
| Garage / shop | 500 |
| Outdoor lighting | 300 |
| 12 PCs (heavy planning) | 30,000 |
| 2 EVs (22k mi, +10% cold) | 7,400 |
| **Total** | **~72,850** |

Round to **73,000 kWh/yr** as the planning number.

### High scenario (~87,000 kWh/yr)

Drivers: leaky envelope (no retrofit), resistance DHW, heavy gaming, 22k EV mi, future inference workload still inactive. (If inference activates, this number climbs another 10–25,000 kWh/yr — see "Inference upside" below.)

| Category | kWh |
|---|---|
| Heating (leaky envelope) | 22,000 |
| Cooling | 4,500 |
| DHW (resistance) | 5,500 |
| Cooking | 2,300 |
| Refrigeration | 1,400 |
| Dryer | 1,800 |
| Other appliances | 1,800 |
| Lighting | 1,500 |
| Networking / cameras | 2,200 |
| TVs / audio / charging | 1,500 |
| Garage / outdoor | 1,900 |
| 12 PCs (heavy upper bound) | 34,000 |
| 2 EVs (22k mi, full cold) | 6,800 |
| **Total** | **~87,200** |

## Comparison to prior planning

| Source | Nominal kWh | High kWh |
|---|---|---|
| [energy-demand/totals.md](../energy-demand/totals.book-chapter.md) — confirmed loads | 77,950 | 94,400 |
| Iteration 2 — flags resolved, EV cut to low-end miles | **73,000** | **87,000** |
| Δ | −5,000 (−6%) | −7,400 (−8%) |

The cut is modest but real: the EV reduction is the only mechanical change, and the home-lab "if applicable" buffer that was tentatively threaded into the planning total goes away cleanly once it's confirmed the 12 PCs *are* the home lab.

## Inference upside (kept out of the base case, sized as upside)

The scope file flags that the 12 PCs will eventually host "significant inference" workloads, and that the system must accommodate the upward step without PV/interconnection/service-panel rework.

From [computers.md](../energy-demand/computers.book-chapter.md), a sustained-compute system runs at ~900 W × 20 hr/day vs. 600 W × 12 hr/day for the heavy-gaming planning case. A single PC promoted to sustained inference adds ~(900×20 − 600×12) × 365 = (18,000 − 7,200) × 365 = ~3,940 kWh/yr above the heavy gaming line.

| Fraction of 12 PCs running inference 24/7 | Annual upside (kWh) |
|---|---|
| 1 of 12 | +3,900 |
| 4 of 12 (the "training rigs" mix in [computers.md](../energy-demand/computers.book-chapter.md)) | +15,600 |
| 12 of 12 | +47,000 |

A realistic "significant inference" case is 4 of 12 running 24/7 at ~900 W → **+15,600 kWh/yr** on top of nominal = ~88,600 kWh/yr.

**Sizing implication**: the *high* scenario (87,000 kWh) already covers the realistic 4-of-12 inference upside. The *nominal* PV size leaves 15k of headroom only if the envelope is mid-tier and inference stays sub-half. The all-12 inference case (~120k kWh/yr) blows past every PV size considered here — flag it as a separate architecture if it materializes.

## Monthly distribution carryover

The monthly shape from [energy-demand/totals.md](../energy-demand/totals.book-chapter.md) is preserved — flag-load removal doesn't change month-shape, and the EV cut spreads evenly across months with mild winter weighting. The annual-net-zero math depends only on the annual total against Provo's specific yield, so the monthly table doesn't drive sizing here. (It does drive battery sizing — see [battery.md](battery.book-chapter.md).)

## Peak demand (unchanged from totals.md)

Realistic managed peak: 25–35 kW. Worst-case unmanaged: ~55 kW. Service-panel implication carries forward to [topology.md](topology.book-chapter.md).

## What pushes these numbers

In order of leverage on the nominal 73,000 kWh:

1. **Envelope retrofit** — moving heating from 16,500 to 9,500 kWh would cut total by ~7,000 kWh (10%). The single biggest controllable lever. See [recommendation.md](recommendation.book-chapter.md) for the dollar tradeoff.
2. **Inference activation** — +15,600 kWh if 4 of 12 PCs go to sustained compute.
3. **DHW choice** — switching to HPWH cuts ~3,000 kWh (~4%). Loses the solar-dump-load benefit of resistance.
4. **EV mileage** — each extra 5,000 mi/yr at planning efficiency adds ~1,700 kWh.
5. **Gaming use intensity** — moderate (20,000) to heavy (34,000) is a 14,000-kWh swing on this one line.

## Carry-forward

The next file ([pv.md](pv.book-chapter.md)) uses these three annual-kWh anchors (48k / 73k / 87k) against Provo specific yield to size DC kWp. The peak-demand stack carries into [topology.md](topology.book-chapter.md). The hourly evening-load shape carries into [battery.md](battery.book-chapter.md).
