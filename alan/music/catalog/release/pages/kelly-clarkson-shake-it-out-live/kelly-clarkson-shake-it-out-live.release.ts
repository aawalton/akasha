import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonShakeItOutLive = {
  id: "01a0676a-d728-706b-a42b-08d962cf7a66",
  type: "page-type/release",
  slug: "kelly-clarkson-shake-it-out-live",
  title: "Shake It Out (Live)",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 4.481167,
  ownProgress: 4.481167,
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
} as const satisfies Release
