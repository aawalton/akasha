import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const nellyKnowsMysteries = {
  id: "01a17497-195b-75c0-9fe1-08383a8d29dd",
  type: "page-type/franchise",
  slug: "nelly-knows-mysteries",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1630005",
      externalLink: "https://www.themoviedb.org/collection/1630005",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Nelly Knows Mysteries",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
