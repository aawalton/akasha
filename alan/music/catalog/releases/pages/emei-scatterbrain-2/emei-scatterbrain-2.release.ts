import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const emeiScatterbrain2 = {
  id: "01a0676a-d728-7055-ba1a-e4c793838da7",
  type: "release",
  slug: "emei-scatterbrain-2",
  title: "Scatterbrain",
  partOfCollections: ["artist/emei"],
  position: 0,
  ownLength: 16.43215,
  ownProgress: 16.43215,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2023-10-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7nMsq0A9k3KjCNBPu2RN3v",
      externalLink: "https://open.spotify.com/album/7nMsq0A9k3KjCNBPu2RN3v",
    },
  ],
} as const satisfies Release
