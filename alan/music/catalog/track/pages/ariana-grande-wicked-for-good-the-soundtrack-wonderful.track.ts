import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedForGoodTheSoundtrackWonderful = {
  id: "01a0a6c5-0df6-76aa-a2eb-a050af8c4be5",
  type: "page-type/track",
  slug: "ariana-grande-wicked-for-good-the-soundtrack-wonderful",
  ownLength: 4.7576,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-for-good-the-soundtrack"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0fn8RZiNxBfRHRLX8UJI9T",
      externalLink: "https://open.spotify.com/track/0fn8RZiNxBfRHRLX8UJI9T",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Wonderful",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0O1n2TpXR4XizmHi7aY0l8", artistName: "Jeff Goldblum" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "46UMQ0cW8ToR8egkBRwAxZ", artistName: "Cynthia Erivo" },
  ],
  trackKey: "wonderful|0O1n2TpXR4XizmHi7aY0l8,46UMQ0cW8ToR8egkBRwAxZ,66CXWjxzNUsdJxJ2JdwvnR|285456",
  song: "song/ariana-grande-wonderful",
} as const satisfies Track
