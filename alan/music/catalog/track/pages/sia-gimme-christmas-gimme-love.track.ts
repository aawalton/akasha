import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaGimmeChristmasGimmeLove = {
  id: "01a0a59c-24b5-7ef2-b842-ff4828459e1b",
  type: "track",
  slug: "sia-gimme-christmas-gimme-love",
  ownLength: 2.96535,
  ownProgress: 0,
  partOfCollections: ["release/sia-gimme-christmas"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ADviyPnrVTFOaqY6wdxlD",
      externalLink: "https://open.spotify.com/track/0ADviyPnrVTFOaqY6wdxlD",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Gimme Love",
} as const satisfies Track
