---
id: 443aea40-118b-4c25-8116-a0e4b7458081
page-type-slug: finding
title: "Nothing refuses a file whose name and frontmatter disagree"
slug: nothing-refuses-a-file-whose-name-and-frontmatter-disagree
domain-slug: domain/page-types-system
---

# Claim

`pages/domain/pages-system.domain.md:28` states that what makes a file a page is the page type its name carries, and `pages-system/page-type/page-type.ts:4-6` states that the frontmatter must agree with the kind and does not decide it. Nothing enforces the agreement. Three files naming one page type in their name and a different one in their `page-type-slug:` passed every check `ops write` runs and landed on main.

# Evidence

Measured 2026-08-28 at `d222c5c37e`.

The three landed at `0e93878632` and `8e07a0556b`, eleven akasha checks over them, none refused, and were taken away again at `8dd21bf3dc`. They were `pages/domain/page-property-type-widget-control.domain.md` carrying `page-type-slug: person`, `pages/domain/widget-alert-control.domain.md` carrying `page-type-slug: alert`, and `pages/page-type/widget-control.page-type.md` carrying `page-type-slug: domain`.

`page-holds-to-its-type` reads the name and nothing else: `page-holds-to-its-type.check.code.attachment.ts:93` is `claimant(at.relPath, types).type`, and `claimant` has gone through `pageTypeOf` since `bd4685c233`. It judges the shape against the type the name carries and never looks at the `page-type-slug:` beside it. A fourth draft, `.domain.md` carrying page-type properties, was refused with `` `extends-slug` is no property of `domain` `` — the shape, not the disagreement. Removing those keys left a file it admitted.

No check under `checks-system/check/` names the key `page-type-slug` outside its own frontmatter and its test fixtures.

The data holds even so. Over the 116,074 pages `scan` reaches in akasha, zero carry a `page-type-slug:` differing from the kind their name carries, with the three above the only exceptions while they stood.

No reader consults the authority that does not decide any longer. `tools/lib/seat-initiative.ts` took an initiative file's page type from its frontmatter with its own path in hand a line above, and reads the name at `cb85a161ce`. `tools/pages.ts:113`, `tools/lib/recipient-derivation.ts:63` and `tools/lib/message-to-person.ts:34` were routed through `pageTypeOf` at `d222c5c37e`. Swept 2026-08-28 across `tools/`, `page/`, `pages-system/` and `shared/` for `PAGE_TYPE_SLUG` as its own token: no reader is left, and the constant at `page/text/text.ts:7` has no importer. The same sweep for `DOMAIN_PARENTS_KEY` returned nine.

Not measured: whether a check carrying `check-on-patch: false`, which does not run on a write, would catch a disagreement.
