import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverTheMan = {
  id: "01a0ce86-6e4d-7b0e-9d1a-444702479962",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-the-man",
  ownLength: 3.1726666666666667,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Man",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "theman|06HL4z0CvFAxyc27GXpf02|190360",
  song: "song/taylor-swift-the-man",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 4,
      externalId: "3RauEVgRgj1IuWdJ9fDs70",
      externalLink: "https://open.spotify.com/track/3RauEVgRgj1IuWdJ9fDs70",
    },
  ],
} as const satisfies Track
