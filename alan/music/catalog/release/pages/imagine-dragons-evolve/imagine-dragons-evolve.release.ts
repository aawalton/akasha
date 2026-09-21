import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsEvolve = {
  id: "01a0676a-d71d-7049-a779-804375c15aae",
  type: "page-type/release",
  slug: "imagine-dragons-evolve",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2017-06-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "33pt9HBdGlAbRGBHQgsZsU",
      externalLink: "https://open.spotify.com/album/33pt9HBdGlAbRGBHQgsZsU",
    },
  ],
  title: "Evolve",
} as const satisfies Release
