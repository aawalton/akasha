
# Total Cost Stack

Three scenarios (low / nominal / high demand) × pre-ITC and post-ITC outcomes. Numbers are 2026 Utah retail competitive-bid targets; verify against actual bids.

## $/W input assumption

Utah median for typical residential is **$2.65/W cash** ([pricing/total-retail.md](../pricing/total-retail.book-chapter.md)). Two adjustments for this project:

1. **Volume discount**: a 49 kWp system is ~4× the median 12.88 kW Utah size. Fixed soft costs (sales, permitting, design, mobilization) amortize across more watts. Per [pricing/levers.md](../pricing/levers.book-chapter.md) (medium-impact lever): typical $/W drops $0.05–$0.15/W as system size grows. At 49 kWp, expect roughly $0.20–$0.25/W below the median.
2. **Multi-plane / supplement complexity premium**: per [pricing/levers.md](../pricing/levers.book-chapter.md), multi-plane roofs and ground-mount/pergola supplements add complexity. Mostly offsets the volume discount.

Net blended $/W: **$2.40/W** at 49 kWp planning case. Sensitivity: $2.20 (best-case clean install) to $2.60 (heavy supplement structures, premium modules).

## Battery $/kWh input assumption

**$1,000/kWh installed** for a 30–40 kWh bank in 2026 Utah, per [pricing/components.md](../pricing/components.book-chapter.md#battery--separate-line-item). Sensitivity: $880 (Tesla competitive bid) to $1,200 (Enphase-stack premium).

## Service-panel + electrical $/$ inputs

| Line | $ |
|---|---|
| 400 A main + meter swap + service-entry conductors | $6,000 |
| 4 subpanels (gaming 120 A, EV 80 A, HVAC 100 A, kitchen 100 A) | $3,000 |
| Load monitoring (Emporia Vue with shunts) | $700 |
| EV-side load-managed EVSEs (Wallbox or Tesla, scheduling logic) | $300 add'l for software-managed pair |
| Two L2 EVSEs (48 A, hardwired, installed) | $4,000 |
| **Subtotal — electrical-side work** | **$14,000** |

Per [pricing/components.md](../pricing/components.book-chapter.md#service-panel-upgrade-conditional-add) the 200 A → upgrade is typically $2k–$5k; the 200 A → 400 A is more, hence the $6k line.

## Cost table — three scenarios

| Line | Low (32 kWp / 27 kWh) | Nominal (49 kWp / 40 kWh) | High (58 kWp / 40 kWh) |
|---|---|---|---|
| PV @ $2.40/W | $76,800 | $117,600 | $139,200 |
| Battery @ $1,000/kWh | $27,000 | $40,000 | $40,000 |
| 400 A service + subpanels + monitoring | $9,700 | $9,700 | $9,700 |
| Two L2 EVSEs | $4,000 | $4,000 | $4,000 |
| Supplement structure (pergola or ground-mount) at $1.50/W premium on 15 kWp portion | $0 | $22,500 | $34,500 |
| Contingency (8%) | $9,400 | $15,500 | $18,200 |
| **Pre-ITC total** | **~$127,000** | **~$209,000** | **~$246,000** |
| Post-ITC @ 30% | **~$89,000** | **~$146,000** | **~$172,000** |
| Post-ITC @ 0% (ITC expired) | $127,000 | $209,000 | $246,000 |

(The summary in the top-level [sizing.md](../sizing.book-chapter.md) used a tighter cost table at $172k pre-ITC — that version assumed no supplement structure and a smaller contingency. The fuller table here, with supplement and 8% contingency, is the more defensible planning number. Both are valid bid-anchor brackets; the bid stage will resolve which one fits the measured roof.)

## ITC status uncertainty — explicit

Per [pricing.md](../pricing.book-chapter.md): Trump's "One Big Beautiful Bill" (July 2025) **phased out the residential ITC for cash/loan systems installed after Dec 31, 2025** ([Utah Office of Energy Development](https://energy.utah.gov/homepage/tax-credits/renewable-energy-systems-tax-credit/)). For a 2026 installation, assume **no federal credit** unless the system is under a TPO/lease structure that retains commercial-side ITC.

Implications:

- **Plan against the pre-ITC number** as the budget. Treat any restored ITC as upside.
- **Don't make the decision contingent on ITC.** A cash-and-loan-eligible ITC restoration is a political contingency, not a financial assumption to bake in.
- **Verify currency at bid stage.** This number could shift before a 2026 install lands.
- **If ITC is restored mid-process**, the system gross is unchanged; only the net-of-credit changes. Bid-stage decisions on size and topology are not ITC-sensitive at this scale.

## Per-kWh delivered cost (25-year)

Useful cross-check against simply paying Provo Power retail for 25 years:

| Scenario | 25-yr energy delivered (kWh) | All-in pre-ITC | $/kWh delivered (no ITC) | $/kWh delivered (30% ITC) |
|---|---|---|---|---|
| Low | 32 kWp × 1,500 × 22.5 (degradation-aware) ≈ 1.08 M | $127,000 | $0.118 | $0.082 |
| Nominal | 49 × 1,500 × 22.5 ≈ 1.65 M | $209,000 | $0.127 | $0.089 |
| High | 58 × 1,500 × 22.5 ≈ 1.96 M | $246,000 | $0.126 | $0.088 |

Provo Power residential retail (Schedule 1) is currently $0.07–$0.13/kWh across its three tiers, with the marginal rate at $0.13/kWh above 1,000 kWh/mo (verify; rate schedules update yearly). The nominal-case all-in $/kWh delivered without ITC is roughly at parity with retail electricity. With ITC the system is a clear win on price; without ITC it's a wash on price and a win on resilience + self-sufficiency.

Two things this $/kWh number does *not* include:

- **Rate escalation**: utility retail rates have risen ~3–5%/yr historically. PV cost is fixed at signing; the gap widens over 25 years.
- **Export-credit value loss**: under Provo's avoided-cost export credit (Schedule 1.1) the credit-per-exported-kWh is below retail. A system that overproduces in summer exports kWh at a lower rate than it offsets in winter. The "annual net-zero" target should be kWh-balanced, not credit-balanced; if Provo's program penalizes net-zero kWh balance with a credit haircut, the system needs slight oversizing.

## What moves the cost most

Ranked by leverage on the nominal $209,000 pre-ITC:

1. **Supplement structure necessity** — if measured roof area fits 49 kWp directly, the $22,500 pergola/ground-mount line goes to zero. **−$22,500 (−11%)**.
2. **$/W blended outcome** — bid spread $2.20–$2.60. Each $0.10/W is **±$5,000** on the PV portion alone.
3. **Envelope retrofit shift** — moving from nominal to low demand saves 17 kWp of PV plus the supplement structure. **−$80,000+**, but the retrofit itself costs $30k–$80k.
4. **Battery scope** — dropping from 40 kWh to 27 kWh saves **$13,000**. Reduces outage ride-through and daily-shift headroom.
5. **ITC restoration** — **−$63,000** on the nominal post-ITC number if it lands. Out of buyer control.
6. **Service-panel scope** — Path A (200 A + SPAN) instead of Path C (400 A) saves $4,000 but introduces the management-as-single-point-of-failure trade per [topology.md](topology.book-chapter.md).

## Carry-forward to [recommendation.md](recommendation.book-chapter.md)

The planning case anchors at **~$200k pre-ITC / ~$140k post-ITC** under the conservative assumption that one supplement structure is needed. The next file ranks the sensitivity levers and proposes the single planning case the next iteration evaluates bids against.
