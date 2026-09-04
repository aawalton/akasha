import type { Finding } from "../finding.page-type.ts"

export const temperWorldZoneAndTemperZoneAreTwoPageTypesWithNoRelationBetweenThem = {
  id: "01a06175-dbd4-7000-94a3-9398b35fd057",
  pageTypeSlug: "finding",
  slug: "temper-world-zone-and-temper-zone-are-two-page-types-with-no-relation-between-them",
  domainSlug: "domain/temper",
  claim:
    "The recreation added `temper-world-zone` with 65 pages beside the existing `temper-zone` with 23, and no relation between the two page types is stated. 22 of the 23 `temper-zone` titles are also `temper-world-zone` titles. The overlap is a coincidence of subject rather than a partial view, and the honest fix is a rename: `temper-zone` is a scribing zone and would be better slugged `temper-scribing-zone`.",
  evidence:
    "Measured on 2026-09-02, after reading `the-temper-zone-pages-are-scribing-zones-rather-than-a-partial-world.finding.ts`.\n\n`temper-zone` requires `dropsScripts` and `isDlc`, and 22 of its 23 pages answer `dropsScripts` true. A page is there because the zone drops scribing scripts. `temper-world-zone` holds a page for every zone the three completion captures name, and requires neither property.\n\n22 of the 23 `temper-zone` titles appear among the 65 `temper-world-zone` titles. The one that does not is Telvanni Peninsula, which appears in none of the captured tables.\n\nSo two page types now carry a page titled Blackwood, a page titled Galen and 20 more such pairs, with different slugs under different page types and no property joining them. A reader asking whether Galen drops scripts reaches `temper-zone`; a reader asking what quests Galen holds reaches `temper-world-zone`.\n\nThe duplication is in the titles rather than in the facts, and it is bearable. What is misleading is the slug: `temper-zone` reads as the general zone and is the narrow one. Renaming it `temper-scribing-zone` would say what the 23 pages are for and would leave `temper-world-zone` as the plain gazetteer. That rename touches the page type, 23 page files, the generator `temper-scribing-sources` and the wiring, so it was not taken inside this seat.",
} as const satisfies Finding
