---
id: 7c74e83b-3aca-530e-8081-cde16bb418a4
slug: all-boxes-checked-read-as-finished
page-type-slug: finding
title: "All boxes checked read as finished"
domain-slug: domain/seat-assignment-initiative
---

# Claim

`ops instructions sweep-seats` reads an initiative whose every objective is checked as a finished assignment, so a lead holding one reads as holding nothing at exactly the moment its closing work arises. A finished initiative is marked by its document being deleted and its assignment leaving the seat, never by a full set of ticks.

# Evidence

`objectivesAllChecked` at `tools/lib/seat-sweep.ts:76` returns true where every box is checked, and `unfinishedOf` then drops the initiative from what the seat holds.

Three acts remain at that point. `domains/tasks/lead/review-initiative.md` step 5 has the lead read the domain against what now stands, carry the closing to Alan with whatever that reading left open, and delete the initiative last — the initiative being agreed as a proxy for a gap, so Alan is the one who can see every objective met and the gap still open. So a full set of ticks is the middle of the work rather than the end of it.

`domains/memory.md` deletes a memory document when its purpose is complete, which is what makes the deletion the mark and the ticks not. Alan stated the same thing about the seat on 2026-08-09: a finished initiative is deleted rather than merely checked, and its assignment is removed from the lead.

Measured on this fleet, the `athena-consistent-seats` initiative stood at three of four boxes checked when the sweep last ran at 19:05Z and reported 0 running-unassigned. Had the fourth been ticked in the same run, the sweep would have read `athena` as holding no initiative while all three closing acts were still owed — and `athena` holds availability, so nothing else in the row would have shown it either.

The converse reading in the same function is sound and is not part of this: a slug reaching no document is finished, because the deletion is the completion.
