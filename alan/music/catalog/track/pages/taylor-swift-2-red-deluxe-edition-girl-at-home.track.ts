import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedDeluxeEditionGirlAtHome = {
  id: "01a0ce86-86a4-76b3-bb1b-74640a7e98a6",
  type: "page-type/track",
  slug: "taylor-swift-2-red-deluxe-edition-girl-at-home",
  ownLength: 3.672,
  ownProgress: 3.672,
  partOfCollections: ["release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Girl At Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "girlathome|06HL4z0CvFAxyc27GXpf02|220320",
  song: "song/taylor-swift-girl-at-home",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 19,
      externalId: "6cf6rLb8qcklvJv90W6HCW",
      externalLink: "https://open.spotify.com/track/6cf6rLb8qcklvJv90W6HCW",
    },
  ],
} as const satisfies Track
