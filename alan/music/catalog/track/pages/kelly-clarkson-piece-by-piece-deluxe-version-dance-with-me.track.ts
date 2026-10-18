import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonPieceByPieceDeluxeVersionDanceWithMe = {
  id: "01a14f45-023c-7bc1-ad6c-c5615feebdce",
  type: "page-type/track",
  slug: "kelly-clarkson-piece-by-piece-deluxe-version-dance-with-me",
  ownLength: 4.3423,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-piece-by-piece-deluxe-version"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Dance With Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "dancewithme|3BmGtnKgCSGYIUhmivXKWX|260538",
  song: "song/kelly-clarkson-dance-with-me",
  carriedBy: [
    {
      release: "release/kelly-clarkson-piece-by-piece-deluxe-version",
      discNumber: 1,
      position: 11,
      externalId: "5UMQdaY6Rxu1ZrsWwIBnHv",
      externalLink: "https://open.spotify.com/track/5UMQdaY6Rxu1ZrsWwIBnHv",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
