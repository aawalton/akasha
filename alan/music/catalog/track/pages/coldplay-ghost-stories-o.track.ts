import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesO = {
  id: "01a0b9ee-d950-7278-af03-d3b33418aa55",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-o",
  ownLength: 5.391333333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-ghost-stories"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "77yuzxCS3csrgTPSW0pvyk",
      externalLink: "https://open.spotify.com/track/77yuzxCS3csrgTPSW0pvyk",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "O",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "o|4gzpq5DPGxSnKTe4SA8HAU|323480",
  song: "song/coldplay-o",
} as const satisfies Track
