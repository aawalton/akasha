import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayEverglow = {
  id: "01a0676a-d71d-702e-920a-f764d26e8fc8",
  type: "page-type/release",
  slug: "coldplay-everglow",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2016-11-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6LRAUvjNMdUieHc8RcpHQU",
      externalLink: "https://open.spotify.com/album/6LRAUvjNMdUieHc8RcpHQU",
    },
  ],
  title: "Everglow",
} as const satisfies Release
