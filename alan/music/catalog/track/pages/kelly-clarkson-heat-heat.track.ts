import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonHeatHeat = {
  id: "01a0a5ae-d74a-7e49-9d95-41fce6fb8c42",
  type: "page-type/track",
  slug: "kelly-clarkson-heat-heat",
  ownLength: 3.1666666666666665,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-heat"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5J4tUNYGJCYbi8VG7mbpna",
      externalLink: "https://open.spotify.com/track/5J4tUNYGJCYbi8VG7mbpna",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Heat",
} as const satisfies Track
