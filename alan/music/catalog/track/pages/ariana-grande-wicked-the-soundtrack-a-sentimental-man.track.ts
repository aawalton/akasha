import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackASentimentalMan = {
  id: "01a0a6c5-4d03-7443-804d-4ccb61f5fbd0",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-a-sentimental-man",
  ownLength: 2.21035,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-the-soundtrack"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7nj1vXAUfwiojuj0tNrEbp",
      externalLink: "https://open.spotify.com/track/7nj1vXAUfwiojuj0tNrEbp",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "A Sentimental Man",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0O1n2TpXR4XizmHi7aY0l8", artistName: "Jeff Goldblum" }],
  trackKey: "asentimentalman|0O1n2TpXR4XizmHi7aY0l8|132621",
  song: "song/ariana-grande-a-sentimental-man",
} as const satisfies Track
