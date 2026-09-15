import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxe = {
  id: "01a0676a-d725-705c-9a88-637db926799b",
  type: "release",
  slug: "imagine-dragons-night-visions-deluxe",
  title: "Night Visions (Deluxe)",
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  ownLength: 62.081467,
  ownProgress: 62.081467,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-09-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1rzDtYMpZDhRgKNigB467r",
      externalLink: "https://open.spotify.com/album/1rzDtYMpZDhRgKNigB467r",
    },
  ],
} as const satisfies Release
