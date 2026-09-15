import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayClocks = {
  id: "01a0676a-d71b-7001-8751-fbdaa24e39a4",
  type: "release",
  slug: "coldplay-clocks",
  title: "Clocks",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 14.349517,
  ownProgress: 14.349517,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2003-03-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1hnFNY7vQA0VipdplCdhPJ",
      externalLink: "https://open.spotify.com/album/1hnFNY7vQA0VipdplCdhPJ",
    },
  ],
} as const satisfies Release
