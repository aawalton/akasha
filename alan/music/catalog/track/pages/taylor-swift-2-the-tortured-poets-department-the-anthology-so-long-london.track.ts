import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologySoLongLondon = {
  id: "01a0ce86-3d2f-7878-9fe0-7351651a6283",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-so-long-london",
  ownLength: 4.3829,
  ownProgress: 4.3829,
  partOfCollections: [
    "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
    "release/taylor-swift-2-the-tortured-poets-department",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "So Long, London",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "solonglondon|06HL4z0CvFAxyc27GXpf02|262974",
  song: "song/taylor-swift-so-long-london",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department",
      discNumber: 1,
      position: 5,
      externalId: "3Vevii7qKqrmW8CcyzBHDl",
      externalLink: "https://open.spotify.com/track/3Vevii7qKqrmW8CcyzBHDl",
    },
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 5,
      externalId: "7wAkQFShJ27V8362MqevQr",
      externalLink: "https://open.spotify.com/track/7wAkQFShJ27V8362MqevQr",
    },
  ],
} as const satisfies Track
