import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Landslide = {
  id: "01a0676a-d722-705a-a243-56c23391117f",
  type: "release",
  slug: "the-piano-guys-3-landslide",
  title: "Landslide",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 6.181483,
  ownProgress: 6.181483,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-10-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6BUZTu3OY8K7NDNyLeOvcE",
      externalLink: "https://open.spotify.com/album/6BUZTu3OY8K7NDNyLeOvcE",
    },
  ],
} as const satisfies Release
