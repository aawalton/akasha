import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraTheWomanIAmAcoustic = {
  id: "01a0676a-d72e-701f-aad4-dfe3cd6bd0e2",
  type: "page-type/release",
  slug: "aurora-the-woman-i-am-acoustic",
  title: "The Woman I Am (Acoustic)",
  partOfCollections: ["artist/aurora"],
  position: 0,
  ownLength: 6.734,
  ownProgress: 6.734,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-05-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "69EwxNZ9bOQLUrytcZwsf5",
      externalLink: "https://open.spotify.com/album/69EwxNZ9bOQLUrytcZwsf5",
    },
  ],
} as const satisfies Release
