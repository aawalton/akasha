import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayEverydayLife = {
  id: "01a0676a-d71d-703a-ade5-0292b88685cc",
  type: "page-type/release",
  slug: "coldplay-everyday-life",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2019-11-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2FeyIYDDAQqcOJKOKhvHdr",
      externalLink: "https://open.spotify.com/album/2FeyIYDDAQqcOJKOKhvHdr",
    },
  ],
  title: "Everyday Life",
} as const satisfies Release
