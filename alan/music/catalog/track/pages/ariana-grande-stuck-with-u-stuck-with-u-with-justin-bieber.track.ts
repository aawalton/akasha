import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeStuckWithUStuckWithUWithJustinBieber = {
  id: "01a0a6c5-3800-7466-b48b-38f3cf4fce6c",
  type: "page-type/track",
  slug: "ariana-grande-stuck-with-u-stuck-with-u-with-justin-bieber",
  ownLength: 3.8080333333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-stuck-with-u"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4HBZA5flZLE435QTztThqH",
      externalLink: "https://open.spotify.com/track/4HBZA5flZLE435QTztThqH",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Stuck with U (with Justin Bieber)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "1uNFoZAHBGtllmzznpCI3s", artistName: "Justin Bieber" },
  ],
  trackKey: "stuckwithuwithjustinbieber|1uNFoZAHBGtllmzznpCI3s,66CXWjxzNUsdJxJ2JdwvnR|228482",
  song: "song/ariana-grande-stuck-with-u",
} as const satisfies Track
