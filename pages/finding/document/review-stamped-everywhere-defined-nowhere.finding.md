---
id: 4cf0e7af-4de7-5a49-b93f-475c9361c3b4
slug: review-stamped-everywhere-defined-nowhere
page-type-slug: finding
title: "Review stamped everywhere defined nowhere"
domain-slug: domain/global
---

# Claim

Every live document carries a `reviewed-at:` key and no document says what a review is. The key is required by the domain schema and inherited by every kind extending it, an instrument measures churn against it to name documents owed a reading, and eight `review-*` tasks across five roles run the act — while the word appears in the twenty domain documents of the domain system only as that key, never once in body text. The concept the whole corpus is stamped with is written nowhere.

# Evidence

Measured 2026-08-09, first-hand.

`tools/document/schemas/domain.ts` declares `reviewed-at` with `cardinality: once`, so it is required, and `tools/stale-reviews.ts` reads it off every schema that declares or inherits it. Every live document in the instructions repository carries one.

`tools/stale-reviews.ts` measures characters moved since the commit that wrote the record, summed over every commit after it, both sides of each diff, against a threshold of 1000. Its header states what a review is for — "what a reader owes is proportional to how much text moved" — and `tools/document/schemas/domain.ts` states what one IS, in a comment: "The day this document was last read whole and judged — of the reading rather than of any edit, so a review changing nothing still moves it." Neither sentence stands in any document.

Across the twenty domain documents of the domain system, `review` occurs twenty times and every occurrence is the `reviewed-at:` frontmatter key. Body text: zero.

Eight task documents are named `review-*`, and they are not one act. `archivist/review-instructions.md` is "reading one document unattended and landing what it should become" and `archivist/review-documents.md` dispatches it against every document owed one — that pair is the act the key records. `definer/review-findings.md`, `definer/review-theme.md`, `lead/review-initiative.md` and `semantic-categorization/review-by-direction.md` settle what becomes of each member of a set. `code-harness/review-check.md` and `code-quality/review-tests.md` read one artifact against what governs it.

Filed here rather than against a domain-system domain: the key is declared on the domain schema, but the act reaches every document type in the corpus and five roles run it, so the concern is the document's rather than the domain's. That placement is the finding's own judgment and is the thing most worth disagreeing with.

Not measured: whether one definition covers all eight tasks, or whether the set-settling four are a second act sharing an English word.
