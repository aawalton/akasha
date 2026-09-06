
# Totals

Roll-up of all categories. Numbers use the planning (conservative) value from each sub-file. Two columns: nominal planning and high-end worst-case for system-sizing buffer.

## Annual breakdown

| Category | Source | Nominal kWh/yr | High kWh/yr | Notes |
|---|---|---|---|---|
| Space heating | [hvac.md](hvac.book-chapter.md) | 18,000 | 22,000 | CCHP, between well-insulated and existing |
| Space cooling | [hvac.md](hvac.book-chapter.md) | 3,500 | 4,500 | Inverter HP, plus mini-split for gaming room |
| Domestic hot water | [water-and-appliances.md](water-and-appliances.book-chapter.md) | 4,800 | 5,500 | Resistance tanks (HPWH would save ~3,000) |
| Cooking (range + oven) | [water-and-appliances.md](water-and-appliances.book-chapter.md) | 1,700 | 2,300 | Induction, heavy use |
| Refrigeration (2 units) | [water-and-appliances.md](water-and-appliances.book-chapter.md) | 1,100 | 1,400 | Main + secondary |
| Clothes dryer | [water-and-appliances.md](water-and-appliances.book-chapter.md) | 1,500 | 1,800 | Vented resistance |
| Dishwasher + washer + microwave/small | [water-and-appliances.md](water-and-appliances.book-chapter.md) | 1,450 | 1,800 | |
| Lighting | [lights-and-plugs.md](lights-and-plugs.book-chapter.md) | 1,200 | 1,500 | LED, large floor area |
| Networking / servers / cameras | [lights-and-plugs.md](lights-and-plugs.book-chapter.md) | 1,800 | 2,200 | Always-on |
| TVs / audio | [lights-and-plugs.md](lights-and-plugs.book-chapter.md) | 700 | 900 | |
| Phone / device charging | [lights-and-plugs.md](lights-and-plugs.book-chapter.md) | 400 | 600 | |
| Garage / shop / motors | [lights-and-plugs.md](lights-and-plugs.book-chapter.md) | 500 | 1,500 | Heavy if real workshop |
| Outdoor lighting | [lights-and-plugs.md](lights-and-plugs.book-chapter.md) | 300 | 400 | |
| 12 gaming PCs | [computers.md](computers.book-chapter.md) | **30,000** | **34,000** | Heavy planning case |
| Two EVs | [vehicles.md](vehicles.book-chapter.md) | **11,000** | **15,000** | 28k mi @ 3.0 mi/kWh +10% cold |
| **Subtotal (confirmed loads)** | | **77,950** | **94,400** | |
| Flag-load: hot tub (if present) | [lights-and-plugs.md](lights-and-plugs.book-chapter.md) | +3,500 | +5,000 | Ask Alan |
| Flag-load: home lab (if present) | [lights-and-plugs.md](lights-and-plugs.book-chapter.md) | +2,000 | +13,000 | Ask Alan, very wide range |
| Flag-load: well / irrigation pump | [lights-and-plugs.md](lights-and-plugs.book-chapter.md) | +1,000 | +1,500 | Ask Alan |
| Flag-load: steam humidifier | [lights-and-plugs.md](lights-and-plugs.book-chapter.md) | +800 | +1,500 | Ask Alan |

**Headline (confirmed loads only)**:
- **Nominal: ~78,000 kWh/yr**
- **High: ~94,000 kWh/yr**

**If all flag-loads present at high values: ~115,000 kWh/yr**. Confirm with Alan before sizing.

For reference: median US single-family home is ~10,500 kWh/yr; a typical luxury home with two EVs and electric heat is ~25,000–35,000 kWh/yr. This house is at the high end of residential-scale demand, driven by the gaming cluster + all-electric heat + two cars.

## Monthly distribution

Combining seasonal categories (HVAC, DHW, EVs) with flat categories (gaming, appliances, lighting):

| Month | Heat | Cool | DHW | Cook+Appl | Lights+Plug | Gaming | EVs | **Total** |
|---|---|---|---|---|---|---|---|---|
| Jan | 3,800 | 0 | 470 | 575 | 415 | 2,500 | 1,050 | **8,810** |
| Feb | 2,900 | 0 | 430 | 540 | 405 | 2,500 | 1,000 | **7,775** |
| Mar | 2,000 | 0 | 430 | 555 | 410 | 2,500 | 950 | **6,845** |
| Apr | 1,000 | 0 | 400 | 545 | 405 | 2,500 | 880 | **5,730** |
| May | 300 | 100 | 380 | 545 | 410 | 2,500 | 870 | **5,105** |
| Jun | 0 | 500 | 360 | 540 | 415 | 2,500 | 870 | **5,185** |
| Jul | 0 | 900 | 350 | 540 | 415 | 2,500 | 870 | **5,575** |
| Aug | 0 | 850 | 350 | 540 | 415 | 2,500 | 870 | **5,525** |
| Sep | 100 | 400 | 370 | 540 | 410 | 2,500 | 870 | **5,190** |
| Oct | 800 | 50 | 400 | 545 | 410 | 2,500 | 880 | **5,585** |
| Nov | 2,200 | 0 | 430 | 555 | 405 | 2,500 | 950 | **7,040** |
| Dec | 3,400 | 0 | 460 | 565 | 415 | 2,500 | 1,040 | **8,380** |
| **Year** | **16,500** | **2,800** | **4,830** | **6,585** | **4,940** | **30,000** | **11,000** | **76,655** |

