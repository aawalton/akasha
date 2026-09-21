import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayRevolutionRadio = {
  id: "01a0676a-d727-7073-aafe-71ad14e48863",
  type: "page-type/release",
  slug: "green-day-revolution-radio",
  title: "Revolution Radio",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 44.634383,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  grade: "C",
  publishedAt: "2016-10-07",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5a3LqvNt2nv1B4aRKXmgOV",
      externalLink: "https://open.spotify.com/album/5a3LqvNt2nv1B4aRKXmgOV",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
