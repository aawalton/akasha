import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonCreepLive = {
  id: "01a0676a-d71b-703e-a722-50cbdfaabb69",
  type: "page-type/release",
  slug: "kelly-clarkson-creep-live",
  title: "Creep (Live)",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 4.142433333333333,
  ownProgress: 4.142433,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-11-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2r268tkOLN0DoaA9zPBrbP",
      externalLink: "https://open.spotify.com/album/2r268tkOLN0DoaA9zPBrbP",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Release
