import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaDarkSkyIslandSanctaMaria = {
  id: "01a0a5b0-0bea-74d2-a035-927c10393e7e",
  type: "track",
  slug: "enya-dark-sky-island-sancta-maria",
  ownLength: 3.8606666666666665,
  ownProgress: 0,
  partOfCollections: ["release/enya-dark-sky-island"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Dr10eCjsJ7MVORP80yMAV",
      externalLink: "https://open.spotify.com/track/2Dr10eCjsJ7MVORP80yMAV",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Sancta Maria",
} as const satisfies Track
