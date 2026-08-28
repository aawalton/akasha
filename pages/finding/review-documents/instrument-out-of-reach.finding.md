---
id: 2a94b262-00c2-5f83-b1f4-f1834fd99376
slug: instrument-out-of-reach
page-type-slug: finding
title: "Instrument out of reach"
domain-slug: domain/global
---

# Claim

`instrument` is a declared domain used as a term across the instructions corpus while sitting outside most of its readers' closures — `domains/instrument.md` stands under `code`, no document names it under `glossary:`, and `domains/tasks/archivist/review-documents.md` leans on it twice.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/tasks/archivist/review-documents.md` dispatched from `review-documents`. The reading raised it; the counts below were taken here rather than from it.

`domains/instrument.md` declares `domain-slug: instrument` with `domain-parents: code`. A grep for a `glossary:` entry naming it returns nothing, so no domain hands its definition to its readers.

`domains/tasks/archivist/review-documents.md` uses it twice — in the **Send** line ("whatever an instrument would have settled") and in the Invariants bullet ("reads exactly like one an instrument settled"). That document's closure is review-documents → task → agent-harness → foundational-layers → global, which does not reach `code`.

The use is corpus-wide rather than local: 37 uses stand across `domains/*.md` and `domains/tasks/`, in at least fifteen task documents including `review-instructions.md`, `tasks/code-harness/review-check.md`, `tasks/general/define-task.md`, `tasks/lead/define-project.md` and six `tasks/projects/build-*` documents.

`domains/global.md`, Plain Or Declared: "A declared word is exempt only in its declared sense." The word is declared, and the sense is a real one — `domains/instrument.md` carries Negative Control, Population and Horizon — so what stands is reach rather than declaration.

Not measured: which of the 37 uses are load-bearing against which are ordinary English, or which glossary should carry it. The reading noted a repair is both a horizontal change across the repo and a judgment about what naming it charges every reader of the carrying domain at boot.
