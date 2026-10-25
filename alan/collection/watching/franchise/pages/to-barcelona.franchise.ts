import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const toBarcelona = {
  id: "01a17497-195c-73a7-8896-e7902c242363",
  type: "page-type/franchise",
  slug: "to-barcelona",
  partOfCollections: ["show-collection/hallmark-romance"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1498418",
      externalLink: "https://www.themoviedb.org/collection/1498418",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "To Barcelona",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
