import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayOrphansArabesqueArabesque = {
  id: "01a0b9ee-f147-71bc-b71d-7b6e754a54e9",
  type: "page-type/track",
  slug: "coldplay-orphans-arabesque-arabesque",
  ownLength: 5.671333333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-orphans-arabesque"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Z1HknKRrvUv5cheidF8Ag",
      externalLink: "https://open.spotify.com/track/2Z1HknKRrvUv5cheidF8Ag",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Arabesque",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "arabesque|4gzpq5DPGxSnKTe4SA8HAU|340280",
} as const satisfies Track
