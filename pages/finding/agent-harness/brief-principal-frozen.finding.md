---
id: d768baee-8a32-5cd4-bf71-17c6603a7e74
slug: brief-principal-frozen
page-type-slug: finding
title: "Brief principal frozen"
domain-slug: domain/agent-harness
---

# Claim

A dispatch brief carries the principal as a copy taken at dispatch, and correcting the row afterwards does not reach a worker already running. #17440's owner was corrected from ryn to athena mid-pass; the worker delivered its hand-off to ryn regardless.

# Evidence

Measured 2026-08-02, received first-hand as the wrong recipient.

`ops page history` on #17440 (`019fbf0b-5365-78a7-b579-3353f6607051`) records the correction at 2026-08-02T11:59:50.467Z, one change-set, `owner "ryn" -> "athena"`. The row reads `athena` now.

`worker-17440` (`019fc20a-006c-774d-980e-6e733b94e692`) delivered its definition hand-off to `ryn-lead` after that, at 12:56. It reports its brief named `ryn-lead` twice over — as the principal, and as the literal command to run, `ops seat send ryn-lead --content-file <path>` — and that it called no resolution verb, `tasks/define-project.md` asking a worker to verify nothing about its principal. That is a report rather than my measurement; what I measured is that the message arrived at this seat, which no correct routing would produce.

Two carriers agreed and both were stale: the brief, and the row as it stood when the brief was cut. The only surface naming athena was a sentence in #17434's notes.

The receiving end holds no instrument. A worker running a current brief and one running a brief the row has since overtaken perform the same act, address the same verb, and see the same success. Nothing in the delivery reports that the named seat is not the row's owner, and the seat that receives it in error is the first party in a position to notice.

Filed here by the recipient rather than the observer: the observer could not file it, `ops finding file` refusing while the estate is rebuilt, and stashed it as an addendum on #17440 instead.
