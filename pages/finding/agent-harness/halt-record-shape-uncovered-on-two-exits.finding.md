---
id: 8dca9bb1-7f8b-5aaa-92f8-92f98696b8c3
slug: halt-record-shape-uncovered-on-two-exits
page-type-slug: finding
title: "Halt record shape uncovered on two exits"
domain-slug: domain/agent-harness
---

# Claim

The halt guard's record-shape test covers sixteen of the eighteen exits it can take, and the two with no case are `held-wake-blocked-on` and `interactive-recorded` — the most frequent record the guard writes.

# Evidence

Measured 2026-08-05 by this lead, verifying #17845. `PATHS` in `tools/tests/block-headless-halt-record.test.ts` enumerates the exits the record shape is asserted over; two of the eighteen the scripts write are absent from it.

The frequency is what makes the gap uneven. `ops seat hook-decisions` over the seven days to 2026-08-05 reports `interactive-recorded` at 2176 invocations, the largest arm in the table, and `held-wake-blocked-on` at 11. Of the two uncovered exits one is the guard's commonest act and the other its rarest.

The vocabulary half is now guarded: `hook-reasons-mirror` holds the scripts, the check's own declared list and `HOOK_DECISION_REASONS` in the code tree together, and fails when any two of the three part. What it does not assert is the SHAPE of the record written at a given exit, which is what `PATHS` covers — so a regression in what `interactive-recorded` writes would pass every door.

Raised by the seat on #17845 outside its criteria and left for the lead. The row is closed; this is the residue.
