import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyLoml = {
  id: "01a0ce86-3e45-7efc-b7de-de73391b5ff2",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-loml",
  ownLength: 4.619266666666666,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
    "release/taylor-swift-2-the-tortured-poets-department",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "loml",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "loml|06HL4z0CvFAxyc27GXpf02|277156",
  song: "song/taylor-swift-loml",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department",
      discNumber: 1,
      position: 12,
      externalId: "6RSG1dKPV5gEvILwJb4QtS",
      externalLink: "https://open.spotify.com/track/6RSG1dKPV5gEvILwJb4QtS",
    },
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 12,
      externalId: "3YkNIrAvbKNrrwwEd7NVLl",
      externalLink: "https://open.spotify.com/track/3YkNIrAvbKNrrwwEd7NVLl",
    },
  ],
} as const satisfies Track
