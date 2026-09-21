import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioHeLovesMeHeLovesMeNotStrippedHeLovesMeHeLovesMeNot = {
  id: "01a0c622-1ef0-7a89-9fe9-6b22f84a8d0f",
  type: "page-type/track",
  slug: "jessica-baio-he-loves-me-he-loves-me-not-stripped-he-loves-me-he-loves-me-not",
  ownLength: 2.6266333333333334,
  ownProgress: 0,
  partOfCollections: [
    "release/jessica-baio-he-loves-me-he-loves-me-not-stripped",
    "release/jessica-baio-petals",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "he loves me, he loves me not",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "helovesmehelovesmenot|0VMFTqmv0hYlWruyBERT95|157598",
  song: "song/jessica-baio-he-loves-me-he-loves-me-not",
  carriedBy: [
    {
      release: "release/jessica-baio-he-loves-me-he-loves-me-not-stripped",
      discNumber: 1,
      position: 2,
      externalId: "0tQuXYeqCvUS0RV7WiIwFv",
      externalLink: "https://open.spotify.com/track/0tQuXYeqCvUS0RV7WiIwFv",
    },
    {
      release: "release/jessica-baio-petals",
      discNumber: 1,
      position: 1,
      externalId: "5ftDdWVTk330Wbnm2eRf89",
      externalLink: "https://open.spotify.com/track/5ftDdWVTk330Wbnm2eRf89",
    },
  ],
} as const satisfies Track
