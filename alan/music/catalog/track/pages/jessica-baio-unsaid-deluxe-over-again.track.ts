import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioUnsaidDeluxeOverAgain = {
  id: "01a0c622-15fc-7ad4-a1ea-84d8bdbe920b",
  type: "page-type/track",
  slug: "jessica-baio-unsaid-deluxe-over-again",
  ownLength: 2.433333333333333,
  ownProgress: 0,
  partOfCollections: ["release/jessica-baio-unsaid-deluxe", "release/jessica-baio-unsaid"],
  status: "not-started",
  unit: "unit/minutes",
  title: "over again",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "overagain|0VMFTqmv0hYlWruyBERT95|146000",
  song: "song/jessica-baio-over-again",
  carriedBy: [
    {
      release: "release/jessica-baio-unsaid",
      discNumber: 1,
      position: 2,
      externalId: "2i5YzFERFNBhBIDJLDxDfg",
      externalLink: "https://open.spotify.com/track/2i5YzFERFNBhBIDJLDxDfg",
    },
    {
      release: "release/jessica-baio-unsaid-deluxe",
      discNumber: 1,
      position: 2,
      externalId: "0m6KKfLxZV02Kw3F0mwKx5",
      externalLink: "https://open.spotify.com/track/0m6KKfLxZV02Kw3F0mwKx5",
    },
  ],
} as const satisfies Track
