import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyDownBad = {
  id: "01a0ce86-3d07-72ae-a412-e20d4aff7fb4",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-down-bad",
  ownLength: 4.3538,
  ownProgress: 4.3538,
  partOfCollections: [
    "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
    "release/taylor-swift-2-the-tortured-poets-department",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Down Bad",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "downbad|06HL4z0CvFAxyc27GXpf02|261228",
  song: "song/taylor-swift-down-bad",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department",
      discNumber: 1,
      position: 4,
      externalId: "2F3N9tdombb64aW6VtZOdo",
      externalLink: "https://open.spotify.com/track/2F3N9tdombb64aW6VtZOdo",
    },
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 4,
      externalId: "1kbEbBdEgQdQeLXCJh28pJ",
      externalLink: "https://open.spotify.com/track/1kbEbBdEgQdQeLXCJh28pJ",
    },
  ],
} as const satisfies Track
