import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLostLostWithJayZ = {
  id: "01a0b9ee-fb92-7280-b452-35cc4df974f3",
  type: "page-type/track",
  slug: "coldplay-lost-lost-with-jay-z",
  ownLength: 4.2817,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-lost"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4SwVcoBjjawbnexIiUDLc5",
      externalLink: "https://open.spotify.com/track/4SwVcoBjjawbnexIiUDLc5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lost+ (with Jay-Z)",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "lostwithjayz|4gzpq5DPGxSnKTe4SA8HAU|256902",
  song: "song/coldplay-lost",
} as const satisfies Track
