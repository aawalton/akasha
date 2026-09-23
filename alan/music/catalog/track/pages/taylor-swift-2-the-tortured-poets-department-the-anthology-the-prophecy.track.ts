import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyTheProphecy = {
  id: "01a0ce86-3bb5-769d-86a8-d5189f8b13fb",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-the-prophecy",
  ownLength: 4.16345,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-the-tortured-poets-department-the-anthology"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Prophecy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "theprophecy|06HL4z0CvFAxyc27GXpf02|249807",
  song: "song/taylor-swift-the-prophecy",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 26,
      externalId: "18WFFUIsewmA8g31KAeo3e",
      externalLink: "https://open.spotify.com/track/18WFFUIsewmA8g31KAeo3e",
    },
  ],
} as const satisfies Track
