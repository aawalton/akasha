import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsShotsEp = {
  id: "01a0676a-d728-7078-9f2b-a59f3940ed5c",
  type: "page-type/release",
  slug: "imagine-dragons-shots-ep",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2015-05-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5R4Ak5SlTSaVnXNZQQ5CX2",
      externalLink: "https://open.spotify.com/album/5R4Ak5SlTSaVnXNZQQ5CX2",
    },
  ],
  title: "Shots EP",
} as const satisfies Release
