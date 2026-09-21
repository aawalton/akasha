import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonIWouldLikeGorgonCityRemix = {
  id: "01a0676a-d721-7049-bb8d-e2370d97d059",
  type: "page-type/release",
  slug: "zara-larsson-i-would-like-gorgon-city-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2016-12-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gCqvEj5wVUNCHIEtm26up",
      externalLink: "https://open.spotify.com/album/1gCqvEj5wVUNCHIEtm26up",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "I Would Like (Gorgon City Remix)",
} as const satisfies Release
