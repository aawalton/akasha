import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyTheAlchemy = {
  id: "01a0ce86-3eb6-7d6b-8d59-ab09764e484d",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-the-alchemy",
  ownLength: 3.2816666666666667,
  ownProgress: 3.2816666666666667,
  partOfCollections: [
    "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
    "release/taylor-swift-2-the-tortured-poets-department",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Alchemy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "thealchemy|06HL4z0CvFAxyc27GXpf02|196900",
  song: "song/taylor-swift-the-alchemy",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department",
      discNumber: 1,
      position: 15,
      externalId: "1dhMTsEZz6ZEquGvmzVoHn",
      externalLink: "https://open.spotify.com/track/1dhMTsEZz6ZEquGvmzVoHn",
    },
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 15,
      externalId: "1tuNqJOtRQVHvONR8Lg3MZ",
      externalLink: "https://open.spotify.com/track/1tuNqJOtRQVHvONR8Lg3MZ",
    },
  ],
} as const satisfies Track
