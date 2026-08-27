---
id: 6507976f-6de1-5c5b-8453-d42dbe1cfe3c
page-type-slug: finding
title: "Confidence sorts but the answer gates"
domain-slug: domain/semantic-categorization
---

# Claim

An agent's confidence sorts its answers but cannot gate them; what it named is the far stronger signal, and no recall figure shows this.

# Evidence

Over 600 held-out transactions, confidence ordered correctly and coarsely: `high` was right 77.9% (113/145), `medium` 34.4% (75/218), `low` 18.1% (43/237). So the agent does know roughly when it does not know.

But 77.9% cannot gate anything. Applying every `high` answer without asking would settle 145 transactions and bury 32 wrong categories where nobody looks again.

What the confidence hides, the answer reveals. Splitting the same `high` answers by what the agent actually said gives 100% on `Paychecks` (18/18) and `Utilities` (18/18), and 0% on `Auto` (0/15). The agent said `Auto` fifteen times, at the confidence level meaning settled beyond doubt, and was wrong every single time — this household books those as `Transportation`.

That 0-of-15 is invisible in every per-category accuracy figure in the report, because those are keyed on the standing category. At the moment of deciding, nobody knows the standing category; what a caller holds is the answer. So a gate has to be built on precision — given it said X, how often is X true — and the two come apart hardest exactly where a gate would be most tempting.

A single trust threshold on confidence is therefore the wrong instrument shape. The gate is a list of names the agent is allowed to be believed about.
