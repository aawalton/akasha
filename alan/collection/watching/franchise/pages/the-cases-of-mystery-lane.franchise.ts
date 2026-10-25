import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const theCasesOfMysteryLane = {
  id: "01a17497-195b-7019-857b-50cc609ccc48",
  type: "page-type/franchise",
  slug: "the-cases-of-mystery-lane",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1256392",
      externalLink: "https://www.themoviedb.org/collection/1256392",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Cases of Mystery Lane",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
