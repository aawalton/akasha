import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const murder101 = {
  id: "01a17497-195a-7066-b045-fadd41d461a8",
  type: "page-type/franchise",
  slug: "murder-101",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "731413",
      externalLink: "https://www.themoviedb.org/collection/731413",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Murder 101",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
