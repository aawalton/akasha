---
id: 96b21508-daa5-52f8-95cd-291cd6c5e487
page-type-slug: finding
title: "Subject list goes stale"
domain-slug: domain/global
---

# Claim

The subject list goes stale while the run works through it, and nothing says whether to re-run. Stage 1 takes the list once. A reviewer's adjacent repairs move characters in documents outside its own subject, so the list can gain entries during the later stages. `stale-reviews.ts` reported 59 owed at the start of one pass and 42 partway through, both figures moving as the pass itself committed.

# Evidence

Raised by the review-instructions seat on `domains/tasks/archivist/review-documents.md`.

I have the measurements from running the task. At the start of the pass on 2026-08-06 the verb reported 280 live documents and 59 owed. After the date rolled over and two subjects recorded their readings it reported 281 live and 57. Partway through it reported 42 owed against 281 live. The count moves in both directions during a single run: readings that record their date remove entries, and adjacent repairs and the readings' own commits add churn to documents not yet reached.

At least two reviewers in this pass landed commits on documents other than their subject — one on `domains/tasks/general/define-task.md`, one across two sites of its own document's siblings — so the mechanism is observed rather than inferred.

Not measured: whether any document entered the owed set during this pass and was therefore missed, which would need the list re-run at the end to answer.
