import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyUniverseMyUniverse = {
  id: "01a0b9ee-eed8-735a-92ae-ff61e857ea94",
  type: "page-type/track",
  slug: "coldplay-my-universe-my-universe",
  ownLength: 3.8,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-my-universe"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7btzRuXC6Ed3rIyomBRkO2",
      externalLink: "https://open.spotify.com/track/7btzRuXC6Ed3rIyomBRkO2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Universe",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "3Nrfpe0tUJi4K4DXYWgMUX", artistName: "BTS" },
  ],
  trackKey: "myuniverse|3Nrfpe0tUJi4K4DXYWgMUX,4gzpq5DPGxSnKTe4SA8HAU|228000",
  song: "song/coldplay-my-universe",
} as const satisfies Track
