import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const auroraTeagardenMystery = {
  id: "01a17497-1958-7ef1-847c-27a6c6226bb1",
  type: "page-type/franchise",
  slug: "aurora-teagarden-mystery",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "521293",
      externalLink: "https://www.themoviedb.org/collection/521293",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Aurora Teagarden Mystery",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
