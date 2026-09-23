import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyTheManuscript = {
  id: "01a0ce86-3c6c-7a5b-bb4d-7b9e812fb281",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-the-manuscript",
  ownLength: 3.7457166666666666,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-the-tortured-poets-department-the-anthology"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Manuscript",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "themanuscript|06HL4z0CvFAxyc27GXpf02|224743",
  song: "song/taylor-swift-the-manuscript",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 31,
      externalId: "1DTRUYVd8rYpla9hhVVwjo",
      externalLink: "https://open.spotify.com/track/1DTRUYVd8rYpla9hhVVwjo",
    },
  ],
} as const satisfies Track
