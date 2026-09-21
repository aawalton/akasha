import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallTheChristmasBox = {
  id: "01a0676a-d72c-703f-9e5c-527bfffa51b6",
  type: "page-type/release",
  slug: "paul-cardall-the-christmas-box",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "1997-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "13Gz376bMCKmwVUt3lzQHg",
      externalLink: "https://open.spotify.com/album/13Gz376bMCKmwVUt3lzQHg",
    },
  ],
  title: "The Christmas Box",
} as const satisfies Release
