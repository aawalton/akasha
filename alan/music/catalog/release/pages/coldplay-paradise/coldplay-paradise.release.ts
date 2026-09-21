import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayParadise = {
  id: "01a0676a-d726-705c-9c23-118fe2792725",
  type: "page-type/release",
  slug: "coldplay-paradise",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2011-09-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4DvSBRBGE20LBDoMOWjwmj",
      externalLink: "https://open.spotify.com/album/4DvSBRBGE20LBDoMOWjwmj",
    },
  ],
  title: "Paradise",
} as const satisfies Release
