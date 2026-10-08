import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayGimmeSomeTruth = {
  id: "01a0676a-d71e-7064-a48f-00640f448e04",
  type: "page-type/release",
  slug: "green-day-gimme-some-truth",
  title: "Gimme Some Truth",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 2.806183,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  grade: "C",
  publishedAt: "2020-11-06",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6zsIodzWhcym0OVyi8DQnR",
      externalLink: "https://open.spotify.com/album/6zsIodzWhcym0OVyi8DQnR",
      lastSyncedAt: "2025-10-04",
    },
  ],
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
