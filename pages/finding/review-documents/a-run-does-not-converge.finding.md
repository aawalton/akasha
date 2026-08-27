---
id: d7520191-335b-52af-8a1c-0da6c9bee71b
slug: a-run-does-not-converge
page-type-slug: finding
title: "A run does not converge"
domain-slug: domain/global
---

# Claim

A run of `review-documents` does not converge, because the corpus churns while it runs. Forty subjects into this run, `stale-reviews.ts` reports 31 owed — every one already on the run's list, so nothing new appeared — but 12 of them are documents this run already had read. Reviewers landing repairs adjacent to their own subjects, and other seats working the same corpus, push documents back over the threshold behind the sweep. Nothing in the task says what a second reading of one of those is worth.

# Evidence

Measured by the seat running the task, at 40 of 59 subjects dispatched.

`bun tools/stale-reviews.ts` reports "282 live document(s), 31 owed a reading". Comparing that list against the run's own subject list: `comm` shows zero owed documents that were not already on it, 19 owed that are still to dispatch, and 12 owed that were dispatched earlier in this run — agent-governance, alignment, arousal, code-check, domain, file-kinds/tests, folders/all-about-alan, folders/design-system, global, instructions-harness, jargon, and tasks/archivist/ingest-instructions.

Not partitioned: how much of that 12 is this run's own reviewers landing adjacent repairs and how much is other seats working the corpus at the same time. Both were happening — `domains/role.md` moved twice during one subject's reading, from a seat outside this run.

The list step names what is owed once, at the start. This is an observation about the shape of the run rather than a defect in any line of it.

THE TAIL CONVERGED, 2026-08-08. A later pass took 11 subjects and closed at zero: `stale-reviews.ts` reported "296 live document(s), 11 owed" at the start and "296 live document(s), 0 owed" after the last reading handed back. Ten of those 11 are on the 12 named above — every one except `code-check` and `domain`, both since read — with `lists/unresolved-checks.md` the only subject not already on this run's list.

So the churn this finding measures is not unbounded. A run leaves a tail, and the tail is small enough for a following pass to clear in one sweep. What did not recur is the growth: nothing entered the list during the later pass, though five of its eleven reviewers landed body commits and one landed four.

Measured by the dispatcher of that later pass, from the same instrument, before and after. Not measured: whether the difference is the smaller subject count, the quieter corpus at that hour, or both.
