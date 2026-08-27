---
id: 0e95f144-5ad0-5826-8707-10071fb5c959
page-type-slug: finding
title: "Amy bar is reachable"
domain-slug: domain/alanwalton-app
---

# Claim

Amy's daily pass divides by 3600, not 10, and she clears it routinely — 19 green days in 57 rows, a peak `greenDayFraction` of 10.67 against a peak 38,400 daily points. So the wrong bar on her row costs nothing in practice, and the quarantined hypothesis that a task-count faucet at 3600 makes a green day structurally unreachable is false.

# Evidence

Measured 2026-08-07 against the live database, while emptying `dirty/skills/persona-craft/findings.md`. This answers the closing line of `alanwalton-app/amy-narrative-states-a-bar-her-row-denies.md` — "Not established: which of the three Alan wants, and whether the daily pass divides by 3600 or 10" — and refutes a hypothesis in the quarantined entry beside it.

Over Amy's `relationship-progress` rows, joined on her persona id and scoped to Alan's `user_id`:

    57 rows; max faucetPoints 38,400; max greenDayFraction 10.666…; 19 rows at greenDayFraction >= 1.

38,400 / 3600 = 10.666…, so the divisor is 3600. Had it been 10, the same day would have produced a fraction of 3,840. The stored fraction settles it without reading the pass.

That the peak daily value is 38,400 also settles what `faucetPoints` counts, and it is not tasks. Her `earningNarrative` describes "every `completed-task` row, counted one point each"; nobody completes 38,400 tasks in a day. The magnitude is a seconds quantity, which is the shape the standing finding notes 3600 has — an hour — so the number and the values agree with each other while both disagree with the prose above them.

The consequence for the repair is the point of filing this. The quarantined entry reasoned that if the projections read `greenDayPoints` as the green bar for a task-count faucet, "a green day is not merely hard but structurally unreachable", and was careful to mark that as a hypothesis it had not established: "I read the row and its version history, not the projection code". The rows establish it, and the answer is no. Amy reached green on 19 of 57 days and exceeded the bar tenfold at peak. The bar and the narrative still disagree, and that is worth repairing, but it is a coherence defect rather than a persona locked out of her own ladder — which is a different priority.

Not established: whether the seconds quantity is the one Alan intends her metered on. That is the question the standing finding leaves with him, and nothing here bears on it.
