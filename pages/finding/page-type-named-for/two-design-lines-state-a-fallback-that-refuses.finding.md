---
id: 1e4e9afd-b7b9-5ce4-a650-87d93603c7c1
slug: two-design-lines-state-a-fallback-that-refuses
page-type-slug: finding
title: "Two Design entries state a naming fallback where the code refuses"
domain-slug: page-property-definition/page-type-named-for
---

# Claim

Two of this property's Design entries state a behaviour the naming code does not have. Both
describe a fallback where the code refuses. Measured 2026-08-20 by calling the functions.

# Evidence

**The `-2` and `-3` half of the entry at :26 is false.** It says "a second page the rule names
the same takes `-2`, then `-3`." `createFilePage` at `file-write.ts:284` fills the rule, finds a
page already standing at that name, and where the name was not stated calls `refuseTakenName`,
which throws. Its own words: "A filled rule is an address rather than a label, so two pages
cannot hold one: filing this beside it as `hello-2` would leave two pages nothing can tell apart
afterwards." So a collision is refused; a suffix appears only in the refusal text, as the thing
that will not happen.

The rest of :26 holds. `pageStem` at `file-name.ts:18` folds to lower case and dashes every run
of non-alphanumeric characters; `STEM_CEILING` is 71 and a longer stem is trimmed to it.
`pageStem("Hello There! Ångström")` gives `hello-there-angstrom`, and 100 characters give 71.
Two things :26 omits: the text is NFKD-normalised with diacritics stripped, and apostrophes are
removed rather than dashed.

**The entry at :28 is false outright.** It says "A page whose rule leaves a hole unfilled is
named `untitled`." `nameForNew` throws instead: run with the rule `{title}-{year}` and no
values, it raises "a file page is named by the path it stands at, and this write states no name
... this write carries no `title:`, no `year:`." `filledName` returns `{ok:false,
holes:["title"]}` and every caller of it refuses.

There is an `untitled` in the tree and it is a different thing: `FALLBACK_SLUG` in
`@shared/pages-url` is a URL stem, and `"Untitled"` is a label for a relation target with a
blank title. Neither names a page.

Both corrected entries would be **departures**: a reader guesses the forgiving behaviour, and
guessing it leads them to remove the refusal.
