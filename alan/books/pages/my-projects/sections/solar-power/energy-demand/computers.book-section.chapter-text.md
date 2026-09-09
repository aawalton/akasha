
# 12 Gaming Computers

This is the singular load that distinguishes this site from any normal residence. 12 high-end builds, treated as a near-continuous load when active, year-round, no seasonal modulation. The math below brackets a 2× range from moderate to heavy usage; **plan for the heavy end**.

## Per-system power budget

High-end build, current generation (2025–2026):

| Component | Idle | Light load (browsing, video) | Gaming load | Stress / sustained max |
|---|---|---|---|---|
| GPU (RTX 4090 / 5090 / Radeon 7900 XTX) | 20 W | 60 W | 400–575 W | 575 W (5090 TBP) |
| CPU (Ryzen 9 7950X / Core i9-14900K) | 25 W | 50 W | 150–230 W | 253 W (i9 PL2) |
| Motherboard / VRM / RAM / NVMe | 25 W | 30 W | 50 W | 60 W |
| AIO / fans | 10 W | 12 W | 25 W | 30 W |
| 3× 1440p/4K monitors @ 40 W each | 120 W | 120 W | 120 W | 150 W |
| Peripherals (keyboard backlight, mouse, headset DAC, USB hub, speakers, microphone, capture card) | 10 W | 15 W | 25 W | 30 W |
| PSU loss (90% efficient at typical load) | ~22 W | ~32 W | ~85 W | ~110 W |
| **System total (at wall)** | **~230 W** | **~320 W** | **~880 W** | **~1,200 W** |

