import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioUnsaidDeluxeEasy = {
  id: "01a0c622-1721-7489-82b6-a20821bf4195",
  type: "page-type/track",
  slug: "jessica-baio-unsaid-deluxe-easy",
  ownLength: 2.1124666666666667,
  ownProgress: 0,
  partOfCollections: ["release/jessica-baio-unsaid-deluxe", "release/jessica-baio-unsaid"],
  status: "not-started",
  unit: "unit/minutes",
  title: "easy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "easy|0VMFTqmv0hYlWruyBERT95|126748",
  song: "song/jessica-baio-easy",
  carriedBy: [
    {
      release: "release/jessica-baio-unsaid",
      discNumber: 1,
      position: 9,
      externalId: "6TgRJPRmu9l75M2bneEyyh",
      externalLink: "https://open.spotify.com/track/6TgRJPRmu9l75M2bneEyyh",
    },
    {
      release: "release/jessica-baio-unsaid-deluxe",
      discNumber: 1,
      position: 9,
      externalId: "3RaJUU0vGMGAywkJVBaCFV",
      externalLink: "https://open.spotify.com/track/3RaJUU0vGMGAywkJVBaCFV",
    },
  ],
} as const satisfies Track
