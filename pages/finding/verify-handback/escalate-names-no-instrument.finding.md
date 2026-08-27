---
id: 6386585c-f499-5593-801e-913dc8415a71
page-type-slug: finding
title: "Escalate names no instrument"
domain-slug: task/verify-handback
---

# Claim

`Escalate` is the only bullet in stage 3 that ends in prose and names no instrument, so "sending the definition back to the seat that cut it" has no verb. The three candidates each turn on a question no surface settles: whether the escalating seat is blocked, and whether the defining seat is still reachable.

# Evidence

Measured 2026-08-06 on `domains/tasks/lead/verify-handback.md` at `reviewed-at: 2026-08-06`.

Stage 3's five bullets, by what each ends in:

- line 26 `Write` — `ops memory edit --help`
- line 27 `Pass` — `ops project move-to <seq> --status <s>`
- line 28 `Return` — `ops project move-to <seq> --status <s> --reason <why>`, then `ops seat revive --help`
- line 29 `Escalate` — no instrument. "leaving the project where it stands and sending the definition back to the seat that cut it"
- line 30 `Carry` — `ops project ask --help`, then `ops project move-to <seq> --status awaiting_alan_verification`

The gap is visible only reading the five as a set, which is why it is filed at the document level rather than against the bullet.

I checked the three candidates the reading named:

- `ops seat send` — its own help: "This verb WAKES its recipient, so it is earned by consequence to their NEXT ACT. Two shapes earn it: they are stopped dead until an answer arrives, or they are working from a premise that has since stopped being true and will build on it until something else stops them." The second shape is arguably a defining seat holding a criterion since found wrong. I did not judge whether it applies.
- `ops seat record` — its help: "A record has NO delivery path ... So a record can never revive a dormant seat and never interrupts a live one."
- `ops project rule --rail` — not examined.

Correction to the report that raised this: "use `send` only when someone is BLOCKED" is `ops seat record`'s one-line summary, not `send`'s. `send`'s own help carries the equivalent claim in the words quoted above.

What neither candidate answers: `record` cannot reach a retired seat and `send` to a retired recipient is refused, so if the defining seat has retired, stage 3 has no exit at all for this case. Whether defining seats retire or stop was not measured.

`domains/tasks/archivist/review-instructions.md`'s `Add` line sent this back rather than into the document. Raised by the `review-instructions` reading of 2026-08-06, which landed three commits.
