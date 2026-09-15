import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theBeatles2SgtPepperSLonelyHeartsClubBandSuperDeluxeEdition = {
  id: "01a0676a-d728-7068-a7c3-0022098ed15b",
  type: "page-type/release",
  slug: "the-beatles-2-sgt-pepper-s-lonely-hearts-club-band-super-deluxe-edition",
  title: "Sgt. Pepper's Lonely Hearts Club Band (Super Deluxe Edition)",
  partOfCollections: ["artist/the-beatles"],
  position: 0,
  ownLength: 203.7068,
  ownProgress: 203.7068,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1967-05-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ntNLgaYCFCkeW4flGYlY2",
      externalLink: "https://open.spotify.com/album/1ntNLgaYCFCkeW4flGYlY2",
    },
  ],
} as const satisfies Release
