import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeIntoYou3lauRemix = {
  id: "01a0676a-d721-707b-877b-6a3a549c4451",
  type: "page-type/release",
  slug: "ariana-grande-into-you-3lau-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2016-08-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3c5hq7WzAnJapzz9CNuuLl",
      externalLink: "https://open.spotify.com/album/3c5hq7WzAnJapzz9CNuuLl",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Into You (3LAU Remix)",
} as const satisfies Release
