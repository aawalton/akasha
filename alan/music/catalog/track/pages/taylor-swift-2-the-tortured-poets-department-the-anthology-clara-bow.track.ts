import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTorturedPoetsDepartmentTheAnthologyClaraBow = {
  id: "01a0ce86-3edb-7f30-86d7-ac97bd98f9b2",
  type: "page-type/track",
  slug: "taylor-swift-2-the-tortured-poets-department-the-anthology-clara-bow",
  ownLength: 3.6110333333333333,
  ownProgress: 3.6110333333333333,
  partOfCollections: [
    "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
    "release/taylor-swift-2-the-tortured-poets-department",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Clara Bow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "clarabow|06HL4z0CvFAxyc27GXpf02|216662",
  song: "song/taylor-swift-clara-bow",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-tortured-poets-department",
      discNumber: 1,
      position: 16,
      externalId: "1UlhrRvYzbHEyugEDspXUB",
      externalLink: "https://open.spotify.com/track/1UlhrRvYzbHEyugEDspXUB",
    },
    {
      release: "release/taylor-swift-2-the-tortured-poets-department-the-anthology",
      discNumber: 1,
      position: 16,
      externalId: "4d9PtIEVij9jW5OaLinH66",
      externalLink: "https://open.spotify.com/track/4d9PtIEVij9jW5OaLinH66",
    },
  ],
} as const satisfies Track
