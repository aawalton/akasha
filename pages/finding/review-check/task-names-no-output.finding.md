---
id: 9f94d131-3def-50fa-a937-9d9e2eb9a204
page-type-slug: finding
title: "Task names no output"
domain-slug: domain/global
---

# Claim

`domains/tasks/code-harness/review-check.md` never names its own output: nothing in its six stages says the reading lands at `check-reviews/<check>.md` with Reading, Unreached and Recommendation sections, so a seat dispatched by anything other than `review-checks.ts` finishes holding a recommendation and no shape to put it in.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/tasks/code-harness/review-check.md` dispatched from `review-documents`. The reading raised it as a Single Authority question rather than a factual one and left it standing.

The document's Sequence runs six stages — "What the check is", "The failures it is for", "Whether it prevents them", "Whether they would be prevented without it", "What it costs", "The recommendation" — followed by Invariants. Stage 6 says to recommend and to hand the recommendation up. No stage names a path, a file or a section.

`tools/review-checks.ts` supplies the shape in the prompt it writes: it orders each seat to "Land your reading at `check-reviews/<check>.md`" and tells it "`# Verdict` is NOT YOURS". So every seat the queue dispatches is fine, and the gap reaches only a seat dispatched some other way.

The same reading repaired stage 6's name from "The verdict." to "The recommendation." and rewrote its **Hand** bullet to "Hand the recommendation up and leave the check itself untouched", on the ground that do-not-change-the-check is the claim nothing else in the corpus makes.

What makes it a fork rather than a repair: `domains/check-review.md` and `tools/document/schemas/check-review.ts` already bind the output's shape, so stating it here would be a second copy of one claim, which `domains/agent-harness.md` Single Authority bars.

Not measured: whether any seat has ever run this task outside the queue, or whether the task document is reachable from a dispatch that does not go through `review-checks.ts`.
