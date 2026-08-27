---
id: ca79b51d-dfb4-5e94-9f7a-486be8f74fcd
slug: points-source-check-rules-on-an-empty-population
page-type-slug: finding
title: "Points source check rules on an empty population"
domain-slug: page-type/daily-tracking
---

# Claim

`ops persona points-source check` reports COHERENT over zero of forty-one personas. It reads a section that moved out from under it, so it rules on nothing and exits 0.

# Evidence

Measured 2026-08-15. The live run prints `READING: COHERENT — ... [over 0 of 41 personas]` and exits 0.

The verb reads corpus kind `personas` — `domains/personas/*.md` — and pulls the `# Design` section from each. The bar and source it checks moved to the `persona-points-source` page type at `domains/persona-points-sources/*.md` (`page-types/persona-points-source.md`, reviewed 2026-08-14). `domains/personas/athena.md` now holds only `# Definition` and `# History`.

So `extractDesignSection` returns null for all 41, and `checkPersona` returns null at `packages/alanwalton/daily-tracking/src/points-source-document-check.ts:266` for every one.

`ops persona points-source apply` reads the same corpus, so its document-derived bar is null for every row too. Its "0 corrections over 41 rows" is equally vacuous.

The denominator is what makes this visible — the verb prints `over 0 of 41` rather than a bare COHERENT, so the evidence of its own emptiness is on the line. Nothing reads that line.

This is the shape a passing gate takes when its subject moves: the population goes to zero, every member of it agrees, and the verdict is true and worthless.
