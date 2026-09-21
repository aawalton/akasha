import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3PicturesAtAnExhibition = {
  id: "01a0676a-d726-707c-ac58-555e815fe5c9",
  type: "page-type/release",
  slug: "the-piano-guys-3-pictures-at-an-exhibition",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2020-05-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4AHhW9QiXILmC8lMwClxUn",
      externalLink: "https://open.spotify.com/album/4AHhW9QiXILmC8lMwClxUn",
    },
  ],
  title: "Pictures at an Exhibition",
} as const satisfies Release
