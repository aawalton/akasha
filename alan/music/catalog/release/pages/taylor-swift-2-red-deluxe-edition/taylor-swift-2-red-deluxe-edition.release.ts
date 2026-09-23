import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2RedDeluxeEdition = {
  id: "01a0676a-d727-705d-ac1d-c9fa162fa303",
  type: "page-type/release",
  slug: "taylor-swift-2-red-deluxe-edition",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2012-10-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1KlU96Hw9nlvqpBPlSqcTV",
      externalLink: "https://open.spotify.com/album/1KlU96Hw9nlvqpBPlSqcTV",
    },
  ],
  title: "Red (Deluxe Edition)",
} as const satisfies Release
