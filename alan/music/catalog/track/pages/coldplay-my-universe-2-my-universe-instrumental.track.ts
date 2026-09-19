import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyUniverse2MyUniverseInstrumental = {
  id: "01a0b9ee-ef3e-70e7-a296-b7713ba0667c",
  type: "page-type/track",
  slug: "coldplay-my-universe-2-my-universe-instrumental",
  ownLength: 3.8,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-my-universe-2"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2sp32rIevQhpbo0Z4aQzoe",
      externalLink: "https://open.spotify.com/track/2sp32rIevQhpbo0Z4aQzoe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Universe - Instrumental",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "3Nrfpe0tUJi4K4DXYWgMUX", artistName: "BTS" },
  ],
  trackKey: "myuniverseinstrumental|3Nrfpe0tUJi4K4DXYWgMUX,4gzpq5DPGxSnKTe4SA8HAU|228000",
} as const satisfies Track
