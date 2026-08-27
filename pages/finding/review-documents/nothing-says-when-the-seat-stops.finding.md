---
id: 3d92e74b-811d-5b18-b9b7-fe1110ea2d9f
page-type-slug: finding
title: "Nothing says when the seat stops"
domain-slug: domain/global
---

# Claim

Nothing on `domains/tasks/archivist/review-documents.md` says when the seat running it stops: read literally, stage 2's one-seat-per-subject one-at-a-time makes today's run 98 serial readings in one seat's life, and a fixed count, a time box and drain-the-queue are all coherent readings of the same words.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/tasks/archivist/review-documents.md` dispatched from `review-documents`. The pass it was raised from is the one described below.

Stage 1 ran `bun ~/instructions/tools/stale-reviews.ts` and got 102 subjects at the start of this pass, 98 by the time the reading landed. Stage 2 reads "Spawn one seat per subject" and "Wait for one reading to hand back before spawning the next." Neither stage, the Definition nor the Invariants names a stopping condition.

What the literal reading costs is real rather than notional: this pass has taken five readings so far, each a full unattended document review, and the queue is 91 refusal documents deep behind the domain and task documents.

Context rather than a second claim: `bun tools/review-checks.ts` holds three check-review seats live against its queue at once, where stage 2 here insists on one at a time. The reading judged the two not to disagree — a check-review seat lands its file in the memory repo and two of them cannot cut each other's sentences, where two instruction reviewers write into one corpus and can. That there is a runner for the check queue and none for the document queue is part of the same question about how this queue is meant to drain.

Not measured: what the pass costs end to end, how often the queue is worked, or whether any earlier run of this task stopped short and on what ground. `domains/role.md` bars me from estimating how long the remainder will take.
