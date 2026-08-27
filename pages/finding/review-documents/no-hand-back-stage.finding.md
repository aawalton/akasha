---
id: cfcb3f1c-9a0a-5825-98a3-8c859ba8e73f
page-type-slug: finding
title: "No hand back stage"
domain-slug: domain/global
---

# Claim

`domains/tasks/archivist/review-documents.md` has no hand-back stage: it closes at stage 3 having said nothing about reporting, though the seat running it is dispatched and has a principal, and the task it dispatches closes on a hand-back stage of its own.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/tasks/archivist/review-documents.md` dispatched from `review-documents`.

The document's Sequence holds three stages — "What is owed", "The reading", "What returns" — and then an Invariants section. Nothing in any of them names a report, a hand-back or a principal.

`domains/tasks/archivist/review-instructions.md`, the task this one dispatches, closes on stage 4, "The hand-back": "Hand back to the principal who dispatched you, in reading order, what you changed and what you ran to justify each, what you left standing with the fork stated, and where the report is." Every seat this task spawns therefore reports to the seat running this one, and this one reports to nobody by instruction.

`domains/role.md` carries Scope — "Deliver the whole scope; where part is blocked, deliver the rest and say what you left out" — which binds the seat whatever its task omits, so the gap is in the task rather than in what a seat owes.

Not measured: whether this task is ever dispatched rather than started by a person, or whether an earlier run handed back on the role rule alone.
