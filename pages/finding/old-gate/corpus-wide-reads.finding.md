---
id: d353293f-7c44-56b8-8461-22e6440059b7
slug: corpus-wide-reads
page-type-slug: finding
title: "Two gates read the whole corpus to judge one file"
domain-slug: page-type/old-gate
---

# Claim

Two gates read the whole corpus to judge one file, against the statement in `domains/gate.md` that a gate is given the file and its change and no view of the repo. `domain-slug-unique` reports measuring against 5,619 domains across 8,310 live documents; `relations-resolve` reports reading 2,518 pages. Both are cached and both come in under budget today, so the cost is paid by every write rather than shown as a failure.

# Evidence

Read the gate contract in `domains/gate.md` and both gates' own detail lines, which state the counts, in output from my own writes today. I did not benchmark either gate and I did not measure how the cost scales, so this is filed as a mismatch between the contract and the implementation rather than as a performance problem.
