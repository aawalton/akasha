import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyFreshOutTheSlammer = {
  id: "01a0ce86-3d80-7101-8a1d-aed1e336b936",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-fresh-out-the-slammer",
  ownLength: 3.51315,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
    "release/taylor-swift-2-the-tortured-poets-department",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Fresh Out The Slammer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "freshouttheslammer|06HL4z0CvFAxyc27GXpf02|210789",
  song: "song/taylor-swift-fresh-out-the-slammer",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department",
      discNumber: 1,
      position: 7,
      externalId: "3fO566xJgwxIa3qGCGBvIC",
      externalLink: "https://open.spotify.com/track/3fO566xJgwxIa3qGCGBvIC",
    },
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 7,
      externalId: "7IWcDWOfiooH5hRs9XOVYz",
      externalLink: "https://open.spotify.com/track/7IWcDWOfiooH5hRs9XOVYz",
    },
  ],
} as const satisfies Track
