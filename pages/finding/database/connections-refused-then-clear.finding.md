---
id: d4674acc-2185-500b-bdfc-0e1e49ae5937
slug: connections-refused-then-clear
page-type-slug: finding
title: "Connections refused then clear"
domain-slug: domain/database
---

# Claim

Connections to the postgres service are refused intermittently from this workstation, clearing on a
retry seconds later, with nothing so far accounting for it.

# Evidence

Three occurrences reported by the seat on #19236 within one project, each clearing on an immediate
retry:

- Branch CI refused to trigger, twice, minutes apart.
- `ops project move-to 19236 --status awaiting_lead_verification` was refused once, and succeeded on
  the retry. The hand-back message went out before the move landed, so the contract line the move
  asks for was missing from it and arrived as a separate addendum.

Between the two CI refusals, a pool query from this same workstation succeeded against that address.
So the service was reachable in the window where a trigger could not reach it.

It refused `ops project deploy --seq 19253` next, at `10.104.171.119:5432`, and that run passed
unchanged on the retry minutes later. That is the address, which the earlier reports did not carry.

The cost so far is two pipeline runs, one out-of-order hand-back and one failed deploy. Nothing is broken now, and
every arm has run clean since. It is recorded rather than left as noise because a fault that clears
on retry is one nothing reports twice.
