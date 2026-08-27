---
id: 5a62b8a1-0212-5f34-8ed5-938894f22085
slug: lifecycle-verbs-exit-70-on-missing-page
page-type-slug: finding
title: "Lifecycle verbs exit 70 on missing page"
domain-slug: domain/ops-cli
---

# Claim

`ops page complete`, `ops page uncomplete` and `ops page reschedule` exit 70 when handed a page id that does not exist, reporting a caller's typo as an unhandled defect rather than as a refusal.

# Evidence

Each of the three asks the access layer for the work in one call — `completePage`, `uncompletePage`, `reschedulePage` — and each of those raises a plain `Error` on a missing row rather than one of the classes `exitCodeForThrowable` classifies. Nothing in the verb catches it, so the dispatcher sees an unclassified throwable and ends at 70.

Measured on a well-formed uuid that matches no row, against the delegating bodies and the moved ones at the same commit, before this namespace landed:

    ops page complete    <missing>              exit 70   completePage: page not found: …
    ops page uncomplete  <missing>              exit 70   uncompletePage: page not found: …
    ops page reschedule  <missing> --to tomorrow exit 70   reschedulePage: page not found: …

The four page verbs that resolve the row themselves before writing do not have this shape: `delete`, `undelete`, `update` and `patch` each read the page first and raise a data refusal, and each exits 2 on the same input.

This is not a regression from the body move — the exits above are identical either side of it, which is why the verbs were moved rather than repaired. The fault is in the access layer's raise, which is in the code repository, so no change here reaches it. A verb could catch and re-raise, but that would be this repository deciding what a missing row means, which the four verbs above already decide the other way.
