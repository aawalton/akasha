import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallTheChristmasBox = {
  id: "01a0676a-d72c-703f-9e5c-527bfffa51b6",
  type: "page-type/release",
  slug: "paul-cardall-the-christmas-box",
  title: "The Christmas Box",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 49.373267,
  ownProgress: 49.373267,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1997-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "13Gz376bMCKmwVUt3lzQHg",
      externalLink: "https://open.spotify.com/album/13Gz376bMCKmwVUt3lzQHg",
    },
  ],
} as const satisfies Release
