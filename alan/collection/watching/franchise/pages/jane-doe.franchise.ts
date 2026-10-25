import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const janeDoe = {
  id: "01a17497-195a-7130-90af-f36189879006",
  type: "page-type/franchise",
  slug: "jane-doe",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "68687",
      externalLink: "https://www.themoviedb.org/collection/68687",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jane Doe",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
