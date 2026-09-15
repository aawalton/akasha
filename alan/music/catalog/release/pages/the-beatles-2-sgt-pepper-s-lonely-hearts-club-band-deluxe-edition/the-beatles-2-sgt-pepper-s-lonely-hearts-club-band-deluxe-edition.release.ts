import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theBeatles2SgtPepperSLonelyHeartsClubBandDeluxeEdition = {
  id: "01a0676a-d728-7066-88a8-0cf82199ff96",
  type: "page-type/release",
  slug: "the-beatles-2-sgt-pepper-s-lonely-hearts-club-band-deluxe-edition",
  title: "Sgt. Pepper's Lonely Hearts Club Band (Deluxe Edition)",
  partOfCollections: ["artist/the-beatles"],
  position: 0,
  ownLength: 100.151217,
  ownProgress: 100.151217,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1967-06-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6b7ycwe2rxq6FkaupNuGoS",
      externalLink: "https://open.spotify.com/album/6b7ycwe2rxq6FkaupNuGoS",
    },
  ],
} as const satisfies Release
