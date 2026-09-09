
# Lighting + Plug Loads (non-gaming)

This file covers everything that's *not* HVAC, hot water, kitchen, gaming PCs, or EVs. The categories here are individually small but collectively non-trivial (~2,500–4,000 kWh/yr) and form the always-on baseline that runs through every night.

## Lighting

6000 sq ft assumed fully LED. EIA RECS shows lighting at ~5–10% of total household electricity in pre-LED homes; current LED conversion drops this to ~3–5%, but absolute kWh scales with floor area and on-hours.

Estimate: 6000 sq ft × ~0.15 W/sq ft connected lighting load (modern LED at typical density) = ~900 W connected. Average duty cycle ~15% (early morning + evening): 900 × 0.15 × 24 × 365 = **~1,180 kWh/yr**.

Cross-check: [DOE 2020 LED Adoption Report](https://www.energy.gov/eere/ssl/2020-led-adoption-report) lists ~1.5–2.5 kWh/sq-ft/yr for residential lighting at full LED conversion in larger homes. 6000 × 0.2 ≈ 1,200.

**Planning value: 1,200 kWh/yr.** Peak: ~1.0 kW with every light on (rare; ~300 W typical).

### What pushes it
- High-CRI / theatrical / accent lighting (track lights at 30–60 W per head) can multiply by 2–3×.
- Smart bulbs sit at ~0.5 W standby each — 100 smart bulbs = 50 W continuous = 440 kWh/yr in vampire load.
- Skylights / large south windows reduce daytime lighting.

## Networking, servers, telecom

Always-on:
- Router + switches + Wi-Fi APs (3): ~60 W continuous = 525 kWh/yr.
- ONT / modem: 15 W = 130 kWh/yr.
- NAS (4-bay Synology / TrueNAS): 50 W average = 440 kWh/yr.
- Home automation hub(s) (Home Assistant, Hubitat, etc.): 15 W = 130 kWh/yr.
- VoIP base, cameras (4 PoE @ 5 W each + NVR @ 25 W): 70 W = 615 kWh/yr.

**Planning value: 1,800 kWh/yr.** Peak: ~250 W. This load runs 8,760 hr/yr and provides zero solar curtailment opportunity — it's the floor of the daily demand curve.

## TVs, audio, displays (non-gaming-room)

- 1–2 large TVs (65"+ OLED, ~120 W on, ~0.5 W standby): 4 hr/day on × 120 W + 20 hr standby × 0.5 = 0.49 kWh/day per TV × 365 = 180 kWh/yr × 2 = 360 kWh.
- Soundbar / AVR / subwoofer cluster: 50 W on × 4 hr + 5 W standby × 20 hr = 0.3 kWh/day = 110 kWh/yr.
- Streaming boxes, Chromecasts, etc.: 5 W × 24 hr × 3 units = ~130 kWh/yr.

**Planning value: 700 kWh/yr.** Peak: ~500 W coincident.

## Phone / device charging, small electronics

20+ chargers per household typical. Smartphones, tablets, laptops (non-gaming), e-readers, smartwatches, headphones, vacuums (Roomba ~30 Wh/cycle × 365 ≈ 11 kWh/yr but the dock idles at 3 W = 26 kWh/yr).

**Planning value: 400 kWh/yr.** Peak: ~600 W transient.

## Garage, workshop, misc motors

- Garage door openers (2): 0.5 kWh/yr each in use + 4 W standby × 24 × 365 = 35 kWh/yr × 2 = 70 kWh.
- Shop vac, air compressor, occasional power tools: ~150 kWh/yr.
- Sump pump (if basement / Provo soil, may not apply): 100–300 kWh/yr.
- Bathroom exhaust fans, range hood (light use), whole-house fan: 100 kWh/yr.

**Planning value: 500 kWh/yr** (assumes no major workshop). Flag to Alan: a serious workshop with welder, table saw, dust collector, kiln, etc. can add 500–3,000 kWh/yr depending on hours.

## Outdoor lighting + landscape

LED yard lights, porch lights on photocell (4 fixtures × 10 W × 12 hr nightly avg = 175 kWh/yr), landscape low-voltage strings, holiday lights seasonal.

**Planning value: 300 kWh/yr.**

## Subtotal (always assumed)

| Load | Annual kWh | Peak kW |
|---|---|---|
| Lighting | 1,200 | 1.0 |
| Networking / servers / cameras | 1,800 | 0.25 |
| TVs / audio | 700 | 0.5 |
| Phone / device charging | 400 | 0.6 |
| Garage / workshop / motors | 500 | 1.5 (transient) |
| Outdoor / landscape lighting | 300 | 0.2 |
| **Subtotal** | **4,900** | **~3 kW typical evening** |

## Flag-loads — ask Alan to confirm

These are individually large enough that omitting one materially changes the system size. Don't assume; ask.

### Swimming pool / hot tub

- **Pool pump** (1.5 HP variable-speed, 4–8 hr/day): 1,500–3,000 kWh/yr.
- **Pool heater** if electric (resistance or heat pump): 3,000–8,000+ kWh/yr — easily doubles whole-house demand.
- **Hot tub** (240 V, ~6 kW heater, well-insulated cover): 2,500–4,500 kWh/yr year-round; up to 6,000 if poorly insulated or used heavily in winter.
- **Hot tub on solar dump**: if heater is resistance and can be relay-controlled, the hot tub is one of the best solar dump loads available.

**Recommendation**: if hot tub exists or is planned, **budget 3,500 kWh/yr** and add it to the planning total. Pool: ask Alan whether it's in scope (Apple Ave is not known to have a pool).

### Home lab / always-on servers beyond networking

If Alan runs a dedicated home lab (rack of servers, K8s cluster, AI inference rig), that's a separate load on the order of:
- Mid-tier rack (3 nodes, 30U cabinet, mid-power CPU + 2× consumer GPUs): 800–1,500 W continuous = **7,000–13,000 kWh/yr**.
- High-end inference rig (4× RTX 4090 always on): 1,500–2,500 W continuous = **13,000–22,000 kWh/yr**.

This dwarfs everything else and would dominate sizing. **Critical to confirm**: is there a home lab? If yes, what's the continuous draw? If unconfirmed, plan for ~2,000 kWh/yr placeholder buffer.

### Well water pump

- 1 HP submersible well pump cycling 4–8 hr/day: 500–1,500 kWh/yr.
- **Provo is on Provo City water** ([Provo Water Resources](https://www.provo.org/departments/water-resources)) — most addresses are municipal, but verify with Alan. If well, add 1,000 kWh/yr planning value.

### Irrigation pump

Surface irrigation booster pump (Provo has secondary irrigation systems on many parcels): 1.5 HP × 3 hr/day × 180 day season = ~600 kWh/yr if present.

### EV charger standby

Both wall-mounted L2 chargers (Wallbox, Tesla Wall Connector, Emporia EVSE) draw ~3–8 W idle = ~30–70 kWh/yr each = 100 kWh combined. Negligible but real.

### Whole-house humidifier / dehumidifier

Provo air is dry — many homes run whole-house humidifiers in winter (~20–40 W fan + 250–500 W steam unit if powered; bypass models are passive). If steam humidifier: ~600–1,500 kWh/yr in heating season.

## Summary

| Bucket | Annual kWh (planning) |
|---|---|
| Lighting + always-on plug loads (confirmed) | 4,900 |
| Flag-loads (depend on Alan's house): hot tub | +3,500 if present |
| Flag-loads: home lab | +2,000 placeholder, much higher if confirmed |
| Flag-loads: well / irrigation pump | +1,000 if well or pump-fed irrigation |
| Flag-loads: humidifier | +800 if steam type |

**Planning value (excluding flag-loads): 5,000 kWh/yr.** Re-asks to put in front of Alan before finalizing: hot tub, home lab, well/irrigation, humidifier. Any "yes" materially changes system sizing.
