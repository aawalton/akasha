import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraTheWomanIAmAcoustic = {
  id: "01a0676a-d72e-701f-aad4-dfe3cd6bd0e2",
  type: "page-type/release",
  slug: "aurora-the-woman-i-am-acoustic",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2022-05-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "69EwxNZ9bOQLUrytcZwsf5",
      externalLink: "https://open.spotify.com/album/69EwxNZ9bOQLUrytcZwsf5",
    },
  ],
  title: "The Woman I Am (Acoustic)",
  createdAt: "2026-09-03T13:17:30.286Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
