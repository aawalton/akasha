import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanJasonsSongGaveItAway = {
  id: "01a0a6c5-2d38-7122-a474-65b9a54a47e6",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-jasons-song-gave-it-away",
  ownLength: 4.410666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kngSEayfCOjR8w83R7vAT",
      externalLink: "https://open.spotify.com/track/0kngSEayfCOjR8w83R7vAT",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Jason's Song (Gave It Away)",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "jasonssonggaveitaway|66CXWjxzNUsdJxJ2JdwvnR|264640",
  song: "song/ariana-grande-jasons-song-gave-it-away",
} as const satisfies Track
