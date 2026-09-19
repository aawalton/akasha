import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYTwistedLogic = {
  id: "01a0b9ee-e57e-7acf-bd06-44e35056a024",
  type: "page-type/track",
  slug: "coldplay-x-y-twisted-logic",
  ownLength: 4.531,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-x-y"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6kevl5fnM7GRJ2K2rBBnxq",
      externalLink: "https://open.spotify.com/track/6kevl5fnM7GRJ2K2rBBnxq",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Twisted Logic",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "twistedlogic|4gzpq5DPGxSnKTe4SA8HAU|271860",
  song: "song/coldplay-twisted-logic",
} as const satisfies Track
