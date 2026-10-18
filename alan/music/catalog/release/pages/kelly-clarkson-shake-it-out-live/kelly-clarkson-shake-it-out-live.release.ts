import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonShakeItOutLive = {
  id: "01a0676a-d728-706b-a42b-08d962cf7a66",
  type: "page-type/release",
  slug: "kelly-clarkson-shake-it-out-live",
  title: "Shake It Out (Live)",
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
      externalId: "64WFAcZ75ZooFZLiTmsoUR",
      externalLink: "https://open.spotify.com/album/64WFAcZ75ZooFZLiTmsoUR",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
