import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaTheCelts2 = {
  id: "01a0676a-d72c-703d-8f20-6a326f27cf10",
  type: "page-type/release",
  slug: "enya-the-celts-2",
  title: "The Celts",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 41.418767,
  ownProgress: 41.418767,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1987-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3qPIe6YsuQ0qzg6bSEQjfv",
      externalLink: "https://open.spotify.com/album/3qPIe6YsuQ0qzg6bSEQjfv",
    },
  ],
} as const satisfies Release
