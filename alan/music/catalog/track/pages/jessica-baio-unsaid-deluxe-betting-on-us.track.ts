import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioUnsaidDeluxeBettingOnUs = {
  id: "01a0c622-16f6-7132-9090-2596b97941bd",
  type: "page-type/track",
  slug: "jessica-baio-unsaid-deluxe-betting-on-us",
  ownLength: 2.812116666666667,
  ownProgress: 2.812116666666667,
  partOfCollections: ["release/jessica-baio-unsaid-deluxe", "release/jessica-baio-unsaid"],
  status: "completed",
  unit: "unit/minutes",
  title: "betting on us",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
  trackKey: "bettingonus|0VMFTqmv0hYlWruyBERT95|168727",
  song: "song/jessica-baio-betting-on-us",
  carriedBy: [
    {
      release: "release/jessica-baio-unsaid",
      discNumber: 1,
      position: 8,
      externalId: "5QOSuQrFvrLVOeBrt1W5fy",
      externalLink: "https://open.spotify.com/track/5QOSuQrFvrLVOeBrt1W5fy",
    },
    {
      release: "release/jessica-baio-unsaid-deluxe",
      discNumber: 1,
      position: 8,
      externalId: "6vNJltEbrsJjLEkfqcYOS1",
      externalLink: "https://open.spotify.com/track/6vNJltEbrsJjLEkfqcYOS1",
    },
  ],
} as const satisfies Track
