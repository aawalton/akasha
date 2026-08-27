---
id: 3349533c-989d-5788-a401-5190daf413a9
page-type-slug: finding
title: "Prose duplication question never put"
domain-slug: role/definer
---

# Claim

The schema layer has settled the share-or-copy question for the initiative and theme documents twice, in opposite directions, with its reasons written down — and the same question about the task prose that governs them has never been put.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/tasks/definer/define-theme.md` dispatched from `review-documents`, the twin of the reading that raised `pages/finding/definer/four-tasks-share-lines-verbatim.finding.md`.

`tools/document/schemas/sequence-or-loop.ts` shares its shape between the two uses, on the stated reason that "stages are the same stages wherever they are written". `tools/document/schemas/theme.ts` deliberately copies initiative's objective shape rather than sharing it, on the stated reason that "a theme's objectives are expected to stop looking like an initiative's".

So the layer below the prose has met this exact fork, answered it both ways for different parts, and recorded why each time. Nothing in `define-initiative.md` or `define-theme.md` records an answer either way for the six prose lines they hold in common.

The reading also closed off the easy resolution: lifting the shared lines to a common ancestor has nowhere to land. The nearest are `task`, which would bind every task in the corpus, and `memory`, which would bind project, finding and memory-repo alongside theme and initiative.

Not measured: whether the prose duplication predates either schema decision, or whether any other task pair in the corpus has a schema-layer precedent like this one.
