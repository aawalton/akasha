import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const theNote = {
  id: "01a17497-195c-7d2d-b6c5-519550c188c9",
  type: "page-type/franchise",
  slug: "the-note",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "741682",
      externalLink: "https://www.themoviedb.org/collection/741682",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Note",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
