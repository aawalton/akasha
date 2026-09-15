import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerUnsteady = {
  id: "01a0676a-d72f-7048-99f7-c91fcf4a1b9b",
  type: "release",
  slug: "jada-facer-unsteady",
  title: "Unsteady",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.93815,
  ownProgress: 2.93815,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-05-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6FJZibc6mweTNNnQCeFs3w",
      externalLink: "https://open.spotify.com/album/6FJZibc6mweTNNnQCeFs3w",
    },
  ],
} as const satisfies Release
