import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonUnderTheMistletoe = {
  id: "01a0676a-d72f-7035-9b88-6e7239484897",
  type: "page-type/release",
  slug: "kelly-clarkson-under-the-mistletoe",
  title: "Under The Mistletoe",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-10-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2nndXLmS4C16yX7UJBWW2U",
      externalLink: "https://open.spotify.com/album/2nndXLmS4C16yX7UJBWW2U",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
