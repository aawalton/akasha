import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayKidsInAmerica = {
  id: "01a0676a-d722-703f-8290-936df04a30d8",
  type: "page-type/release",
  slug: "green-day-kids-in-america",
  title: "Kids in America",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 3.14595,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  rank: "C",
  publishedAt: "2020-09-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1vkImX94Ko16MnEb5kUca8",
      externalLink: "https://open.spotify.com/album/1vkImX94Ko16MnEb5kUca8",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
