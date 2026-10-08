import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioUnsaidDeluxeEasy = {
  id: "01a0c622-1721-7489-82b6-a20821bf4195",
  type: "page-type/track",
  slug: "jessica-baio-unsaid-deluxe-easy",
  ownLength: 2.1124666666666667,
  ownProgress: 2.1124666666666667,
  partOfCollections: ["release/jessica-baio-unsaid-deluxe", "release/jessica-baio-unsaid"],
  status: "completed",
  unit: "unit/minutes",
  title: "easy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
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
  createdAt: "2026-09-21T22:41:58.049Z",
  updatedAt: "2026-09-24T20:00:07.000Z",
} as const satisfies Track
