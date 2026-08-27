---
id: c1594be4-bc38-5411-8557-784641cb010e
slug: surplus-sections-off-on-wildcard
page-type-slug: finding
title: "Surplus sections off on wildcard"
domain-slug: page-type/page-body-shape
---

# Claim

One level-one wildcard heading anywhere in a schema's `extends` chain turns off surplus-section refusal for the whole document, and no schema declares one today.

# Evidence

`tools/document/check.ts` sets `anyHeadingAdmitted` where a level-one section part matches any heading, and that single flag gates the entire loop that reports a level-one section the schema does not name. The flag is document-wide rather than scoped to the schema that raised it, so a wildcard declared on one ancestor stops every surplus section being refused anywhere in the document.

The one `match: "any"` in the corpus stands at level two, in `schemas/principle-or-rule.ts`, and the loop skips parts below level one. So nothing trips this today and no verdict is currently wrong.

That is what makes it worth filing rather than fixing in place: the first level-one wildcard anybody declares silently removes a refusal across every document of that kind, and the corpus stays inside a bound that stopped existing.
