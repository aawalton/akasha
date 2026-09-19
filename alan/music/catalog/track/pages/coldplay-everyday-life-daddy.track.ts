import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeDaddy = {
  id: "01a0b9ee-cf7a-7077-b3d1-b62d03267f4f",
  type: "page-type/track",
  slug: "coldplay-everyday-life-daddy",
  ownLength: 4.972,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3pcPPhPAiurm2Ior11SHrz",
      externalLink: "https://open.spotify.com/track/3pcPPhPAiurm2Ior11SHrz",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Daddy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "daddy|4gzpq5DPGxSnKTe4SA8HAU|298320",
} as const satisfies Track
