import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologySoHighSchool = {
  id: "01a0ce86-3b1e-7336-9e47-a3b31edaa736",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-so-high-school",
  ownLength: 3.8133333333333335,
  ownProgress: 3.8133333333333335,
  partOfCollections: ["release/taylor-swift-2-the-tortured-poets-department-the-anthology"],
  status: "completed",
  unit: "unit/minutes",
  title: "So High School",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "sohighschool|06HL4z0CvFAxyc27GXpf02|228800",
  song: "song/taylor-swift-so-high-school",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 22,
      externalId: "7Mts0OfPorF4iwOomvfqn1",
      externalLink: "https://open.spotify.com/track/7Mts0OfPorF4iwOomvfqn1",
    },
  ],
} as const satisfies Track
