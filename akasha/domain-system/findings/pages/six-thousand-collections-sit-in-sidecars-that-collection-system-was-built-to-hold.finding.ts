import type { Finding } from "../finding.page-type.ts"

export const sixThousandCollectionsSitInSidecarsThatCollectionSystemWasBuiltToHold = {
  id: "01a0657f-0c53-7002-9a9a-88f0ed0cb960",
  pageTypeSlug: "finding",
  slug: "six-thousand-collections-sit-in-sidecars-that-collection-system-was-built-to-hold",
  domainSlug: "domain/collection-system",
  claim:
    "The 32 `collection-type` pages are in akasha and the 6,104 collections they gather are not. Those records stand in 23 `.collections.jsonl` files still under `pages/collection-type/`, and their fields already match the properties `collection` and `collection-external` declare, key for key. They were deliberately left in place rather than migrated, because the collection-system lane was landing against those same properties while this ran.",
  evidence:
    "Counted over all 23 sidecars: 6,104 records. Their key union and counts are id 6104, slug 6104, title 6104, position 6104, unit 6104, ownLength 6103, type 6102, ownProgress 6101, status 6101, rank 6099, partOf 6085, externalId 5416, externalLink 4118, publishedAt 4056, lastSyncedAt 2201, tags 56.\n\nEvery one of those has a home already. `collection.page-type.ts` declares collection-author, collection-completed-at, collection-description, following, part-of-slugs, position, collection-published-at, rank, status, collection-tags and unit-slug; `own-length` and `own-progress` were added to that folder at 21:34 on the same day this migration ran. `collection-external.page-type.ts` declares external-id, external-link, last-synced-at and source. `type` is what the new `collection-type` page type names.\n\nAt the time of writing, `find akasha -name '*.collection.ts'` returns 0. Six thousand pages is a larger accretion than this lane's whole brief, and landing them while another lane was designing their properties would have modelled the same records twice. The sidecars are unablated and complete, so the expansion is a mechanical pass whenever the collection-system lane wants it.",
} as const satisfies Finding
