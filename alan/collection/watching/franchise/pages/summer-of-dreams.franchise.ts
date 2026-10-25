import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const summerOfDreams = {
  id: "01a17497-195b-7a08-9805-a71afffa76ed",
  type: "page-type/franchise",
  slug: "summer-of-dreams",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "801268",
      externalLink: "https://www.themoviedb.org/collection/801268",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Summer of Dreams",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
