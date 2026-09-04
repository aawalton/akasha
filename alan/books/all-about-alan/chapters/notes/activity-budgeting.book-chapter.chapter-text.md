
# Activity budgeting

The decision rule for what an activity costs and whether to do it. Inputs: the activity's [base tier](stress-capacity-formula.book-chapter.md#cost-base-tiers-by-interaction-type), Alan's current [Safety](safety.book-chapter.md) state, and his baseline distribution (mean and one-sigma band). Output: free / tolerable / intolerable, and separately whether the activity is initiate-able once or on a recurring basis.

## Status thresholds

For a single instance of an activity at `tier`, given `current_state` (the Safety reading right now):

| Status | Condition |
| --- | --- |
| Free | `current_state ≥ tier + 1` |
| Tolerable | `tier ≤ current_state < tier + 1` |
| Intolerable | `current_state < tier` |

Free means the cost multiplier is 0 — the activity can run continuously without drawing the resource. Tolerable means the multiplier is between 1x (at the base tier) and 0x (a full level above) — the activity costs something but is sustainable for normal-length engagements. Intolerable means the multiplier is at least 1.5x — the activity drains faster than Alan can absorb, and engaging it now produces damage that has to be paid back from elsewhere.

The thresholds map directly to the [stress-capacity-formula multiplier table](stress-capacity-formula.book-chapter.md): the +1 cliff to 0x is where free starts; the 1x crossing at `current_state = tier` is where tolerable starts; below `tier`, the multiplier climbs through 1.5x, 2x, 3x.

## One-time vs. recurring initiation

Initiating an activity Alan wouldn't otherwise reach is a separate decision from whether a current engagement is free / tolerable / intolerable. Two distinct gates:

| Mode | Condition |
| --- | --- |
| One-time initiate-able | `tier + 1 ≤ current_state` |
| Recurring initiate-able | `tier + 1 ≤ baseline_low` |

One-time uses the instantaneous reading. A current_state above tier+1 means the activity is free *right now* — Alan can initiate it once, in this moment, without paying.

Recurring uses the one-sigma low of the baseline distribution. To commit to doing the activity regularly, the free-condition has to hold across the variance distribution — not just at the mean, but down to baseline_low. Otherwise the commitment fires on bad days and turns intolerable.

The asymmetry: one-time is opportunistic (take the win while the moment lasts); recurring is structural (the activity has to be free across the whole expected range of current_state, not just on good days).

## Worked example — current envelope

Current baseline (as of 2026-05-11): mean 4.5, one-sigma band [4.0, 5.0]. Applied to the cost base tiers in [stress-capacity-formula.md](stress-capacity-formula.book-chapter.md#cost-base-tiers-by-interaction-type):

| Activity | Tier | Status at mean 4.5 |
| --- | --- | --- |
| Entertainment | 1 | Free |
| Programming | 2 | Free |
| Social interaction | 3 | Free |
| Conflict | 4 | Tolerable |
| Criticism | 5 | Intolerable |

One-time initiation caps at tier 3.5 typical (mean 4.5 satisfies `tier + 1 ≤ 4.5` for tier ≤ 3.5), reaching tier 4.0 on a +1σ moment (current_state = 5.0). Recurring initiation caps at tier 3.0 (baseline_low = 4.0 satisfies `tier + 1 ≤ 4.0` only for tier ≤ 3.0). At a -2σ moment (current_state = 3.5), one-time caps drop to tier 2.5.

The envelope is asymmetric: social (tier 3) is now both free at the mean *and* recurring-initiate-able, because the baseline_low (4.0) clears the tier+1 threshold. Conflict (tier 4) is tolerable at the mean but neither one-time nor recurring initiate-able — engaging it has to be involuntary, not chosen.

## Cross-references

- [stress-capacity-formula.md](stress-capacity-formula.book-chapter.md) — the cost multiplier table and base tiers the thresholds are derived from.
- [safety.md](safety.book-chapter.md) — the resource the rule reads as `current_state` and whose long-run distribution gives `baseline_low`.
- [autism-diagnostic-arc.md → Current capacity envelope](autism-diagnostic-arc.book-chapter.md#current-capacity-envelope) — the trajectory that brought the baseline to mean 4.5 / σ [4.0, 5.0].
- [volatility-governor.md](volatility-governor.book-chapter.md) — Rule 2 (*"I'm not allowed to commit to a recurring activity unless I can afford it at a one sigma low"*) is the verbal form of the recurring-initiation gate `tier + 1 ≤ baseline_low`.
