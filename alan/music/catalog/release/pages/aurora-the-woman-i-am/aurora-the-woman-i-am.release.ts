import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraTheWomanIAm = {
  id: "01a0676a-d72e-701e-af27-60916f99fd1c",
  type: "page-type/release",
  slug: "aurora-the-woman-i-am",
  title: "The Woman I Am",
  partOfCollections: ["artist/aurora"],
  position: 0,
  ownLength: 3.220667,
  ownProgress: 3.220667,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-04-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2wxj6J6Ss8BbPQf2VJoEsr",
      externalLink: "https://open.spotify.com/album/2wxj6J6Ss8BbPQf2VJoEsr",
    },
  ],
} as const satisfies Release
