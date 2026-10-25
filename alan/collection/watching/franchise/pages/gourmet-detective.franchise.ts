import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const gourmetDetective = {
  id: "01a17497-1959-7221-a042-06c384747f94",
  type: "page-type/franchise",
  slug: "gourmet-detective",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "364342",
      externalLink: "https://www.themoviedb.org/collection/364342",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Gourmet Detective",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
