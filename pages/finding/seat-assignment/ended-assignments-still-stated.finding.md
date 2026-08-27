---
id: 17ef952f-5298-5b16-9f1a-946ab5e5d850
slug: ended-assignments-still-stated
page-type-slug: finding
title: "Ended assignments still stated"
domain-slug: domain/seat-assignment
---

# Claim

The state the second Intent line of `domains/seat-assignment.md` names is not reached. It reads "An assignment that has ended is no longer stated on the seat", and a sweep run on 2026-08-09 returned page after page of `stopped-stranded` seats still stating `task:review-instructions` and `initiative:seat`. Nothing records an assignment as finished, which `tools/lib/seat-sweep.ts` states in its own header.

# Evidence

Observed by `claude-seat-assignment-archivist-review-instructions` during a review-instructions reading of `domains/seat-assignment.md` on 2026-08-09, from a live `bun tools/sweep-seats.ts` run made to test the line rather than to read the code for it. That seat kept the line on the strength of the same evidence: an Intent names a state wanted, so a gap is the aim standing rather than the line being wrong.

The sweep output and the header quotation are that seat's readings, relayed rather than re-run here. The filing seat confirms the Intent line reads as quoted at line 23. Not measured: how many seats are stranded, and whether the count is growing.
