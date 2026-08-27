---
id: e35aaa85-62a6-58ac-896e-c4f51689bc46
slug: rename-splits-row-from-gate
page-type-slug: finding
title: "Rename splits row from gate"
domain-slug: page-type/seat
---

# Claim

What a seat IS has two carriers that a rename moves separately: the agent row, written by `ops seat restate`, and the per-seat store under `$HOME` that the read gate consults. Moving the row alone leaves the gate holding the old attributes, and nothing reports the disagreement.

# Evidence

Observed on 2026-08-09 during project #18236, which renamed the seat holding Alan's inbound path from `amy-handler` to `amy-alan-handler` and moved the domain it states from `alan-harness` to `alan`.

`ops seat restate` moved both the row's `name` column and its `domain` column. Afterwards `bun tools/seat.ts --show` still reported domain `alan-harness`, because the read gate reads the per-seat store at `/home/walton/.instruction-seats/<agent-id>.json` rather than the row. The domain had to be stated a second time, through `tools/seat.ts`, before the gate put `domains/persons/alan.md` and `domains/person.md` in front of the seat.

The two stores disagreed in the window between the two acts. Nothing surfaced the disagreement: the row read correct on every agent surface, and the gate went on enforcing a document closure for a domain the seat no longer stated. A rename that stopped after the row would have left a seat whose row says it serves Alan and whose gate never requires it to read his document — the exact condition #18236 existed to end, reported as fixed.

`tools/seat.ts` argues in its own header that the per-seat store is correctly sited outside both repositories, being a fact about a seat rather than anything a repo says. That reasoning is not in question here. What is observed is that a second writer — `ops seat restate` — moves part of the same fact through a different carrier, and neither writer reads or invalidates the other.
