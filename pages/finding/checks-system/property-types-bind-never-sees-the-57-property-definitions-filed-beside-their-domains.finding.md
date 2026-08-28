---
id: 4544a942-86f5-538d-84be-f2e8352a23a2
page-type-slug: finding
title: "property-types-bind never sees the 57 property definitions filed beside their domains"
domain-slug: domain/checks-system
---

# Claim

`tools/audits/property-types-bind.ts:50` reads property definitions by folder glob rather than through the page index, so it judges 2,231 of the 2,288 that stand. The 57 filed beside their own domains under `graph/` and `readouts/` are never checked for whether their `type:` binds a rule, and the check's own population line reports the short number as though it were the whole set: a denominator that silently omits the cases most likely to be wrong.

This is the same defect that stood in three readers of the same data and was fixed in each. It remains here, in a check.

# Evidence

Measured against `main` on 2026-08-28.

Line 50 is `for (const relPath of tree.paths(PROPERTY_GLOBS))`. `PROPERTY_GLOBS` is `pages/page-property-definition/**/*.page-property-definition.md` and `pages/alan-harness-tracking-field/**/*.alan-harness-tracking-field.md`, so a definition standing anywhere else is not read.

The index carries 2,288 pages of those two kinds. The glob reaches 2,231. The 57 it misses stand under `graph/edge`, `graph/edge-attribute`, `graph/edge-producer`, `graph/node`, `graph/node-attribute`, `graph/node-deriver`, `graph/node-producer`, `readouts/group`, `readouts/readout`, `readouts/scale` and `readouts/widget`.

The check's verdict line on the day of measurement read: `36 of 52 type name(s) bind a rule; ... over 2231 file(s) under 'pages/page-property-definition/' or 'pages/alan-harness-tracking-field/', 0 of which state no type this could read`. The `0` is over 2,231, not over 2,288, and nothing in the line says so.

Their placement is intended rather than accidental. `pages/page-type/page-type.page-type.md:28` states it: a page type and its property definitions live where their domain lives.

The same glob-instead-of-index defect stood in `page/property/registry.ts` and was fixed before this was written; in `page/property/frontmatter.ts:140` and `page/property/declarations.ts:136`, fixed at `014a2c82d`, which cleared 361 of 429 reported `pages-hold-properties` faults that were not faults. `indexedPaths` in `page/property/registry.ts` is what the fixed readers call, and is what this check wants.

Not measured: whether any of the 57 would fail if judged. Judging them by hand against the vocabulary gave four apparent failures, all `type: select(...)` — and that was a false positive, since 134 definitions under `pages/` use the same form and pass. Reproducing this check's binding test by hand is what the check exists to avoid, so the question stands open until the check can see them.
