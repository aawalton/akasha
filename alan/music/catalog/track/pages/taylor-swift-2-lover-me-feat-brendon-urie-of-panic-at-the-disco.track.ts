import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverMeFeatBrendonUrieOfPanicAtTheDisco = {
  id: "01a0ce86-7040-7063-ab06-fa82d104bb61",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-me-feat-brendon-urie-of-panic-at-the-disco",
  ownLength: 3.216666666666667,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "not-started",
  unit: "unit/minutes",
  title: "ME! (feat. Brendon Urie of Panic! At The Disco)",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "6eYFryfcEu3QSq59D62wZQ", artistName: "Brendon Urie" },
    { externalId: "20JZFwl6HVl6yg8a4H3ZqK", artistName: "Panic! At The Disco" },
  ],
  trackKey:
    "mefeatbrendonurieofpanicatthedisco|06HL4z0CvFAxyc27GXpf02,20JZFwl6HVl6yg8a4H3ZqK,6eYFryfcEu3QSq59D62wZQ|193000",
  song: "song/taylor-swift-me",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 16,
      externalId: "2Rk4JlNc2TPmZe2af99d45",
      externalLink: "https://open.spotify.com/track/2Rk4JlNc2TPmZe2af99d45",
    },
  ],
} as const satisfies Track
