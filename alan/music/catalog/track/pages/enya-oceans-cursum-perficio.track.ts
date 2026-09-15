import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansCursumPerficio = {
  id: "01a0a5b0-2c74-7762-b74c-fab520383d06",
  type: "page-type/track",
  slug: "enya-oceans-cursum-perficio",
  ownLength: 4.13,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "40ylg2of6uW7QcJQwkStt3",
      externalLink: "https://open.spotify.com/track/40ylg2of6uW7QcJQwkStt3",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Cursum Perficio",
} as const satisfies Track
