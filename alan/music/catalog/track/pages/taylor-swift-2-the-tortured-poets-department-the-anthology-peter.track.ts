import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyPeter = {
  id: "01a0ce86-3bfc-7f3e-9b60-2a84e20a30f6",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-peter",
  ownLength: 4.732616666666667,
  ownProgress: 4.732616666666667,
  partOfCollections: ["release/taylor-swift-2-the-tortured-poets-department-the-anthology"],
  status: "completed",
  unit: "unit/minutes",
  title: "Peter",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "peter|06HL4z0CvFAxyc27GXpf02|283957",
  song: "song/taylor-swift-peter",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 28,
      externalId: "3zMDGj4D8ogaYgAIZPeU7S",
      externalLink: "https://open.spotify.com/track/3zMDGj4D8ogaYgAIZPeU7S",
    },
  ],
} as const satisfies Track
