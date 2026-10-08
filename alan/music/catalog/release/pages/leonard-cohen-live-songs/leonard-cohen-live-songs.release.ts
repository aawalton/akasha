import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenLiveSongs = {
  id: "01a0676a-d723-7055-8a92-384c782ef611",
  type: "page-type/release",
  slug: "leonard-cohen-live-songs",
  title: "Live Songs",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 48.49505,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1973-04-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2E0441zcodrrkrNiffdEiC",
      externalLink: "https://open.spotify.com/album/2E0441zcodrrkrNiffdEiC",
      lastSyncedAt: "2025-10-10",
    },
  ],
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-15T16:37:27.000Z",
} as const satisfies Release
