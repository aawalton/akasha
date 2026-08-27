---
id: 9a54a723-e798-51e5-a007-b17810bfa7dd
page-type-slug: finding
title: "Undeclared key refuses only where pages already stand"
domain-slug: domain/pages-system
---

# Claim

The query service refuses a narrow on an undeclared key, which is the guard that catches a reader addressing a page by a name the page type does not carry. The refusal fires only when the type already holds pages. On a type holding none, the same undeclared key is accepted and answers `n=0` in silence, so the guard is absent exactly where a new or emptied type is most likely to be addressed wrongly.

# Evidence

Measured with the bogus key held constant and the population the only variable:

- `migration`, holding 8 pages, narrowed on `zz-claude-bogus-key` — refused with 400, whose own text reads "a zero here would say nothing about what matched".
- `workflow`, holding 0 pages, narrowed on the same key — 200, `n=0`, no refusal.
- `pipeline`, holding 0 pages, narrowed on the same key — 200, `n=0`, no refusal.
- Positive control: a declared key on the populated type answered `n=8` with no refusal, so the instrument distinguishes the two cases rather than reporting 400 for everything.

The refusal's own wording states the principle it then fails to apply: a zero says nothing about what matched. On an empty population the service produces precisely that uninformative zero and marks it as success.

The consequence is not symmetrical in time. A reader narrowing on an undeclared key against an empty type returns empty forever and reports success. When the first page of that type lands, the same reader begins throwing 400 on every call. The defect is silent while the type is empty and loud the moment it is not, so it is discovered in production rather than in the change that introduced it.

Found by the seat repairing readers of the CI page types, which were all standing at zero pages at the time.
