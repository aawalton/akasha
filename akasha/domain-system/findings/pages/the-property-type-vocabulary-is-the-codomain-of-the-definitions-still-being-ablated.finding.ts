import type { Finding } from "../finding.page-type.ts"

export const thePropertyTypeVocabularyIsTheCodomainOfTheDefinitionsStillBeingAblated = {
  id: "01a06759-4acb-7e78-b1a9-e80c8052496b",
  pageTypeSlug: "finding",
  slug: "the-property-type-vocabulary-is-the-codomain-of-the-definitions-still-being-ablated",
  domainSlug: "domain/ablation",
  claim:
    "The 25 entries left in `pages/page-property-type` are the codomain of the `type:` field on the 1,026 surviving `pages/page-property-definition` files, so they go after that folder empties rather than on this family looking done. The 26 entries nothing named went in a39a3490bc. Removing the rest today would leave 1,026 definitions naming a vocabulary the live validator at `page/property/value.ts:14` resolves from the folder.",
  evidence:
    "Measured 2026-09-03. The folder held 51 files and no sidecars, counted by `find -type f`, by `git ls-files` and by a name match, all three agreeing. Demand per entry was taken from `^type: ` across the surviving definitions and from `defined-on-slug:` and `domain-parent-slug:` naming `page-property-type/<slug>` anywhere under `pages/`. Twenty-two entries are named by a `type:` field, three more only by `defined-on-slug` — reading, temper-grimoire-script and temper-metric-effect — and 26 by nothing at all. text is named 345 times, number 258, instant 56, pages and list 55 each.\n\nThe extractor was proved before it was trusted: a planted definition naming `type: size-md` was found and then taken away. The akasha side was indexed twice, once under ripgrep's own threading and once under `rg -j1`, and both agree on all 51 slugs; the 109 rows that differ are 98 pages landed by other lanes and 11 subagent pages deleted as their agents returned.\n\n`type: select` is named 40 times and has no entry in the folder, because `page/property/value.ts:26` resolves that one in code.\n\nWhat is superseded here is the kind rather than the content, as `the-old-pages-meta-layer-is-replaced-by-akasha-code-rather-than-migrated` already records: akasha makes a property's sort be which of its `*-property` page types the property is. So no page type for this vocabulary belongs inside akasha, and `akasha/pages-system/page-queries/pages/page-property-type-all.page-query.ts` goes when the folder does.",
} as const satisfies Finding
