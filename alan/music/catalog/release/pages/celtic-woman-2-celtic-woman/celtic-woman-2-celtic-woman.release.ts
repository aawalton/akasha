import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2CelticWoman = {
  id: "01a0676a-d71a-700b-a15d-05dcf7a466cc",
  type: "page-type/release",
  slug: "celtic-woman-2-celtic-woman",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2005-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1PZVqVnT0vnJaIPJDerch7",
      externalLink: "https://open.spotify.com/album/1PZVqVnT0vnJaIPJDerch7",
    },
  ],
  title: "Celtic Woman",
} as const satisfies Release
