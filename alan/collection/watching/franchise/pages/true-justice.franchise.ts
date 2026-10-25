import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const trueJustice = {
  id: "01a17497-195c-7039-892b-ec9feb0e096d",
  type: "page-type/franchise",
  slug: "true-justice",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1594523",
      externalLink: "https://www.themoviedb.org/collection/1594523",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "True Justice",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
