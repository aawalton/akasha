import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansOnlyIf = {
  id: "01a0a5b0-2c2f-7184-8d9d-38c7eea6eee8",
  type: "track",
  slug: "enya-oceans-only-if",
  ownLength: 3.330433333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4d7mwul19Ehi2l3F4vsiBj",
      externalLink: "https://open.spotify.com/track/4d7mwul19Ehi2l3F4vsiBj",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Only If",
} as const satisfies Track
