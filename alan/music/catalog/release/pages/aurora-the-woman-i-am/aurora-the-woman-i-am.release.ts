import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraTheWomanIAm = {
  id: "01a0676a-d72e-701e-af27-60916f99fd1c",
  type: "page-type/release",
  slug: "aurora-the-woman-i-am",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2022-04-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2wxj6J6Ss8BbPQf2VJoEsr",
      externalLink: "https://open.spotify.com/album/2wxj6J6Ss8BbPQf2VJoEsr",
    },
  ],
  title: "The Woman I Am",
  createdAt: "2026-09-03T13:17:30.286Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
