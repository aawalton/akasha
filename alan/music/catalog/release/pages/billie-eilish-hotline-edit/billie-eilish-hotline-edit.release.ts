import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishHotlineEdit = {
  id: "01a0676a-d720-7065-9b3c-2aede4f2104c",
  type: "page-type/release",
  slug: "billie-eilish-hotline-edit",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2023-05-09",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5iq9BytomHl2yBtORjUlzP",
      externalLink: "https://open.spotify.com/album/5iq9BytomHl2yBtORjUlzP",
    },
  ],
  title: "hotline (edit)",
} as const satisfies Release
