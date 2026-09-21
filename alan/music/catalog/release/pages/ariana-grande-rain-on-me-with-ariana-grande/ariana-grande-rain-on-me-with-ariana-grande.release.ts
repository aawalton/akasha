import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeRainOnMeWithArianaGrande = {
  id: "01a0676a-d727-7047-b053-96bdbaa2de63",
  type: "page-type/release",
  slug: "ariana-grande-rain-on-me-with-ariana-grande",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2020-05-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4TqgXMSSTwP3RCo3MMSR6t",
      externalLink: "https://open.spotify.com/album/4TqgXMSSTwP3RCo3MMSR6t",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Rain On Me (with Ariana Grande)",
} as const satisfies Release
