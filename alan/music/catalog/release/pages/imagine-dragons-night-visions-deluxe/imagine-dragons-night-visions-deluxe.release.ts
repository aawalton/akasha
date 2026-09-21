import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxe = {
  id: "01a0676a-d725-705c-9a88-637db926799b",
  type: "page-type/release",
  slug: "imagine-dragons-night-visions-deluxe",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2012-09-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1rzDtYMpZDhRgKNigB467r",
      externalLink: "https://open.spotify.com/album/1rzDtYMpZDhRgKNigB467r",
    },
  ],
  title: "Night Visions (Deluxe)",
} as const satisfies Release
