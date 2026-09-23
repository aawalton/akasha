import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyTheAlbatross = {
  id: "01a0ce86-3ab1-7e4f-8370-e0c0101082f6",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-the-albatross",
  ownLength: 3.0646333333333335,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-the-tortured-poets-department-the-anthology"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Albatross",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "thealbatross|06HL4z0CvFAxyc27GXpf02|183878",
  song: "song/taylor-swift-the-albatross",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 19,
      externalId: "4EF6IyONolQy0bIQXm2EmX",
      externalLink: "https://open.spotify.com/track/4EF6IyONolQy0bIQXm2EmX",
    },
  ],
} as const satisfies Track
