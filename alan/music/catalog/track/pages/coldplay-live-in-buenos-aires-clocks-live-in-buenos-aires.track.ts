import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresClocksLiveInBuenosAires = {
  id: "01a0b9ee-d2b8-711b-8b6f-138b12a7d8e5",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-clocks-live-in-buenos-aires",
  ownLength: 4.336666666666667,
  ownProgress: 4.336666666666667,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "Clocks - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "clocksliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|260200",
  song: "song/coldplay-clocks",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 10,
      externalId: "4cHZ7W5R81upaIGZfqWxbB",
      externalLink: "https://open.spotify.com/track/4cHZ7W5R81upaIGZfqWxbB",
    },
  ],
} as const satisfies Track
