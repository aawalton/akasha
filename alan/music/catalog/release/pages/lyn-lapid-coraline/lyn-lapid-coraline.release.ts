import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidCoraline = {
  id: "01a0676a-d71b-7029-bba6-7288bafea8f3",
  type: "page-type/release",
  slug: "lyn-lapid-coraline",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2025-01-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5mfxTjYFFXaQ1MIqxybwU2",
      externalLink: "https://open.spotify.com/album/5mfxTjYFFXaQ1MIqxybwU2",
    },
  ],
  title: "coraline",
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-22T14:00:43.000Z",
} as const satisfies Release
