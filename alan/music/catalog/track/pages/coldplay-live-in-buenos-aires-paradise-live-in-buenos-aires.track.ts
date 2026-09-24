import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresParadiseLiveInBuenosAires = {
  id: "01a0b9ee-d215-74f5-a3a8-75810d7638ed",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-paradise-live-in-buenos-aires",
  ownLength: 6.98955,
  ownProgress: 6.98955,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "Paradise - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "paradiseliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|419373",
  song: "song/coldplay-paradise",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 6,
      externalId: "314gi4w3RdZxlocdWw0Khr",
      externalLink: "https://open.spotify.com/track/314gi4w3RdZxlocdWw0Khr",
    },
  ],
} as const satisfies Track
