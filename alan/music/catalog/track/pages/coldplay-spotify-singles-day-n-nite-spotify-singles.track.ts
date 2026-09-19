import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySpotifySinglesDayNNiteSpotifySingles = {
  id: "01a0b9ee-ee12-7054-9ccf-f082d28402f8",
  type: "page-type/track",
  slug: "coldplay-spotify-singles-day-n-nite-spotify-singles",
  ownLength: 4.3143666666666665,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-spotify-singles"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6M0tj2hONdMEveSWg3JdQG",
      externalLink: "https://open.spotify.com/track/6M0tj2hONdMEveSWg3JdQG",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Day ‘n’ Nite - Spotify Singles",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "daynnitespotifysingles|4gzpq5DPGxSnKTe4SA8HAU|258862",
  song: "song/coldplay-day-n-nite-spotify-singles",
} as const satisfies Track
