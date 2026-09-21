import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayTheHardestPart = {
  id: "01a0676a-d72d-701f-9844-1c30514b04fa",
  type: "page-type/release",
  slug: "coldplay-the-hardest-part",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2006-04-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2dlacdThpQkKMsjHIomtu8",
      externalLink: "https://open.spotify.com/album/2dlacdThpQkKMsjHIomtu8",
    },
  ],
  title: "The Hardest Part",
} as const satisfies Release
