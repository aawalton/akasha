import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresMidnightLiveInBuenosAires = {
  id: "01a0b9ee-d2da-7511-a778-8657caf2788f",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-midnight-live-in-buenos-aires",
  ownLength: 1.7613333333333334,
  ownProgress: 1.7613333333333334,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  status: "completed",
  unit: "unit/minutes",
  title: "Midnight - Live in Buenos Aires",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "midnightliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|105680",
  song: "song/coldplay-midnight",
  carriedBy: [
    {
      release: "release/coldplay-live-in-buenos-aires",
      discNumber: 1,
      position: 11,
      externalId: "62OqszvOYSuonp6Buj4P74",
      externalLink: "https://open.spotify.com/track/62OqszvOYSuonp6Buj4P74",
    },
  ],
} as const satisfies Track
