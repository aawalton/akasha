import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyGuiltyAsSin = {
  id: "01a0ce86-3dd2-76f8-a59f-a0acc3709f62",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-guilty-as-sin",
  ownLength: 4.239416666666667,
  ownProgress: 4.239416666666667,
  partOfCollections: [
    "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
    "release/taylor-swift-2-the-tortured-poets-department",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Guilty as Sin?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "guiltyassin|06HL4z0CvFAxyc27GXpf02|254365",
  song: "song/taylor-swift-guilty-as-sin",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department",
      discNumber: 1,
      position: 9,
      externalId: "0W0iAC1VGlB82PI6elxFYf",
      externalLink: "https://open.spotify.com/track/0W0iAC1VGlB82PI6elxFYf",
    },
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 9,
      externalId: "799KrpEbhZp0MHeiA8YK9P",
      externalLink: "https://open.spotify.com/track/799KrpEbhZp0MHeiA8YK9P",
    },
  ],
} as const satisfies Track
