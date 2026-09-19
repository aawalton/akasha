import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoParadise = {
  id: "01a0b9ee-dc48-7dae-bac6-c34f7d9e4bb3",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-paradise",
  ownLength: 4.645316666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6nek1Nin9q48AVZcWs9e9D",
      externalLink: "https://open.spotify.com/track/6nek1Nin9q48AVZcWs9e9D",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Paradise",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "paradise|4gzpq5DPGxSnKTe4SA8HAU|278719",
} as const satisfies Track
