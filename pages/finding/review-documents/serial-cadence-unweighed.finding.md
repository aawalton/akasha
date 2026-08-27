---
id: 44ba7af3-f1b4-58e4-b55b-a1aa2b23b53c
page-type-slug: finding
title: "Serial cadence unweighed"
domain-slug: domain/global
---

# Claim

Nothing has weighed whether these readings should run serially. The test that produced the cadence — dispatch subjects sharing a governor one at a time, and the rest together — could never split anything, because every subject shares `folders/instructions-repo.md`, `agent-harness` and `global` with every other. It was cut on 2026-08-07 and the serial cadence it always reached was kept as a bare instruction. A finer test than "shares a governor" would let most subjects run together.

# Evidence

Raised by the review-instructions seat on `domains/tasks/archivist/review-documents.md`, which cut the dead branch and the `governs` call and took no view on whether the cadence is worth its cost.

Its structural proof, which matches what I measured independently at the start of this pass: `reviewed-at:` is declared once on `tools/document/schemas/domain.ts`; the schemas carrying it are `domain` and the seven extending it; all eight govern globs on the instructions repo, while the three memory-repo schemas declare `extends: []`; and `domains/folders/instructions-repo.md` declares `instructions-path: "**"`. It confirmed by running `governs` over one document of each kind — file-kind, folder, `global.md`, task, persona — and found all three governors on all five.

I measured the same thing differently before the pass began, collecting governor sets for all 59 subjects and finding thirteen governors common to every pair.

The cost is real and now measurable: this pass has run 29 subjects end to end. Not measured: how much of the serial time is actually protective. Two reviewers in this pass landed adjacent repairs on documents outside their subject, so the hazard the cadence guards against is not hypothetical.
