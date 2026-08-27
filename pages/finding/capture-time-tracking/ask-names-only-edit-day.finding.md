---
id: 0ae00b2b-20c2-515f-a7f0-bb54af62d8b9
slug: ask-names-only-edit-day
page-type-slug: finding
title: "Ask names only edit day"
domain-slug: task/capture-time-tracking
---

# Claim

The Ask line on `domains/tasks/alan-harness/capture-time-tracking.md` names only `edit --day` where `log --day` fits the case better. `--day` exists on `start` and `log` as well as `edit`, and reconstructing fragmented sleep after the fact would naturally use `log --day` rather than a `log` followed by an `edit --day`. Whether the task wants the two-step is judgment rather than something an instrument settles.

# Evidence

Raised by a review-instructions seat on `domains/tasks/alan-harness/capture-time-tracking.md`, which ran `--help` on every tracking verb the document names and reported `--day` present on `start` and `log`. I did not re-run those.

The same reviewer landed a repair on a different line of this document in the same run (commit d622688), so it was willing to land where an instrument settled the question; it named this one as judgment and left it.

Not measured: whether the two-step is deliberate — an `edit` after a `log` leaves a different trace than a `log --day`, and nothing read here says whether that trace matters.
