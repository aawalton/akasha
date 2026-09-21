import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonDonTWorryBoutMeRemixes = {
  id: "01a0676a-d71c-7027-bb24-b8f0716e7da2",
  type: "page-type/release",
  slug: "zara-larsson-don-t-worry-bout-me-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2019-05-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3oEW0zWluwima7PXrGi8aF",
      externalLink: "https://open.spotify.com/album/3oEW0zWluwima7PXrGi8aF",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Don't Worry Bout Me (Remixes)",
} as const satisfies Release
