import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaAndWinterCameOicheChiuinChorale = {
  id: "01a0a5b0-0f73-7a60-805c-7165f65fbd66",
  type: "page-type/track",
  slug: "enya-and-winter-came-oiche-chiuin-chorale",
  ownLength: 3.826,
  ownProgress: 0,
  partOfCollections: ["release/enya-and-winter-came"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2O3z0aod6uj2jpSQQNSY6Y",
      externalLink: "https://open.spotify.com/track/2O3z0aod6uj2jpSQQNSY6Y",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Oíche Chiúin - Chorale",
} as const satisfies Track
