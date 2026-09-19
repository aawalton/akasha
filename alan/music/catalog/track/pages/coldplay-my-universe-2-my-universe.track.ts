import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyUniverse2MyUniverse = {
  id: "01a0b9ee-ef1c-7b17-8630-bb331b89fff1",
  type: "page-type/track",
  slug: "coldplay-my-universe-2-my-universe",
  ownLength: 3.8,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-my-universe-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3FeVmId7tL5YN8B7R3imoM",
      externalLink: "https://open.spotify.com/track/3FeVmId7tL5YN8B7R3imoM",
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
