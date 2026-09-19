import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYSpeedOfSound = {
  id: "01a0b9ee-e4c0-7eba-adda-091de301148e",
  type: "page-type/track",
  slug: "coldplay-x-y-speed-of-sound",
  ownLength: 4.7984333333333336,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-x-y"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7clUVcSOtkNWa58Gw5RfD4",
      externalLink: "https://open.spotify.com/track/7clUVcSOtkNWa58Gw5RfD4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Speed of Sound",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "speedofsound|4gzpq5DPGxSnKTe4SA8HAU|287906",
} as const satisfies Track
