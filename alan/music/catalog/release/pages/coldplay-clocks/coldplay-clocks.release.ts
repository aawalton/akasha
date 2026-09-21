import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayClocks = {
  id: "01a0676a-d71b-7001-8751-fbdaa24e39a4",
  type: "page-type/release",
  slug: "coldplay-clocks",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2003-03-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1hnFNY7vQA0VipdplCdhPJ",
      externalLink: "https://open.spotify.com/album/1hnFNY7vQA0VipdplCdhPJ",
    },
  ],
  title: "Clocks",
} as const satisfies Release
