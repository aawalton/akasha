import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theBeatles2RevolverSuperDeluxe = {
  id: "01a0676a-d728-7000-a9ae-2cb270d32ff7",
  type: "release",
  slug: "the-beatles-2-revolver-super-deluxe",
  title: "Revolver (Super Deluxe)",
  partOfCollections: ["artist/the-beatles"],
  position: 0,
  ownLength: 162.292317,
  ownProgress: 162.292317,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-10-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7C221PnWhYGv8Tc0xSbfdc",
      externalLink: "https://open.spotify.com/album/7C221PnWhYGv8Tc0xSbfdc",
    },
  ],
} as const satisfies Release
