import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2InThePocket2019Remaster = {
  id: "01a0676a-d721-706b-a3a3-f366f346dff8",
  type: "page-type/release",
  slug: "james-taylor-2-in-the-pocket-2019-remaster",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "1976-06-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "45fMwpxS1ZOMqNt8Rq5pxP",
      externalLink: "https://open.spotify.com/album/45fMwpxS1ZOMqNt8Rq5pxP",
    },
  ],
  title: "In the Pocket (2019 Remaster)",
} as const satisfies Release
