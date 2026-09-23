import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift21989TaylorSVersionDeluxeOutOfTheWoodsTaylorsVersion = {
  id: "01a0ce86-4333-7203-9d8d-387ba3ffe766",
  type: "page-type/track",
  slug: "taylor-swift-2-1989-taylor-s-version-deluxe-out-of-the-woods-taylors-version",
  ownLength: 3.93,
  ownProgress: 3.93,
  partOfCollections: [
    "release/taylor-swift-2-1989-taylor-s-version-deluxe",
    "release/taylor-swift-2-1989-taylor-s-version",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Out Of The Woods (Taylor's Version)",
  trackType: "version",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "outofthewoodstaylorsversion|06HL4z0CvFAxyc27GXpf02|235800",
  song: "song/taylor-swift-out-of-the-woods",
  carriedBy: [
    {
      release: "release/taylor-swift-2-1989-taylor-s-version",
      discNumber: 1,
      position: 4,
      externalId: "045ZeOHPIzhxxsm8bq5kyE",
      externalLink: "https://open.spotify.com/track/045ZeOHPIzhxxsm8bq5kyE",
    },
    {
      release: "release/taylor-swift-2-1989-taylor-s-version-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "1OcSfkeCg9hRC2sFKB4IMJ",
      externalLink: "https://open.spotify.com/track/1OcSfkeCg9hRC2sFKB4IMJ",
    },
  ],
} as const satisfies Track
