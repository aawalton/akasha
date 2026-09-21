import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidCoraline = {
  id: "01a0676a-d71b-7029-bba6-7288bafea8f3",
  type: "page-type/release",
  slug: "lyn-lapid-coraline",
  title: "coraline",
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  ownLength: 2.816883,
  ownProgress: 2.816883,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2025-01-31",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5mfxTjYFFXaQ1MIqxybwU2",
      externalLink: "https://open.spotify.com/album/5mfxTjYFFXaQ1MIqxybwU2",
    },
  ],
} as const satisfies Release
