import type { Finding } from "../finding.page-type.ts"

export const aCollectionStatesTheUnitOfALengthItCarriesNoPropertyFor = {
  id: "01a064c1-d029-7eb3-bc31-acad90dfd6d6",
  pageTypeSlug: "finding",
  slug: "a-collection-states-the-unit-of-a-length-it-carries-no-property-for",
  domainSlug: "domain/collection-system",
  claim:
    "`collection` declares the unit a length is counted in and declares no length, so every kind of collection that measures itself has to define a length property of its own.",
  evidence:
    "`collection.page-type.ts` declares `unit-slug`, defined as `what a collection's own lengths are counted in`. Its eleven declared properties are author, completed-at, description, following, part-of-slugs, position, published-at, rank, status, tags and unit-slug. None of them is a length. The plural in that definition says more than one length was expected. Migrating the story engine met this twice. `own-length` was defined at `c393e69597` under `story-chapters-played` because `story-chapter-played` needed a word count, and `story-turn-played` reused it at `ac8bd02771` rather than defining a second one. 262 pages now carry it: 123 chapters landed at `4847375a84` and 139 turns landed at `e9116d8e1c`, every one of them counted in `words`. A third kind of collection wanting a length would reach across two domains to find the property, or define a third. The property already carries a gap invariant saying a collection carries this rather than each kind of collection, so the observation is recorded where it is used but not where it would be fixed.",
} as const satisfies Finding
