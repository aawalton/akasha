---
id: c1594be4-bc38-5411-8557-784641cb010e
slug: surplus-sections-off-on-wildcard
page-type-slug: finding
title: "Surplus sections off on wildcard"
domain-slug: page-type/page-body-shape
---

# Claim

One level-one wildcard heading anywhere in a page body shape's `extends` chain turns off surplus-section refusal and section ordering for the whole document. One shape declares such a wildcard today, and no verdict is wrong for it.

# Evidence

`page/document/check.ts:224` sets `anyHeadingAdmitted` where a level-one section part matches any heading, and `:237` gates two things behind it: the loop reporting a level-one section the shape does not name, and the `checkOrder` call beside it. The flag stands at `:208`, outside the walk, so it is document-wide rather than scoped to the shape that raised it, and a wildcard declared on one ancestor stops both anywhere in the document.

`pages/page-body-shape/notice.page-body-shape.md:25` declares `# {title}`, which is the first level-one wildcard in the corpus. Nothing goes unjudged by it. Ordering was already vacuous, `orderedSections` being filled only from literal level-one headings at `:225` and `notice` naming none; and a surplus level-one section is still refused by cardinality, the `title` block stating no `count:` and so falling to at most one. Checked against `pages/notice/resume.notice.md`, the only notice page: it passes, and a second level-one heading is refused.

The exposure is a shape naming literal level-one headings and a wildcard one together. No shape does, and nothing extends `notice`.
