import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const jlFamilyRanch = {
  id: "01a17497-195a-7eeb-8eda-304b3e876373",
  type: "page-type/franchise",
  slug: "jl-family-ranch",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1064214",
      externalLink: "https://www.themoviedb.org/collection/1064214",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "JL Family Ranch",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
