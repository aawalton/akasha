import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayOrphansArabesqueOrphans = {
  id: "01a0b9ee-f11e-7ab8-8718-98ed8e83bbb3",
  type: "page-type/track",
  slug: "coldplay-orphans-arabesque-orphans",
  ownLength: 3.2922166666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-orphans-arabesque"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6YQlCOZnlFmqeciAh58fDE",
      externalLink: "https://open.spotify.com/track/6YQlCOZnlFmqeciAh58fDE",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Orphans",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "orphans|4gzpq5DPGxSnKTe4SA8HAU|197533",
  song: "song/coldplay-orphans",
} as const satisfies Track