Sources: [TechPowerUp GPU Database — RTX 5090 review](https://www.techpowerup.com/review/nvidia-geforce-rtx-5090-founders-edition/41.html) for 575 W TBP and gaming-load measurements; [Tom's Hardware Core i9-14900K power testing](https://www.tomshardware.com/news/intel-core-i9-14900k-review) for sustained PL2 readings; monitor measurements from [RTINGS gaming monitor power tests](https://www.rtings.com/monitor/tests/inputs/power-consumption).

**Sleep / standby**: ~5–15 W per system (modern S3 sleep with WoL). 12 systems sleeping = ~120 W = ~1,050 kWh/yr just for vampire load.

## Daily energy per system — scenarios

### Moderate use (8 hours/day at ~500 W average)

500 W average reflects a mix of: 4 hr gaming at 800 W + 4 hr light load at 300 W + 16 hr at sleep ~10 W:

- (4 × 800) + (4 × 300) + (16 × 10) = 3,200 + 1,200 + 160 = **4,560 Wh/day per system**.
- Per system per year: 4,560 × 365 = **~1,665 kWh/yr**.
- **12 systems × 1,665 = ~20,000 kWh/yr** (corrects the loose "17,500" rule-of-thumb from the brief; more rigorous accounting lands higher).

### Heavy use (12 hours/day at ~600 W average)

12 hr active includes 6 hr gaming + 6 hr productivity / streaming / training workloads:

- (6 × 880) + (6 × 400) + (12 × 12) = 5,280 + 2,400 + 144 = **7,824 Wh/day per system**.
- Per system per year: 7,824 × 365 = **~2,855 kWh/yr**.
- **12 systems × 2,855 = ~34,000 kWh/yr**.

### Continuous training / mining-style use (theoretical worst case)

Some builds may be left rendering, training models, or transcoding overnight:
- 20 hr/day at ~900 W + 4 hr light at 300 W = 18,000 + 1,200 = **19,200 Wh/day per system**.
- 12 systems × 19,200 × 365 ÷ 1000 = **~84,000 kWh/yr** (one of these alone is comparable to the entire rest of the house).

Flag to Alan: if any subset of the 12 are intended for sustained GPU compute (LLM inference, Blender renders, crypto, scientific compute), the load on those systems isn't 8 hr/day at 500 W — it's 24/7 at full GPU TDP, and that subset needs to be itemized.

## Planning value

Bias toward higher demand:

| Scenario | Annual kWh (12 systems) | Daily kWh |
|---|---|---|
| Moderate | 20,000 | 55 |
| Heavy (planning) | **34,000** | **93** |
| Mixed (4 of 12 are training-rigs, rest moderate) | ~55,000 | 150 |

**Planning value used in totals.md: 30,000 kWh/yr** (between moderate and heavy; assumes 12 hr/day average across the cluster but not all simultaneously at peak gaming). Round up to 34,000 if heavy is more accurate.

## Peak coincident draw

All 12 systems gaming at full load + monitors on:

- 12 × 880 W = **10.6 kW**.
- Worst-case (all systems at sustained max): 12 × 1,200 W = **14.4 kW**.

Stress events: launching a multi-system raid, all 12 running graphics benchmarks, or a LAN party where every rig is at full tilt — plan for **14 kW peak**.

This is constant year-round and runs through the night frequently. Implications:

1. **Inverter sizing**: any single-string inverter handling the gaming room circuit must sustain 14 kW continuous on those circuits. Most residential hybrid inverters (Tesla PW3, Enphase IQ8M, SolArk 15K) handle this, but it must be designed for.
2. **Service-panel wiring**: the gaming room needs at least 2× 20A 120V circuits *or* a dedicated 240V subpanel. 14 kW @ 240 V = 58 A. A 60–80 A subpanel is appropriate.
3. **Cooling load**: 14 kW electrical → 14 kW thermal dumped into the room ≈ 48,000 Btu/h. A dedicated 4–5 ton mini-split + active exhaust ventilation for the gaming room is non-negotiable.
4. **Battery sizing**: a 14 kW continuous load eats 100 kWh of battery in ~7 hours. If gaming runs into a low-PV winter night, battery autonomy is shortened materially.

## Monthly distribution

Flat. No seasonality. The same ~2,500–2,800 kWh hits the system every month, January and July alike.

| Month | kWh (planning, 30,000/yr) |
|---|---|
| All 12 months | 2,500 each |

This is the key thermodynamic asymmetry: solar production swings ~2× summer-to-winter in Provo, but this load doesn't. **A typical-house annual-net-zero PV sizing leaves gaming demand stranded in winter.** Either oversize PV, battery through, or load-shed gaming during cold-snap weeks.

## What pushes the number up or down

- **GPU generation**: an RTX 5090 system draws ~30% more gaming power than an RTX 4080 system. New-gen upgrade cycle adds 10–15% to the planning number every 2 years.
- **Headset / VR**: a VR headset at the desk adds ~30 W on top of the system; a sustained Quest 3 + PC link session pulls another ~50 W from the PC.
- **Mining / training**: any system running 24/7 GPU compute moves from ~1,700 kWh/yr to ~5,000 kWh/yr — that one system *triples*.
- **Streaming**: dedicated streaming PC + capture card + multiple monitors + lights add ~100 W and 8–12 hr/day = ~330 kWh/yr per streamer.
- **Sleep behavior**: systems left running idle 24/7 instead of sleeping adds 12 × (220 − 12) W × 24 × 365 = ~22,000 kWh/yr of waste. Aggressive sleep policy is the single biggest reducer.
- **Undervolting / power limits**: capping GPU at 70% power preserves ~95% of gaming performance and cuts ~25% of GPU energy. A self-sufficiency-oriented configuration enables this.
- **Number of monitors**: each additional 4K monitor at 40–60 W idle adds ~150–500 kWh/yr per workstation depending on duty cycle.

## Year-round flat profile — implications for solar

Most household loads have seasonal anti-correlation with PV production (heat is winter-heavy, cooling is summer-heavy). The 12 gaming PCs have **zero correlation** with the solar curve. They run when they run, often peaking in evening hours when PV is gone.

This load category single-handedly justifies a battery system. Without batteries, ~70% of gaming-PC kWh would have to come from grid (or generator) because the load occurs outside daylight hours. With batteries, summer surplus charges by 6 PM and discharges into the gaming load through midnight, achieving self-consumption ratios approaching 100% for half the year.

In winter, even with batteries, this load is what runs the battery dry overnight before PV resumes the next morning. Generator runtime is dominated by gaming + heat + DHW persisting through a 16-hour low-PV winter day.
