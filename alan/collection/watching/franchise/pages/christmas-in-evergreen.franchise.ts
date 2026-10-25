import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const christmasInEvergreen = {
  id: "01a17497-1958-7b26-99b0-0d21942039a5",
  type: "page-type/franchise",
  slug: "christmas-in-evergreen",
  partOfCollections: ["show-collection/hallmark-christmas"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "650446",
      externalLink: "https://www.themoviedb.org/collection/650446",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Evergreen",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
