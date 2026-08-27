---
id: e7433c0d-b3f9-50c4-a379-105d28329a9d
slug: block-outlives-every-seat-that-can-clear-it
page-type-slug: finding
title: "Block outlives every seat that can clear it"
domain-slug: domain/agent-harness
---

# Claim

A blocked-on record outlives every agent that can clear it. Both `ops seat gate-block --clear` and `ops seat block-on --clear` refuse anyone but a seat working the row, and nothing releases the record when that seat dies. The row then reads blocked forever, and the only route left is spawning a seat purely to clear a record — the costliest act in the system, spent on bookkeeping. Nothing reports this, because a stuck block and a live one are the same row.

# Evidence

Project #19011 has carried a `blockedOn` record since 2026-08-14T12:38:57Z, naming holder `dalla-instrument-manager-build-parent-deploy-19089`. The request itself says nothing was owed back — it is a routing notice recorded as a block, per the `Check Suppression` rule — and it names #19089 as what ends it. #19089 is done, `check-ast-unused` was turned back on at `9992f60ee4`, and the record is resolved in substance.

The recording seat is `019ffe7d-97b2-7159-8b17-5e288fdf7d57`. `ops seat alive` on it answers `dead — spawn-state wrapper pid dead (kill -0 ESRCH)`. No live seat is bound to #19011.

Both clearing routes refuse:

    blocked-on: #19011's block is cleared by a seat working the row —
    019ffe7d-97b2-7159-8b17-5e288fdf7d57 — and you are not one.

`ops seat gate-block --help` states the design and states the escape it believes exists: "The record lands on the bound PROJECT row, so it survives you compacting, being reaped, or being replaced — a successor on the same row inherits it." That is true of a successor that exists. Nothing creates one when a seat dies, and nothing notices that a row's only clearer has gone.

The rule the refusal enforces is right on its own terms: an answer from the party owed is an ACK, and only the blocked party can say whether it actually unblocked them. What is missing is the case where the blocked party no longer exists. A block is held against a seat's judgment, and the seat's judgment is gone.

The cost is not one row. `ops project census --state unexplained-holder` reports 23 rows held with no reason or no record, several of them at three and four days. A block that cannot be cleared is indistinguishable from a block nobody has got to, so this class hides inside that count rather than beside it.
