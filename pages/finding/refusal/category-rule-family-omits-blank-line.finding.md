---
id: bd67ace6-39b4-587e-ac06-961b71066db2
slug: category-rule-family-omits-blank-line
page-type-slug: finding
title: "Category rule family omits blank line"
domain-slug: page-type/refusal
---

# Claim

Eleven refusal documents omit the blank line between the heading and the first paragraph that `page-types/refusal.md` shows, and 161 carry it. The eleven are exactly the `category-rule-*` family, landed together, so it is a family's convention rather than a stray. Nothing sees the difference: `page-check` passes both ways, and the heading is stripped before a refusal is printed, so no reader meets it either.

# Evidence

Raised by the reviewer seat `claude-refusal-archivist-flex-1-review-instructions`, reading `refusals/category-rule-shadowed.md` line by line on 2026-08-14. Its report is at `~/agents/claude-refusal-archivist-flex-1-review-instructions/review-category-rule-shadowed.md`.

That seat counted the split itself and ran `page-check` on the subject and on one sibling from each side of it, plus `refusalText` end to end, so the printed text was read as a reader gets it rather than as source.

I did not re-count the 172 documents or run either command.

The seat states the fork rather than settling it: repairing one document alone breaks the family's internal consistency, and repairing all eleven is a commit spent on whitespace no instrument measures. Whether the family should be brought onto the corpus convention is not a call one document's reading should take.

Not measured: whether any other family in `refusals/` diverges from the page type in some other way that no instrument sees.
