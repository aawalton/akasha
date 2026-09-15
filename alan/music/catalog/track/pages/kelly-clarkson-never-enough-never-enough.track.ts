import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonNeverEnoughNeverEnough = {
  id: "01a0a5ae-d76b-7545-a4a3-c61e854ac7f8",
  type: "track",
  slug: "kelly-clarkson-never-enough-never-enough",
  ownLength: 3.4022166666666664,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-never-enough"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4eGfldSRct5z9tQZDp5R5Y",
      externalLink: "https://open.spotify.com/track/4eGfldSRct5z9tQZDp5R5Y",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Never Enough",
} as const satisfies Track
