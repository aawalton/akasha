import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonNeverEnough = {
  id: "01a0676a-d725-7047-a755-0433f4822b3f",
  type: "page-type/release",
  slug: "kelly-clarkson-never-enough",
  title: "Never Enough",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 3.4022166666666664,
  ownProgress: 3.402217,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-11-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3THom8qoWFJIQZ8oUHU2uX",
      externalLink: "https://open.spotify.com/album/3THom8qoWFJIQZ8oUHU2uX",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Release
