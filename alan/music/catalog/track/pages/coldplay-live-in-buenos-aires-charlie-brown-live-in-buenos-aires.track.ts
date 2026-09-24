import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresCharlieBrownLiveInBuenosAires = {
  id: "01a0b9ee-d300-722a-b3b8-42a96451c5d6",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-charlie-brown-live-in-buenos-aires",
  ownLength: 4.740433333333334,
  ownProgress: 4.740433333333334,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "Charlie Brown - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "charliebrownliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|284426",
  song: "song/coldplay-charlie-brown",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 12,
      externalId: "3ksF058sVZ21EgQdRLbUyI",
      externalLink: "https://open.spotify.com/track/3ksF058sVZ21EgQdRLbUyI",
    },
  ],
} as const satisfies Track
