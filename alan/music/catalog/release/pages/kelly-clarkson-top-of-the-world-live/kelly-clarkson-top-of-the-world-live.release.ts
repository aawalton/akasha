import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonTopOfTheWorldLive = {
  id: "01a0676a-d72f-7015-abd9-fb130f59f6d4",
  type: "page-type/release",
  slug: "kelly-clarkson-top-of-the-world-live",
  title: "Top of the World (Live)",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-11-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7zkWoyqV3PnXhCkYNC1eaR",
      externalLink: "https://open.spotify.com/album/7zkWoyqV3PnXhCkYNC1eaR",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
