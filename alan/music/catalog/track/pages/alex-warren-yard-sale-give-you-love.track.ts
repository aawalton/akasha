import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexWarrenYardSaleGiveYouLove = {
  id: "01a0a59d-d298-71e8-b14a-10fe7cd6157e",
  type: "page-type/track",
  slug: "alex-warren-yard-sale-give-you-love",
  ownLength: 3.05665,
  ownProgress: 0,
  partOfCollections: ["release/alex-warren-yard-sale"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4nL85FDuRf54fbEsOLf6qJ",
      externalLink: "https://open.spotify.com/track/4nL85FDuRf54fbEsOLf6qJ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Give You Love",
} as const satisfies Track
