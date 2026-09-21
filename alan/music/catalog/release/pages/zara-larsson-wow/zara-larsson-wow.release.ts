import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonWow = {
  id: "01a0676a-d731-7039-96bf-a12d91c194ff",
  type: "page-type/release",
  slug: "zara-larsson-wow",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2019-04-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4fiVXwnHbreMbcOw1MKFhl",
      externalLink: "https://open.spotify.com/album/4fiVXwnHbreMbcOw1MKFhl",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "WOW",
} as const satisfies Release
