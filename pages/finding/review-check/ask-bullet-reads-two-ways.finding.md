---
id: 6b0bbf6d-99ba-5067-9cd0-20b1a04e1754
page-type-slug: finding
title: "Ask bullet reads two ways"
domain-slug: domain/global
---

# Claim

The second sentence of the **Ask** bullet in stage 4 of `domains/tasks/code-harness/review-check.md` has two readings asking for different work: its first clause is about the step's own failures in the step-cost window, its second is a sole-gate conclusion no window can establish and which the next stage gathers from somewhere else.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/tasks/code-harness/review-check.md` dispatched from `review-documents`. The reading raised it and left it standing rather than guessing an author's meaning into a document every check reviewer reads.

The sentence, at stage 4: "Where every failure in the window you read is its own refusal, every pipeline run pays for a condition that fails nothing else, and removal takes that failure away with the check."

"The window you read" is the step-cost window, which the same bullet bounds — "`step-cost` reads 20 runs by default and 200 at most, either of which can fall inside the check's own life, so say what that window covered rather than calling it the history". A window of at most 200 runs cannot establish that a check is the only gate on a defect; the next bullet gathers that from `ops enforcement list`, over a population of 234 mechanisms.

So one reading asks the reviewer to report what a bounded window showed, and the other asks for a conclusion about the whole enforcement surface. `domains/tasks/archivist/review-instructions.md` sends a line back to the principal where its two readings ask for different things, which is what the reading did.

Not measured: which reading the author meant, or whether any check review has been decided on the sole-gate clause without the enforcement-list evidence behind it.
