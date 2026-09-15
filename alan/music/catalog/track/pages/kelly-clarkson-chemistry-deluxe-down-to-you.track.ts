import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeDownToYou = {
  id: "01a0a5ae-b643-7009-8d2c-907424fe94a9",
  type: "track",
  slug: "kelly-clarkson-chemistry-deluxe-down-to-you",
  ownLength: 3.156816666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Kt1emdKOlD0JFLzQ9u0kt",
      externalLink: "https://open.spotify.com/track/6Kt1emdKOlD0JFLzQ9u0kt",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "down to you",
} as const satisfies Track
