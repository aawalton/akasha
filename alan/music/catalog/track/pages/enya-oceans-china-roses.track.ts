import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansChinaRoses = {
  id: "01a0a5b0-2cca-79f0-b109-e85291453316",
  type: "track",
  slug: "enya-oceans-china-roses",
  ownLength: 4.786216666666666,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0UhcVuvIaV7ob8NH6UuKn4",
      externalLink: "https://open.spotify.com/track/0UhcVuvIaV7ob8NH6UuKn4",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "China Roses",
} as const satisfies Track
