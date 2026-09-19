import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeOrphans = {
  id: "01a0b9ee-d039-7a52-b7f4-ec9b9eb6aa96",
  type: "page-type/track",
  slug: "coldplay-everyday-life-orphans",
  ownLength: 3.2922166666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "03T4ttRCiLXST6MZjeMwmR",
      externalLink: "https://open.spotify.com/track/03T4ttRCiLXST6MZjeMwmR",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Orphans",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "orphans|4gzpq5DPGxSnKTe4SA8HAU|197533",
  song: "song/coldplay-orphans",
} as const satisfies Track
