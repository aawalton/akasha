import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2 = {
  id: "01a0676a-d72d-7055-b83b-1c5f06ac45f2",
  type: "page-type/release",
  slug: "the-piano-guys-3-the-piano-guys-2",
  ownLength: 52.093717,
  ownProgress: 52.239583333333336,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2013-05-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5iCNAC5zJYnO90r0dcXq4u",
      externalLink: "https://open.spotify.com/album/5iCNAC5zJYnO90r0dcXq4u",
    },
  ],
  title: "The Piano Guys 2",
} as const satisfies Release
