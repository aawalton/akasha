---
id: 42f8cb30-6c01-5084-9109-79834ed6599a
page-type-slug: finding
title: "The reachability floor outlived the value it counted"
domain-slug: domain/agent-harness
---

# Claim

`ops seat queue-reachability` reports `declared_still_present` 0 against a declared floor of 128. The floor was declared when `retired` was a status a target row could hold, and #18061 removed that value, so the targets it counted stopped being undeliverable rather than being cleaned up. Nothing regenerates the floor, so the rung reads as a total collapse of a population it can no longer have.

# Evidence

Observed 2026-08-07 by athena, verifying #18061, and reported by the delivering seat as something it deliberately did not repair.

#18061 removed `retired` from the agent status column across 382 live rows. `queue-reachability` classifies live-pending messages by what must happen for each to move, keyed on the target row's status, and counts an undeliverable population against a declared floor of 128. With no row carrying `retired`, that population is 0.

The seat's reasoning for leaving it, which I agree with: there is no regeneration verb, and re-declaring the floor by hand would erase exactly the discontinuity the rung exists to make visible. A quiet regeneration would have made a real change in the estate's shape look like nothing had happened.

What that leaves is a declared number nobody has re-declared, on an instrument whose whole purpose is to be believed. Read today it says a population collapsed; what happened is that the population stopped being definable. Those are different facts and the rung cannot tell them apart.

Re-declaring the floor is a decision about what the honest baseline is now, not a repair, which is why it did not belong inside the project that caused it.
