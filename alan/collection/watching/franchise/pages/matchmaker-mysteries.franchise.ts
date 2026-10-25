import type { Franchise } from "akasha/alan/collection/watching/franchise/franchise.page-type.types.ts"

export const matchmakerMysteries = {
  id: "01a17497-195a-7390-841c-1d9a1c536ba3",
  type: "page-type/franchise",
  slug: "matchmaker-mysteries",
  partOfCollections: ["show-collection/hallmark-mystery"],
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "703722",
      externalLink: "https://www.themoviedb.org/collection/703722",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "MatchMaker Mysteries",
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Franchise
