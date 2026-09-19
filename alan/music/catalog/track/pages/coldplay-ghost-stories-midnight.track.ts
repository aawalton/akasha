import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesMidnight = {
  id: "01a0b9ee-d8b2-7af4-9f4b-4675a8b2b3d8",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-midnight",
  ownLength: 4.9111,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-ghost-stories"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4GKk1uNzpxIptBuaY97Dkj",
      externalLink: "https://open.spotify.com/track/4GKk1uNzpxIptBuaY97Dkj",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Midnight",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "midnight|4gzpq5DPGxSnKTe4SA8HAU|294666",
  song: "song/coldplay-midnight",
} as const satisfies Track
