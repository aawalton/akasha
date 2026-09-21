import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiScatterbrain2 = {
  id: "01a0676a-d728-7055-ba1a-e4c793838da7",
  type: "page-type/release",
  slug: "emei-scatterbrain-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2023-10-20",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7nMsq0A9k3KjCNBPu2RN3v",
      externalLink: "https://open.spotify.com/album/7nMsq0A9k3KjCNBPu2RN3v",
    },
  ],
  title: "Scatterbrain",
} as const satisfies Release
