import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersStrangerInTheAlpsDeluxeEdition = {
  id: "01a0676a-d72a-702a-bae8-b10cb509324d",
  type: "page-type/release",
  slug: "phoebe-bridgers-stranger-in-the-alps-deluxe-edition",
  title: "Stranger in the Alps (Deluxe Edition)",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 51.4988,
  ownProgress: 51.4988,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-10-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5rcJ5xCMYYLCgGilFDKRZl",
      externalLink: "https://open.spotify.com/album/5rcJ5xCMYYLCgGilFDKRZl",
    },
  ],
} as const satisfies Release
