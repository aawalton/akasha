
# Stress-capacity formula

Compare current safety level to difficulty level of the social interaction.

- Social interactions start at level 3.
- +1 for conflict.
- +1 for criticism.
- +log₂(N) for group size, where N = number of people involved.
- Half-steps are measurable for partial or more extreme cases.

Multiplier table by safety/difficulty differential:

| Safety vs. difficulty | Multiplier |
|---|---|
| match | 1x |
| +0.5 (half step higher) | 0.5x |
| +1 (full step higher) | 0x |
| -0.5 (half step lower) | 1.5x |
| -1 (full step lower) | 2x |
| -1.5 (one and a half lower) | 3x |
| ... | each full level of difference is generally a 2x change |

Anchor: 1 hour at 1x multiplier = 1 stress-capacity hour.

## Cost base tiers (by interaction type)

The multiplier table extends beyond social interactions. Each interaction type has a *base tier* equal to the safety level (0-5 with half-steps; see [safety.md](safety.book-chapter.md)) at which the cost multiplier is 1x:

| Interaction type | Base tier |
|---|---|
| Entertainment | 1 |
| Programming | 2 |
| Social interaction | 3 |
| Conflict | 4 |
| Criticism | 5 |

When `current_safety_level = base_tier`, the multiplier is 1x. Off-base, apply the multiplier table above (each full level of difference is generally a 2x change, with rounding).

Practical sequence of multipliers in the local space around equal tier (with rounding) — reading from above-base to below-base:

`0 → 0.5 → 1 → 1.5 → 2 → 3 → 4 …`

## Half-step JND resolution

Half-step tier granularity (3.5, 4.5, etc.) is the **just-noticeable-difference resolution** of Alan's perception of the underlying load variable. The load itself is continuous; the scale is calibrated to his ability to discriminate levels along it. Half-steps are not a special unit — they are the finest distance Alan can reliably tell apart.

This closes the apparent disagreement between the two framings on this page:

- **Additive offsets** (+1 for conflict, +1 for criticism applied to the social base of 3).
- **Explicit base tiers** (conflict at 4, criticism at 5).

Both are *rasterizations of the same continuous variable at the JND*. They label the same points on the continuum from different directions; neither is the underlying quantity. They don't mechanically disagree on any specific case — both are simplifying surface forms.

The same rasterization explains why activities can have half-step base tiers (3.5, 4.5) when they fall between integer anchors: the underlying load is continuous, and Alan resolves it to the nearest half-step.

## The affordability rule: the pillar's job-change, the 1x cap, and the silent gauge

The [stress-capacity pillar](agent-harness.book-chapter.md#two-governors-on-two-budgets) and the [affordability rule](safety.book-chapter.md#safety-as-the-current-binding-constraint) ("don't do what you can't afford") are the same governor read two ways. Three findings sharpen how that governor runs now.

### The pillar changed jobs: triage → budgeting

The rule was impossible until Alan could *decline* his load (the [declinability precondition](employment-cessation.book-chapter.md#declinability-not-slack-was-the-precondition-for-the-affordability-rule); employment was the un-declinable, unaffordable load). That gate changed what kind of system the pillar is:

- **Under un-declinable load — triage.** The pillar managed damage he had no power to stop. He couldn't choose the spend, only ration the harm.
- **Now that load is refusable — budgeting / allocation.** The pillar allocates something he actually controls.

Same pillar, flipped from damage control to allocation. Alan confirmed: *"Yeah, pretty true."*

### The 1x cap — the quantitative anchor

The rule has a precise ceiling, denominated in the anchor unit above (1 hour at 1x = 1 stress-capacity hour):

> "Affordability means no more than a 1x cost, which means costing 1 capacity hour per clock hour. I can sustain that all day if I have to, and that's my ceiling, so most of most days is free."

The mechanism: affordability = at most 1x = 1 capacity-hour spent per clock-hour. 1x is sustainable all day, so it is the ceiling; even his hardest *sustainable* day only breaks even — it never drains. Therefore most of most days runs in surplus, in the black.

The contrast that makes this matter: he spent roughly 18 years at about 150% of what he could pay (the sustained ~50% deficit in [recovery-rates.md → surplus / deficit balance](recovery-rates.book-chapter.md#surplus--deficit-balance)), and now describes chronic surplus — most days below cost. The same 1x line is the *affordable* threshold on the [recovery ladder](recovery-ladder.book-chapter.md#affordable-vs-free--the-two-cost-states-each-rung-admits): affordable = no more than 1x; free = no longer counting the cost.

### The 20-year gauge has gone silent — the constraint retired the instrument

> "I actually haven't been measuring that pillar for a few weeks, since the affordability rule has been enough."

His most precise, longest-watched instrument — the Stress Level gauge, [level 5 / numeric, ~20 years](measurement-maturity.book-chapter.md#current-state) — has gone quiet. Not because the bottleneck vanished, but because the affordability rule keeps him far enough from the limit that the needle doesn't move. The constraint retired the instrument: the rule now runs **feedforward** (trusting the [cost model](#cost-base-tiers-by-interaction-type)) rather than sampling actuals against the gauge. The measurement-maturity angle — an instrument falling idle while a cheaper governor holds the line — is in [measurement-maturity.md → an instrument can fall idle](measurement-maturity.book-chapter.md#an-instrument-can-fall-idle-when-a-cheaper-governor-holds-the-line).

## Cross-references

- [perfection-is-safe.md](perfection-is-safe.book-chapter.md) — stress capacity is the **currency of failure**: the Emotional Archaeology dig found that what failure spends is stress capacity (not worth), which is why commitment-discipline is a protective governor priced by this cost model rather than an honor code.
- [safety.md](safety.book-chapter.md) — the Safety level that drives the cost multiplier in the tables above.
- [safety/extinction-model.md](safety/extinction-model.book-chapter.md) — the same Safety line read across many random social draws: an adverse experience is "safe" when it lands below the current Safety level, so raising the center (the cost multiplier's input) is what drops the breach rate the criticism alarm extinguishes against.
- [dynamic-feedback.md](dynamic-feedback.book-chapter.md) — the feedback loop this table drives: as stress-capacity surplus falls, safety level drops, which raises the multiplier here, accelerating the decline.
