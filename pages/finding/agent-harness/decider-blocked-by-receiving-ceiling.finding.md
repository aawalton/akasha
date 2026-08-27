---
id: c9446e4d-67bf-5b84-8821-26ce7a6541ce
page-type-slug: finding
title: "Decider blocked by receiving ceiling"
domain-slug: domain/agent-harness
---

# Claim

A pure decider can be blocked from crossing into the instructions repository by that repository's own per-file ceiling, with nothing wrong with the decider, its callers or its coverage.

# Evidence

`rc-degraded-decide.ts` was the eighth of the supervisor's deciders on #18511 and the only one held for a reason that is a property of the destination rather than of the code. It imports nothing, its callers were threadable, and it carries a 338-line suite. `ops instructions write` refused it at 16196 bytes against the 15000 ceiling.

The file is 13239 bytes of authored reasoning around 2751 bytes of code. So the ways through are to cut another author's prose to fit a byte bound, or to split one decision across two files to the same end, and neither is the move the initiative asks for.

The three kinds of blocker named before this one — a caller that cannot be handed the rule, coverage that cannot follow, a caller owned by another project — are all properties of the code repository. This one is not, so a decider can be perfectly threaded, perfectly covered, importing nothing, and still not fit. It is also invisible until the write is attempted: no reading of the decider or its callers predicts it.

Its injection had to be reverted with it. A facade is a promise that the rule is on the far side, so threading a rule and then holding it would have left the composition root calling a loader for a file that is not there. The seam refuses rather than degrading, so every live supervisor would have failed at its first rc-degraded decision — while passing every test, because no test reaches a loader by construction.
