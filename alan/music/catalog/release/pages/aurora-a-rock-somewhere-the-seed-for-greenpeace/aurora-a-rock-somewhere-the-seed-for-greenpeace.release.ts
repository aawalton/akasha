import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraARockSomewhereTheSeedForGreenpeace = {
  id: "01a0676a-d715-703b-b9b9-6349dba9bb49",
  type: "page-type/release",
  slug: "aurora-a-rock-somewhere-the-seed-for-greenpeace",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2025-06-25",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "39zbaKAaOA8vmePCGaIoYP",
      externalLink: "https://open.spotify.com/album/39zbaKAaOA8vmePCGaIoYP",
    },
  ],
  title: "A Rock Somewhere / The Seed (For Greenpeace)",
} as const satisfies Release
