
# Ranking criterion

How I order the audit. The criterion that decides which dependency I remediate first.

## Definition

For each audited dependency:

```
risk-adjusted exposure = criticality × enshittification likelihood × switching cost
```

Top priority = high on all three. An item that's critical to my life, currently being enshittified, and expensive to switch is worth more remediation effort than an item that's only one of those.

The factors are multiplicative, not additive. A near-zero on any one factor drops the item out of the top tier:

- Critical + enshittifying + trivial to switch → not urgent. Just switch.
- Critical + trusted + expensive to switch → not urgent. Stay.
- Non-critical + enshittifying + expensive to switch → annoying but not urgent.

The top of the queue is items that score high on all three.

## Factor: criticality

How essential the dependency is to my life. Qualitative bands acceptable for v1:

- **Life-critical.** Failure means immediate threat to physical safety, ability to earn, or ability to live in current home. Examples: utilities, healthcare for active conditions, income source.
- **High.** Failure means significant disruption — weeks-to-months of work to recover. Examples: banking, primary transportation, primary communications.
- **Medium.** Failure means meaningful disruption but workable in weeks. Examples: secondary services, recurring purchases I depend on but could replace.
- **Low.** Failure is an inconvenience. Examples: subscriptions I'd miss but could live without.

The criticality score is independent of the organization providing the service. It measures my dependence on the **category**, not on the specific provider.

## Factor: enshittification likelihood

The probability the organization is currently degrading or will degrade in a horizon I care about. Qualitative bands:

- **Already enshittifying.** Visible degradation already happening. Currently failing the trust criterion.
- **High likelihood.** Pressure signals present (recent ownership change, activist investors, market consolidation), trust criterion uncertain, behavior trending negative.
- **Medium likelihood.** No specific signals, but the organization has not earned trust under [trust-criterion.md](trust-criterion.book-chapter.md). Default for unknown / unassessed organizations under current conditions.
- **Low likelihood.** Organization meets the trust criterion — decades of duration plus demonstrated resistance under pressure. Costco-tier.

Default for unassessed organizations is medium-or-higher because the current environment is pressuring every organization simultaneously (see [trust-criterion.md → recent behavior is highly diagnostic](trust-criterion.book-chapter.md#recent-behavior-is-highly-diagnostic)). Trust earned by absence-of-evidence is not earned.

## Factor: switching cost

How expensive remediation is. Includes money, time, learning, and downstream coordination cost. Qualitative bands:

- **Very high.** Months of work or significant capital. Examples: relocating, replacing a primary income source, replacing a heavily-customized software stack, replacing a legal/professional relationship with deep institutional knowledge of my situation.
- **High.** Weeks of work or meaningful capital. Examples: replacing a bank with all its automated payments, replacing primary internet, replacing health insurance.
- **Medium.** Days of work. Examples: replacing a streaming service, moving a recurring subscription.
- **Low.** Hours or minutes. Examples: replacing a grocery store, replacing a brand of household good.

Switching cost is not the same as criticality. A trivial dependency can have high switching cost (a niche tool with my data locked in). A critical dependency can have low switching cost (a utility with a clean alternative).

Switching cost also includes the cost of **the alternative being viable** — see [alternatives.md → viability](alternatives.book-chapter.md). If the only alternative is itself untrustworthy, the switching cost is effectively infinite for this framework's purposes.

## How to compute it (v1)

For v1, qualitative bands × multiplication. Each factor gets a 1-4 score (Low / Medium / High / Critical-or-Very-High), the three multiply to a 1-64 risk-adjusted exposure score. Sort the audit descending by score. Top of the list is where remediation starts.

Numeric refinement deferred. Qualitative bands are sufficient to order the audit by the time the audit is populated.

## What this criterion buys

Three things:

1. **Forces prioritization.** I can't remediate everything at once. The criterion picks the order.
2. **Surfaces invisible-but-critical items.** A high-criticality + high-enshittification + high-switching-cost item that I've been ignoring because remediation is hard is exactly the kind of thing that should be at the top of the list. The criterion makes it visible.
3. **Demotes false alarms.** A subscription that annoys me but is non-critical and easy to switch is not worth remediation effort beyond the trivial — switch it and move on.

## What this criterion does not do

- **It does not pick the alternative.** Once an item is at the top of the queue, [alternatives.md](alternatives.book-chapter.md) is the framework for choosing what to switch to. The ranking criterion only decides what to attack next.
- **It does not consider cascading dependencies directly.** If switching A also requires switching B, the cascading-cost shows up in A's switching-cost factor. A separate cascading-dependency mechanism is flagged as a future framework refinement.
- **It does not weight emotional cost.** The framework is deliberately mechanical. Emotional cost (the disruption of changing a long-running relationship, the cost of learning something new) gets folded into switching cost rather than being its own factor.

## Applications

- The plan is built by sorting the populated audit by this criterion and proposing remediation in order.
- Progress re-runs the criterion when conditions change — an organization that newly enters enshittification gets re-ranked.
