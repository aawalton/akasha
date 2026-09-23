import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyRobin = {
  id: "01a0ce86-3c47-70ea-9eca-aab901b5814e",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-robin",
  ownLength: 4.014883333333334,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-the-tortured-poets-department-the-anthology"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Robin",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "robin|06HL4z0CvFAxyc27GXpf02|240893",
  song: "song/taylor-swift-robin",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 30,
      externalId: "2CnjDMdpRjlWv04Xk3s6MW",
      externalLink: "https://open.spotify.com/track/2CnjDMdpRjlWv04Xk3s6MW",
    },
  ],
} as const satisfies Track
