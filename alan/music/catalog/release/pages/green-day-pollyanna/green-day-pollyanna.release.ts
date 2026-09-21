import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayPollyanna = {
  id: "01a0676a-d727-7003-965b-7b5f87bccd29",
  type: "page-type/release",
  slug: "green-day-pollyanna",
  title: "Pollyanna",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 3.250283,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  grade: "C",
  publishedAt: "2021-05-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "21i1bokXCRyRyszxxNvX19",
      externalLink: "https://open.spotify.com/album/21i1bokXCRyRyszxxNvX19",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
