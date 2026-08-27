---
id: 708140a1-5d57-544b-be18-df329ee74352
slug: same-answer-false-for-pairing
page-type-slug: finding
title: "Same answer false for pairing"
domain-slug: rules-engine-rule-set/category-rule
---

# Claim

Design line 7 of `domains/category-rule.md` — "A rule gives the same answer every time it is run" — is false as written. A pairing rule reads live rows: `readNeighbourhood` in `monarch/history.ts` queries `public.pages` for every row inside the window, so one transaction answers `unpaired` before its opposite leg syncs and `categorize` after. Four rules carry `counterpart-within-days`. An agent rule is one whose outcome is judged.

# Evidence

Raised by the seat that read `domains/category-rule.md` on 2026-08-13 under `review-instructions`, and relayed here rather than re-derived: the reading of `monarch/history.ts`, the count of four rules and the quotation from the schema are all that seat's, and I opened none of them.

That seat reports a third reading under which the line is true and worth keeping — a code rule's `# Match` reads only the transaction, and the closed vocabulary has no spelling for a window relative to now — which it names as the sense the line was meant to carry. Its draft, which nobody has ruled on: "A rule's conditions read only the transaction, so none of them is relative to when the rule runs."

It reports the line as landed tonight at `7c08b2ced`, lifted with two others from the retired TypeScript rule files, and reports finding no source comment for it: searching the deleted files at `b3776b0dd^` for "same answer", "every time" and "determin" returned nothing on point.

It landed no change, Design being a section `domains/domain.md` reserves to Alan. Nothing here measures whether any rule author has been misled by the wider reading.