- **Worst month: January, ~8,800 kWh** (~290 kWh/day average, ~12 kW continuous load floor).
- **Best month: May, ~5,100 kWh** (~165 kWh/day).
- **Ratio: 1.73×** — but PV production swing in Provo is ~2.0× (Aug peak / Dec trough). **The demand swing is less severe than the production swing**, which means net-zero annual sizing strands ~25–30% of winter demand. See [self-sufficiency.md](self-sufficiency.book-chapter.md).

## Peak demand stack

Worst-case coincident, no management:

| Time-of-day scenario | Coincident loads | Peak kW |
|---|---|---|
| **Cold January 7 AM** | Heat pumps full (16) + DHW recovery (4.5) + cooking breakfast (8) + 6 gaming PCs idle (1.5) + lighting (0.5) + dryer (5.5) | **~36** |
| **Winter evening, 8 PM** | Heat pumps (10) + DHW (4.5) + cooking (5) + 12 gaming PCs gaming (11) + TVs/audio (0.5) + dishwasher (1.5) | **~33** |
| **EV double-charge overnight** | Two L2 chargers (22) + heat pumps (8) + DHW (0.5) + gaming (3) + always-on (1) | **~35** |
| **Summer afternoon (no heat)** | Cooling (8) + 12 gaming PCs full (11) + DHW (0.5) + cooking (5) + EVs (0 if scheduled) | **~25** |
| **Worst-case no-management coincident** | Cold-snap morning + EVs still finishing + cooking + gaming + dryer | **~55** |

Realistic managed peak: **25–35 kW**. Worst-case unmanaged: **~55 kW**.

## Service-panel sizing

| Service size | Continuous capacity (80% rule) | Notes |
|---|---|---|
| 200 A / 240 V | 38.4 kW | Standard residential. **Insufficient** for managed peak. |
| 320 A / 240 V (320 A meter, dual 200 A) | 61 kW | Adequate for managed peak; widely available. |
| 400 A / 240 V | 76.8 kW | Comfortable margin; preferred. |
| 600 A / 240 V | 115 kW | Overkill for residence; commercial-grade. |

**Recommendation**: **400 A service** with **load management on top**, OR **200 A service + aggressive load-shedding controller** (SPAN Smart Panel, Lumin LM ECO, Schneider Square D Energy Center, Emporia Vue + smart contactors).

The load-shedding-controller path is *cheaper* but introduces a single point of management failure. For self-sufficiency, **400 A service is preferred** because it tolerates an unmanaged worst-case without tripping, and the load shedder becomes additive optimization rather than load-bearing.

### Subpanel topology suggestion

- **Main 400 A** at meter.
- **120 A subpanel: gaming room** (12 PCs + dedicated mini-split + ventilation). Lets the gaming room be metered, scheduled, and load-shed as a unit.
- **80 A subpanel: garage / EVs** (two EVSEs + workshop). EV scheduling on this subpanel.
- **100 A subpanel: HVAC + DHW** (two heat-pump condensers + two water heaters). Critical-load subpanel — wired through the battery system so it stays up during grid outages.
- **100 A subpanel: kitchen / laundry / general** (range, dryer, dishwasher, refrigeration, lighting, plug loads).

This topology makes per-system metering trivial (clamp ammeters on each subpanel feeder) and aligns with battery critical-load wiring — the HVAC + DHW subpanel stays on battery, the gaming and EV subpanels load-shed first during outage.

## Sources

- [EIA Residential Energy Consumption Survey 2020](https://www.eia.gov/consumption/residential/data/2020/) — end-use benchmarks.
- [NREL ResStock — Climate Zone 5B residential energy modeling](https://resstock.nrel.gov/) — per-end-use kWh/sq-ft.
- [NEC Article 220 — Load Calculations](https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70) — service-sizing methodology.
- [SPAN Smart Panel](https://www.span.io/), [Lumin LM ECO](https://www.luminsmart.com/), [Schneider Square D Energy Center](https://www.se.com/us/en/work/products/residential-and-small-business/wiser-energy/) — load-shedding products.
