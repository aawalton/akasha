import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallMourningLight = {
  id: "01a0676a-d725-700d-a2bd-6d1994e027b3",
  type: "page-type/release",
  slug: "paul-cardall-mourning-light",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2024-07-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7373Owl7OvEKdntWLuSkJL",
      externalLink: "https://open.spotify.com/album/7373Owl7OvEKdntWLuSkJL",
    },
  ],
  title: "Mourning Light",
} as const satisfies Release
