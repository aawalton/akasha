import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedDeluxeEditionStateOfGraceAcoustic = {
  id: "01a0ce86-8717-720b-bab7-471eae3e3638",
  type: "page-type/track",
  slug: "taylor-swift-2-red-deluxe-edition-state-of-grace-acoustic",
  ownLength: 5.384666666666667,
  ownProgress: 5.384666666666667,
  partOfCollections: ["release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "State Of Grace - Acoustic",
  trackType: "acoustic",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "stateofgraceacoustic|06HL4z0CvFAxyc27GXpf02|323080",
  song: "song/taylor-swift-state-of-grace",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 22,
      externalId: "5G9AVKld9q7DCrmoY42raf",
      externalLink: "https://open.spotify.com/track/5G9AVKld9q7DCrmoY42raf",
    },
  ],
} as const satisfies Track
